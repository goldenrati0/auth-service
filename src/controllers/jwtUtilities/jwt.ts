import jwt, { SignOptions } from 'jsonwebtoken';
import Config from '../../config/config';
import UserDTO from '../../repository/dto/user';
import { AccessTokenType, JWTPayload } from './types/token.type';

const JWTSecret: string = Config.jwt.secret;

const sign = (payload: JWTPayload): string => {
  const { algorithm, expiresIn } = Config.jwt;
  const options: SignOptions = {
    algorithm,
    expiresIn,
  };

  return jwt.sign(payload, JWTSecret, options);
};

export const signAccessTokenForUser = (user: UserDTO): AccessTokenType => {
  const { id: userId, roles } = user;
  const roleIds = roles.map(role => role.id);

  const signedJWT = sign({ userId, roles: roleIds });
  return {
    token: signedJWT,
    type: 'Bearer',
  };
};

module.exports = {
  signAccessTokenForUser,
};
