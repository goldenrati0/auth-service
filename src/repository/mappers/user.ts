import UserModel from '../../models/user.schema';
import { IUser } from '../../models/interfaces/user.interface';
import UserDTO from '../dto/user';
import RoleMapper from './role';

const toDomain = ({ username, email, password, roles }: any): IUser =>
  new UserModel({
    username,
    email,
    password,
    roles,
  });

const toDTO = ({ _id, username, roles }: IUser): UserDTO => ({
  id: _id,
  username,
  roles: roles.map(RoleMapper.toDTO),
});

export default {
  toDomain,
  toDTO,
};
