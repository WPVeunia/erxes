import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { initBroker } from './messageBroker';

import { IFetchElkArgs } from '@erxes/api-utils/src/types';
import { generateModels, models } from './connectionResolver';

export let mainDb;
export let graphqlPubsub;
export let serviceDiscovery;

export let es: {
  client;
  fetchElk(args: IFetchElkArgs): Promise<any>;
  getMappings(index: string): Promise<any>;
  getIndexPrefix(): string;
};

export let debug;

export default {
  name: 'dashboard',
  graphql: sd => {
    serviceDiscovery = sd;

    return {
      typeDefs,
      resolvers
    };
  },
  hasSubscriptions: false,

  segment: {},
  meta: { logs: {} },
  apolloServerContext: context => {
    context.models = models;
  },
  onServerInit: async options => {
    mainDb = options.db;

    await generateModels('os');

    initBroker(options.messageBrokerClient);

    debug = options.debug;
    graphqlPubsub = options.pubsubClient;
    es = options.elasticsearch;
  }
};