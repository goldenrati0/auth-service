import Joi from 'joi';

const objectIdSchema = Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'));
const emailSchema = Joi.string().email({ minDomainSegments: 2 }).lowercase();
const usernameSchema = Joi.string().min(5).max(30).alphanum().lowercase();
const passwordSchema = Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,80}$'));
const permissionSchema = Joi.string();

export const userSignupSchema = Joi.object({
  username: usernameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
});

export const userLoginSchema = Joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
}).xor('username', 'email'); // username and email cannot coexist in the payload

export const userIdInPathParamSchema = Joi.object({
  userId: objectIdSchema,
});

export const addRolesToUserSchema = Joi.object({
  roles: Joi.array().items(objectIdSchema.required()).required(),
});

export const createRoleSchema = Joi.object({
  name: Joi.string().min(3).required(),
  permissions: Joi.array().items(objectIdSchema.required()).required(),
});

export const createPermissionSchema = Joi.object({
  name: permissionSchema.required(),
});

export const checkUserPersmissionsSchema = Joi.object({
  permissions: Joi.array().items(permissionSchema.required()).required(),
});

module.exports = {
  userSignupSchema,
  userLoginSchema,
  createRoleSchema,
  addRolesToUserSchema,
  createPermissionSchema,
  checkUserPersmissionsSchema,
  userIdInPathParamSchema,
};
