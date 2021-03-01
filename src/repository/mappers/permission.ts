import PermissionModel from '../../models/permission.schema';
import { IPermission } from '../../models/interfaces/persmission.interface';
import PermissionDTO, { PermissionCreate } from '../dto/permission';

const toDomain = ({ name }: PermissionCreate): IPermission =>
  new PermissionModel({
    name,
  });

const toDTO = ({ _id: id, name }: IPermission): PermissionDTO => ({
  id,
  name,
});

export default {
  toDomain,
  toDTO,
};
