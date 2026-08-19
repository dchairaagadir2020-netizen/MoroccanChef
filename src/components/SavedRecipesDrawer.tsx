import React from 'react';
import { X, BookmarkCheck, Trash2, Clock, Flame, ArrowLeft, ArrowRight, Play, ChefHat } from 'lucide-react';
import { Recipe } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SavedRecipesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onRemoveSaved: (recipeId: string) => void;
}

export const SavedRecipesDrawer: React.FC<SavedRecipesDrawerProps> = ({
  isOpen,
  onClose,
  savedRecipes,
  onSelectRecipe,
  onStartCooking,
  onRemoveSaved,
}) => {
  const { language, t, isRTL } = useLanguage();
  if (!isOpen) return null;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start bg-stone-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-stone-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-amber-800 via-amber-900 to-stone-900 text-white flex items-center justify-between border-b border-amber-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{t.savedDrawerTitle}</h3>
              <p className="text-xs text-amber-200/80">({savedRecipes.length}) {t.savedDrawerSubtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recipe List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/60">
          {savedRecipes.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-stone-800">{t.savedEmptyTitle}</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                {t.savedEmptySubtitle}
              </p>
            </div>
          ) : (
            savedRecipes.map((recipe) => {
              const displayTitle =
                language === 'fr'
                  ? recipe.titleFr || recipe.titleAr
                  : language === 'en'
                  ? recipe.titleEn || recipe.titleAr
                  : recipe.titleAr;

              return (
                <div
                  key={recipe.id}
                  className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition space-y-2.5 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                      {recipe.categoryLabel || t.moroccan}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(recipe.id)}
                      className="text-stone-400 hover:text-rose-600 transition p-1"
                      title={t.remove}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4
                    onClick={() => {
                      onClose();
                      onSelectRecipe(recipe);
                    }}
                    className="text-sm font-bold text-stone-900 group-hover:text-amber-800 transition cursor-pointer leading-snug"
                  >
                    {displayTitle}
                  </h4>

                  <div className="flex items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {recipe.totalTimeText}
                    </span>
                    <span className="flex items-center gap-1 text-rose-700 font-semibold">
                      <Flame className="w-3 h-3 text-rose-500" />
                      {recipe.nutrition.caloriesApprox} {t.calories}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectRecipe(recipe);
                      }}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <span>{t.viewDetails}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onStartCooking(recipe);
                      }}
                      className="py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                      title={t.startCooking}
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
