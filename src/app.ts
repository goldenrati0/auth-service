import express, { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateParams } from './controllers/middlewares/payloadValidator';
import { createPermission, listPermissions } from './controllers/permission';
import { createRole, listRoles } from './controllers/role';
import {
  addRolesToUserSchema,
  checkUserPersmissionsSchema,
  createPermissionSchema,
  createRoleSchema,
  userLoginSchema,
  userSignupSchema,
} from './controllers/schemas/request.schema';
import {
  addRoles,
  checkPermissions,
  listUserRoles,
  userLoginController,
  userSignupController,
} from './controllers/user';

const app = express();
app.use(express.json());

app.post('/api/signup', validateParams(userSignupSchema), asyncHandler(userSignupController));
app.post('/api/login', validateParams(userLoginSchema), asyncHandler(userLoginController));

app.get('/api/permissions', asyncHandler(listPermissions));
app.post(
  '/api/permissions',
  validateParams(createPermissionSchema),
  asyncHandler(createPermission)
);

app.get('/api/roles', asyncHandler(listRoles));
app.post('/api/roles', validateParams(createRoleSchema), asyncHandler(createRole));

app.get('/api/users/:userId/roles', asyncHandler(listUserRoles));
app.post('/api/users/:userId/roles', validateParams(addRolesToUserSchema), asyncHandler(addRoles));
app.post(
  '/api/users/:userId/permissions',
  validateParams(checkUserPersmissionsSchema),
  asyncHandler(checkPermissions)
);

// express error handlers
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status >= 500) next(err);

  console.error(err.stack);
  res.status(err.status).json({
    error: err.message,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status ?? 500).json({
    error: 'Internal server error.',
  });
});

export default app;
