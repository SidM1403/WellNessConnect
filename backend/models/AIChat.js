import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const aiChatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mode: { type: String, enum: ['fitness', 'health'], required: true },
    messages: [messageSchema]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

const AIChat = mongoose.model('AIChat', aiChatSchema);
export default AIChat;


