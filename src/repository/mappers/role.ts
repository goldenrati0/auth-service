import RoleModel from '../../models/role.schema';
import { IRole } from '../../models/interfaces/role.interface';
import RoleDTO from '../dto/role';
import PermissionMapper from './permission';

const toDomain = ({ name, permissions }: any): IRole =>
  new RoleModel({
    name,
    permissions,
  });

const toDTO = ({ name, permissions }: IRole): RoleDTO => ({
  name,
  permissions: permissions.map(PermissionMapper.toDTO),
});

export default {
  toDomain,
  toDTO,
};
