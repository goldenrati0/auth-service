import { Request, Response } from 'express';
import { create, getAll } from '../repository/persmission';

export const listPermissions = async (req: Request, res: Response) => {
  const permissions = await getAll();

  return res.json(permissions);
};

export const createPermission = async (req: Request, res: Response) => {
  const { name } = req.body;
  const permission = await create({ name });

  return res.json(permission);
};

module.exports = {
  listPermissions,
  createPermission,
};
