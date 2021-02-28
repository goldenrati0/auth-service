import PermissionModel from '../../models/permission.schema';
import { IPermission } from '../../models/interfaces/persmission.interface';
import PermissionDTO from '../dto/permission';

const toDomain = ({ name }: any): IPermission =>
  new PermissionModel({
    name,
  });

const toDTO = ({ name }: IPermission): PermissionDTO => ({
  name,
});

export default {
  toDomain,
  toDTO,
};
