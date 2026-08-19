import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing with generous limit for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment. Gemini API calls may fail.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Recipe Generation Schema
const recipeResponseSchema = {
  type: Type.OBJECT,
  properties: {
    chefGreeting: {
      type: Type.STRING,
      description: 'A warm, authentic Moroccan chef greeting in Darija (e.g. تبارك الله عليك أ لالة/سيدي، المكونات اللي عندك ممتازة...)',
    },
    detectedIngredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'List of ingredients detected in the photo(s) or provided list, translated to Moroccan Darija.',
    },
    recipes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          titleAr: { type: Type.STRING, description: 'Moroccan Arabic recipe title' },
          titleFr: { type: Type.STRING, description: 'French/International name of the recipe' },
          summaryDarija: { type: Type.STRING, description: 'Short appetizing summary in Moroccan Darija' },
          category: {
            type: Type.STRING,
            description: 'One of: moroccan, international, express, diet',
          },
          categoryLabel: { type: Type.STRING, description: 'Display badge name in Arabic' },
          prepTimeMinutes: { type: Type.NUMBER, description: 'Preparation time in minutes' },
          cookTimeMinutes: { type: Type.NUMBER, description: 'Cooking time in minutes' },
          totalTimeText: { type: Type.STRING, description: 'Total time in Arabic, e.g. 35 دقيقة' },
          difficulty: { type: Type.STRING, description: 'سهل بزاف or متوسط or خاص شوية الدقة' },
          servings: { type: Type.NUMBER, description: 'Number of servings (default 2 to 4)' },
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING, description: 'Name of the ingredient in Darija' },
                amount: { type: Type.STRING, description: 'Exact measurement (e.g. 2 معالق كبار, 250 غرام, كاس عنبة)' },
                notes: { type: Type.STRING, description: 'Optional prep note (e.g. مشلظة رقيقة, مسلوق شوية)' },
                substitute: { type: Type.STRING, description: 'Alternative if not available (بديل ممكن)' },
              },
              required: ['item', 'amount'],
            },
          },
          spices: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: 'Spice name in Darija (e.g. خرقوم بلدي, سكنجبير, كمون)' },
                amount: { type: Type.STRING, description: 'Exact spice amount (e.g. معلقة صغيرة ممسوحة)' },
              },
              required: ['name', 'amount'],
            },
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stepNumber: { type: Type.NUMBER },
                instruction: { type: Type.STRING, description: 'Sequential easy step explained clearly in Moroccan Darija' },
                tip: { type: Type.STRING, description: 'Chef tip for this step' },
                durationMinutes: { type: Type.NUMBER, description: 'Estimated minutes for this step' },
              },
              required: ['stepNumber', 'instruction'],
            },
          },
          nutrition: {
            type: Type.OBJECT,
            properties: {
              caloriesApprox: { type: Type.NUMBER, description: 'Approximate calories per serving' },
              proteinGrams: { type: Type.NUMBER, description: 'Protein in grams' },
              carbsGrams: { type: Type.NUMBER, description: 'Carbs in grams' },
              fatsGrams: { type: Type.NUMBER, description: 'Fats in grams' },
              fiberGrams: { type: Type.NUMBER, description: 'Fiber in grams' },
              healthBenefit: {
                type: Type.STRING,
                description: 'Key health benefit of the main ingredients explained scientifically yet simply in Darija',
              },
              dietitianAdvice: {
                type: Type.STRING,
                description: 'Expert nutritionist tip (نصيحة خبير التغذية) on how to enjoy it healthily',
              },
            },
            required: ['caloriesApprox', 'proteinGrams', 'carbsGrams', 'fatsGrams', 'healthBenefit', 'dietitianAdvice'],
          },
          chefTip: { type: Type.STRING, description: 'Chef secret touch in Darija (لمسة وسر الشاف)' },
          storageTip: { type: Type.STRING, description: 'How to store or reheat (كيفاش تحتفظ بها)' },
          culturalNote: { type: Type.STRING, description: 'Moroccan cultural context or origin of the dish' },
        },
        required: [
          'id',
          'titleAr',
          'summaryDarija',
          'category',
          'prepTimeMinutes',
          'cookTimeMinutes',
          'totalTimeText',
          'difficulty',
          'servings',
          'ingredients',
          'steps',
          'nutrition',
          'chefTip',
        ],
      },
    },
  },
  required: ['chefGreeting', 'detectedIngredients', 'recipes'],
};

// API: Generate Recipes from photo and/or text
app.post('/api/generate-recipes', async (req, res) => {
  try {
    const {
      images,
      ingredientsList,
      selectedTags,
      cuisinePreference = 'all',
      servingsCount = 4,
      mealType,
      dietaryGoal,
      language = 'ar',
    } = req.body;

    const ai = getGenAI();

    let systemInstruction = '';
    if (language === 'fr') {
      systemInstruction = `Vous êtes un Maître Chef Cuisinier Marocain et Nutritionniste Clinicien d'excellence.
Votre mission est d'analyser les photos d'ingrédients/frigo/placards ou la liste fournie et de suggérer 2 à 4 recettes marocaines ou internationales délicieuses, saines et faciles.

EXIGENCES CLÉS :
1. LANGUE : Toutes les explications, salutations, étapes de préparation et conseils nutritionnels DOIVENT être rédigés en FRANÇAIS élégant, clair et accessible, avec la chaleur et la convivialité de l'hospitalité marocaine ("Bsaha w Raha", "Dghmira", etc.).
2. DOSAGES EXACTS : Donnez des mesures précises (grammes, cuillères à soupe, verres, unités).
3. ÉTAPES CHRONOLOGIQUES : Détaillez la préparation pas à pas avec temps indicatif pour chaque étape.
4. NUTRITION & CALORIES : Fournissez une estimation des calories par portion, macronutriments (protéines, glucides, lipides, fibres), au moins UN bienfait santé concret et le conseil expert du nutritionniste.
5. PRATICITÉ & VARIÉTÉ : Proposez des plats marocains authentiques (Tajines, Zaalouk, Harira légère, etc.) et internationaux équilibrés selon les ingrédients disponibles.`;
    } else if (language === 'en') {
      systemInstruction = `You are a Master Moroccan Chef and Certified Clinical Nutritionist.
Your role is to analyze photos of ingredients/fridge/pantry and/or a user's list of ingredients and suggest 2 to 4 delicious, easy, and authentic Moroccan or international recipes.

CRITICAL REQUIREMENTS:
1. LANGUAGE: All explanations, greetings, instructions, tips, and nutrition advice MUST be in clear, friendly, and engaging ENGLISH, accompanied by warm Moroccan culinary hospitality.
2. EXACT MEASUREMENTS: Provide precise measurements for all ingredients and spices (grams, tablespoons, cups, units).
3. SEQUENTIAL STEPS: Break down the cooking process into easy, step-by-step sequential instructions with estimated step times.
4. NUTRITION & CALORIES: Provide approximate calories per serving and macronutrients (protein, carbs, fats, fiber), plus at least ONE clear health benefit and nutritionist advice.
5. CUISINE DIVERSITY: Provide a mix of authentic Moroccan dishes and easy international meals according to user preferences and detected ingredients.`;
    } else {
      systemInstruction = `You are a master Moroccan Chef ("شاف مغربي محترف") and certified Clinical Nutritionist ("خبير استشاري في التغذية والصحة").
Your role is to analyze photos of ingredients/fridge/pantry and/or a user's list of ingredients and suggest 2 to 4 delicious, easy, and authentic Moroccan or international recipes.

CRITICAL REQUIREMENTS:
1. LANGUAGE: All explanations, greetings, instructions, tips, and nutrition advice MUST be in clear, friendly, and elegant Moroccan Arabic (الدارجة المغربية المفهومة والراقية). Use warm Moroccan hospitality phrasing (تبارك الله عليك، بالصحة والراحة، دغميرة، تشحار، عافية مهيلة، إلخ).
2. EXACT MEASUREMENTS: Provide precise measurements for all ingredients and spices (e.g., بالكرام، كاس العنبة، معلقة كبيرة، معلقة صغيرة، حبات).
3. SEQUENTIAL STEPS: Break down the cooking process into easy, step-by-step sequential instructions with estimated step times.
4. NUTRITION & CALORIES: Provide approximate calories per serving and macronutrients (protein, carbs, fats, fiber), plus at least ONE clear health benefit and nutritionist advice (نصيحة أخصائي التغذية).
5. PRACTICALITY: Prioritize recipes that can be made primarily with the detected or listed ingredients, suggesting minimal common pantry additions (oil, salt, water) or substitutes if an item is missing.
6. CUISINE DIVERSITY: Provide a mix of authentic Moroccan dishes and easy international dishes according to the user's preference.`;
    }

    const contents: any[] = [];

    // Add Images if provided
    if (Array.isArray(images) && images.length > 0) {
      for (const imgData of images) {
        if (typeof imgData === 'string' && imgData.includes('base64,')) {
          const [mimeHeader, base64Data] = imgData.split('base64,');
          const mimeType = mimeHeader.replace('data:', '').replace(';', '');
          contents.push({
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: base64Data,
            },
          });
        }
      }
    }

    // Build user prompt
    let userPromptText = '';
    if (language === 'fr') {
      userPromptText = 'Bonjour Chef ! Voici mes ingrédients et préférences :\n';
      if (ingredientsList && ingredientsList.trim()) userPromptText += `- Ingrédients saisis : ${ingredientsList.trim()}\n`;
      if (Array.isArray(selectedTags) && selectedTags.length > 0) userPromptText += `- Ingrédients sélectionnés : ${selectedTags.join(', ')}\n`;
      if (cuisinePreference && cuisinePreference !== 'all') userPromptText += `- Préférence culinaire : ${cuisinePreference}\n`;
      if (servingsCount) userPromptText += `- Nombre de personnes : ${servingsCount}\n`;
      if (mealType) userPromptText += `- Type de repas : ${mealType}\n`;
      if (dietaryGoal) userPromptText += `- Objectif diététique : ${dietaryGoal}\n`;
      userPromptText += '\nVeuillez analyser ces éléments et proposer des recettes complètes, savoureuses et équilibrées rédigées en Français.';
    } else if (language === 'en') {
      userPromptText = 'Hello Chef! Here are my available ingredients and preferences:\n';
      if (ingredientsList && ingredientsList.trim()) userPromptText += `- Entered ingredients: ${ingredientsList.trim()}\n`;
      if (Array.isArray(selectedTags) && selectedTags.length > 0) userPromptText += `- Selected ingredients: ${selectedTags.join(', ')}\n`;
      if (cuisinePreference && cuisinePreference !== 'all') userPromptText += `- Cuisine preference: ${cuisinePreference}\n`;
      if (servingsCount) userPromptText += `- Servings: ${servingsCount}\n`;
      if (mealType) userPromptText += `- Meal type: ${mealType}\n`;
      if (dietaryGoal) userPromptText += `- Health goal: ${dietaryGoal}\n`;
      userPromptText += '\nPlease analyze these items and suggest complete, delicious, and healthy recipes written in English.';
    } else {
      userPromptText = 'مرحباً شاف! هاهي المكونات والمعلومات ديالي:\n';
      if (ingredientsList && ingredientsList.trim()) userPromptText += `- المكونات المكتوبة: ${ingredientsList.trim()}\n`;
      if (Array.isArray(selectedTags) && selectedTags.length > 0) userPromptText += `- المكونات المختارة: ${selectedTags.join(', ')}\n`;
      if (cuisinePreference && cuisinePreference !== 'all') {
        const prefMap: Record<string, string> = {
          moroccan: 'كنفضل أطباق مغربية أصيلة وتقليدية',
          international: 'كنفضل أطباق عالمية سهلة وسريعة',
          diet: 'كنفضل وصفات ريجيم قليلة السعرات وصحية بزاف',
          fast: 'كنفضل وصفات سريعة وسهلة للمبتدئين (أقل من 25 دقيقة)',
        };
        userPromptText += `- نوع الأطباق المطلوب: ${prefMap[cuisinePreference] || cuisinePreference}\n`;
      }
      if (servingsCount) userPromptText += `- عدد الأشخاص: ${servingsCount}\n`;
      if (mealType) userPromptText += `- نوع الوجبة: ${mealType}\n`;
      if (dietaryGoal) userPromptText += `- الهدف الصحي: ${dietaryGoal}\n`;
      userPromptText += `
من فضلك كشاف مغربي وخبير تغذية:
1. حلل الصور والمكونات بدقة.
2. اقترح 2 إلى 3 وصفات شهية بالدارجة المغربية السلسة مع المقادير الدقيقة، خطوات التحضير خطوة بخطوة، والفوائد الصحية مع السعرات الحرارية.
3. كل وصفة خاص يكون فيها اسم واضح بالدارجة، وقت التحضير والطهي، المقادير الدقيقة، الخطوات المتسلسلة، نصيحة الشاف، والقيمة الغذائية.`;
    }

    contents.push({ text: userPromptText });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents.length === 1 ? contents[0].text : { parts: contents },
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: recipeResponseSchema,
        temperature: 0.7,
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating recipes:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'حدث خطأ أثناء اقتراح الوصفات من طرف الشاف. يرجى المحاولة مرة أخرى.',
    });
  }
});

// API: Ask the Chef interactive consultation
app.post('/api/ask-chef', async (req, res) => {
  try {
    const { message, recipeContext, conversationHistory = [], language = 'ar' } = req.body;
    const ai = getGenAI();

    let systemInstruction = '';
    if (language === 'fr') {
      systemInstruction = `Vous êtes un Maître Chef Cuisinier Marocain et Nutritionniste Diplômé.
Vous vous exprimez en Français clair, chaleureux et professionnel.
Répondez directement et concisément aux questions culinaires et diététiques de l'utilisateur (substitutions, adaptation diabète/hypertension, astuces de cuisson, gestion des calories).
Ajoutez la touche de bienveillance marocaine (Bsaha w Raha, etc.).`;
    } else if (language === 'en') {
      systemInstruction = `You are a Master Moroccan Chef and Certified Nutritionist.
You communicate in warm, encouraging, and clear English.
Answer culinary and nutrition questions concisely and practically (substitutions, diabetes/hypertension adjustments, cooking techniques, calorie reduction).
Include warm Moroccan hospitality touches.`;
    } else {
      systemInstruction = `You are a master Moroccan Chef ("الشاف المغربي") and Certified Nutritionist ("خبير التغذية").
You speak in warm, courteous, and authentic Moroccan Arabic (الدارجة المغربية).
Answer the user's culinary and nutritional questions directly and concisely.
If they ask how to replace an ingredient, reduce calories, adjust spices, or cook for a specific health condition (diabetes, hypertension, weight loss, pregnancy), give expert, safe, practical culinary and nutritional advice in Darija.
Include encouragement and warm Moroccan expressions (بالصحة والراحة، الله يعطيك الصحة، مرحبا بك فكوزينتنا).`;
    }

    let prompt = '';
    if (recipeContext) {
      prompt += `[Recipe Context]: ${recipeContext}\n\n`;
    }
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      prompt += `[Conversation History]:\n${conversationHistory
        .map((m: any) => `${m.sender === 'user' ? 'User' : 'Chef'}: ${m.text}`)
        .join('\n')}\n\n`;
    }
    prompt += `User question: ${message}\n\nResponse:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      reply: response.text || (language === 'fr' ? 'Bienvenue ! Comment puis-je vous aider en cuisine ou nutrition ?' : language === 'en' ? 'Welcome! How can I assist you with your cooking and nutrition today?' : 'مرحبا بك! كيفاش نقدر نعاونك فالكوزينة والتغذية الصحية؟'),
    });
  } catch (error: any) {
    console.error('Error in ask-chef:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'تعذر الاتصال بالشاف حالياً. حاول مرة أخرى.',
    });
  }
});

// Vite middleware & production static handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Moroccan Chef Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
