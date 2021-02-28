import PermissionDTO from './permission';

export default interface RoleDTO {
  name: string;
  permissions: PermissionDTO[];
}
