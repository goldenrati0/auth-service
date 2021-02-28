import { Document } from 'mongoose';
import { IPermission } from './persmission.interface';

export interface IRole extends Document {
  name: string;
  permissions: Array<IPermission>;
}
