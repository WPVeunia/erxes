import { IContext } from '../../../connectionResolver';
import { IPackage } from '../../../models/definitions/packages';

interface IPackageEdit extends IPackage {
  _id: string;
}

const blockMutations = {
  /**
   * Creates a new package
   */
  async packagesAdd(_root, doc: IPackage, { models }: IContext) {
    const packages = await models.Packages.createPackage(doc);

    return packages;
  },

  async packagesEdit(
    _root,
    { _id, ...doc }: IPackageEdit,
    { models }: IContext
  ) {
    const updated = await models.Packages.updatePackage(_id, doc);

    return updated;
  },

  async packagesRemove(
    _root,
    { packageIds }: { packageIds: string[] },
    { models }: IContext
  ) {
    const response = await models.Packages.removePackage(packageIds);

    return response;
  }
};

// requireLogin(blockMutations, 'packagesAdd');

export default blockMutations;
