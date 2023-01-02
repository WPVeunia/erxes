import { STRUCTURE_STATUSES } from '@erxes/api-utils/src/constants';
import { checkPermission } from '@erxes/api-utils/src/permissions';
import { IContext, IModels } from '../../../connectionResolver';

const generateFilters = async ({
  models,
  userId,
  type,
  params
}: {
  models: IModels;
  userId: string;
  type: string;
  params: any;
}) => {
  const filter: any = { status: STRUCTURE_STATUSES.ACTIVE };

  if (params.searchValue) {
    const regexOption = {
      $regex: `.*${params.searchValue.trim()}.*`,
      $options: 'i'
    };

    filter.$or = [
      {
        title: regexOption
      },
      {
        description: regexOption
      }
    ];
  }

  if (params.status) {
    params.status = params.status;
  }

  if (!params.withoutUserFilter) {
    const userDetail = await models.Users.findOne({ _id: userId });
    if (type === 'branch') {
      filter._id = { $in: userDetail?.branchIds || [] };
    }
    if (type === 'department') {
      filter._id = { $in: userDetail?.departmentIds || [] };
    }
  }

  return filter;
};

const structureQueries = {
  async departments(
    _root,
    params: { searchValue?: string },
    { models, user }: IContext
  ) {
    const filter = await generateFilters({
      models,
      userId: user._id,
      type: 'department',
      params
    });
    return models.Departments.find(filter).sort({ title: 1 });
  },

  departmentDetail(_root, { _id }, { models }: IContext) {
    return models.Departments.getDepartment({ _id });
  },

  units(
    _root,
    { searchValue }: { searchValue?: string },
    { models }: IContext
  ) {
    const filter: { $or?: any[] } = {};

    if (searchValue) {
      const regexOption = {
        $regex: `.*${searchValue.trim()}.*`,
        $options: 'i'
      };

      filter.$or = [
        {
          title: regexOption
        },
        {
          description: regexOption
        }
      ];
    }

    return models.Units.find(filter).sort({ title: 1 });
  },

  unitDetail(_root, { _id }, { models }: IContext) {
    return models.Units.getUnit({ _id });
  },

  async branches(
    _root,
    params: { searchValue?: string },
    { models, user }: IContext
  ) {
    const filter = await generateFilters({
      models,
      userId: user._id,
      type: 'branch',
      params
    });
    return models.Branches.find(filter).sort({ title: 1 });
  },

  branchDetail(_root, { _id }, { models }: IContext) {
    return models.Branches.getBranch({ _id });
  },

  async noDepartmentUsers(_root, { excludeId }, { models }: IContext) {
    const userIds: string[] = [];

    const filter: { _id?: { $ne: string } } = {};

    if (excludeId) {
      filter._id = { $ne: excludeId };
    }

    const departments = await models.Departments.find(filter);

    departments.forEach(d => {
      if (d.supervisorId) {
        userIds.push(d.supervisorId);
      }

      if (d.userIds && d.userIds.length > 0) {
        userIds.push(...d.userIds);
      }
    });

    return models.Users.findUsers({ _id: { $nin: userIds }, isActive: true });
  },

  structureDetail(_root, _args, { models }: IContext) {
    return models.Structures.findOne();
  }
};

checkPermission(structureQueries, 'structureDetail', 'showStructure');

checkPermission(structureQueries, 'departments', 'showDepartment');
checkPermission(structureQueries, 'departmentDetail', 'showDepartment');

checkPermission(structureQueries, 'units', 'showUnit');
checkPermission(structureQueries, 'unitDetail', 'showUnit');

checkPermission(structureQueries, 'branches', 'showBranch');
checkPermission(structureQueries, 'branchDetail', 'showBranch');

export default structureQueries;
