import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ No GEMINI_API_KEY found in .env");
        return;
    }
    console.log("Found API Key:", key.substring(0, 5) + "...");

    try {
        // Raw REST call to see what the server thinks we have access to
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        console.log(`\nFetching models from: ${url.replace(key, 'HIDDEN_KEY')}...`);

        // Using builtin fetch (Node 18+)
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("\n✅ AVAILABLE MODELS:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                    console.log(` - ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.error("❌ Could not list models. Response:", JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
