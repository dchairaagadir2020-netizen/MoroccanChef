export type Language = 'ar' | 'fr' | 'en';

export interface TranslationDictionary {
  // Common & General
  appName: string;
  appBadge: string;
  appSubtitle: string;
  moroccan: string;
  international: string;
  diet: string;
  express: string;
  all: string;
  easy: string;
  medium: string;
  detailed: string;
  minutes: string;
  calories: string;
  servings: string;
  persons: string;
  copied: string;
  copy: string;
  print: string;
  back: string;
  close: string;
  save: string;
  saved: string;
  remove: string;
  clear: string;
  tip: string;
  warning: string;
  alert: string;

  // Header
  consultChefBtn: string;
  savedRecipesBtn: string;
  featurePhotoAnalysis: string;
  featureExactMeasures: string;
  featureNutritionTips: string;
  languageSelectTitle: string;

  // Greeting Banner
  chefWordTitle: string;
  defaultChefGreeting: string;
  askChefDirectly: string;
  detectedIngredientsLabel: string;

  // Input Section
  tabPhoto: string;
  tabText: string;
  tabTags: string;
  uploadTitle: string;
  uploadSubtitle: string;
  browseFiles: string;
  openCamera: string;
  snapPhoto: string;
  closeCamera: string;
  cameraActive: string;
  cameraAccessError: string;
  photoTip: string;
  textInputLabel: string;
  textInputPlaceholder: string;
  textInputHint: string;
  pantryTitle: string;
  pantrySubtitle: string;
  addCustomIngredient: string;
  addBtn: string;
  customIngredientPlaceholder: string;
  selectedCount: string;
  
  // Preferences & Filters
  preferencesTitle: string;
  cuisinePrefLabel: string;
  cuisinePrefAll: string;
  cuisinePrefMoroccan: string;
  cuisinePrefDiet: string;
  cuisinePrefExpress: string;
  cuisinePrefInternational: string;
  servingsLabel: string;
  mealTypeLabel: string;
  mealTypeMain: string;
  mealTypeBreakfast: string;
  mealTypeDinner: string;
  mealTypeSoupAppetizer: string;
  dietGoalLabel: string;
  dietGoalBalanced: string;
  dietGoalLowCal: string;
  dietGoalHighProtein: string;
  dietGoalDiabetes: string;
  dietGoalHeart: string;
  
  // Submit & Loading
  generateRecipesBtn: string;
  generatingRecipes: string;
  inputValidationAlert: string;
  clearAll: string;

  // Pantry categories
  categoryAll: string;
  categoryVegetables: string;
  categoryProteins: string;
  categoryLegumes: string;
  categoryGrains: string;
  categoryHerbs: string;
  categorySeasonings: string;
  categorySpices: string;
  categoryOils: string;
  categoryDairy: string;

  // Recipe Grid
  suggestedRecipesTitle: string;
  suggestedRecipesSubtitle: string;
  filterAll: string;
  filterMoroccan: string;
  filterDiet: string;
  filterExpress: string;
  filterInternational: string;
  emptyCategoryTitle: string;
  emptyCategorySubtitle: string;
  showAllRecipesBtn: string;
  viewDetails: string;
  startCooking: string;

  // Recipe Detail Modal
  modalSubtitle: string;
  totalTime: string;
  prepTime: string;
  cookTime: string;
  approxCalories: string;
  difficultyLevel: string;
  servingsCountLabel: string;
  scaledForPersons: string;
  exactIngredientsTitle: string;
  checkIngredientsHint: string;
  substituteNote: string;
  spicesTitle: string;
  stepByStepTitle: string;
  liveCookingModeBtn: string;
  stepChefTip: string;
  nutritionCardTitle: string;
  nutritionCardSubtitle: string;
  proteinLabel: string;
  muscleBuilding: string;
  carbsLabel: string;
  bodyEnergy: string;
  fatsLabel: string;
  healthyOils: string;
  healthBenefitsTitle: string;
  dietitianAdviceTitle: string;
  chefSecretTipTitle: string;
  storageTipTitle: string;
  culturalNoteTitle: string;
  askAboutRecipeBtn: string;
  voiceReaderStart: string;
  voiceReaderStop: string;
  copyFullRecipe: string;
  printRecipe: string;

  // Cooking Mode Modal
  cookingModeTitle: string;
  stepOf: string;
  stepTipTitle: string;
  timerStart: string;
  timerPause: string;
  timerReset: string;
  prevStep: string;
  nextStep: string;
  finishCooking: string;
  congratsTitle: string;
  congratsSubtitle: string;
  congratsAdviceReminder: string;
  backToRecipe: string;

  // Chef Chat Drawer
  chatTitle: string;
  chatSubtitle: string;
  chatWelcome: string;
  chatRecipeContextPrefix: string;
  chatQuestionPrompt: string;
  chatPlaceholder: string;
  chatSend: string;
  chatSending: string;
  chatQuickQuestionsTitle: string;
  quickQ1: string;
  quickQ2: string;
  quickQ3: string;
  quickQ4: string;

  // Saved Recipes Drawer
  savedDrawerTitle: string;
  savedDrawerSubtitle: string;
  savedEmptyTitle: string;
  savedEmptySubtitle: string;

  // Footer
  footerCopyright: string;
  footerTagline: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  ar: {
    appName: 'الشاف المغربي وخبير التغذية',
    appBadge: 'بالدارجة المغربية',
    appSubtitle: 'وصفات مغربية وعالمية ساهلة بالمقادير المتوفرة عندك • حساب السعرات والفوائد الصحية',
    moroccan: 'مغربي أصيل',
    international: 'عالمي',
    diet: 'ريجيم وصحي',
    express: 'سريع وخفيف',
    all: 'الكل',
    easy: 'سهل بزاف',
    medium: 'متوسط',
    detailed: 'خاص شوية الدقة',
    minutes: 'دقيقة',
    calories: 'سعرة',
    servings: 'حصص',
    persons: 'أشخاص',
    copied: 'تم النسخ بنجاح!',
    copy: 'نسخ الوصفة',
    print: 'طباعة',
    back: 'رجوع',
    close: 'إغلاق',
    save: 'حفظ الوصفة',
    saved: 'محفوظة',
    remove: 'حذف',
    clear: 'مسح الكل',
    tip: 'نصيحة',
    warning: 'تنبيه',
    alert: 'ملاحظة',

    consultChefBtn: 'استشارة الشاف',
    savedRecipesBtn: 'الوصفات المحفوظة',
    featurePhotoAnalysis: 'تحليل صور الثلاجة والمكونات',
    featureExactMeasures: 'مقادير دقيقة بالعبار المغربي',
    featureNutritionTips: 'حساب السعرات ونصائح خبير التغذية',
    languageSelectTitle: 'تغيير اللغة',

    chefWordTitle: 'كلمة الشاف وخبير التغذية',
    defaultChefGreeting: 'مرحبا بك فكوزينة الشاف المغربي وخبير التغذية! صوّر المقادير اللي عندك فالثلاجة ولا اكتبهم، ونعطيك شهيوات مغربية وعالمية ساهلة ولذيذة مع السعرات والفوائد الصحية.',
    askChefDirectly: 'استشارة الشاف مباشرة',
    detectedIngredientsLabel: 'المكونات التي تم التعرف عليها:',

    tabPhoto: '📸 تصوير أو رفع صورة',
    tabText: '✍️ كتابة المقادير',
    tabTags: '🏷️ اختيار من المؤونة',
    uploadTitle: 'صوّر المقادير اللي عندك فالثلاجة أو البلاكارات',
    uploadSubtitle: 'تقدر ترفع صورة أو كتر، والشاف يتعرف على الخضار واللحوم والعطرية تلقائياً',
    browseFiles: 'اختيار صور من الجهاز',
    openCamera: 'فتح الكاميرا للتصوير',
    snapPhoto: 'التقاط الصورة',
    closeCamera: 'إغلاق الكاميرا',
    cameraActive: 'الكاميرا مشغلة، وجّهها نحو المكونات',
    cameraAccessError: 'تعذر فتح الكاميرا. يرجى التأكد من إذن الكاميرا أو رفع صورة مباشرة.',
    photoTip: '💡 نصيحة: الصورة الواضحة والإضاءة الجيدة كتخلي الشاف يتعرف على المكونات بدقة عالية.',
    textInputLabel: 'اكتب المكونات اللي متوفرة عندك فالدار:',
    textInputPlaceholder: 'مثلاً: نص دجاجة، 2 بصلات، مطيشة، بطاطا، شوية قزبور، زيتون، فصوص ثوم، زيت العود...',
    textInputHint: '💡 اكتب أي حاجة عندك وخا تكون بسيطة، والشاف يقترح عليك شهيوات مناسبة.',
    pantryTitle: 'اختر المكونات المتوفرة عندك من لائحة المؤونة المغربية:',
    pantrySubtitle: 'كليكي على أي مكون متوفر فكوزينتك باش تزيده للمقادير',
    addCustomIngredient: 'إضافة مكون آخر يدوي:',
    addBtn: 'إضافة',
    customIngredientPlaceholder: 'اسم المكون...',
    selectedCount: 'مكون مختار',

    preferencesTitle: 'تخصيص الوصفات حسب رغبتك:',
    cuisinePrefLabel: 'نوع المطبخ المفضل:',
    cuisinePrefAll: 'كل الأنواع (مغربي وعالمي)',
    cuisinePrefMoroccan: '🇲🇦 مغربي تقليدي أصيل',
    cuisinePrefDiet: '🥗 ريجيم وصحي وخفيف',
    cuisinePrefExpress: '⚡ سريع جداً (أقل من 25 دقيقة)',
    cuisinePrefInternational: '🌍 أطباق عالمية سهلة',
    servingsLabel: 'عدد الأشخاص:',
    mealTypeLabel: 'نوع الوجبة:',
    mealTypeMain: 'غداء أو عشاء رئيسي',
    mealTypeBreakfast: 'فطور الصباح',
    mealTypeDinner: 'عشاء خفيف',
    mealTypeSoupAppetizer: 'شوربة أو مقبلات ومملحات',
    dietGoalLabel: 'الهدف الصحي:',
    dietGoalBalanced: 'متوازن وصحي للجميع',
    dietGoalLowCal: 'إنقاص الوزن (قليل السعرات والدهون)',
    dietGoalHighProtein: 'غني بالبروتين للرياضيين',
    dietGoalDiabetes: 'مناسب لمرضى السكري والضغط',
    dietGoalHeart: 'صحة القلب والشرايين (زيت الزيتون والألياف)',

    generateRecipesBtn: 'اقتراح شهيوات مضبوطة مع خبير التغذية',
    generatingRecipes: 'الشاف وخبير التغذية كيحضروا الوصفات ديالك...',
    inputValidationAlert: 'يرجى رفع صورة للمكونات، أو كتابة المقادير، أو اختيارها من اللائحة.',
    clearAll: 'مسح كل المدخلات',

    categoryAll: 'الكل',
    categoryVegetables: 'خضار',
    categoryProteins: 'بروتين ولحوم',
    categoryLegumes: 'قطاني',
    categoryGrains: 'حبوب ونشويات',
    categoryHerbs: 'أعشاب طرية',
    categorySeasonings: 'منسمات',
    categorySpices: 'عطرية وتوابل',
    categoryOils: 'زيوت ودهون',
    categoryDairy: 'ألبان وأجبان',

    suggestedRecipesTitle: 'الوصفات المقترحة',
    suggestedRecipesSubtitle: 'شهيوات مضبوطة بالعبار وطريقة التحضير خطوة بخطوة',
    filterAll: 'الكل',
    filterMoroccan: '🇲🇦 مغربي أصيل',
    filterDiet: '🥗 ريجيم وصحي',
    filterExpress: '⚡ سريع وخفيف',
    filterInternational: '🌍 عالمي',
    emptyCategoryTitle: 'لا توجد وصفات في هذا التصنيف',
    emptyCategorySubtitle: 'اختر تصنيف "الكل" أو قم بطلب اقتراح وصفات جديدة باستخدام الصور أو المكونات.',
    showAllRecipesBtn: 'عرض كل الوصفات',
    viewDetails: 'عرض المقادير والخطوات',
    startCooking: 'وضع الطبخ المباشر',

    modalSubtitle: 'وصفة مضبوطة مع خبير التغذية',
    totalTime: 'الوقت الإجمالي:',
    prepTime: 'وقت التحضير:',
    cookTime: 'وقت الطهي:',
    approxCalories: 'السعرات التقريبية:',
    difficultyLevel: 'مستوى الصعوبة:',
    servingsCountLabel: 'عدد الأشخاص:',
    scaledForPersons: 'معدلة لـ',
    exactIngredientsTitle: 'المقادير والعبار المضبوط',
    checkIngredientsHint: 'كوشي على المقادير اللي وجدتي',
    substituteNote: 'بديل ممكن:',
    spicesTitle: 'العطرية والتوابل المغربية:',
    stepByStepTitle: 'طريقة التحضير خطوة بخطوة',
    liveCookingModeBtn: 'وضع الطبخ المباشر',
    stepChefTip: 'نصيحة الشاف:',
    nutritionCardTitle: 'استشارة القيمة الغذائية والصحة (خبير التغذية)',
    nutritionCardSubtitle: 'تحليل علمي ومبسط لفوائد هاد الوصفة لصحتك ورشاقتك',
    proteinLabel: 'البروتين',
    muscleBuilding: 'بناء العضلات',
    carbsLabel: 'الكاربوهيدرات',
    bodyEnergy: 'طاقة الجسم',
    fatsLabel: 'الدهون الصحية',
    healthyOils: 'زيت الزيتون',
    healthBenefitsTitle: 'الفوائد الصحية الأساسية:',
    dietitianAdviceTitle: 'نصيحة أخصائي التغذية لطريقة الأكل:',
    chefSecretTipTitle: 'سر ولمسة الشاف المغربي:',
    storageTipTitle: 'طريقة الحفظ والتسخين:',
    culturalNoteTitle: 'لمسة ثقافية مغربية:',
    askAboutRecipeBtn: 'سول الشاف على هاد الوصفة',
    voiceReaderStart: 'قراءة الوصفة بالصوت',
    voiceReaderStop: 'إيقاف القراءة الصوتية',
    copyFullRecipe: 'نسخ الوصفة كاملة',
    printRecipe: 'طباعة الوصفة',

    cookingModeTitle: 'المساعد الصوتي للطبخ المباشر',
    stepOf: 'الخطوة',
    stepTipTitle: 'نصيحة الشاف لهاد المرحلة:',
    timerStart: 'تشغيل المؤقت',
    timerPause: 'إيقاف المؤقت',
    timerReset: 'إعادة ضبط',
    prevStep: 'الخطوة السابقة',
    nextStep: 'الخطوة التالية',
    finishCooking: 'إنهاء الطبخ والتقديم 🎉',
    congratsTitle: 'تبارك الله عليك! كملتي الوصفة بنجاح',
    congratsSubtitle: 'الشهيوة ديالك واجدة دابا، بالصحة والراحة وطول العمر!',
    congratsAdviceReminder: 'تذكير من خبير التغذية:',
    backToRecipe: 'العودة لتفاصيل الوصفة',

    chatTitle: 'استشارة الشاف وخبير التغذية',
    chatSubtitle: 'طرح أي سؤال فالمطبخ المغربي والتغذية الصحية',
    chatWelcome: 'مرحبا بك أ لالة / أ سيدي! أنا الشاف المغربي وخبير التغذية ديالك. سولني على أي حاجة: بدائل المقادير، نصائح لمرضى السكري والضغط، أسرار العطرية والدغميرة، أو كيفاش تطيب شهيوات صحية وخفيفة.',
    chatRecipeContextPrefix: 'الوصفة الحالية:',
    chatQuestionPrompt: 'راك كتشوف دابا وصفة',
    chatPlaceholder: 'طرح سؤالك هنا على الشاف (مثلاً: كيفاش نعوض هاد المكون؟)...',
    chatSend: 'إرسال',
    chatSending: 'جاري الإجابة...',
    chatQuickQuestionsTitle: 'أسئلة شائعة تقدر تسولها للشاف:',
    quickQ1: 'كيفاش نقص السعرات والدهون فالطاجين؟',
    quickQ2: 'شنو نقدر نعوض بيه الحامض مصير إيلا ما عنديش؟',
    quickQ3: 'واش هاد الوصفة مناسبة لمرضى السكري؟',
    quickQ4: 'كيفاش تجي الدغميرة معلكة بلا ما نحرق البصلة؟',

    savedDrawerTitle: 'الوصفات المحفوظة',
    savedDrawerSubtitle: 'شهيوات محفوظة عندك للرجوع إليها في أي وقت',
    savedEmptyTitle: 'مازال ما حفظتي حتى وصفة',
    savedEmptySubtitle: 'ملي يقترح عليك الشاف وصفات تعجبك، كليكي على علامة الحفظ باش ترجع ليها فوقتما بغيتي.',

    footerCopyright: '🇲🇦 الشاف المغربي وخبير التغذية • وصفات مغربية وعالمية سهلة بالدارجة',
    footerTagline: 'حساب السعرات والفوائد الصحية • مقادير مضبوطة وخطوات مبسطة',
  },

  fr: {
    appName: 'Chef Marocain & Nutritionniste',
    appBadge: 'Darija & International',
    appSubtitle: 'Recettes marocaines et internationales faciles selon vos ingrédients • Calories et conseils nutritionnels',
    moroccan: 'Marocain Authentique',
    international: 'International',
    diet: 'Régime & Santé',
    express: 'Express & Léger',
    all: 'Tous',
    easy: 'Très Facile',
    medium: 'Moyen',
    detailed: 'Précision requise',
    minutes: 'min',
    calories: 'kcal',
    servings: 'portions',
    persons: 'personnes',
    copied: 'Recette copiée avec succès !',
    copy: 'Copier la recette',
    print: 'Imprimer',
    back: 'Retour',
    close: 'Fermer',
    save: 'Enregistrer',
    saved: 'Enregistrée',
    remove: 'Supprimer',
    clear: 'Tout effacer',
    tip: 'Astuce',
    warning: 'Attention',
    alert: 'Note',

    consultChefBtn: 'Consulter le Chef',
    savedRecipesBtn: 'Recettes Sauvegardées',
    featurePhotoAnalysis: 'Analyse photo du frigo & placards',
    featureExactMeasures: 'Dosages précis et authentiques',
    featureNutritionTips: 'Calcul des calories & bilan nutritionnel',
    languageSelectTitle: 'Changer la langue',

    chefWordTitle: 'Le Mot du Chef & Nutritionniste',
    defaultChefGreeting: 'Bienvenue dans la cuisine du Chef Marocain et Nutritionniste ! Prenez en photo vos ingrédients ou écrivez-les, et je vous concocterai des recettes marocaines et internationales savoureuses, équilibrées et détaillées.',
    askChefDirectly: 'Poser une question au Chef',
    detectedIngredientsLabel: 'Ingrédients reconnus :',

    tabPhoto: '📸 Photo ou Galerie',
    tabText: '✍️ Saisie de texte',
    tabTags: '🏷️ Liste de garde-manger',
    uploadTitle: 'Photographiez votre frigo ou vos placards',
    uploadSubtitle: 'Téléchargez une ou plusieurs photos pour détecter automatiquement légumes, viandes, épices...',
    browseFiles: 'Parcourir les fichiers',
    openCamera: 'Ouvrir la caméra',
    snapPhoto: 'Prendre la photo',
    closeCamera: 'Fermer la caméra',
    cameraActive: 'Caméra active, visez vos ingrédients',
    cameraAccessError: 'Impossible d’accéder à la caméra. Vérifiez les autorisations ou téléchargez une image.',
    photoTip: '💡 Astuce : Une bonne luminosité et une vue d’ensemble permettent une détection optimale.',
    textInputLabel: 'Listez les ingrédients disponibles chez vous :',
    textInputPlaceholder: 'Exemple : demi poulet, 2 oignons, tomates, pommes de terre, coriandre, olives, ail, huile d’olive...',
    textInputHint: '💡 Indiquez même vos restes simples, le Chef saura les valoriser avec goût.',
    pantryTitle: 'Sélectionnez parmi les ingrédients du garde-manger marocain :',
    pantrySubtitle: 'Cliquez sur un ingrédient pour l’ajouter instantanément à votre sélection',
    addCustomIngredient: 'Ajouter un ingrédient personnalisé :',
    addBtn: 'Ajouter',
    customIngredientPlaceholder: 'Nom de l’ingrédient...',
    selectedCount: 'ingrédient(s) sélectionné(s)',

    preferencesTitle: 'Personnalisez selon vos préférences :',
    cuisinePrefLabel: 'Style de cuisine souhaité :',
    cuisinePrefAll: 'Tous les styles (Marocain & International)',
    cuisinePrefMoroccan: '🇲🇦 Traditionnel Marocain',
    cuisinePrefDiet: '🥗 Régime, minceur & diététique',
    cuisinePrefExpress: '⚡ Très rapide (moins de 25 min)',
    cuisinePrefInternational: '🌍 Plats internationaux faciles',
    servingsLabel: 'Nombre de personnes :',
    mealTypeLabel: 'Type de repas :',
    mealTypeMain: 'Déjeuner ou Dîner principal',
    mealTypeBreakfast: 'Petit-déjeuner sain',
    mealTypeDinner: 'Dîner léger',
    mealTypeSoupAppetizer: 'Soupe, entrée ou salade',
    dietGoalLabel: 'Objectif santé :',
    dietGoalBalanced: 'Équilibré & sain pour tous',
    dietGoalLowCal: 'Perte de poids (faible en calories et graisses)',
    dietGoalHighProtein: 'Riche en protéines (sportifs)',
    dietGoalDiabetes: 'Adapté au diabète & à l’hypertension',
    dietGoalHeart: 'Santé cardiovasculaire (oméga & fibres)',

    generateRecipesBtn: 'Générer mes recettes avec le Chef',
    generatingRecipes: 'Le Chef et le nutritionniste préparent vos recettes...',
    inputValidationAlert: 'Veuillez télécharger une photo, taper des ingrédients ou en choisir dans la liste.',
    clearAll: 'Réinitialiser la sélection',

    categoryAll: 'Tous',
    categoryVegetables: 'Légumes',
    categoryProteins: 'Protéines & Viandes',
    categoryLegumes: 'Légumineuses',
    categoryGrains: 'Féculents & Céréales',
    categoryHerbs: 'Herbes fraîches',
    categorySeasonings: 'Condiments',
    categorySpices: 'Épices marocaines',
    categoryOils: 'Huiles & Matières grasses',
    categoryDairy: 'Produits laitiers & Fromages',

    suggestedRecipesTitle: 'Recettes Suggérées',
    suggestedRecipesSubtitle: 'Dosages exacts, étapes chronologiques et conseils nutritionnels',
    filterAll: 'Tous',
    filterMoroccan: '🇲🇦 Marocain',
    filterDiet: '🥗 Santé & Diète',
    filterExpress: '⚡ Express',
    filterInternational: '🌍 International',
    emptyCategoryTitle: 'Aucune recette dans cette catégorie',
    emptyCategorySubtitle: 'Sélectionnez "Tous" ou lancez une nouvelle analyse d’ingrédients.',
    showAllRecipesBtn: 'Afficher toutes les recettes',
    viewDetails: 'Voir les ingrédients & étapes',
    startCooking: 'Mode Cuisine Guidée',

    modalSubtitle: 'Recette vérifiée avec le nutritionniste',
    totalTime: 'Temps total :',
    prepTime: 'Préparation :',
    cookTime: 'Cuisson :',
    approxCalories: 'Calories estimées :',
    difficultyLevel: 'Niveau de difficulté :',
    servingsCountLabel: 'Nombre de convives :',
    scaledForPersons: 'Adapté pour',
    exactIngredientsTitle: 'Ingrédients & Mesures Exactes',
    checkIngredientsHint: 'Cochez les ingrédients préparés',
    substituteNote: 'Alternative possible :',
    spicesTitle: 'Épices & Assaisonnements Marocains :',
    stepByStepTitle: 'Méthode de préparation pas-à-pas',
    liveCookingModeBtn: 'Lancer le mode cuisine',
    stepChefTip: 'Astuce du Chef :',
    nutritionCardTitle: 'Bilan Nutritionnel & Conseils Santé (Nutritionniste)',
    nutritionCardSubtitle: 'Analyse scientifique vulgarisée des bienfaits de ce plat',
    proteinLabel: 'Protéines',
    muscleBuilding: 'Masse musculaire',
    carbsLabel: 'Glucides',
    bodyEnergy: 'Énergie corporelle',
    fatsLabel: 'Lipides sains',
    healthyOils: 'Huile d’olive',
    healthBenefitsTitle: 'Bénéfices santé majeurs :',
    dietitianAdviceTitle: 'Conseil de consommation du nutritionniste :',
    chefSecretTipTitle: 'Le secret culinaire du Chef Marocain :',
    storageTipTitle: 'Conservation et réchauffage :',
    culturalNoteTitle: 'Touche culturelle et histoire du plat :',
    askAboutRecipeBtn: 'Interroger le Chef sur cette recette',
    voiceReaderStart: 'Écouter la recette',
    voiceReaderStop: 'Arrêter la lecture',
    copyFullRecipe: 'Copier la recette complète',
    printRecipe: 'Imprimer la fiche recette',

    cookingModeTitle: 'Guide Vocal de Cuisson Interactive',
    stepOf: 'Étape',
    stepTipTitle: 'Conseil du Chef pour cette étape :',
    timerStart: 'Démarrer le minuteur',
    timerPause: 'Mettre en pause',
    timerReset: 'Réinitialiser',
    prevStep: 'Étape précédente',
    nextStep: 'Étape suivante',
    finishCooking: 'Terminer & Servir 🎉',
    congratsTitle: 'Bravo ! Recette réussie avec brio',
    congratsSubtitle: 'Votre plat est prêt à être dégusté. Bon appétit (Bsaha w Raha) !',
    congratsAdviceReminder: 'Rappel du nutritionniste :',
    backToRecipe: 'Retour à la fiche recette',

    chatTitle: 'Consultation avec le Chef & Nutritionniste',
    chatSubtitle: 'Posez toutes vos questions culinaires ou diététiques',
    chatWelcome: 'Bonjour ! Je suis votre Chef Marocain et expert nutritionnel. N’hésitez pas à me demander des substitutions d’ingrédients, des conseils pour le diabète/hypertension, ou les secrets d’une vraie sauce m’aassla ou dghmira.',
    chatRecipeContextPrefix: 'Recette en cours :',
    chatQuestionPrompt: 'Vous consultez actuellement la recette',
    chatPlaceholder: 'Posez votre question au Chef (ex : comment remplacer le citron confit ?)...',
    chatSend: 'Envoyer',
    chatSending: 'Le Chef rédige sa réponse...',
    chatQuickQuestionsTitle: 'Questions fréquentes suggérées :',
    quickQ1: 'Comment alléger le tajine en matières grasses ?',
    quickQ2: 'Par quoi remplacer le citron confit si je n’en ai pas ?',
    quickQ3: 'Ce plat convient-il aux personnes diabétiques ?',
    quickQ4: 'Comment obtenir une sauce dghmira bien confite sans brûler les oignons ?',

    savedDrawerTitle: 'Recettes Enregistrées',
    savedDrawerSubtitle: 'Vos recettes favorites conservées pour plus tard',
    savedEmptyTitle: 'Aucune recette sauvegardée pour l’instant',
    savedEmptySubtitle: 'Lorsque vous trouvez une recette qui vous plaît, cliquez sur l’icône marque-page pour la retrouver ici.',

    footerCopyright: '🇲🇦 Chef Marocain & Nutritionniste • Recettes marocaines et internationales faciles',
    footerTagline: 'Calcul des calories & bienfaits nutritionnels • Dosages précis et étapes claires',
  },

  en: {
    appName: 'Moroccan Chef & Nutritionist',
    appBadge: 'Darija & International',
    appSubtitle: 'Easy Moroccan & world recipes from your ingredients • Calorie count & dietitian health advice',
    moroccan: 'Authentic Moroccan',
    international: 'International',
    diet: 'Diet & Healthy',
    express: 'Express & Quick',
    all: 'All',
    easy: 'Very Easy',
    medium: 'Medium',
    detailed: 'Requires Precision',
    minutes: 'min',
    calories: 'kcal',
    servings: 'servings',
    persons: 'people',
    copied: 'Recipe copied successfully!',
    copy: 'Copy Recipe',
    print: 'Print',
    back: 'Back',
    close: 'Close',
    save: 'Save Recipe',
    saved: 'Saved',
    remove: 'Remove',
    clear: 'Clear All',
    tip: 'Tip',
    warning: 'Warning',
    alert: 'Note',

    consultChefBtn: 'Ask the Chef',
    savedRecipesBtn: 'Saved Recipes',
    featurePhotoAnalysis: 'Fridge & pantry photo analysis',
    featureExactMeasures: 'Exact Moroccan & metric measurements',
    featureNutritionTips: 'Calorie count & clinical nutrition advice',
    languageSelectTitle: 'Switch Language',

    chefWordTitle: 'Chef & Nutritionist Greeting',
    defaultChefGreeting: 'Welcome to the Moroccan Chef & Nutritionist kitchen! Snap a photo of your fridge ingredients or list them, and I will craft delicious, healthy Moroccan and international recipes with precise calories and nutritional advice.',
    askChefDirectly: 'Consult the Chef directly',
    detectedIngredientsLabel: 'Detected Ingredients:',

    tabPhoto: '📸 Photo & Camera',
    tabText: '✍️ Text Input',
    tabTags: '🏷️ Moroccan Pantry',
    uploadTitle: 'Photograph your fridge or pantry ingredients',
    uploadSubtitle: 'Upload one or multiple photos; the Chef automatically detects vegetables, meats, herbs, and pantry staples',
    browseFiles: 'Browse Photos',
    openCamera: 'Open Camera',
    snapPhoto: 'Take Snapshot',
    closeCamera: 'Close Camera',
    cameraActive: 'Camera active, point towards your ingredients',
    cameraAccessError: 'Could not access camera. Please check permissions or upload photos directly.',
    photoTip: '💡 Tip: Clear lighting and showing all ingredients helps identify everything precisely.',
    textInputLabel: 'List the ingredients you have at home:',
    textInputPlaceholder: 'Example: half chicken, 2 onions, tomatoes, potatoes, cilantro, olives, garlic cloves, olive oil...',
    textInputHint: '💡 List whatever you have on hand, even leftovers; the Chef will turn them into a delightful dish.',
    pantryTitle: 'Pick ingredients from the traditional Moroccan pantry:',
    pantrySubtitle: 'Click any ingredient you have in your kitchen to add it to your selection',
    addCustomIngredient: 'Add custom ingredient:',
    addBtn: 'Add',
    customIngredientPlaceholder: 'Ingredient name...',
    selectedCount: 'ingredient(s) selected',

    preferencesTitle: 'Customize recipes to your liking:',
    cuisinePrefLabel: 'Preferred Cooking Style:',
    cuisinePrefAll: 'All Cuisines (Moroccan & International)',
    cuisinePrefMoroccan: '🇲🇦 Authentic Traditional Moroccan',
    cuisinePrefDiet: '🥗 Diet, Low-Calorie & Healthy',
    cuisinePrefExpress: '⚡ Express & Quick (< 25 min)',
    cuisinePrefInternational: '🌍 Easy International Meals',
    servingsLabel: 'Number of Servings:',
    mealTypeLabel: 'Meal Type:',
    mealTypeMain: 'Main Lunch or Dinner',
    mealTypeBreakfast: 'Healthy Breakfast',
    mealTypeDinner: 'Light Dinner',
    mealTypeSoupAppetizer: 'Soup, Salad or Appetizer',
    dietGoalLabel: 'Health & Dietary Goal:',
    dietGoalBalanced: 'Balanced & Healthy for Everyone',
    dietGoalLowCal: 'Weight Loss (Low calorie & low fat)',
    dietGoalHighProtein: 'High Protein for Fitness',
    dietGoalDiabetes: 'Diabetes & Hypertension Friendly',
    dietGoalHeart: 'Cardiovascular Health (EVOO & Fiber)',

    generateRecipesBtn: 'Generate Recipes with Expert Nutritionist',
    generatingRecipes: 'The Chef & Nutritionist are designing your recipes...',
    inputValidationAlert: 'Please upload a photo, enter ingredients, or pick from the pantry list.',
    clearAll: 'Clear All Inputs',

    categoryAll: 'All',
    categoryVegetables: 'Vegetables',
    categoryProteins: 'Proteins & Meats',
    categoryLegumes: 'Legumes & Pulses',
    categoryGrains: 'Grains & Carbs',
    categoryHerbs: 'Fresh Herbs',
    categorySeasonings: 'Seasonings',
    categorySpices: 'Moroccan Spices',
    categoryOils: 'Oils & Fats',
    categoryDairy: 'Dairy & Cheese',

    suggestedRecipesTitle: 'Suggested Recipes',
    suggestedRecipesSubtitle: 'Measured recipes with step-by-step cooking method and nutritional breakdown',
    filterAll: 'All',
    filterMoroccan: '🇲🇦 Moroccan',
    filterDiet: '🥗 Diet & Health',
    filterExpress: '⚡ Express',
    filterInternational: '🌍 International',
    emptyCategoryTitle: 'No recipes found in this category',
    emptyCategorySubtitle: 'Select "All" or generate new recipes using your photos or ingredients.',
    showAllRecipesBtn: 'Show All Recipes',
    viewDetails: 'View Ingredients & Steps',
    startCooking: 'Interactive Cooking Mode',

    modalSubtitle: 'Recipe verified by Clinical Nutritionist',
    totalTime: 'Total Time:',
    prepTime: 'Prep Time:',
    cookTime: 'Cook Time:',
    approxCalories: 'Approx. Calories:',
    difficultyLevel: 'Difficulty:',
    servingsCountLabel: 'Servings:',
    scaledForPersons: 'Adjusted for',
    exactIngredientsTitle: 'Exact Ingredients & Measurements',
    checkIngredientsHint: 'Check off prepared ingredients',
    substituteNote: 'Possible Substitute:',
    spicesTitle: 'Moroccan Spices & Seasoning:',
    stepByStepTitle: 'Step-by-Step Cooking Method',
    liveCookingModeBtn: 'Launch Cooking Mode',
    stepChefTip: 'Chef Tip:',
    nutritionCardTitle: 'Nutritional Value & Clinical Health Advice',
    nutritionCardSubtitle: 'Scientific and practical health benefits of this meal',
    proteinLabel: 'Protein',
    muscleBuilding: 'Muscle growth',
    carbsLabel: 'Carbohydrates',
    bodyEnergy: 'Body energy',
    fatsLabel: 'Healthy Fats',
    healthyOils: 'Olive oil',
    healthBenefitsTitle: 'Key Health Benefits:',
    dietitianAdviceTitle: 'Dietitian Consumption Advice:',
    chefSecretTipTitle: 'Moroccan Chef Secret Touch:',
    storageTipTitle: 'Storage & Reheating:',
    culturalNoteTitle: 'Moroccan Cultural Note:',
    askAboutRecipeBtn: 'Ask the Chef About This Recipe',
    voiceReaderStart: 'Listen to Recipe Audio',
    voiceReaderStop: 'Stop Audio Voice',
    copyFullRecipe: 'Copy Entire Recipe',
    printRecipe: 'Print Recipe Card',

    cookingModeTitle: 'Interactive Audio Cooking Assistant',
    stepOf: 'Step',
    stepTipTitle: 'Chef Tip for this step:',
    timerStart: 'Start Timer',
    timerPause: 'Pause Timer',
    timerReset: 'Reset Timer',
    prevStep: 'Previous Step',
    nextStep: 'Next Step',
    finishCooking: 'Finish & Serve 🎉',
    congratsTitle: 'Bravo! You cooked it to perfection',
    congratsSubtitle: 'Your dish is ready to be served. Bon Appétit / بالصحة والراحة !',
    congratsAdviceReminder: 'Dietitian Reminder:',
    backToRecipe: 'Back to Recipe Details',

    chatTitle: 'Consultation with Chef & Nutritionist',
    chatSubtitle: 'Ask any Moroccan culinary or clinical nutrition question',
    chatWelcome: 'Hello! I am your Moroccan Chef and Certified Nutritionist. Ask me anything: ingredient substitutes, adjustments for diabetes/hypertension, secrets of caramelized onion dghmira, or healthy cooking techniques.',
    chatRecipeContextPrefix: 'Current Recipe:',
    chatQuestionPrompt: 'You are currently viewing the recipe',
    chatPlaceholder: 'Ask the Chef your question (e.g., how to replace preserved lemon?)...',
    chatSend: 'Send',
    chatSending: 'Chef is typing...',
    chatQuickQuestionsTitle: 'Frequently Asked Questions:',
    quickQ1: 'How can I reduce calories and fat in my tajine?',
    quickQ2: 'What can I substitute for preserved lemon if I have none?',
    quickQ3: 'Is this recipe suitable for diabetics?',
    quickQ4: 'How do I get a thick caramelized dghmira without burning the onions?',

    savedDrawerTitle: 'Saved Recipes',
    savedDrawerSubtitle: 'Your favorite recipes bookmarked for future cooking',
    savedEmptyTitle: 'No saved recipes yet',
    savedEmptySubtitle: 'When the Chef suggests recipes you love, bookmark them to access them here anytime.',

    footerCopyright: '🇲🇦 Moroccan Chef & Nutritionist • Easy Moroccan and International recipes',
    footerTagline: 'Calorie calculation & health benefits • Precise measurements and step-by-step guidance',
  },
};
