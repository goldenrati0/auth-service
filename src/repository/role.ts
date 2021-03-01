import createError from 'http-errors';
import { IRole } from '../models/interfaces/role.interface';
import RoleModel from '../models/role.schema';
import RoleDTO, { RoleCreate } from './dto/role';
import RoleMapper from './mappers/role';
import PermissionRepository from './persmission';

const validateRoleObject = (role: IRole | null): IRole => {
  if (role === null) {
    throw new createError.NotFound('Role not found');
  }
  return role;
};

export const populateRole = async (role: IRole): Promise<IRole> =>
  await role
    .populate({
      path: 'permissions',
    })
    .execPopulate();

const getById = async (id: string): Promise<IRole | null> => await RoleModel.findById(id).exec();

const _getAll = async (): Promise<IRole[]> => await RoleModel.find({}).exec();

const validateAndGetById = async (id: string): Promise<IRole> =>
  validateRoleObject(await getById(id));

export const getAll = async (): Promise<RoleDTO[]> => {
  const roles = await _getAll();
  const populatedRoles = await Promise.all(roles.map(populateRole));
  return populatedRoles.map(RoleMapper.toDTO);
};

export const getAllMatchingId = async (
  ids: string[],
  shouldConvertToDTO: boolean = true // TODO: this is a hack, shoudl introduce a better approach
): Promise<RoleDTO[] | IRole[]> => {
  const roles = await RoleModel.find({ _id: { $in: ids } }).exec();
  const populatedRoles = await Promise.all(roles.map(populateRole));

  if (shouldConvertToDTO) {
    return populatedRoles.map(RoleMapper.toDTO);
  }

  return populatedRoles;
};

export const create = async ({ name, permissions }: RoleCreate): Promise<RoleDTO> => {
  const existingPermissions = await PermissionRepository.getAllMatchingId(permissions);
  if (existingPermissions.length !== permissions.length) {
    throw new createError.NotFound(`One or multiple permissions were not found`);
  }

  const newRole = RoleMapper.toDomain({ name, permissions });
  await newRole.save();

  return RoleMapper.toDTO(newRole);
};

export default {
  getAll,
  validateAndGetById,
  create,
  getAllMatchingId,
};
