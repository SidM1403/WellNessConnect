import AIChat from '../models/AIChat.js';

// --- CONFIGURATION ---
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const SITE_NAME = 'WellConnect';

// Model: DeepSeek R1 (Free via OpenRouter) - Specific 0528 Version
const MODEL_NAME = 'deepseek/deepseek-r1-0528:free';

// --- SYSTEM PROMPTS ---
const SYSTEM_PROMPT = `You are a helpful, empathetic, and safe AI Wellness Assistant by DeepSeek.
Your goal is to provide general guidance on fitness, nutrition, sleep, and stress management.
IMPORTANT SAFETY RULES:
1. You are NOT a doctor. DO NOT provide medical diagnoses or prescriptions.
2. If a user asks about medical symptoms, provide general information but ALWAYS advise them to see a doctor.
3. If a user mentions suicide, self-harm, or severe emergency symptoms, STOP and tell them to seek immediate emergency help.
4. Keep your responses concise, friendly, and easy to understand (under 150 words).
5. Always maintain a supportive and non-judgmental tone.`;

const RED_FLAG_KEYWORDS = ['suicide', 'kill myself', 'die', 'overdose', 'emergency'];
const RED_FLAG_MSG = "I am an AI, not a crisis service. If you are in danger, please call emergency services (911/112) or go to the nearest ER immediately.";

const SmartMockEngine = {
  getResponse(mode, text) {
    return "I am currently offline, but remember: consistency is key to wellness! (Please check your OpenRouter API Key)";
  }
};

export const createAIChat = async (req, res, next) => {
  try {
    const { mode = 'fitness', message, chatId } = req.body;

    if (!message) return res.status(400).json({ message: 'Message required' });

    // 1. Safety Check
    if (RED_FLAG_KEYWORDS.some(k => message.toLowerCase().includes(k))) {
      return res.status(200).json({
        message: { role: 'assistant', content: RED_FLAG_MSG, createdAt: new Date() }
      });
    }

    // 2. Chat Persistence
    let chat;
    if (chatId) {
      chat = await AIChat.findOne({ _id: chatId, user: req.user._id });
    }
    if (!chat) {
      chat = await AIChat.create({ user: req.user._id, mode, messages: [] });
    }

    // Add User Message
    chat.messages.push({ role: 'user', content: message, createdAt: new Date() });

    // 3. Generate Response via OpenRouter
    let assistantText = "";

    // DEBUG LOGS
    console.log("DEBUG: OPENROUTER_API_KEY present?", !!OPENROUTER_API_KEY);

    if (OPENROUTER_API_KEY) {
      try {
        console.log("DEBUG: Calling OpenRouter with model:", MODEL_NAME);

        const history = chat.messages.slice(-6).map(m => ({
          role: m.role,
          content: m.content
        }));

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": SITE_URL,
            "X-Title": SITE_NAME,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: MODEL_NAME,
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              ...history
            ]
          })
        });

        const data = await response.json();

        if (response.ok && data.choices && data.choices.length > 0) {
          assistantText = data.choices[0].message.content.trim();
          console.log("DEBUG: OpenRouter Response received");
        } else {
          console.error("❌ OpenRouter API Error:", data);
        }

      } catch (error) {
        console.error("❌ OpenRouter Network Error:", error);
      }
    }

    // 4. Fallback
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
