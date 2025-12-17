import { HfInference } from '@huggingface/inference';
import AIChat from '../models/AIChat.js';

// Debug log to check if environment variables are loaded
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY ? '*** API Key is set ***' : 'API Key is NOT set',
  MONGODB_URI: process.env.MONGODB_URI ? '*** MongoDB URI is set ***' : 'MongoDB URI is NOT set'
});

// Initialize Hugging Face Inference with API key if available
const hf = process.env.HUGGINGFACE_API_KEY ? new HfInference(process.env.HUGGINGFACE_API_KEY) : null;
// Using a free model from Hugging Face
const MODEL_NAME = 'gpt2';  // You can change this to other free models like 'facebook/opt-350m'

const RED_FLAG_KEYWORDS = [
  'chest pain',
  'fainting',
  'passed out',
  'suicidal',
  'suicide',
  'kill myself',
  'end my life',
  'overdose',
  'trouble breathing',
  'can’t breathe',
  "can't breathe"
];

const buildSystemPrompt = (mode) =>
  [
    'You are a calm, supportive wellness assistant in an online health & fitness community.',
    'Your job is to provide general guidance only, NOT diagnoses or prescriptions.',
    'Never name specific medications or dosages. Never claim to treat or cure conditions.',
    'Always encourage users to consult a licensed healthcare professional for medical concerns.',
    'Use gentle, human and non-alarming language. Avoid sounding like a chatbot.',
    'Use conditional phrases like "may help", "could be beneficial", "you might consider".',
    mode === 'fitness'
      ? 'Focus on movement, recovery, sustainable habits, strength, flexibility and safe progressions.'
      : 'Focus on general symptom check advice, lifestyle suggestions, red-flag awareness and when to seek care.',
    'Always end with a short disclaimer that you are not a medical professional and cannot provide diagnosis or prescriptions.'
  ].join(' ');

const detectRedFlags = (text) =>
  RED_FLAG_KEYWORDS.some((kw) => text.toLowerCase().includes(kw.toLowerCase()));

const redFlagMessage =
  "I’m really glad you reached out. Some of what you’re describing can be serious, and it’s important to get help from a real person as soon as possible. I can’t diagnose or treat, but please contact a local emergency number, crisis line, or medical professional right away, and if you’re in immediate danger, go to the nearest emergency department. You don’t have to go through this alone.";

export const createAIChat = async (req, res, next) => {
  try {
    const { mode = 'fitness', message, chatId } = req.body;
    if (!['fitness', 'health'].includes(mode)) {
      return res.status(400).json({ message: 'Invalid mode' });
    }
    if (!message) return res.status(400).json({ message: 'Message required' });

    let chat = chatId
      ? await AIChat.findOne({ _id: chatId, user: req.user._id })
      : await AIChat.create({ user: req.user._id, mode, messages: [] });

    if (!chat) {
      chat = await AIChat.create({ user: req.user._id, mode, messages: [] });
    }

    const userMessage = { role: 'user', content: message, createdAt: new Date() };
    chat.messages.push(userMessage);

    let assistantText;
    if (detectRedFlags(message)) {
      assistantText = redFlagMessage;
    } else if (!hf) {
      assistantText =
        'I can offer general wellness reflections, but the AI brain is not configured on this server yet. Please ask your administrator to add a Hugging Face API key. In the meantime, consider gentle movement, regular sleep, and talking with a trusted healthcare professional about any concerns.';
    } else {
      const systemPrompt = buildSystemPrompt(mode);
      const history =  chat.messages.slice(-8).map((m) => `${m.role.toUpperCase()}: ${m.content}`);
      const prompt = `${systemPrompt}\n\nConversation so far:\n${history.join(
        '\n'
      )}\n\nRespond as the assistant to the last user message.`;

      if (!hf) {
        assistantText = 'AI service is not properly configured. Please check your API key.';
      } else {
        try {
          const response = await hf.textGeneration({
            model: MODEL_NAME,
            inputs: prompt,
            parameters: {
              max_new_tokens: 150,
              return_full_text: false
            }
          });
          assistantText = response.generated_text.trim();
        } catch (error) {
          console.error('Error calling Hugging Face API:', error);
          assistantText = 'I\'m having trouble connecting to the AI service. Please try again later.';
        }
      }

      if (!assistantText) {
        assistantText = 'I\'m here to offer gentle wellness guidance, but I had trouble forming a full reply. Please try asking again.';
      }
    }

    const assistantMessage = {
      role: 'assistant',
      content: assistantText,
      createdAt: new Date()
    };
    chat.messages.push(assistantMessage);
    await chat.save();

    res.status(201).json({
      chatId: chat._id,
      message: assistantMessage,
      messages: chat.messages
    });
  } catch (err) {
    next(err);
  }
};

export const getAIHistory = async (req, res, next) => {
  try {
    const chats = await AIChat.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
    res.json({ chats });
  } catch (err) {
    next(err);
  }
};

export const deleteAIChat = async (req, res, next) => {
  try {
    const { id } = req.params;
    await AIChat.deleteOne({ _id: id, user: req.user._id });
    res.json({ message: 'Chat deleted' });
  } catch (err) {
    next(err);
  }
};


