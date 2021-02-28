import jwt, { SignOptions } from 'jsonwebtoken';
import UserDTO from '../../repository/dto/user';
import { AccessTokenType, JWTPayload } from './types/token.type';

const JWTSecret: string = 'DAqWG8AXs5ud70mLfYID1DeLkSGWw9Kq9MHk5f813R4Q586bwJLCYPPOYtEfXvwyyx92f';

const sign = (payload: JWTPayload): string => {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };

  return jwt.sign(payload, JWTSecret, options);
};

export const signAccessTokenForUser = (user: UserDTO): AccessTokenType => {
  const { id: userId, roles } = user;
  const roleNames = roles.map(role => role.name);

  const signedJWT = sign({ userId, roles: roleNames });
  return {
    token: signedJWT,
    type: 'Bearer',
  };
};

module.exports = {
  signAccessTokenForUser,
};
