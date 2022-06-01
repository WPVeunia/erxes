import { mutations } from '@erxes/ui-settings/src/properties/graphql';
import {
  IProduct as IProductC,
  IProductCategory as IProductCategoryC,
  IProductDoc as IProductDocC,
  IUom as IUomC
} from '@erxes/ui-products/src/types';

import {
  IAction as IActionA,
  IAutomation as IAutomationA,
  ITrigger as ITriggerA,
  IAutomationNote as IAutomationNoteA
} from '@erxes/plugin-automations-ui/src/types';

import { IBranch, IDepartment } from '@erxes/ui-team/src/types';

import { QueryResponse } from '@erxes/ui/src/types';

export type IProductDoc = IProductDocC & {};

export type IProduct = IProductC & {};

export type IProductCategory = IProductCategoryC & {};

export type IUom = IUomC & {};
export interface IJob {
  id: string;
  nextJobIds: string[];
  jobReferId: string;
  style: object;
  label: string;
  description: string;
  quantity: number;
}

export interface IJobDocument extends IJob {
  jobRefer: IJobRefer;
}

export interface IFlow {
  name: string;
  categoryId: string;
  status: string;
  jobs: IJob[];
}

export interface IFlowDocument extends IFlow, Document {
  _id: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface IJobCategory {
  _id: string;
  name: string;
  code: string;
  description?: string;
  parentId?: string;
  attachment?: any;
  status?: string;
  order: string;
  createdAt: Date;
  isRoot: boolean;
  productCount: number;
}

export interface IJobRefer {
  _id: string;
  createdAt: Date;
  code: string;
  name: string;
  type: string;
  status?: string;
  categoryId?: string;
  duration: number;
  durationType: string;
  needProducts?: any[];
  resultProducts?: any[];
}

export interface IProductsData {
  _id: string;
  productId: string;
  product: any;
  quantity: number;
  uomId: string;
  branchId?: string;
  departmentId?: string;
}

export interface IProductsDataDocument extends IProductsData {
  branch?: IBranch;
  department?: IDepartment;
  uom?: IUom;
}

// query types

export type ProductsQueryResponse = {
  products: IProduct[];
} & QueryResponse;

// FLOW

export type FlowsQueryResponse = {
  flows: IFlowDocument[];
} & QueryResponse;

export type FlowDetailQueryResponse = {
  flowDetail: IFlowDocument;
} & QueryResponse;

export type FlowsAddMutationResponse = {
  flowsAdd: (mutation: { variables: IFlowDocument }) => Promise<any>;
};

export type FlowsEditMutationResponse = {
  flowsEdit: (mutation: { variables: IFlowDocument }) => Promise<any>;
};

// JOB

export type JobRefersQueryResponse = {
  jobRefers: IJobRefer[];
} & QueryResponse;

export type jobReferTotalCountQueryResponse = {
  jobReferTotalCount: number;
} & QueryResponse;

export type JobCategoriesQueryResponse = {
  jobCategories: IJobCategory[];
} & QueryResponse;

export type JobCategoriesCountQueryResponse = {
  jobCategoriesTotalCount: number;
} & QueryResponse;

// UOM

export type UomsQueryResponse = {
  uoms: IUom[];
} & QueryResponse;

export type UomsCountQueryResponse = {
  uomsTotalCount: number;
} & QueryResponse;

export type MutationVariables = {
  _id?: string;
  type: string;
  name?: string;
  description?: string;
  sku?: string;
  createdAt?: Date;
};

export type MutationUomVariables = {
  _id?: string;
  name: string;
  code: string;
};

export type MutationJobReferVariables = {};

// mutation types

export type AddMutationResponse = {
  addMutation: (mutation: { variables: MutationVariables }) => Promise<any>;
};

export type EditMutationResponse = {
  editMutation: (mutation: { variables: MutationVariables }) => Promise<any>;
};

export type flowsRemoveMutationResponse = {
  flowsRemove: (mutation: { variables: { flowIds: string[] } }) => Promise<any>;
};

export type JobCategoriesRemoveMutationResponse = {
  jobCategoriesRemove: (mutation: {
    variables: { _id: string };
  }) => Promise<any>;
};

export type DetailQueryResponse = {
  jobReferDetail: IJobRefer;
  loading: boolean;
};

export type CategoryDetailQueryResponse = {
  productCategoryDetail: IProductCategory;
  loading: boolean;
};

export type CountByTagsQueryResponse = {
  productCountByTags: { [key: string]: number };
  loading: boolean;
};

export type MergeMutationVariables = {
  productIds: string[];
  productFields: IProduct;
};

export type MergeMutationResponse = {
  productsMerge: (params: {
    variables: MergeMutationVariables;
  }) => Promise<any>;
};

// UOM

export type UomAddMutationResponse = {
  uomsAdd: (mutation: { variables: MutationUomVariables }) => Promise<any>;
};

export type UomEditMutationResponse = {
  uomsEdit: (mutation: { variables: MutationUomVariables }) => Promise<any>;
};

export type UomRemoveMutationResponse = {
  uomsRemove: (mutation: { variables: { uomIds: string[] } }) => Promise<any>;
};

// SETTINGS

export type IConfigsMap = { [key: string]: any };

export type IProductsConfig = {
  _id: string;
  code: string;
  value: any;
};

// query types
export type ProductsConfigsQueryResponse = {
  productsConfigs: IProductsConfig[];
  loading: boolean;
  refetch: () => void;
};