import Joi from 'joi';

const emailSchema = Joi.string().email({ minDomainSegments: 2 }).lowercase();
const usernameSchema = Joi.string().min(5).max(30).alphanum().lowercase();
const passwordSchema = Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{8,80}$')).required();
const permissionSchema = Joi.array().items(Joi.string().required()).required();

export const userSignupSchema = Joi.object({
  username: usernameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema,
});

export const userLoginSchema = Joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
}).xor('username', 'email'); // username and email cannot coexist in the payload

export const createRoleSchema = Joi.object({
  name: Joi.string().min(3).required(),
  permissions: Joi.array().items(Joi.string().required()).required(),
});

export const addRolesToUserSchema = Joi.object({
  roles: Joi.array().items(Joi.string()).required(),
});

export const createPermissionSchema = Joi.object({
  name: permissionSchema,
});

export const checkPersmissionsSchema = Joi.object({
  persmissions: permissionSchema,
});

module.exports = {
  userSignupSchema,
  userLoginSchema,
  createRoleSchema,
  addRolesToUserSchema,
  createPermissionSchema,
  checkPersmissionsSchema,
};
