import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  CheckCircle2,
  ChefHat,
  Bell,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types';
import { playKitchenChime, speakRecipeText, stopSpeaking } from '../utils/audio';
import { useLanguage } from '../i18n/LanguageContext';

interface CookingModeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  isOpen,
  onClose,
}) => {
  const { language, t, isRTL } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Step Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);

  // Initialize step when modal opens or step changes
  useEffect(() => {
    if (!recipe || !isOpen) {
      setCurrentStepIndex(0);
      setIsCompleted(false);
      setIsTimerRunning(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      stopSpeaking();
      return;
    }

    const currentStep = recipe.steps[currentStepIndex];
    if (currentStep && currentStep.durationMinutes) {
      setTimerSeconds(currentStep.durationMinutes * 60);
    } else {
      setTimerSeconds(0);
    }
    setIsTimerRunning(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  }, [recipe, isOpen, currentStepIndex]);

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playKitchenChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || !recipe) return null;

  const totalSteps = recipe.steps.length;
  const currentStep = recipe.steps[currentStepIndex];

  const handleNextStep = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      playKitchenChime();
    }
  };

  const handlePrevStep = () => {
    stopSpeaking();
    setIsSpeaking(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setIsCompleted(false);
    }
  };

  const handleToggleTimer = () => {
    if (timerSeconds === 0 && currentStep.durationMinutes) {
      setTimerSeconds(currentStep.durationMinutes * 60);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    if (currentStep && currentStep.durationMinutes) {
      setTimerSeconds(currentStep.durationMinutes * 60);
    } else {
      setTimerSeconds(0);
    }
  };

  const handleAddMinute = () => {
    setTimerSeconds((prev) => prev + 60);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSpeakStep = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      let text = '';
      if (language === 'fr') {
        text = `Étape numéro ${currentStep.stepNumber} : ${currentStep.instruction}. ${
          currentStep.tip ? `Conseil du Chef : ${currentStep.tip}` : ''
        }`;
      } else if (language === 'en') {
        text = `Step number ${currentStep.stepNumber}: ${currentStep.instruction}. ${
          currentStep.tip ? `Chef tip: ${currentStep.tip}` : ''
        }`;
      } else {
        text = `الخطوة رقم ${currentStep.stepNumber}: ${currentStep.instruction}. ${
          currentStep.tip ? `نصيحة الشاف: ${currentStep.tip}` : ''
        }`;
      }
      speakRecipeText(text, () => setIsSpeaking(false), language);
    }
  };

  const displayTitle =
    language === 'fr'
      ? recipe.titleFr || recipe.titleAr
      : language === 'en'
      ? recipe.titleEn || recipe.titleAr
      : recipe.titleAr;

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 text-stone-100 w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-700/80 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-400 font-bold tracking-wide">
                {t.cookingModeTitle}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                {displayTitle}
              </h3>
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

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-stone-800">
          <div
            className="h-full bg-linear-to-r from-amber-500 to-emerald-500 transition-all duration-300"
            style={{
              width: `${((currentStepIndex + (isCompleted ? 1 : 0)) / totalSteps) * 100}%`,
            }}
          ></div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-10 flex-1 overflow-y-auto flex flex-col justify-center">
          
          {!isCompleted ? (
            <div className="space-y-6">
              
              {/* Step indicator header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">
                    {t.stepOf} {currentStep.stepNumber}
                  </span>
                  <span className="text-sm text-stone-400 font-semibold">
                    / {totalSteps}
                  </span>
                </div>

                {/* Voice button */}
                <button
                  type="button"
                  onClick={handleSpeakStep}
                  className={`p-2.5 rounded-xl border transition flex items-center gap-2 text-xs font-bold ${
                    isSpeaking
                      ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
                  }`}
                  title={isSpeaking ? t.voiceReaderStop : t.voiceReaderStart}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  <span>{isSpeaking ? t.voiceReaderStop : t.voiceReaderStart}</span>
                </button>
              </div>

              {/* Step Instruction Big Typography */}
              <div className="p-6 rounded-3xl bg-stone-800/80 border border-stone-700/80 shadow-inner">
                <p className="text-lg sm:text-2xl text-white font-semibold leading-relaxed">
                  {currentStep.instruction}
                </p>

                {currentStep.tip && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>{t.stepTipTitle}</strong> {currentStep.tip}</span>
                  </div>
                )}
              </div>

              {/* Cooking Timer Tool */}
              {currentStep.durationMinutes && (
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-stone-400 font-bold block">{t.prepTime}</span>
                      <span className={`text-2xl sm:text-3xl font-mono font-black ${
                        timerSeconds === 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {formatTimer(timerSeconds)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleTimer}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                        isTimerRunning
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {isTimerRunning ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>{t.timerPause}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>{t.timerStart}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleAddMinute}
                      className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition border border-stone-700"
                      title="+1 min"
                    >
                      +1 {t.minutes}
                    </button>

                    <button
                      type="button"
                      onClick={handleResetTimer}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition border border-stone-700"
                      title={t.timerReset}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Celebration Card */
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/50 shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {t.congratsTitle}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-md mx-auto">
                  {t.congratsSubtitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 max-w-md mx-auto text-xs text-amber-200">
                ✨ <strong>{t.congratsAdviceReminder}</strong> {recipe.nutrition.dietitianAdvice}
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentStepIndex(0);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition"
                >
                  {t.backToRecipe}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition shadow-lg"
                >
                  {t.finishCooking}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Step Navigation Footer */}
        {!isCompleted && (
          <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                currentStepIndex === 0
                  ? 'text-stone-600 cursor-not-allowed'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              <PrevIcon className="w-4 h-4" />
              <span>{t.prevStep}</span>
            </button>

            <span className="text-xs text-stone-400 font-semibold">
              {currentStepIndex + 1} / {totalSteps}
            </span>

            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition shadow-md active:scale-95"
            >
              <span>{currentStepIndex === totalSteps - 1 ? t.finishCooking : t.nextStep}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
