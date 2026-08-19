import { Language } from './i18n/translations';

export interface IngredientItem {
  item: string;
  amount: string;
  notes?: string;
  substitute?: string;
}

export interface SpiceItem {
  name: string;
  amount: string;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  tip?: string;
  durationMinutes?: number;
}

export interface NutritionInfo {
  caloriesApprox: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  fiberGrams?: number;
  healthBenefit: string;
  dietitianAdvice: string;
}

export interface Recipe {
  id: string;
  titleAr: string;
  titleFr?: string;
  titleEn?: string;
  summaryDarija: string;
  summaryFr?: string;
  summaryEn?: string;
  category: 'moroccan' | 'international' | 'express' | 'diet';
  categoryLabel: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeText: string;
  difficulty: string;
  servings: number;
  detectedIngredients?: string[];
  ingredients: IngredientItem[];
  spices: SpiceItem[];
  steps: RecipeStep[];
  nutrition: NutritionInfo;
  chefTip: string;
  storageTip?: string;
  culturalNote?: string;
}

export interface AnalyzeRequest {
  images?: string[];
  ingredientsList?: string;
  selectedTags?: string[];
  cuisinePreference?: 'all' | 'moroccan' | 'international' | 'diet' | 'fast';
  servingsCount?: number;
  mealType?: string;
  dietaryGoal?: string;
  language?: Language;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  timestamp: string;
  recipeContext?: string;
}

