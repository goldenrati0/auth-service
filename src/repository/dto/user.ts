import RoleDTO from './role';

export type UserSignupType = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginWithEmailType = {
  email: string;
  password: string;
};

export type UserLoginWithUsernameType = {
  username: string;
  password: string;
};

export type AddRolesToUserType = {
  userId: string;
  roles: string[];
};

export type UserPermissionCheckType = {
  userId: string;
  permissions: string[];
};

export type UserPermissionCheckResponseType = {
  permissions: {
    id: string;
    allowed: Boolean;
  }[];
};

export default interface UserDTO {
  id: string;
  username: string;
  roles: RoleDTO[];
}
