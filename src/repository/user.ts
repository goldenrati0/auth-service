import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { IRole } from '../models/interfaces/role.interface';
import { IUser } from '../models/interfaces/user.interface';
import UserModel from '../models/user.schema';
import RoleRepository from '../repository/role';
import RoleDTO from './dto/role';
import UserDTO, {
  AddRolesToUserType,
  UserLoginWithEmailType,
  UserLoginWithUsernameType,
  UserSignupType,
  UserPermissionCheckType,
  UserPermissionCheckResponseType,
} from './dto/user';
import UserMapper from './mappers/user';
import _ from 'lodash';

export const validateUserObject = (user: IUser | null): IUser => {
  if (user === null) {
    throw new createError.NotFound('User not found');
  }
  return user;
};

export const populateUser = async (user: IUser): Promise<IUser> =>
  await user
    .populate({
      path: 'roles',
      populate: {
        path: 'permissions',
      },
    })
    .execPopulate();

export const getById = async (id: string): Promise<IUser> =>
  validateUserObject(await UserModel.findById(id).exec());

export const getByEmail = async (email: string): Promise<IUser | null> =>
  await UserModel.findOne({ email }).exec();

export const validateAndGetByEmail = async (email: string): Promise<IUser> =>
  validateUserObject(await getByEmail(email));

export const getByUsername = async (username: string): Promise<IUser | null> =>
  await UserModel.findOne({ username }).exec();

export const validateAndGetByUsername = async (username: string): Promise<IUser> =>
  validateUserObject(await getByUsername(username));

export const addRolesToUser = async ({ userId, roles }: AddRolesToUserType): Promise<UserDTO> => {
  const existingRoles = (await RoleRepository.getAllMatchingId(roles, false)) as IRole[];
  if (existingRoles.length !== roles.length) {
    throw new createError.NotFound(`One or multiple roles were not found`);
  }
  const roleIds = existingRoles.map(role => role._id);

  await UserModel.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { roles: { $each: roleIds } } }
  ).exec();

  const user = await getById(userId);
  await user.save();
  const populatedUser = await populateUser(user);

  return UserMapper.toDTO(populatedUser);
};

export const checkUserPermissions = async ({
  userId,
  permissions,
}: UserPermissionCheckType): Promise<UserPermissionCheckResponseType> => {
  const user = await getById(userId);
  const populatedUser = await populateUser(user);

  const userPermissionIdsSet = new Set<string>();
  populatedUser.roles.map(role => {
    role.permissions.map(permission => {
      userPermissionIdsSet.add(permission.id);
    });
  });

  const allowedPermissions: { id: string; allowed: Boolean }[] = permissions.map(permission => {
    const allowed = userPermissionIdsSet.has(permission);
    return {
      id: permission,
      allowed,
    };
  });

  return {
    permissions: allowedPermissions,
  };
};

export const getUserRoles = async (userId: string): Promise<RoleDTO[]> => {
  const user = await getById(userId);
  const populatedUser = await populateUser(user);

  return UserMapper.toDTO(populatedUser).roles;
};

export const create = async ({ username, email, password }: UserSignupType): Promise<UserDTO> => {
  const existingUserWithSameEmail = await getByEmail(email);
  const existingUserWithSameUsername = await getByUsername(username);

  if (existingUserWithSameEmail || existingUserWithSameUsername) {
    throw new createError.Forbidden(
      `User already exists with ${existingUserWithSameEmail ? email : username}`
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = UserMapper.toDomain({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  const populatedUser = newUser.populate({
    path: 'roles',
    populate: {
      path: 'permissions',
    },
  });

  return UserMapper.toDTO(populatedUser);
};

const checkPassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<Boolean> => await bcrypt.compare(plainTextPassword, hashedPassword);

export const loginWithEmail = async ({
  email,
  password,
}: UserLoginWithEmailType): Promise<UserDTO> => {
  const user = await validateAndGetByEmail(email);

  const doesPasswordMatch = await checkPassword(password, user.password);
  if (!doesPasswordMatch) {
    throw new createError.Unauthorized('Incorrect username/password combination');
  }

  const populatedUser = await populateUser(user);

  return UserMapper.toDTO(populatedUser);
};

export const loginWithUsername = async ({
  username,
  password,
}: UserLoginWithUsernameType): Promise<UserDTO> => {
  const user = await validateAndGetByUsername(username);

  const doesPasswordMatch = await checkPassword(password, user.password);
  if (!doesPasswordMatch) {
    throw new createError.Unauthorized('Incorrect username/password combination');
  }

  const populatedUser = await populateUser(user);

  return UserMapper.toDTO(populatedUser);
};

export const login = async (
  email: string,
  username: string,
  password: string
): Promise<UserDTO> => {
  return email
    ? loginWithEmail({
        email,
        password,
      })
    : loginWithUsername({
        username,
        password,
      });
};

module.exports = {
  getById,
  getByEmail,
  getByUsername,
  create,
  login,
  getUserRoles,
  addRolesToUser,
  checkUserPermissions,
};
