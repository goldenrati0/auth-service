import mongoose, { Schema } from 'mongoose';
import { IPermission } from './interfaces/persmission.interface';

const PermissionSchema: Schema = new Schema({
  name: {
    type: String,
    uppercase: true,
    required: true,
    unique: true,
    index: true,
  },
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);
