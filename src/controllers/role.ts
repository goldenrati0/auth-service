import { Request, Response } from 'express';
import { getAll, create } from '../repository/role';

export const listRoles = async (req: Request, res: Response) => {
  const roles = await getAll();
  return res.json(roles);
};

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  const role = await create({ name, permissions });

  return res.json(role);
};

module.exports = {
  listRoles,
  createRole,
};
