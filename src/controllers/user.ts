import { Request, Response } from 'express';
import { login, create, getUserRoles, addRolesToUser, checkUserPermissions } from '../repository/user';
import { signAccessTokenForUser } from './jwtUtilities/jwt';
import { assertPayloadAgainstSchema } from './middlewares/payloadValidator';
import { userIdInPathParamSchema } from './schemas/request.schema';

export const userSignupController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await create({
    username,
    email,
    password,
  });
  const token = signAccessTokenForUser(user);

  return res.json(token);
};

export const userLoginController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const user = await login(email, username, password);
  const token = signAccessTokenForUser(user);

  return res.json(token);
};

export const listUserRoles = async (req: Request, res: Response) => {
  assertPayloadAgainstSchema(req.params, userIdInPathParamSchema);
  const { userId } = req.params;
  const roles = await getUserRoles(userId);
  return res.json(roles);
};

export const addRoles = async (req: Request, res: Response) => {
  assertPayloadAgainstSchema(req.params, userIdInPathParamSchema);
  const { userId } = req.params;
  const { roles } = req.body;

  const user = await addRolesToUser({ userId, roles });
  return res.json(user);
};

export const checkPermissions = async (req: Request, res: Response) => {
  assertPayloadAgainstSchema(req.params, userIdInPathParamSchema);
  const { userId } = req.params;
  const { permissions } = req.body;

  const allowedPermissions = await checkUserPermissions({ userId, permissions });
  return res.json(allowedPermissions);
};

module.exports = {
  userSignupController,
  userLoginController,
  listUserRoles,
  addRoles,
  checkPermissions
};
