import { GoogleGenerativeAI } from '@google/generative-ai';
import AIChat from '../models/AIChat.js';

// --- CONFIGURATION ---
const API_KEY = process.env.GEMINI_API_KEY;
// We try to use the API if a key is present, but we NEVER fail if it's missing/broken.
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
// Use the experimental model which often has better free tier limits, but fallback is ready.
const MODEL_NAME = 'gemini-2.0-flash-exp';

// --- SMART MOCK ENGINE (The "Always-On" Brain) ---
// This ensures the user ALWAYS gets a high-quality answer, even offline or without keys.
const SmartMockEngine = {
  // Common greetings and small talk
  general: [
    { rules: ['hello', 'hi', 'hey', 'start'], response: "Hello! I'm here to support your wellness journey. You can ask me about fitness routines, healthy habits, or general symptom guidance." },
    { rules: ['thank', 'thanks'], response: "You're very welcome! Is there anything else I can help you with today?" },
    { rules: ['who are you', 'what are you'], response: "I'm your AI Wellness Companion. I can help with fitness tips and general health information, though I'm not a doctor." }
  ],

  // Fitness Mode Logic
  fitness: [
    { rules: ['weight', 'fat', 'loss', 'lose'], response: "Sustainable weight management is about small, consistent changes. Focus on a slight calorie deficit, regular protein intake, and moving your body in ways you enjoy. Have you tried tracking your meals or steps?" },
    { rules: ['muscle', 'build', 'strength', 'gain'], response: "To build muscle, aim for resistance training 3-4 times a week and ensure you're eating enough protein (roughly 1.6g per kg of bodyweight). Progressive overload—gradually increasing weight or reps—is key." },
    { rules: ['cardio', 'run', 'stamina'], response: "Cardio is fantastic for heart health. If you're building stamina, try Zone 2 training (a pace where you can still hold a conversation) for longer durations to build your aerobic base." },
    { rules: ['pain', 'hurt', 'injury'], response: "If you're feeling pain during exercise, stop immediately. Rest suggests 'RICE' (Rest, Ice, Compression, Elevation) for minor issues, but persistent pain should strictly be checked by a professional." },
    { rules: ['yoga', 'stretch', 'flexibility'], response: "Flexibility takes time. Try incorporating 10 minutes of dynamic stretching before workouts and static stretching after. Yoga poses like Downward Dog and Pigeon Pose are great starting points." },
    { rules: ['plan', 'routine', 'schedule'], response: "A balanced routine might look like: 3 days of strength training, 2 days of cardio/active recovery, and 2 rest days. Listen to your body and adjust as needed." }
  ],

  // Health Mode Logic
  health: [
    { rules: ['headache', 'migraine'], response: "Headaches can be triggered by stress, dehydration, or eye strain. Hydration and rest often help. If it's the 'worst headache of your life' or sudden, seek medical help immediately." },
    { rules: ['cold', 'flu', 'cough', 'sneeze'], response: "For common cold symptoms, rest and hydration are your best friends. Warm tea with honey can soothe a throat. Monitor your temperature, and see a doctor if symptoms persist over a week." },
    { rules: ['sleep', 'insomnia', 'tired'], response: "Improving sleep often starts with immediate environment: strict darkness, cool temperature, and no screens 1 hour before bed. Consistency in wake-up times helps reset your circadian rhythm." },
    { rules: ['anxiety', 'stress', 'panic'], response: "When feeling anxious, try the '4-7-8' breathing technique: inhale for 4, hold for 7, exhale for 8. Grounding yourself in the present moment can reduce immediate cortisol spikes." },
    { rules: ['stomach', 'pain', 'digest'], response: "Digestive issues can track back to diet, hydration, or stress. gentle foods like rice, bananas, and toast (BRAT diet) can be easy on the stomach. Persistent pain requires a check-up." },
    { rules: ['fever', 'hot'], response: "A mild fever is your body fighting infection. Rest and fluids are essential. If your temperature exceeds 39°C (102°F) or lasts more than 3 days, medical attention is recommended." }
  ],

  // Universal fallback for each mode
  defaults: {
    fitness: "That's a great fitness question. While I tune into my database, remember that consistency beats intensity. Stay hydrated and warm up properly. Could you specify more about your goal?",
    health: "I hear you. For many health concerns, the pillars of Sleep, Hydration, Nutrition, and Stress Management are a good place to start. If symptoms are severe, please consult a doctor."
  },

  getResponse(mode, text) {
    const t = text.toLowerCase();
    // 1. Check General
    for (const item of this.general) {
      if (item.rules.some(r => t.includes(r))) return item.response;
    }
    // 2. Check Specific Mode
    const domainRules = this[mode] || [];
    for (const item of domainRules) {
      if (item.rules.some(r => t.includes(r))) return item.response;
    }
    // 3. Fail safe
    return this.defaults[mode] || this.defaults.health;
  }
};

// --- RED FLAGS (Safety First) ---
const RED_FLAG_KEYWORDS = ['suicide', 'kill myself', 'die', 'overdose', 'chest pain', 'heart attack', 'stroke', 'emergency'];
const RED_FLAG_MSG = "I am an AI, not a doctor or crisis service. It sounds like you might be in a serious situation. Please execute your local emergency number (like 911 or 112) or go to the nearest emergency room immediately.";

// --- MAIN CONTROLLER ---
export const createAIChat = async (req, res, next) => {
  try {
    const { mode = 'fitness', message, chatId } = req.body;

    // 1. Basic Validation
    if (!['fitness', 'health'].includes(mode)) return res.status(400).json({ message: 'Invalid mode' });
    if (!message) return res.status(400).json({ message: 'Message required' });

    // 2. Chat Persistence (Find or Create)
    let chat;
    if (chatId) {
      chat = await AIChat.findOne({ _id: chatId, user: req.user._id });
    }
    if (!chat) {
      chat = await AIChat.create({ user: req.user._id, mode, messages: [] });
    }

    // 3. User Message
    const userMessage = { role: 'user', content: message, createdAt: new Date() };
    chat.messages.push(userMessage);

    // 4. GENERATE RESPONSE (The "Hybrid" Logic)
    let assistantText = "";

    // PRIORITY 1: Safety Check
    if (RED_FLAG_KEYWORDS.some(k => message.toLowerCase().includes(k))) {
      assistantText = RED_FLAG_MSG;
    }
    // PRIORITY 2: Attempt API (Only if configured)
    else if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        // Context Prompt
        const systemInstruction = mode === 'fitness'
          ? "You are a fitness coach. Keep answers short, encouraging, and safe. No medical prescriptions."
          : "You are a health wellness guide. Give general lifestyle advice (sleep, hygiene, diet). Always advise seeing a doctor for symptoms.";

        const history = chat.messages.slice(-6).map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
        const finalPrompt = `${systemInstruction}\n\nChat History:\n${history}\n\nRespond to the last user message concisely:`;

        const result = await model.generateContent(finalPrompt);
        assistantText = result.response.text().trim();

        // Clean up common AI artifacts
        assistantText = assistantText.replace(/^Assistant: /i, '').replace(/^AI: /i, '');

      } catch (error) {
        console.warn("⚠️ API Failed (Silent Fallback):", error.message);
        // DO NOT show error to user. Fall through to Mock Engine.
        assistantText = "";
      }
    }

    // PRIORITY 3: Smart Local Engine (Fallback if API missing OR failed)
    if (!assistantText) {
      assistantText = SmartMockEngine.getResponse(mode, message);
    }

    // 5. Save & Respond
    const assistantMessage = { role: 'assistant', content: assistantText, createdAt: new Date() };
    chat.messages.push(assistantMessage);
    await chat.save();

    res.status(201).json({
      chatId: chat._id,
      message: assistantMessage,
      messages: chat.messages
    });

  } catch (err) {
    // Top-level error (database etc) - this is the only time we act generic
    console.error("Critical AI Error:", err);
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


