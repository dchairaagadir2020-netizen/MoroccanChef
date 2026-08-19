import React, { useState } from 'react';
import {
  X,
  Clock,
  Flame,
  Users,
  ChefHat,
  Bookmark,
  BookmarkCheck,
  Play,
  Volume2,
  VolumeX,
  Printer,
  Copy,
  Check,
  Sparkles,
  HeartPulse,
  Scale,
  MessageCircleQuestion,
  ShieldCheck,
  Utensils,
  Lightbulb
} from 'lucide-react';
import { Recipe } from '../types';
import { speakRecipeText, stopSpeaking } from '../utils/audio';
import { useLanguage } from '../i18n/LanguageContext';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  onAskChef: (recipe: Recipe) => void;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onStartCooking,
  onAskChef,
  isSaved,
  onToggleSave,
}) => {
  const { language, t } = useLanguage();
  const [servingMultiplier, setServingMultiplier] = useState<number>(recipe?.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isOpen || !recipe) return null;

  const baseServings = recipe.servings || 4;
  const ratio = servingMultiplier / baseServings;

  const toggleCheck = (id: string) => {
    setCheckedIngredients((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scaleAmount = (amountStr: string) => {
    if (ratio === 1) return amountStr;
    return amountStr.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match);
      const scaled = Math.round(num * ratio * 10) / 10;
      return scaled.toString();
    });
  };

  // Text-to-Speech audio reader in selected language
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      let textToRead = '';
      if (language === 'fr') {
        textToRead = `
          Recette : ${recipe.titleFr || recipe.titleAr}.
          Temps total : ${recipe.totalTimeText}.
          Ingrédients pour ${servingMultiplier} personnes :
          ${recipe.ingredients.map((ing) => `${ing.item}, quantité: ${scaleAmount(ing.amount)}`).join('. ')}.
          Épices : ${recipe.spices?.map((s) => `${s.name} ${s.amount}`).join('. ')}.
          Instructions étape par étape :
          ${recipe.steps.map((s) => `Étape ${s.stepNumber} : ${s.instruction}`).join('. ')}.
          Bienfait santé : ${recipe.nutrition.healthBenefit}.
          Conseil du nutritionniste : ${recipe.nutrition.dietitianAdvice}.
          Secret du Chef : ${recipe.chefTip}.
          Bon appétit et Bsaha w Raha !
        `;
      } else if (language === 'en') {
        textToRead = `
          Recipe: ${recipe.titleEn || recipe.titleAr}.
          Total time: ${recipe.totalTimeText}.
          Ingredients for ${servingMultiplier} servings:
          ${recipe.ingredients.map((ing) => `${ing.item}, amount: ${scaleAmount(ing.amount)}`).join('. ')}.
          Spices: ${recipe.spices?.map((s) => `${s.name} ${s.amount}`).join('. ')}.
          Cooking steps:
          ${recipe.steps.map((s) => `Step ${s.stepNumber}: ${s.instruction}`).join('. ')}.
          Health benefit: ${recipe.nutrition.healthBenefit}.
          Nutritionist advice: ${recipe.nutrition.dietitianAdvice}.
          Chef's tip: ${recipe.chefTip}.
          Enjoy your meal!
        `;
      } else {
        textToRead = `
          وصفة ${recipe.titleAr}.
          الوقت الإجمالي: ${recipe.totalTimeText}.
          المقادير لـ ${servingMultiplier} أشخاص:
          ${recipe.ingredients.map((ing) => `${ing.item}، المقدار: ${scaleAmount(ing.amount)}`).join('. ')}.
          العطرية: ${recipe.spices?.map((s) => `${s.name} ${s.amount}`).join('. ')}.
          طريقة التحضير:
          ${recipe.steps.map((s) => `الخطوة ${s.stepNumber}: ${s.instruction}`).join('. ')}.
          الفائدة الصحية: ${recipe.nutrition.healthBenefit}.
          نصيحة خبير التغذية: ${recipe.nutrition.dietitianAdvice}.
          سر الشاف: ${recipe.chefTip}.
          وبالصحة والراحة!
        `;
      }
      setIsSpeaking(true);
      speakRecipeText(textToRead, () => setIsSpeaking(false), language);
    }
  };

  // Copy full recipe
  const handleCopyRecipe = () => {
    const displayTitle =
      language === 'fr'
        ? recipe.titleFr || recipe.titleAr
        : language === 'en'
        ? recipe.titleEn || recipe.titleAr
        : recipe.titleAr;

    const fullText = `🍲 ${displayTitle}
⏱️ ${t.totalTime} ${recipe.totalTimeText}
👥 ${t.servings}: ${servingMultiplier}
🔥 ${t.approxCalories} ${Math.round(recipe.nutrition.caloriesApprox * ratio)} kcal

📋 ${t.exactIngredientsTitle}:
${recipe.ingredients.map((i) => `• ${i.item}: ${scaleAmount(i.amount)} ${i.notes ? `(${i.notes})` : ''}`).join('\n')}

🌶️ ${t.spicesTitle}:
${recipe.spices?.map((s) => `• ${s.name}: ${s.amount}`).join('\n')}

👩‍🍳 ${t.stepByStepTitle}:
${recipe.steps.map((s) => `${s.stepNumber}. ${s.instruction} ${s.tip ? `[${t.tip}: ${s.tip}]` : ''}`).join('\n\n')}

🥗 ${t.nutritionCardTitle}:
• ${t.approxCalories} ${recipe.nutrition.caloriesApprox} kcal | ${t.proteinLabel}: ${recipe.nutrition.proteinGrams}g | ${t.carbsLabel}: ${recipe.nutrition.carbsGrams}g | ${t.fatsLabel}: ${recipe.nutrition.fatsGrams}g
• ${t.healthBenefitsTitle} ${recipe.nutrition.healthBenefit}
• ${t.dietitianAdviceTitle} ${recipe.nutrition.dietitianAdvice}

✨ ${t.chefSecretTipTitle}:
${recipe.chefTip}`;

    navigator.clipboard.writeText(fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/70 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Navigation Bar */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-amber-900 via-stone-900 to-amber-950 text-white flex items-center justify-between gap-3 border-b border-amber-800/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-medium border border-amber-500/30">
                {recipe.categoryLabel || t.moroccan}
              </span>
              <p className="text-xs text-amber-100/70 mt-0.5">{t.modalSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Voice Reader */}
            <button
              type="button"
              onClick={handleToggleSpeak}
              className={`p-2 rounded-xl border transition ${
                isSpeaking
                  ? 'bg-amber-500 text-white border-amber-400 animate-pulse'
                  : 'bg-amber-900/50 hover:bg-amber-800 text-amber-200 border-amber-700/50'
              }`}
              title={isSpeaking ? t.voiceReaderStop : t.voiceReaderStart}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopyRecipe}
              className="p-2 rounded-xl bg-amber-900/50 hover:bg-amber-800 text-amber-200 border border-amber-700/50 transition"
              title={t.copyFullRecipe}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="p-2 rounded-xl bg-amber-900/50 hover:bg-amber-800 text-amber-200 border border-amber-700/50 transition hidden sm:inline-flex"
              title={t.printRecipe}
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Bookmark Toggle */}
            <button
              type="button"
              onClick={() => onToggleSave(recipe)}
              className={`p-2 rounded-xl border transition ${
                isSaved
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-amber-900/50 hover:bg-amber-800 text-amber-200 border-amber-700/50'
              }`}
              title={isSaved ? t.saved : t.save}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 transition"
              title={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Header Title & Overview */}
          <div>
            <h2 className="text-xl sm:text-3xl font-black text-stone-900 leading-tight">
              {displayTitle}
            </h2>
            {displaySubtitle && (
              <p className="text-xs sm:text-sm text-stone-400 mt-1 opacity-80">
                {displaySubtitle}
              </p>
            )}
            <p className="text-sm sm:text-base text-stone-700 mt-3 leading-relaxed bg-amber-50/40 p-3.5 rounded-2xl border border-amber-100">
              {displaySummary}
            </p>
          </div>

          {/* Quick Metrics Bar & Servings Scaler */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">{t.totalTime}</span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.totalTimeText}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">{t.approxCalories}</span>
                <span className="text-xs sm:text-sm font-bold text-rose-600">
                  {Math.round(recipe.nutrition.caloriesApprox * ratio)} {t.calories}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">{t.difficultyLevel}</span>
                <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.difficulty}</span>
              </div>
            </div>

            {/* Serving Scaler */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold block">{t.servingsCountLabel}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {[2, 4, 6, 8].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setServingMultiplier(s)}
                      className={`text-xs px-2 py-0.5 rounded-md font-bold transition ${
                        servingMultiplier === s
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Exact Ingredients & Measurements */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-600" />
                <span>{t.exactIngredientsTitle} ({recipe.ingredients?.length || 0})</span>
                {ratio !== 1 && (
                  <span className="text-xs text-amber-700 font-normal bg-amber-100 px-2 py-0.5 rounded-full">
                    ({servingMultiplier} {t.persons})
                  </span>
                )}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {recipe.ingredients?.map((ing, idx) => {
                const id = `ing-${idx}`;
                const isChecked = !!checkedIngredients[id];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(id)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200 text-stone-400 line-through'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-amber-50/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-stone-300 bg-stone-50'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {ing.item}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg shrink-0 border border-amber-200">
                          {scaleAmount(ing.amount)}
                        </span>
                      </div>
                      {ing.notes && (
                        <p className="text-[11px] text-stone-500 mt-0.5">{ing.notes}</p>
                      )}
                      {ing.substitute && (
                        <p className="text-[10px] text-amber-800 mt-0.5">
                          🔄 <strong>{t.substituteNote}</strong> {ing.substitute}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spices & Seasoning */}
          {recipe.spices && recipe.spices.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t.spicesTitle}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {recipe.spices.map((spice, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs bg-white text-stone-800 px-3 py-1.5 rounded-xl border border-amber-200 font-medium shadow-xs"
                  >
                    <strong>{spice.name}:</strong>
                    <span className="text-amber-700">{spice.amount}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Sequential Step-by-Step Instructions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-amber-600" />
                <span>{t.stepByStepTitle}</span>
              </h3>
              <button
                type="button"
                onClick={() => onStartCooking(recipe)}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition flex items-center gap-1 border border-emerald-200"
              >
                <Play className="w-3 h-3 fill-emerald-600" />
                {t.startCooking}
              </button>
            </div>

            <div className="space-y-3">
              {recipe.steps?.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-400 transition space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                        {step.instruction}
                      </p>
                      
                      {step.tip && (
                        <div className="mt-2 p-2 rounded-xl bg-amber-50 text-[11px] text-amber-900 flex items-start gap-1.5 border border-amber-200/60">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span><strong>{t.stepChefTip}</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>

                    {step.durationMinutes && (
                      <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-1 rounded-lg shrink-0 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {step.durationMinutes} {t.minutes}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Nutrition & Dietitian Health Card */}
          <div className="p-5 rounded-3xl bg-linear-to-br from-emerald-950/5 via-stone-50 to-amber-50/30 border border-emerald-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                  {t.nutritionCardTitle}
                </h4>
                <p className="text-xs text-emerald-700">
                  {t.nutritionCardSubtitle}
                </p>
              </div>
            </div>

            {/* Macros breakdown */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">{t.calories}</span>
                <span className="text-xs sm:text-sm font-black text-rose-600">
                  {Math.round(recipe.nutrition.caloriesApprox * ratio)}
                </span>
                <span className="text-[9px] text-stone-400 block">kcal</span>
              </div>

              <div className="p-2.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">{t.proteinLabel}</span>
                <span className="text-xs sm:text-sm font-black text-emerald-700">
                  {Math.round(recipe.nutrition.proteinGrams * ratio)}g
                </span>
                <span className="text-[9px] text-stone-400 block">{t.muscleBuilding}</span>
              </div>

              <div className="p-2.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">{t.carbsLabel}</span>
                <span className="text-xs sm:text-sm font-black text-amber-700">
                  {Math.round(recipe.nutrition.carbsGrams * ratio)}g
                </span>
                <span className="text-[9px] text-stone-400 block">{t.bodyEnergy}</span>
              </div>

              <div className="p-2.5 bg-white rounded-2xl border border-stone-200 shadow-2xs">
                <span className="text-[10px] text-stone-500 font-bold block">{t.fatsLabel}</span>
                <span className="text-xs sm:text-sm font-black text-stone-700">
                  {Math.round(recipe.nutrition.fatsGrams * ratio)}g
                </span>
                <span className="text-[9px] text-stone-400 block">{t.healthyOils}</span>
              </div>
            </div>

            {/* Key Health Benefit */}
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.healthBenefitsTitle}
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {recipe.nutrition.healthBenefit}
              </p>
            </div>

            {/* Dietitian Advice */}
            <div className="bg-stone-900 text-white p-3.5 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-amber-400" />
                {t.dietitianAdviceTitle}
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {recipe.nutrition.dietitianAdvice}
              </p>
            </div>
          </div>

          {/* Chef's Secret Tip */}
          {recipe.chefTip && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-amber-900">{t.chefSecretTipTitle}</h5>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  {recipe.chefTip}
                </p>
              </div>
            </div>
          )}

          {/* Storage & Cultural Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-500">
            {recipe.storageTip && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <strong className="text-stone-700 block mb-0.5">📦 {t.storageTipTitle}</strong>
                <span>{recipe.storageTip}</span>
              </div>
            )}
            {recipe.culturalNote && (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <strong className="text-stone-700 block mb-0.5">🇲🇦 {t.culturalNoteTitle}</strong>
                <span>{recipe.culturalNote}</span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onAskChef(recipe)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs sm:text-sm font-bold border border-stone-300 transition flex items-center justify-center gap-2 shadow-xs"
          >
            <MessageCircleQuestion className="w-4 h-4 text-amber-600" />
            <span>{t.askAboutRecipeBtn}</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-bold transition"
            >
              {t.back}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartCooking(recipe);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.startCooking}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
