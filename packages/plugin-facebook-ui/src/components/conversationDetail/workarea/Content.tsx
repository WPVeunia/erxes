import React from 'react';

import { ContentBox } from '@erxes/ui/src/layout/styles';
import { IConversation } from '@erxes/ui-inbox/src/inbox/types';
import { ConversationWrapper } from '@erxes/ui-inbox/src/inbox/components/conversationDetail/workarea/conversation/styles';
import { IAttachmentPreview } from '@erxes/ui/src/types';

import { IConversationMessage } from '../../../types';
import Conversation from './Conversation';

type Props = {
  currentConversation: IConversation;
  loading: boolean;
  conversationMessages: IConversationMessage[];
  attachmentPreview: IAttachmentPreview;
  typingInfo?: string;
  loadMoreMessages: () => void;
};

export default class Content extends React.Component<Props> {
  private node;

  constructor(props: Props) {
    super(props);

    this.node = React.createRef();
  }

  onScroll = () => {
    const { current } = this.node;
    const { loadMoreMessages } = this.props;

    if (current.scrollTop === 0) {
      loadMoreMessages();
    }
  };

  scrollBottom = () => {
    const { current } = this.node;

    if (current) {
      return (current.scrollTop = current.scrollHeight);
    }
  };

  // Calculating new messages's height to use later in componentDidUpdate
  // So that we can retract cursor position to original place
  getSnapshotBeforeUpdate(prevProps) {
    const { conversationMessages } = this.props;

    if (prevProps.conversationMessages.length < conversationMessages.length) {
      const { current } = this.node;

      if (current) {
        return current.scrollHeight - current.scrollTop;
      }
    }

    return null;
  }

  componentDidMount() {
    this.scrollBottom();
  }

  componentDidUpdate(prevProps, _prevState, snapshot) {
    const { conversationMessages, typingInfo } = this.props;

    const messageCount = conversationMessages.length;
    const prevMessageCount = prevProps.conversationMessages.length;

    if (snapshot !== null) {
      const { current } = this.node;

      if (current) {
        current.scrollTop = current.scrollHeight - snapshot;
      }
    }

    if (prevMessageCount + 1 === messageCount || typingInfo) {
      this.scrollBottom();
    }

    return;
  }

  render() {
    const {
      attachmentPreview,
      conversationMessages,
      currentConversation,
      loading
    } = this.props;

    return (
      <ContentBox>
        <ConversationWrapper
          id="conversationWrapper"
          innerRef={this.node}
          onScroll={this.onScroll}
        >
          <Conversation
            conversation={currentConversation}
            scrollBottom={this.scrollBottom}
            conversationMessages={conversationMessages}
            attachmentPreview={attachmentPreview}
            loading={loading}
          />
        </ConversationWrapper>
      </ContentBox>
    );
  }
}