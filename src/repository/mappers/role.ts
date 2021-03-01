import RoleModel from '../../models/role.schema';
import { IRole } from '../../models/interfaces/role.interface';
import RoleDTO, { RoleCreate } from '../dto/role';
import PermissionMapper from './permission';

const toDomain = ({ name, permissions }: RoleCreate): IRole =>
  new RoleModel({
    name,
    permissions,
  });

const toDTO = ({ _id: id, name, permissions }: IRole): RoleDTO => ({
  id,
  name,
  permissions: permissions.map(PermissionMapper.toDTO),
});

export default {
  toDomain,
  toDTO,
};
