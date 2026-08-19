import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  X,
  Plus,
  Flame,
  Clock,
  Heart,
  Users,
  Check,
  RotateCcw,
  Layers,
  ChefHat
} from 'lucide-react';
import { MOROCCAN_PANTRY_TAGS } from '../data/sampleRecipes';
import { AnalyzeRequest } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface IngredientInputSectionProps {
  onAnalyze: (request: AnalyzeRequest) => void;
  isLoading: boolean;
}

export const IngredientInputSection: React.FC<IngredientInputSectionProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'photo' | 'text' | 'tags'>('photo');
  const [images, setImages] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cuisinePreference, setCuisinePreference] = useState<'all' | 'moroccan' | 'international' | 'diet' | 'fast'>('all');
  const [servingsCount, setServingsCount] = useState<number>(4);
  const [mealType, setMealType] = useState<string>('main');
  const [dietaryGoal, setDietaryGoal] = useState<string>('balanced');
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Start Camera
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      alert(t.cameraAccessError);
      setShowCamera(false);
    }
  };

  // Snap Photo from Camera
  const snapPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setImages((prev) => [...prev, dataUrl]);
    }
    stopCamera();
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  const clearAll = () => {
    setImages([]);
    setTextInput('');
    setSelectedTags([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0 && !textInput.trim() && selectedTags.length === 0) {
      alert(t.inputValidationAlert);
      return;
    }

    onAnalyze({
      images,
      ingredientsList: textInput,
      selectedTags,
      cuisinePreference,
      servingsCount,
      mealType,
      dietaryGoal,
      language,
    });
  };

  const currentPantryList = MOROCCAN_PANTRY_TAGS[language] || MOROCCAN_PANTRY_TAGS.ar;

  const categoryOptions = [
    { id: 'all', label: t.categoryAll },
    { id: 'vegetables', label: t.categoryVegetables },
    { id: 'proteins', label: t.categoryProteins },
    { id: 'legumes', label: t.categoryLegumes },
    { id: 'grains', label: t.categoryGrains },
    { id: 'herbs', label: t.categoryHerbs },
    { id: 'seasonings', label: t.categorySeasonings },
    { id: 'spices', label: t.categorySpices },
    { id: 'oils', label: t.categoryOils },
    { id: 'dairy', label: t.categoryDairy },
  ];

  const filteredTags =
    selectedCategory === 'all'
      ? currentPantryList
      : currentPantryList.filter((tag) => {
          const catMap: Record<string, string[]> = {
            vegetables: ['خضار', 'Légumes', 'Vegetables'],
            proteins: ['بروتين', 'Protéines', 'Proteins'],
            legumes: ['قطاني', 'Légumineuses', 'Legumes'],
            grains: ['حبوب', 'Féculents', 'Grains'],
            herbs: ['أعشاب', 'Herbes', 'Herbs'],
            seasonings: ['منسمات', 'Condiments', 'Seasonings'],
            spices: ['عطرية', 'Épices', 'Spices'],
            oils: ['زيوت', 'Huiles', 'Oils'],
            dairy: ['ألبان', 'Produits laitiers', 'Dairy'],
          };
          const allowedNames = catMap[selectedCategory] || [];
          return allowedNames.includes(tag.category);
        });

  const hasAnyInput = images.length > 0 || textInput.trim().length > 0 || selectedTags.length > 0;

  return (
    <div className="bg-white rounded-3xl shadow-md border border-amber-100 overflow-hidden transition-all">
      
      {/* Top Banner / Heading */}
      <div className="p-5 sm:p-6 bg-linear-to-b from-amber-500/10 via-amber-500/5 to-white border-b border-amber-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                {t.uploadTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                {t.uploadSubtitle}
              </p>
            </div>
          </div>

          {hasAnyInput && (
            <button
              onClick={clearAll}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition px-2.5 py-1.5 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.clearAll}
            </button>
          )}
        </div>

        {/* Input Mode Navigation Tabs */}
        <div className="mt-5 grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'photo'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Camera className="w-4 h-4 text-amber-600" />
            <span>{t.tabPhoto}</span>
            {images.length > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {images.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'text'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>{t.tabText}</span>
            {textInput.trim() && (
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tags')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'tags'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-4 h-4 text-amber-600" />
            <span>{t.tabTags}</span>
            {selectedTags.length > 0 && (
              <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
        
        {/* Tab 1: Photo & Camera */}
        {activeTab === 'photo' && (
          <div className="space-y-4">
            {/* Live Camera Stream View */}
            {showCamera && (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-80 flex items-center justify-center shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-4 z-10">
                  <button
                    type="button"
                    onClick={snapPhoto}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg transition active:scale-95"
                  >
                    <Camera className="w-5 h-5" />
                    <span>{t.snapPhoto}</span>
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition"
                    title={t.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {!showCamera && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload Box */}
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-2xl bg-stone-50/50 hover:bg-amber-50/30 cursor-pointer transition text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 group-hover:bg-amber-100 text-stone-600 group-hover:text-amber-700 flex items-center justify-center mb-3 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-stone-800 group-hover:text-amber-800">
                    {t.browseFiles}
                  </span>
                  <span className="text-xs text-stone-500 mt-1">
                    (JPG, PNG, WebP)
                  </span>
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Camera Snap Box */}
                <button
                  type="button"
                  onClick={startCamera}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-amber-200 hover:border-amber-500 rounded-2xl bg-amber-50/50 hover:bg-amber-50 cursor-pointer transition text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 group-hover:bg-amber-200 text-amber-700 flex items-center justify-center mb-3 transition">
                    <Camera className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-amber-900 group-hover:text-amber-800">
                    {t.openCamera}
                  </span>
                  <span className="text-xs text-amber-700/80 mt-1">
                    {t.cameraActive}
                  </span>
                </button>
              </div>
            )}

            {/* Thumbnail previews */}
            {images.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-semibold text-stone-700 mb-2">
                  {t.selectedCount} ({images.length}):
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-amber-500 shrink-0 shadow-xs group"
                    >
                      <img
                        src={img}
                        alt={`Ingredient ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center hover:bg-rose-700 shadow transition"
                        title={t.remove}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Text Input */}
        {activeTab === 'text' && (
          <div className="space-y-3">
            <label htmlFor="ingredients-text" className="block text-xs font-bold text-stone-800">
              {t.textInputLabel}
            </label>
            <textarea
              id="ingredients-text"
              rows={3}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t.textInputPlaceholder}
              className="w-full rounded-2xl border border-stone-300 bg-stone-50/60 p-3.5 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition resize-none leading-relaxed text-stone-900"
            ></textarea>
            <p className="text-[11px] text-stone-500">
              {t.textInputHint}
            </p>
          </div>
        )}

        {/* Tab 3: Moroccan Pantry Tags */}
        {activeTab === 'tags' && (
          <div className="space-y-4">
            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Tag Buttons Grid */}
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
              {filteredTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.name);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-stone-50 text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/50'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    <span>{tag.name}</span>
                  </button>
                );
              })}
            </div>

            {selectedTags.length > 0 && (
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs text-stone-600">
                  {t.selectedCount}: <strong className="text-amber-800">{selectedTags.length}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  {t.clearAll}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recipe Customization Preferences */}
        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
            <ChefHat className="w-4 h-4 text-amber-600" />
            <span>{t.preferencesTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Cuisine Type */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                {t.cuisinePrefLabel}
              </label>
              <select
                value={cuisinePreference}
                onChange={(e) => setCuisinePreference(e.target.value as any)}
                className="w-full text-xs font-semibold rounded-xl border border-stone-300 bg-white p-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-stone-800"
              >
                <option value="all">🌟 {t.cuisinePrefAll}</option>
                <option value="moroccan">{t.cuisinePrefMoroccan}</option>
                <option value="international">{t.cuisinePrefInternational}</option>
                <option value="diet">{t.cuisinePrefDiet}</option>
                <option value="fast">{t.cuisinePrefExpress}</option>
              </select>
            </div>

            {/* Servings */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                {t.servingsLabel}
              </label>
              <div className="flex items-center bg-white border border-stone-300 rounded-xl px-2 py-1">
                <Users className="w-3.5 h-3.5 text-stone-400 mx-1" />
                <select
                  value={servingsCount}
                  onChange={(e) => setServingsCount(Number(e.target.value))}
                  className="w-full text-xs font-semibold bg-transparent p-1.5 outline-none text-stone-800"
                >
                  <option value={1}>1 {t.persons}</option>
                  <option value={2}>2 {t.persons}</option>
                  <option value={4}>4 {t.persons}</option>
                  <option value={6}>6 {t.persons}</option>
                  <option value={8}>8+ {t.persons}</option>
                </select>
              </div>
            </div>

            {/* Meal Type */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                {t.mealTypeLabel}
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-stone-300 bg-white p-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-stone-800"
              >
                <option value="غداء أو عشاء رئيسي">{t.mealTypeMain}</option>
                <option value="فطور صباحي مغذي">{t.mealTypeBreakfast}</option>
                <option value="عشاء خفيف وسريع">{t.mealTypeDinner}</option>
                <option value="شوربة أو مقبلات وسلطات">{t.mealTypeSoupAppetizer}</option>
              </select>
            </div>

            {/* Dietary Goal */}
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                {t.dietGoalLabel}
              </label>
              <select
                value={dietaryGoal}
                onChange={(e) => setDietaryGoal(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-stone-300 bg-white p-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-stone-800"
              >
                <option value="متوازن وصحي">{t.dietGoalBalanced}</option>
                <option value="تخسيس وإنقاص الوزن">{t.dietGoalLowCal}</option>
                <option value="بروتين عالي للرياضيين">{t.dietGoalHighProtein}</option>
                <option value="صديق لمرضى السكري">{t.dietGoalDiabetes}</option>
                <option value="قليل الملح والدهون للضغط">{t.dietGoalHeart}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-white shadow-lg transition flex items-center justify-center gap-3 text-base sm:text-lg ${
              isLoading
                ? 'bg-stone-400 cursor-not-allowed'
                : 'bg-linear-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 active:scale-[0.99] shadow-amber-600/20'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.generatingRecipes}</span>
              </>
            ) : (
              <>
                <ChefHat className="w-6 h-6 text-amber-200" />
                <span>{t.generateRecipesBtn}</span>
                <Sparkles className="w-5 h-5 text-amber-300" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
