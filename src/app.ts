import express from 'express';
import asyncHandler from 'express-async-handler';
import { validateParams } from './controllers/middlewares/payloadValidator';
import { userLoginSchema, userSignupSchema } from './controllers/schemas/request.schema';
import { userLoginController, userSignupController } from './controllers/user';

const app = express();
app.use(express.json());

app.post('/api/signup', validateParams(userSignupSchema), asyncHandler(userSignupController));
app.post('/api/login', validateParams(userLoginSchema), asyncHandler(userLoginController));

app.use((err: any, req: any, res: any, next: any) => {
  if (err.status >= 500) next(err);

  console.error(err.stack);
  res.status(err.status).json({
    error: err.message,
  });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status ?? 500).json({
    error: 'Internal server error.',
  });
});

export default app;
