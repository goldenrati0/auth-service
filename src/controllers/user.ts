import { Request, Response } from 'express';
import { login, signup } from '../repository/user';
import { signAccessTokenForUser } from './jwtUtilities/jwt';

export const userSignupController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await signup({
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

module.exports = {
  userSignupController,
  userLoginController,
};
