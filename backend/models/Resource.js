import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['article', 'video', 'tip'], required: true },
    url: { type: String, required: true },
    category: { type: String, required: true }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;

