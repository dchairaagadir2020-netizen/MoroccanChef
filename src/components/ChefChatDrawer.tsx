import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  ChefHat,
  Sparkles,
  Bot,
  User,
  HeartPulse,
  Lightbulb,
  CornerDownLeft
} from 'lucide-react';
import { ChatMessage, Recipe } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ChefChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  recipeContext?: Recipe | null;
}

export const ChefChatDrawer: React.FC<ChefChatDrawerProps> = ({
  isOpen,
  onClose,
  recipeContext,
}) => {
  const { language, t, isRTL } = useLanguage();

  const getInitialWelcome = (): string => {
    return t.chatWelcome;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'chef',
      text: getInitialWelcome(),
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset welcome message on language switch if only welcome was there
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'chef',
          text: getInitialWelcome(),
          timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language]);

  useEffect(() => {
    if (recipeContext) {
      const recTitle =
        language === 'fr'
          ? recipeContext.titleFr || recipeContext.titleAr
          : language === 'en'
          ? recipeContext.titleEn || recipeContext.titleAr
          : recipeContext.titleAr;

      const contextText =
        language === 'fr'
          ? `Vous consultez la recette "${recTitle}". Avez-vous des questions sur les ingrédients, la réduction des calories ou les épices ?`
          : language === 'en'
          ? `You are currently viewing "${recTitle}". Do you have questions on substitutions, cooking technique, or spice ratios?`
          : `راك كتشوف دابا وصفة "${recTitle}". واش عندك شي سؤال عليها؟ كيفاش تبدل شي مكوّن، تنقص السعرات، أو تضبط العطرية؟`;

      setMessages((prev) => [
        ...prev,
        {
          id: `context-${Date.now()}`,
          sender: 'chef',
          text: contextText,
          timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
          recipeContext: recTitle,
        },
      ]);
    }
  }, [recipeContext, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isSending) return;

    const timeLocale = language === 'ar' ? 'ar-MA' : language === 'fr' ? 'fr-FR' : 'en-US';

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsSending(true);

    try {
      const res = await fetch('/api/ask-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          recipeContext: recipeContext ? JSON.stringify(recipeContext) : undefined,
          conversationHistory: messages.slice(-6),
          language,
        }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        const chefMsg: ChatMessage = {
          id: `chef-${Date.now()}`,
          sender: 'chef',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, chefMsg]);
      } else {
        throw new Error(data.error || 'Response error');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `chef-err-${Date.now()}`,
        sender: 'chef',
        text:
          language === 'fr'
            ? 'Désolé, une petite erreur de connexion est survenue. Veuillez reformuler votre question.'
            : language === 'en'
            ? 'Sorry, a momentary connection issue occurred. Please retry your question.'
            : 'سمح ليا، وقع مشكل بسيط فالاتصال. عاود طرح سؤالك أ لالة/سيدي والشاف يجاوبك فالحين.',
        timestamp: new Date().toLocaleTimeString(timeLocale, { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const quickPrompts = [t.quickQ1, t.quickQ2, t.quickQ3, t.quickQ4];

  const currentRecipeTitle = recipeContext
    ? language === 'fr'
      ? recipeContext.titleFr || recipeContext.titleAr
      : language === 'en'
      ? recipeContext.titleEn || recipeContext.titleAr
      : recipeContext.titleAr
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-stone-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col border-r border-stone-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-linear-to-r from-amber-800 via-amber-900 to-stone-900 text-white flex items-center justify-between border-b border-amber-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white shadow-md shrink-0">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {t.chatTitle}
              </h3>
              <span className="text-xs text-amber-200/80">
                {t.chatSubtitle}
              </span>
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

        {/* Recipe context banner if open */}
        {currentRecipeTitle && (
          <div className="p-2.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between px-4">
            <span className="font-semibold truncate">
              📌 {t.chatRecipeContextPrefix} <strong>{currentRecipeTitle}</strong>
            </span>
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/60">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs ${
                  msg.sender === 'user' ? 'bg-stone-800' : 'bg-amber-600'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <ChefHat className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-stone-900 text-white rounded-tl-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 shadow-2xs rounded-tr-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] mt-1 block ${
                    msg.sender === 'user' ? (isRTL ? 'text-left' : 'text-right') : (isRTL ? 'text-right' : 'text-left')
                  } text-stone-400`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex items-center gap-2 text-xs text-amber-800 p-2 bg-amber-50/80 rounded-xl max-w-[70%] border border-amber-200">
              <div className="w-3 h-3 border-2 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
              <span>{t.chatSending}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggested Questions */}
        <div className="p-2.5 bg-white border-t border-stone-100 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] bg-stone-100 hover:bg-amber-50 hover:text-amber-900 text-stone-700 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-amber-300 shrink-0 transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="flex-1 text-xs sm:text-sm bg-stone-100 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-amber-300 border border-stone-200"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className={`p-2.5 rounded-xl font-bold text-white transition ${
                !inputText.trim() || isSending
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-700 active:scale-95 shadow-sm'
              }`}
              title={t.chatSend}
            >
              <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
