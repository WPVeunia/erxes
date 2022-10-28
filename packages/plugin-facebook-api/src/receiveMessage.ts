import { Activity } from 'botbuilder';
import { graphqlPubsub } from './configs';

import { IModels } from './connectionResolver';
import { sendInboxMessage } from './messageBroker';
import { getOrCreateCustomer } from './store';
import { IChannelData } from './types';

const receiveMessage = async (
  models: IModels,
  subdomain: string,
  activity: Activity
) => {
  const {
    recipient,
    sender,
    timestamp,
    text,
    attachments,
    message
  } = activity.channelData as IChannelData;

  const integration = await models.Integrations.getIntegration({
    $and: [
      { facebookPageIds: { $in: [recipient.id] } },
      { kind: 'facebook-messenger' }
    ]
  });

  const userId = sender.id;
  const pageId = recipient.id;
  const kind = 'facebook-messenger';

  // get or create customer
  const customer = await getOrCreateCustomer(
    models,
    subdomain,
    pageId,
    userId,
    kind
  );

  // get conversation
  let conversation = await models.Conversations.findOne({
    senderId: userId,
    recipientId: recipient.id
  });

  // create conversation
  if (!conversation) {
    // save on integrations db
    try {
      conversation = await models.Conversations.create({
        timestamp,
        senderId: userId,
        recipientId: recipient.id,
        content: text,
        integrationId: integration._id
      });
    } catch (e) {
      throw new Error(
        e.message.includes('duplicate')
          ? 'Concurrent request: conversation duplication'
          : e
      );
    }

    // save on api
    try {
      const apiConversationResponse = await sendInboxMessage({
        subdomain,
        action: 'integrations.receive',
        data: {
          action: 'create-or-update-conversation',
          payload: JSON.stringify({
            customerId: customer.erxesApiId,
            integrationId: integration.erxesApiId,
            content: text || '',
            attachments: (attachments || [])
              .filter(att => att.type !== 'fallback')
              .map(att => ({
                type: att.type,
                url: att.payload ? att.payload.url : ''
              }))
          })
        },
        isRPC: true
      });

      conversation.erxesApiId = apiConversationResponse._id;

      await conversation.save();
    } catch (e) {
      await models.Conversations.deleteOne({ _id: conversation._id });
      throw new Error(e);
    }
  }

  // get conversation message
  const conversationMessage = await models.ConversationMessages.findOne({
    mid: message.mid
  });

  if (!conversationMessage) {
    try {
      const created = await models.ConversationMessages.create({
        conversationId: conversation._id,
        mid: message.mid,
        createdAt: timestamp,
        content: text,
        customerId: customer.erxesApiId
      });

      graphqlPubsub.publish('conversationClientMessageInserted', {
        conversationClientMessageInserted: created
      });

      graphqlPubsub.publish('conversationMessageInserted', {
        conversationMessageInserted: created
      });
    } catch (e) {
      throw new Error(
        e.message.includes('duplicate')
          ? 'Concurrent request: conversation message duplication'
          : e
      );
    }
  }
};

export default receiveMessage;
