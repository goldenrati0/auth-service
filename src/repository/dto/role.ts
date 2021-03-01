import PermissionDTO from './permission';

export type RoleCreate = {
  name: string;
  permissions: string[];
};
export default interface RoleDTO {
  id: string;
  name: string;
  permissions: PermissionDTO[];
}
