import mongoose, { Schema } from 'mongoose';
import { IRole } from './interfaces/role.interface';

const RoleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
      required: true,
    },
  ],
});

export default mongoose.model<IRole>('Role', RoleSchema);
