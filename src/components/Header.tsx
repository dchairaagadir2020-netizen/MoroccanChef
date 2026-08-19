import React, { useState } from 'react';
import { ChefHat, Sparkles, HeartPulse, Bookmark, MessageSquareText, UtensilsCrossed, Globe, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ savedCount, onOpenSaved, onOpenChat }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: 'ar', label: 'العربية (الدارجة)', flag: '🇲🇦', nativeName: 'العربية' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="relative bg-linear-to-r from-amber-900 via-amber-800 to-stone-900 text-white shadow-lg border-b border-amber-700/40">
      {/* Traditional Moroccan warm accent strip */}
      <div className="h-1.5 w-full bg-linear-to-r from-amber-400 via-emerald-500 to-rose-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo and Brand Title */}
          <div className="flex items-center gap-3.5 text-center md:text-start">
            <div className="flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-amber-500 to-amber-700 text-white shadow-md border border-amber-400/40 shrink-0">
              <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  {t.appName}
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-400/30 font-medium">
                  {t.appBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100/80 mt-0.5 font-medium">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Actions & Language Selector */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            
            {/* Language Selector Switcher */}
            <div className="relative">
              <div className="bg-black/30 backdrop-blur-xs p-1 rounded-2xl border border-amber-500/30 flex items-center gap-1 shadow-inner">
                {languages.map((lang) => {
                  const isActive = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                      }`}
                      title={lang.label}
                    >
                      <span className="text-sm leading-none">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-700/60 hover:bg-amber-700 text-amber-50 text-xs sm:text-sm font-semibold border border-amber-500/40 transition shadow-xs active:scale-95"
              title={t.consultChefBtn}
            >
              <MessageSquareText className="w-4 h-4 text-amber-300" />
              <span>{t.consultChefBtn}</span>
            </button>

            <button
              onClick={onOpenSaved}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-amber-50 text-xs sm:text-sm font-semibold border border-stone-700 transition shadow-xs active:scale-95"
              title={t.savedRecipesBtn}
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>{t.savedRecipesBtn}</span>
              {savedCount > 0 && (
                <span className="bg-amber-500 text-stone-900 text-xs px-1.5 py-0.2 rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Feature Pills */}
        <div className="mt-3.5 pt-3 border-t border-amber-700/30 flex items-center gap-2 sm:gap-4 overflow-x-auto text-xs text-amber-200/90 scrollbar-none">
          <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg border border-amber-500/20 shrink-0">
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            {t.featurePhotoAnalysis}
          </span>
          <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg border border-amber-500/20 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.featureExactMeasures}
          </span>
          <span className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1 rounded-lg border border-emerald-400/20 shrink-0">
            <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
            {t.featureNutritionTips}
          </span>
        </div>
      </div>
    </header>
  );
};
