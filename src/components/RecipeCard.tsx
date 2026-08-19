import React from 'react';
import { Clock, Flame, Users, ChefHat, Bookmark, BookmarkCheck, Play, Sparkles, HeartPulse, ArrowLeft, ArrowRight } from 'lucide-react';
import { Recipe } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  onStartCooking,
  isSaved,
  onToggleSave,
}) => {
  const { language, t, isRTL } = useLanguage();

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'moroccan':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'diet':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'express':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'international':
        return 'bg-stone-100 text-stone-800 border-stone-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getCategoryLabel = () => {
    switch (recipe.category) {
      case 'moroccan':
        return t.moroccan;
      case 'diet':
        return t.diet;
      case 'express':
        return t.express;
      case 'international':
        return t.international;
      default:
        return recipe.categoryLabel || t.moroccan;
    }
  };

  // Select appropriate title & summary
  const displayTitle =
    language === 'fr'
      ? recipe.titleFr || recipe.titleAr
      : language === 'en'
      ? recipe.titleEn || recipe.titleAr
      : recipe.titleAr;

  const displaySubtitle =
    language === 'ar'
      ? recipe.titleFr
      : language === 'fr'
      ? recipe.titleAr
      : recipe.titleFr || recipe.titleAr;

  const displaySummary =
    language === 'fr'
      ? recipe.summaryFr || recipe.summaryDarija
      : language === 'en'
      ? recipe.summaryEn || recipe.summaryDarija
      : recipe.summaryDarija;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-amber-400">
      
      {/* Card Header & Badges */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold border ${getCategoryStyles(
                recipe.category
              )}`}
            >
              {getCategoryLabel()}
            </span>

            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-medium border border-stone-200">
              <Clock className="w-3 h-3 text-amber-600" />
              {recipe.totalTimeText || `${recipe.prepTimeMinutes + recipe.cookTimeMinutes} ${t.minutes}`}
            </span>

            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
              <Flame className="w-3 h-3 text-rose-500" />
              {recipe.nutrition?.caloriesApprox || 350} {t.calories}
            </span>
          </div>

          {/* Bookmark / Favorite button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(recipe);
            }}
            className={`p-2 rounded-xl border transition active:scale-90 ${
              isSaved
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-stone-50 text-stone-400 hover:text-amber-600 border-stone-200 hover:border-amber-300'
            }`}
            title={isSaved ? t.saved : t.save}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Recipe Title */}
        <h3
          onClick={() => onSelect(recipe)}
          className="text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-700 transition cursor-pointer line-clamp-2 leading-snug"
        >
          {displayTitle}
        </h3>
        
        {displaySubtitle && (
          <p className="text-xs text-stone-400 mt-0.5 opacity-80">
            {displaySubtitle}
          </p>
        )}

        {/* Appetite summary */}
        <p className="text-xs sm:text-sm text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
          {displaySummary}
        </p>

        {/* Ingredients Quick Snapshot */}
        <div className="mt-3.5 pt-3 border-t border-stone-100">
          <p className="text-[11px] font-bold text-stone-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {t.exactIngredientsTitle} ({recipe.ingredients?.length || 0}):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recipe.ingredients?.slice(0, 4).map((ing, i) => (
              <span
                key={i}
                className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-lg border border-stone-200 font-medium"
              >
                {ing.item.split('(')[0].trim()}
              </span>
            ))}
            {recipe.ingredients && recipe.ingredients.length > 4 && (
              <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded-lg font-bold">
                +{recipe.ingredients.length - 4} ...
              </span>
            )}
          </div>
        </div>

        {/* Health Benefit Badge */}
        {recipe.nutrition?.healthBenefit && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2 leading-tight">
              <strong>{t.tip}:</strong> {recipe.nutrition.healthBenefit}
            </p>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-4 sm:p-5 pt-3 bg-stone-50 border-t border-stone-100 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect(recipe)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shadow-xs active:scale-98"
        >
          <span>{t.viewDetails}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onStartCooking(recipe)}
          className="py-2.5 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-xs active:scale-98"
          title={t.startCooking}
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span className="hidden sm:inline">{t.startCooking}</span>
        </button>
      </div>

    </div>
  );
};
