export type JWTPayload = {
  userId: string;
  roles: string[];
};

export type AccessTokenType = {
  token: string;
  type: 'Bearer';
};
