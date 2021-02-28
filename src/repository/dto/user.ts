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

export type UserRolesType = {
  roles: string[];
};

export type UserPermissionCheckType = {
  permissions: string[];
};

export type UserPermissionCheckResponseType = {
  permissions: [
    {
      allowed: Boolean;
    }
  ];
};

export default interface UserDTO {
  id: string,
  username: string;
  roles: RoleDTO[];
};
