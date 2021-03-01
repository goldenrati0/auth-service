import createError from 'http-errors';
import { IPermission } from '../models/interfaces/persmission.interface';
import PermissionModel from '../models/permission.schema';
import PermissionDTO, { PermissionCreate } from './dto/permission';
import PermissionMapper from './mappers/permission';

const validatePermissionObject = (permission: IPermission | null): IPermission => {
  if (permission === null) {
    throw new createError.NotFound('Permission not found');
  }
  return permission;
};

const getById = async (id: string): Promise<IPermission | null> =>
  await PermissionModel.findById(id).exec();

const getByName = async (name: string): Promise<IPermission | null> =>
  await PermissionModel.findOne({ name }).exec();

const _getAll = async (): Promise<IPermission[]> => await PermissionModel.find({}).exec();

export const getAllMatchingId = async (ids: string[]): Promise<PermissionDTO[]> => {
  const permissions = await PermissionModel.find({ _id: { $in: ids } }).exec();
  return permissions.map(PermissionMapper.toDTO);
};

const validateAndGetById = async (id: string): Promise<IPermission> =>
  validatePermissionObject(await getById(id));

export const getAll = async (): Promise<PermissionDTO[]> =>
  (await _getAll()).map(PermissionMapper.toDTO);

export const create = async ({ name }: PermissionCreate): Promise<PermissionDTO> => {
  const existingPermissionWithSameName = await getByName(name);
  if (existingPermissionWithSameName) {
    throw new createError.Forbidden(`Permission already exists with name ${name}`);
  }

  const newPermission = PermissionMapper.toDomain({ name });
  await newPermission.save();

  return PermissionMapper.toDTO(newPermission);
};

export default {
  getAll,
  getAllMatchingId,
  validateAndGetById,
  create,
};
