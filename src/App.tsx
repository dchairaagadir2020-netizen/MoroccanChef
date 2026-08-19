import React, { useState, useEffect } from 'react';
import {
  ChefHat,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Flame,
  Clock,
  Layers,
  HelpCircle,
  MessageSquareText,
  Bookmark,
  RefreshCw,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Header } from './components/Header';
import { IngredientInputSection } from './components/IngredientInputSection';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { CookingModeModal } from './components/CookingModeModal';
import { ChefChatDrawer } from './components/ChefChatDrawer';
import { SavedRecipesDrawer } from './components/SavedRecipesDrawer';
import { getLocalizedSampleRecipes } from './data/sampleRecipes';
import { AnalyzeRequest, Recipe } from './types';
import { getSavedRecipes, isRecipeSaved, removeRecipeFromStorage, saveRecipeToStorage } from './utils/storage';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const { language, t, isRTL } = useLanguage();
  const [recipes, setRecipes] = useState<Recipe[]>(() => getLocalizedSampleRecipes(language));
  const [chefGreeting, setChefGreeting] = useState<string>(t.defaultChefGreeting);
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update sample recipes and greeting if language changes and recipes haven't been replaced by custom AI response
  useEffect(() => {
    setChefGreeting(t.defaultChefGreeting);
    setRecipes((prev) => {
      // Check if current recipes are standard samples (ids match sample recipes)
      const sampleIds = ['rec-tajine-poulet', 'rec-zaalouk-express', 'rec-harira-light', 'rec-pasta-mediterranee'];
      const isSampleSet = prev.every((r) => sampleIds.includes(r.id));
      if (isSampleSet) {
        return getLocalizedSampleRecipes(language);
      }
      return prev;
    });
  }, [language, t]);

  // Active filters
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Modals and Drawers
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatRecipeContext, setChatRecipeContext] = useState<Recipe | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);

  // Saved Recipes state
  const [savedRecipesList, setSavedRecipesList] = useState<Recipe[]>([]);

  useEffect(() => {
    setSavedRecipesList(getSavedRecipes());
  }, []);

  const handleToggleSave = (recipe: Recipe) => {
    if (isRecipeSaved(recipe.id)) {
      removeRecipeFromStorage(recipe.id);
    } else {
      saveRecipeToStorage(recipe);
    }
    setSavedRecipesList(getSavedRecipes());
  };

  // Recipe Analysis via API
  const handleAnalyzeIngredients = async (request: AnalyzeRequest) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...request, language }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || (language === 'fr' ? 'Échec de la génération des recettes.' : language === 'en' ? 'Failed to generate recipes from the chef.' : 'تعذر الحصول على الوصفات من الشاف'));
      }

      if (json.data) {
        if (json.data.recipes && json.data.recipes.length > 0) {
          setRecipes(json.data.recipes);
        }
        if (json.data.chefGreeting) {
          setChefGreeting(json.data.chefGreeting);
        }
        if (json.data.detectedIngredients) {
          setDetectedIngredients(json.data.detectedIngredients);
        }
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(
        err?.message ||
          (language === 'fr'
            ? 'Une erreur est survenue lors de l’analyse. Vérifiez l’image ou saisissez vos ingrédients.'
            : language === 'en'
            ? 'An error occurred during analysis. Please check your image or enter ingredients in text.'
            : 'وقع مشكل فالتحليل. تأكد من جودة الصورة أو اكتب المكونات فالمربع.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered recipes
  const filteredRecipes =
    activeCategoryFilter === 'all'
      ? recipes
      : recipes.filter((r) => r.category === activeCategoryFilter);

  const categoryFilters = [
    { id: 'all', label: t.all },
    { id: 'moroccan', label: `🇲🇦 ${t.moroccan}` },
    { id: 'diet', label: `🥗 ${t.diet}` },
    { id: 'express', label: `⚡ ${t.express}` },
    { id: 'international', label: `🌍 ${t.international}` },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-500 selection:text-white pb-16">
      
      {/* Header */}
      <Header
        savedCount={savedRecipesList.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenChat={() => {
          setChatRecipeContext(null);
          setIsChatOpen(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex-1 w-full space-y-8">
        
        {/* Moroccan Chef Greeting Card */}
        <div className="bg-linear-to-r from-amber-800 via-amber-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-amber-700/50 relative overflow-hidden">
          {/* Moroccan atmospheric ambient glows */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-amber-500 to-amber-700 text-white border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md">
                <ChefHat className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-500 text-stone-900 px-2.5 py-0.5 rounded-full font-bold">
                    {t.chefWordTitle}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-3xl font-medium">
                  {chefGreeting}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setChatRecipeContext(null);
                setIsChatOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-700/80 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold border border-amber-500/50 transition flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center shadow-xs active:scale-95"
            >
              <MessageSquareText className="w-4 h-4 text-amber-300" />
              <span>{t.askChefDirectly}</span>
            </button>
          </div>

          {/* Detected Ingredients pill strip */}
          {detectedIngredients.length > 0 && (
            <div className="mt-4 pt-4 border-t border-amber-700/40 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {t.detectedIngredientsLabel}
              </span>
              {detectedIngredients.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-black/30 text-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-500/20 font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Input & Photo Analysis Section */}
        <IngredientInputSection
          onAnalyze={handleAnalyzeIngredients}
          isLoading={isLoading}
        />

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong>{language === 'fr' ? 'Attention : ' : language === 'en' ? 'Alert: ' : 'تنبيه: '}</strong>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Suggested Recipes Section */}
        <div className="space-y-5">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                  {t.suggestedRecipesTitle} ({filteredRecipes.length})
                </h2>
                <p className="text-xs text-stone-500">
                  {t.suggestedRecipesSubtitle}
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categoryFilters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategoryFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    activeCategoryFilter === f.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={(r) => setSelectedRecipe(r)}
                onStartCooking={(r) => setCookingRecipe(r)}
                isSaved={isRecipeSaved(recipe.id)}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
              <ChefHat className="w-12 h-12 text-stone-400 mx-auto" />
              <h3 className="text-base font-bold text-stone-800">
                {t.emptyCategoryTitle}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                {t.emptyCategorySubtitle}
              </p>
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition"
              >
                {t.showAllRecipesBtn}
              </button>
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold text-stone-800">
            {t.footerCopyright}
          </p>
          <p className="text-stone-400">
            {t.footerTagline}
          </p>
        </div>
      </footer>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onStartCooking={(r) => {
          setSelectedRecipe(null);
          setCookingRecipe(r);
        }}
        onAskChef={(r) => {
          setChatRecipeContext(r);
          setIsChatOpen(true);
        }}
        isSaved={selectedRecipe ? isRecipeSaved(selectedRecipe.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Cooking Mode Modal */}
      <CookingModeModal
        recipe={cookingRecipe}
        isOpen={!!cookingRecipe}
        onClose={() => setCookingRecipe(null)}
      />

      {/* Chef Chat Consultation Drawer */}
      <ChefChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipeContext={chatRecipeContext}
      />

      {/* Saved Recipes Drawer */}
      <SavedRecipesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedRecipes={savedRecipesList}
        onSelectRecipe={(r) => setSelectedRecipe(r)}
        onStartCooking={(r) => setCookingRecipe(r)}
        onRemoveSaved={(id) => {
          removeRecipeFromStorage(id);
          setSavedRecipesList(getSavedRecipes());
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
