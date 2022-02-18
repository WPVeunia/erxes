import { moduleRequireLogin } from '@erxes/api-utils/src/permissions';
import { IContext } from '@erxes/api-utils/src/types';
import { ACTIVITY_CONTENT_TYPES } from '@erxes/api-utils/src/constants';
import { debugExternalApi } from '@erxes/api-utils/src/debuggers';

import {
  Conversations,
  EmailDeliveries,
  InternalNotes,
  // Stages,
  Tasks
} from '../../apiCollections';
// import { getCollection } from '../../../db/models/boardUtils';
import { IActivityLogDocument } from '../../models/ActivityLogs';
import { collectPluginContent } from '../../pluginUtils';
import { fetchActivityLogs, fetchLogs } from '../../utils';
import { sendConformityMessage } from '../../messageBroker';

export interface IListArgs {
  contentType: string;
  contentId: string;
  activityType: string;
}

interface IListArgsByAction {
  contentType: string;
  action: string;
  pipelineId: string;
  perPage?: number;
  page?: number;
}

const activityLogQueries = {
  /**
   * Get activity log list
   */
  async activityLogs(_root, doc: IListArgs, { dataSources, user }: IContext) {
    const { contentType, contentId, activityType } = doc;

    let activities: IActivityLogDocument[] = [];

    const relatedItemIds = await sendConformityMessage('savedConformity', {
      mainType: contentType,
      mainTypeId: contentId,
      relTypes:
        contentType !== 'task' ? ['deal', 'ticket'] : ['deal', 'ticket', 'task']
    });

    const relatedTaskIds = await sendConformityMessage('savedConformity', {
      mainType: contentType,
      mainTypeId: contentId,
      relTypes: ['task']
    });

    const collectItems = (items: any, type?: string) => {
      (items || []).map(item => {
        let result: IActivityLogDocument = {} as any;

        if (!type) {
          result = item;
        }

        if (type && type !== 'taskDetail') {
          result._id = item._id;
          result.contentType = type;
          result.contentId = contentId;
          result.createdAt = item.createdAt;
        }

        if (type === 'taskDetail') {
          result._id = item._id;
          result.contentType = type;
          result.createdAt = item.closeDate || item.createdAt;
        }

        activities.push(result);
      });
    };

    const collectConversations = async () => {
      collectItems(
        await Conversations.find({
          $or: [{ customerId: contentId }, { participatedUserIds: contentId }]
        }).toArray(),
        'conversation'
      );

      if (contentType === 'customer') {
        let conversationIds;

        try {
          conversationIds = await dataSources.IntegrationsAPI.fetchApi(
            '/facebook/get-customer-posts',
            {
              customerId: contentId
            }
          );
          collectItems(
            await Conversations.find({ _id: { $in: conversationIds } }).toArray(),
            'comment'
          );
        } catch (e) {
          debugExternalApi(e);
        }
      }
    };

    // this also fetches campaign & sms logs, don't fetch them in default switch case
    const collectActivityLogs = async () => {
      collectItems(
        await fetchActivityLogs(
          {
            contentId: { $in: [...relatedItemIds, contentId] }
          },
        )
      );
    };

    const collectInternalNotes = async () => {
      collectItems(
        await InternalNotes.find({ contentTypeId: contentId })
          .sort({
            createdAt: -1
          })
          .toArray(),
        'note'
      );
    };

    const collectCampaigns = async () => {
      collectItems(
        await fetchActivityLogs(
          {
            contentId,
            contentType: ACTIVITY_CONTENT_TYPES.CAMPAIGN
          },
        )
      );
    };

    const collectSms = async () => {
      collectItems(
        await fetchActivityLogs(
          {
            contentId,
            contentType: ACTIVITY_CONTENT_TYPES.SMS
          },
        )
      );
    };

    const collectTasks = async () => {
      if (contentType !== 'task') {
        collectItems(
          await Tasks.find({
            $and: [
              { _id: { $in: relatedTaskIds } },
              { status: { $ne: 'archived' } }
            ]
          })
            .sort({
              closeDate: 1
            })
            .toArray(),
          'taskDetail'
        );
      }

      const contentIds = activities
        .filter(activity => activity.action === 'convert')
        .map(activity => activity.content);

      if (Array.isArray(contentIds)) {
        collectItems(
          await Conversations.find({ _id: { $in: contentIds } }).toArray(),
          'conversation'
        );
      }
    };

    const collectEmailDeliveries = async () => {
      await collectItems(
        await EmailDeliveries.find({ customerId: contentId }).toArray(),
        'email'
      );
    };

    if (activityType && activityType.startsWith('plugin')) {
      const pluginResponse = await collectPluginContent(
        doc,
        user,
        activities,
        collectItems
      );
      if (pluginResponse) {
        activities = activities.concat(pluginResponse);
      }
    } else {
      switch (activityType) {
        case ACTIVITY_CONTENT_TYPES.CONVERSATION:
          await collectConversations();
          break;

        case ACTIVITY_CONTENT_TYPES.INTERNAL_NOTE:
          await collectInternalNotes();
          break;

        case ACTIVITY_CONTENT_TYPES.TASK:
          await collectTasks();
          break;

        case ACTIVITY_CONTENT_TYPES.EMAIL:
          await collectEmailDeliveries();
          break;

        case ACTIVITY_CONTENT_TYPES.SMS:
          await collectSms();
          break;

        case ACTIVITY_CONTENT_TYPES.CAMPAIGN:
          await collectCampaigns();
          break;

        default:
          await collectConversations();
          await collectActivityLogs();
          await collectInternalNotes();
          await collectTasks();
          await collectEmailDeliveries();

          break;
      }
    }

    activities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return activities;
  },

  async activityLogsByAction(
    _root,
    {
      contentType,
      action,
      pipelineId,
      perPage = 10,
      page = 1
    }: IListArgsByAction
  ) {
    const allActivityLogs: any[] = [];
    let allTotalCount: number = 0;

    if (!action) {
      return {
        activityLogs: [],
        totalCount: 0
      };
    }

    let actionArr = action.split(',');

    const perPageForAction = perPage / actionArr.length;

    // const stageIds = await Stages.find({ pipelineId }).distinct('_id');

    // const { collection } = getCollection(contentType);

    // const contentIds = await collection
    //   .find({ stageId: { $in: stageIds } })
    //   .distinct('_id');

    actionArr = actionArr.filter(a => a !== 'delete' && a !== 'addNote');

    // if (actionArr.length > 0) {
    //   const { activityLogs, totalCount } = await fetchLogs(
    //     {
    //       contentType,
    //       contentId: { $in: contentIds },
    //       action: { $in: actionArr },
    //       perPage: perPageForAction * 3,
    //       page
    //     },
    //     'activityLogs'
    //   );

    //   for (const log of activityLogs) {
    //     allActivityLogs.push({
    //       _id: log._id,
    //       action: log.action,
    //       createdAt: log.createdAt,
    //       createdBy: log.createdBy,
    //       contentType: log.contentType,
    //       contentId: log.contentId,
    //       content: log.content
    //     });
    //   }

    //   allTotalCount += totalCount;
    // }

    if (action.includes('delete')) {
      const { logs, totalCount } = await fetchLogs(
        {
          action: 'delete',
          type: contentType,
          perPage: perPageForAction,
          page
        },
      );

      for (const log of logs) {
        allActivityLogs.push({
          _id: log._id,
          action: log.action,
          contentType: log.type,
          contentId: log.objectId,
          createdAt: log.createdAt,
          createdBy: log.createdBy,
          content: log.description
        });
      }

      allTotalCount += totalCount;
    }

    // if (action.includes('addNote')) {
    //   const filter = {
    //     contentTypeId: { $in: contentIds }
    //   };

    //   const internalNotes = await InternalNotes.find(filter)
    //     .sort({
    //       createdAt: -1
    //     })
    //     .skip(perPageForAction * (page - 1))
    //     .limit(perPageForAction);

    //   for (const note of internalNotes) {
    //     allActivityLogs.push({
    //       _id: note._id,
    //       action: 'addNote',
    //       contentType: note.contentType,
    //       contentId: note.contentTypeId,
    //       createdAt: note.createdAt,
    //       createdBy: note.createdUserId,
    //       content: note.content
    //     });
    //   }

    //   const totalCount = await InternalNotes.countDocuments(filter);

    //   allTotalCount += totalCount;
    // }

    return {
      activityLogs: allActivityLogs,
      totalCount: allTotalCount
    };
  }
};

moduleRequireLogin(activityLogQueries);

export default activityLogQueries;
