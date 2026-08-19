import { Recipe } from '../types';
import { Language } from '../i18n/translations';

export interface PantryTagItem {
  id: string;
  name: string;
  category: string;
}

export const SAMPLE_RECIPES_AR: Recipe[] = [
  {
    id: 'sample-tagine-poulet',
    titleAr: 'طاجين الدجاج البلدي بالزيتون والحامض مصير (خفيف وصحي)',
    titleFr: 'Tajine de Poulet au Citron Confit et Olives',
    titleEn: 'Moroccan Chicken Tagine with Preserved Lemon and Olives',
    summaryDarija: 'طاجين مغربي أصيل ومعلك على حقو وطريقو، بنين وخفيف مع دغميرة د البصلة بلا كترة ليدام.',
    category: 'moroccan',
    categoryLabel: 'مغربي أصيل',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    totalTimeText: '55 دقيقة',
    difficulty: 'سهل بزاف',
    servings: 4,
    detectedIngredients: ['دجاج', 'بصلة', 'ثومة', 'حامض مصير', 'زيتون أحمر', 'زيت العود', 'قزبور ومعدنوس'],
    ingredients: [
      { item: 'قطع دجاج (صدر أو فخاض مغسولين بالحامض والملحة)', amount: '600 غرام', notes: 'من الأفضل نزع الجلد لتقليل الدهون' },
      { item: 'بصلة بيضاء مشلظة رقيقة', amount: '2 حبات متوسطين' },
      { item: 'ثومة محكوكة', amount: '3 فصوص' },
      { item: 'قزبور ومعدنوس مقطعين رقاق', amount: '2 معالق كبار' },
      { item: 'حامض مصير (اللب مقطع والقشرة للتزيين)', amount: 'نصف حبة' },
      { item: 'زيتون أحمر مغسول ومسلوق شوية لنقص الملوحة', amount: 'كاس صغير (100 غرام)' },
      { item: 'زيت الزيتون البكر', amount: '3 معالق كبار' },
      { item: 'ماء دافئ للترقاد والمرق', amount: 'كاس عنبة' }
    ],
    spices: [
      { name: 'سكنجبير (زنجبيل مطحون)', amount: 'معلقة صغيرة عامرة' },
      { name: 'خرقوم بلدي (كركم)', amount: 'معلقة صغيرة' },
      { name: 'إبزار (فلفل أسود)', amount: 'نصف معلقة صغيرة' },
      { name: 'زعفران حر مرقد فماء دافي', amount: 'شعيرات قليلة' },
      { name: 'ملحة', amount: 'راس معلقة صغيرة (رد البال للحامض والزيتون مالحين)' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'فإناء، شرمل الدجاج مع الثومة، القزبور والمعدنوس، سكنجبير، الخرقوم البلدي، الإبزار، شوية الزعفران، لب الحامض المصير، و 2 معالق د الماء. خليه يشرب الشرمولة 10 دقيق.',
        tip: 'كلما شرب الدجاج الشرمولة كيجي رطب وبنين كتر.',
        durationMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'فالطاجين أو الكاميلة، دير معلقة د زيت العود والبصلة المشلظة، حط الدجاج وخليه يتشحر على عافية مهيلة مدة 5 إلى 7 دقائق مع التقليب حتى تدبال البصلة.',
        tip: 'ما تقليش على عافية مجهدة باش ما تحرقش العطرية.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'زيد كاس صغير د الماء دافئ من الجنب ديال الطاجين، غطي الطاجين وخليه يطيب على عافية مهيلة بزاف مدة 30 دقيقة.',
        durationMinutes: 30
      },
      {
        stepNumber: 4,
        instruction: 'منين يقرب يطيب، زيد الزيتون الأحمر وقشور الحامض المصير، وخلي المريقة تختار وتولي دغميرة معلكة ولذيذة بلا ما تنشف كاع.',
        tip: 'إيلا كان باقي المرق بزاف، عري الطاجين 5 دقائق باش تختار المريقة.',
        durationMinutes: 8
      }
    ],
    nutrition: {
      caloriesApprox: 380,
      proteinGrams: 36,
      carbsGrams: 12,
      fatsGrams: 20,
      fiberGrams: 4,
      healthBenefit: 'غني بالبروتين الصافي لبناء العضلات، الكركم والزنجبيل مضادات قوية للالتهاب وتحسين الهضم، وزيت الزيتون كيحمي صحة القلب والشرايين.',
      dietitianAdvice: 'وجبة متكاملة وصحية جداً. كلوها مع خبز القمح الكامل أو الشعير، وحاولوا ما تكتروش من الخبز باش تحافظوا على سعرات متوازنة.'
    },
    chefTip: 'باش تجي الدغميرة صفرا ودهبية وبنينة، ديرو شعيرات الزعفران الحر فماء دافي هو اللول قبل ما تشرملو.',
    storageTip: 'كيبقى فالثلاجة حتى لـ 3 أيام، ومنين تسخنوه زيدو نقيطة د الماء دافي.',
    culturalNote: 'طاجين الدجاج هو سيد المائدة المغربية فالضيافة والغدا العائلي، ومعروف بخفتو ومداقو المتوازن.'
  },
  {
    id: 'sample-zaalouk-diet',
    titleAr: 'زعلوك الدنجال المشوي الصحي (بدون قلي ولذيذ بزاف)',
    titleFr: 'Zaalouk d\'Aubergines Grillées Light & Sain',
    titleEn: 'Healthy Roasted Eggplant Zaalouk (Light & Low-Oil)',
    summaryDarija: 'مقبلة مغربية شهيرة مشوية فالفران أو فوق البوطة، خفيفة على المعدة وغنية بالألياف ومثالية للريجيم.',
    category: 'diet',
    categoryLabel: 'ريجيم وصحي',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeText: '30 دقيقة',
    difficulty: 'سهل بزاف',
    servings: 4,
    detectedIngredients: ['دنجال', 'مطيشة', 'ثومة', 'قزبور ومعدنوس', 'زيت العود', 'كمون', 'تحميرة'],
    ingredients: [
      { item: 'دنجال (باذنجان)', amount: '2 حبات كبار (حوالي 500 غرام)', notes: 'مشوي ومنقي ومقطع رقيق' },
      { item: 'مطيشة محكوكة (طماطم)', amount: '2 حبات متوسطين' },
      { item: 'ثومة محكوكة', amount: '3 فصوص كبار' },
      { item: 'قزبور ومعدنوس مقطعين رقاق', amount: '3 معالق كبار' },
      { item: 'زيت الزيتون', amount: '2 معالق كبار فقط' },
      { item: 'عصير حامض', amount: 'معلقة كبيرة' }
    ],
    spices: [
      { name: 'كمون بلدي مطحون', amount: 'معلقة صغيرة' },
      { name: 'تحميرة (بابريكا حلوة)', amount: 'معلقة صغيرة' },
      { name: 'سودانية حارة (اختياري)', amount: 'راس معلقة صغيرة' },
      { name: 'ملحة', amount: 'نصف معلقة صغيرة' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'شوي الدنجال فوق البوطة أو فالفران حتى ترطاب القشرة ويولي زبدة، ديرو فكيس بلاستيكي 5 دقائق باش يسهل تنقيتو، من بعد نقيه وقطعو بالموس رقيق.',
        tip: 'الشوي فوق البوطة كيعطي داك المذاق المدخن (Fumé) الرهيب.',
        durationMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'فمقلاة، حط مطيشة المحكوكة مع الثومة، معلقة د زيت العود، التحميرة، الكمون، والملحة، وخليها تطيب وتشرب ماءها مدة 7 دقائق.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'زيد الدنجال المقطع والقزبور والمعدنوس، وبرّك عليه بالفرشيطة أو المغرفة وأنت كتحرك حتى يتجانس مزيان مع لاصوص مطيشة.',
        durationMinutes: 6
      },
      {
        stepNumber: 4,
        instruction: 'طفي العافية، وزيد معلقة زيت العود اللي بقات مع عصرة حامض طري، وقدمو دافئ أو بارد.',
        tip: 'زيت الزيتون ملي كيتزاد فاللخر كيحافظ على الفوائد والنكهة الطرية.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 110,
      proteinGrams: 3,
      carbsGrams: 14,
      fatsGrams: 5,
      fiberGrams: 7,
      healthBenefit: 'الباذنجان غني بمضادات الأكسدة (الناسونين) اللي كتحمي خلايا الدماغ، وعالي بزاف فالألياف اللي كتعطي إحساس طويل بالشبع وتخفض الكولسترول الضار.',
      dietitianAdvice: 'ممتاز كوجبة عشاء خفيفة أو مقبلة مشبعة فأنظمة إنقاص الوزن، وكيناسب أصحاب السكري ومرضى الضغط.'
    },
    chefTip: 'إيلا بغيتي زعلوك كريمي بلا دهون، معسو بالفرشيطة وهو سخون وخليه يشرب شرمولة مطيشة مزيان.',
    storageTip: 'كيصبر فالثلاجة فعلبة زجاجية حتى لـ 5 أيام.'
  },
  {
    id: 'sample-soup-hrira-light',
    titleAr: 'شوربة الخضار والشوفان السريعة على الطريقة المغربية',
    titleFr: 'Soupe Légère aux Légumes et Flocons d\'Avoine',
    titleEn: 'Quick Moroccan Vegetable & Rolled Oats Soup',
    summaryDarija: 'حسوة/شوربة مغذية وسخونة بالخضرة الطرية والشوفان والكرافس، كتدفي وتشبع وسريعة التحضير فـ 25 دقيقة.',
    category: 'express',
    categoryLabel: 'سريع وخفيف',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeText: '25 دقيقة',
    difficulty: 'سهل بزاف',
    servings: 4,
    detectedIngredients: ['خيزو', 'قرعة خضرا', 'بصلة', 'كرافس', 'شوفان', 'زيت العود', 'خرقوم', 'سكنجبير'],
    ingredients: [
      { item: 'خيزو (جزر) محكوك رقيق', amount: '2 حبات' },
      { item: 'قرعة خضرا (كوسة) محكوكة رقيقة', amount: '2 حبات' },
      { item: 'بصلة صغيرة مشلظة', amount: '1 حبة' },
      { item: 'كرافس ومعدنوس مقطعين رقاق', amount: '3 معالق كبار' },
      { item: 'رقائق الشوفان الكامل', amount: 'كاس عنبة (80 غرام)' },
      { item: 'زيت الزيتون', amount: '2 معالق كبار' },
      { item: 'ماء مغلي', amount: '1 لتر' }
    ],
    spices: [
      { name: 'خرقوم بلدي (كركم)', amount: 'معلقة صغيرة' },
      { name: 'سكنجبير طري أو غبرة', amount: 'معلقة صغيرة' },
      { name: 'إبزار', amount: 'نصف معلقة صغيرة' },
      { name: 'ملحة', amount: 'معلقة صغيرة ممسوحة' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'فكوكوط أو طنجرة، دير زيت الزيتون مع البصلة المشلظة، خيزو المحكوك، والقرعة الخضرا، وشحرهم خفيف مدة 4 دقائق.',
        durationMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'زيد الكرافس والمعدنوس، العطرية (الخرقوم، سكنجبير، الإبزار والملحة)، وخوي لتر من الماء المغلي.',
        durationMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'خلي الخضرة تغلى 8 دقائق، من بعد زيد الشوفان تدريجياً وأنت كتحرك باش ما يتكتلش.',
        tip: 'الشوفان كيعقد الشوربة طبيعياً بلا ما نحتاجو فورص أو نشا.',
        durationMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'خليها تغلى على عافية مهيلة 5 دقائق أخرى مع التحريك حتى تولي الشوربة خائرة ومتجانسة، وقدمها سخونة مع عصرة حامض.',
        durationMinutes: 5
      }
    ],
    nutrition: {
      caloriesApprox: 160,
      proteinGrams: 6,
      carbsGrams: 24,
      fatsGrams: 5,
      fiberGrams: 5,
      healthBenefit: 'الشوفان غني بألياف البيتا-جلوكان المخفضة للسكر والكولسترول، والكرافس والخضار كينقاو الجسم من السموم وكيقويو المناعة ففصل الشتاء.',
      dietitianAdvice: 'وجبة عشاء خفيفة ومثالية كتعطي الراحة للمصران وتساعد على النوم الهادئ والهضم السلس.'
    },
    chefTip: 'رشة خفيفة د الزعتر أو فليو فالأخير كتعطي نكهة مغربية جبلية واعرة بزاف.',
    storageTip: 'يمكن الاحتفاظ بها يومين فالثلاجة، وإيلا عقادت زيدي شوية ماء سخون.'
  },
  {
    id: 'sample-pasta-mediterranean',
    titleAr: 'باستا البحر الأبيض المتوسط بالطماطم والريحان والجبن الخفيف',
    titleFr: 'Pâtes Méditerranéennes Express aux Tomates et Basilic',
    titleEn: 'Mediterranean Express Pasta with Tomatoes, Basil & Light Mozzarella',
    summaryDarija: 'وصفة عالمية سهلة وسريعة فـ 15 دقيقة، بنكهة متوسطية منعشة ومكونات متوفرة فكل كوزينة.',
    category: 'international',
    categoryLabel: 'عالمي وسريع',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeText: '15 دقيقة',
    difficulty: 'سهل بزاف',
    servings: 2,
    detectedIngredients: ['باستا/مقرونية', 'مطيشة سوريز أو طرية', 'ثومة', 'حبق/ريحان', 'زيت العود', 'جبن موزاريلا أو فرماج أحمر'],
    ingredients: [
      { item: 'باستا (بيني، سباغيتي، أو فوزيلي من القمح الكامل)', amount: '180 غرام' },
      { item: 'طماطم كرزية (سوريز) أو طماطم مقطعة طريفات', amount: '200 غرام' },
      { item: 'ثومة مقطعة شرائح رقيقة', amount: '2 فصوص' },
      { item: 'أوراق الريحان الطري (الحبق) أو زعتر مجفف', amount: 'كمشة يد' },
      { item: 'زيت الزيتون', amount: '2 معالق كبار' },
      { item: 'جبن موزاريلا خفيف أو بارميزان محكوك', amount: '30 غرام' }
    ],
    spices: [
      { name: 'ملحة لسلق الباستا وللصلصة', amount: 'معلقة صغيرة' },
      { name: 'إبزار طازج مطحون', amount: 'نصف معلقة صغيرة' },
      { name: 'فلفل حار مجروش (اختياري)', amount: 'رشة خفيفة' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'سلق الباستا فماء غليان مملح حسب الوقت المكتوب فالعلبة (حوالي 8-9 دقائق) حتى تبقى شادة فراسها (Al dente). احتفظ بنصف كاس من ماء السلق.',
        tip: 'ماء سلق الباستا هو السر باش الصلصة تلصق فالمقرونية وتجي معلكة.',
        durationMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'فمقلاة سخونة، دير زيت الزيتون وشرائح الثومة على عافية مهيلة دقيقة واحدة حتى تطلع الريحة بلا ما تحمر بزاف.',
        durationMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'زيد الطماطم والملحة والإبزار، وخليها حتى تبدا تفركع وتطلق المرق ديالها مدة 4 دقائق.',
        durationMinutes: 4
      },
      {
        stepNumber: 4,
        instruction: 'صفي الباستا وخلطها فالمقلاة مع لاصوص، زيد 3 معالق من ماء السلق وأوراق الريحان والجبن، خلط كولشي بسرعة وقدمها مباشرة.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 390,
      proteinGrams: 14,
      carbsGrams: 62,
      fatsGrams: 9,
      fiberGrams: 6,
      healthBenefit: 'الطماطم غنية بمادة الليكوبين المضادة للأكسدة، والباستـا الكاملة كتوفر طاقة بطيئة الامتصاص كتناسب الرياضيين والنشاط اليومي.',
      dietitianAdvice: 'باش تكون الوجبة متوازنة أكتر، زيدو معها شوية علبة تونة طبيعية أو صدور دجاج مشوية، ورافقوها بسلطة خضراء طازجة.'
    },
    chefTip: 'ما تشللش الباستا بالماء البارد منين تصفيها، باش النشا يبقى فيها ويلصق فيه لاصوص.',
    storageTip: 'من الأفضل أكلها طازجة، وإيلا بقات سخنها فالمقلاة مع نقيطة د زيت العود.'
  }
];

export const SAMPLE_RECIPES_FR: Recipe[] = [
  {
    id: 'sample-tagine-poulet',
    titleAr: 'Tajine de Poulet Beldi au Citron Confit et Olives Rouges',
    titleFr: 'Tajine de Poulet au Citron Confit et Olives',
    titleEn: 'Moroccan Chicken Tagine with Preserved Lemon and Olives',
    summaryDarija: 'Tajine marocain traditionnel mijoté avec une sauce onctueuse (dghmira), relevé au citron confit et huile d\'olive vierge.',
    category: 'moroccan',
    categoryLabel: 'Marocain Authentique',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    totalTimeText: '55 min',
    difficulty: 'Très Facile',
    servings: 4,
    detectedIngredients: ['Poulet', 'Oignon', 'Ail', 'Citron confit', 'Olives rouges', 'Huile d\'olive', 'Coriandre & Persil'],
    ingredients: [
      { item: 'Morceaux de poulet fermier (blancs ou cuisses lavés au citron)', amount: '600 g', notes: 'Retirer la peau pour limiter les lipides' },
      { item: 'Oignons blancs émincés finement', amount: '2 pièces moyennes' },
      { item: 'Gousses d\'ail râpées', amount: '3 gousses' },
      { item: 'Coriandre et persil frais hachés', amount: '2 c. à soupe' },
      { item: 'Citron confit (pulpe hachée, écorce pour garnir)', amount: '1/2 pièce' },
      { item: 'Olives rouges dessalées', amount: '100 g' },
      { item: 'Huile d\'olive extra vierge', amount: '3 c. à soupe' },
      { item: 'Eau tiède pour le mijotage', amount: '150 ml' }
    ],
    spices: [
      { name: 'Gingembre moulu', amount: '1 c. à café bombée' },
      { name: 'Curcuma pur (Kharkoum)', amount: '1 c. à café' },
      { name: 'Poivre noir moulu', amount: '1/2 c. à café' },
      { name: 'Safran pur infusé dans l\'eau tiède', amount: 'Quelques filaments' },
      { name: 'Sel fin', amount: '1 pincée (attention au citron et olives salés)' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Dans un récipient, faites mariner le poulet avec l\'ail, les herbes, le gingembre, le curcuma, le poivre, le safran et la pulpe de citron confit avec 2 c. à soupe d\'eau. Laissez reposer 10 min.',
        tip: 'Plus la marinade repose, plus la chair du poulet s\'attendrit.',
        durationMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'Dans le tajine ou une cocotte, faites chauffer 1 c. à soupe d\'huile d\'olive, ajoutez les oignons et le poulet mariné. Faites suer à feu doux 5 à 7 min en retournant les morceaux.',
        tip: 'Cuire à feu doux pour préserver les arômes des épices.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Versez l\'eau tiède sur les côtés du tajine, couvrez hermétiquement et laissez mijoter à feu très doux pendant 30 minutes.',
        durationMinutes: 30
      },
      {
        stepNumber: 4,
        instruction: 'Ajoutez les olives et l\'écorce de citron confit. Laissez réduire la sauce 8 min à découvert pour obtenir une dghmira onctueuse et dorée.',
        tip: 'La sauce doit napper délicatement le poulet sans être liquide.',
        durationMinutes: 8
      }
    ],
    nutrition: {
      caloriesApprox: 380,
      proteinGrams: 36,
      carbsGrams: 12,
      fatsGrams: 20,
      fiberGrams: 4,
      healthBenefit: 'Riche en protéines nobles, en curcumine anti-inflammatoire et en acides gras mono-insaturés protecteurs du système cardiovasculaire.',
      dietitianAdvice: 'Plat complet et équilibré. À déguster de préférence avec du pain complet ou d\'orge avec modération pour gérer l\'index glycémique.'
    },
    chefTip: 'Infusez les pistils de safran dans un peu d\'eau tiède avant de les mélanger à la chermoula pour une couleur éclatante.',
    storageTip: 'Se conserve 3 jours au réfrigérateur. Ajoutez un filet d\'eau lors du réchauffage.'
  },
  {
    id: 'sample-zaalouk-diet',
    titleAr: 'Zaalouk d\'Aubergines Grillées Light',
    titleFr: 'Zaalouk d\'Aubergines Grillées Light & Minceur',
    titleEn: 'Healthy Roasted Eggplant Zaalouk',
    summaryDarija: 'Caviar d\'aubergines marocain grillé sans friture, riche en fibres et idéal pour une alimentation légère et équilibrée.',
    category: 'diet',
    categoryLabel: 'Régime & Santé',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeText: '30 min',
    difficulty: 'Très Facile',
    servings: 4,
    detectedIngredients: ['Aubergine', 'Tomate', 'Ail', 'Coriandre & Persil', 'Huile d\'olive', 'Cumin', 'Paprika'],
    ingredients: [
      { item: 'Aubergines fermes', amount: '2 grosses (500 g)', notes: 'Grillées, pelées et concassées' },
      { item: 'Tomates fraîches râpées', amount: '2 pièces' },
      { item: 'Gousses d\'ail pilées', amount: '3 gousses' },
      { item: 'Coriandre et persil hachés', amount: '3 c. à soupe' },
      { item: 'Huile d\'olive vierge', amount: '2 c. à soupe seulement' },
      { item: 'Jus de citron frais', amount: '1 c. à soupe' }
    ],
    spices: [
      { name: 'Cumin moulu', amount: '1 c. à café' },
      { name: 'Paprika doux', amount: '1 c. à café' },
      { name: 'Piment de Cayenne (facultatif)', amount: '1 pincée' },
      { name: 'Sel fin', amount: '1/2 c. à café' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Grillez les aubergines au four ou sur la flamme jusqu\'à ce que la peau noircisse. Enfermez-les 5 min dans un sachet pour peler facilement, puis hachez la chair.',
        durationMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'Dans une poêle, faites revenir les tomates râpées avec l\'ail, 1 c. à soupe d\'huile d\'olive, le paprika, le cumin et le sel pendant 7 min.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Ajoutez les aubergines concassées et les herbes. Écrasez à la fourchette en mélangeant jusqu\'à absorption complète de l\'eau.',
        durationMinutes: 6
      },
      {
        stepNumber: 4,
        instruction: 'Hors du feu, incorporez la dernière cuillère d\'huile d\'olive crue et le jus de citron. Servez tiède ou frais.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 110,
      proteinGrams: 3,
      carbsGrams: 14,
      fatsGrams: 5,
      fiberGrams: 7,
      healthBenefit: 'Très riche en nasunine antioxydante et en fibres solubles facilitant le transit intestinal et régulant la glycémie.',
      dietitianAdvice: 'Parfait en entrée rassasiante ou accompagnement léger pour les régimes hypocaloriques et les diabétiques.'
    },
    chefTip: 'Griller les aubergines sur la flamme directe apporte une note fumée caractéristique des grands restaurants marocains.',
    storageTip: 'Se conserve 5 jours dans une boîte hermétique en verre au frais.'
  },
  {
    id: 'sample-soup-hrira-light',
    titleAr: 'Soupe Légère aux Légumes & Avoine',
    titleFr: 'Soupe Marocaine Détox aux Légumes et Flocons d\'Avoine',
    titleEn: 'Quick Moroccan Vegetable & Oat Soup',
    summaryDarija: 'Soupe réconfortante et rassasiante aux légumes frais, céleri et avoine complète, prête en 25 minutes sans farine ajoutée.',
    category: 'express',
    categoryLabel: 'Express & Léger',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeText: '25 min',
    difficulty: 'Très Facile',
    servings: 4,
    detectedIngredients: ['Carotte', 'Courgette', 'Oignon', 'Céleri', 'Flocons d\'avoine', 'Huile d\'olive', 'Curcuma', 'Gingembre'],
    ingredients: [
      { item: 'Carottes râpées finement', amount: '2 pièces' },
      { item: 'Courgettes râpées finement', amount: '2 pièces' },
      { item: 'Oignon émincé', amount: '1 pièce' },
      { item: 'Céleri et persil hachés', amount: '3 c. à soupe' },
      { item: 'Flocons d\'avoine complète', amount: '80 g' },
      { item: 'Huile d\'olive vierge', amount: '2 c. à soupe' },
      { item: 'Eau bouillante', amount: '1 litre' }
    ],
    spices: [
      { name: 'Curcuma moulu', amount: '1 c. à café' },
      { name: 'Gingembre moulu', amount: '1 c. à café' },
      { name: 'Poivre noir', amount: '1/2 c. à café' },
      { name: 'Sel fin', amount: '1 c. à café rase' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Dans une casserole, faites suer l\'oignon, les carottes et courgettes râpées avec l\'huile d\'olive pendant 4 min.',
        durationMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Ajoutez le céleri, les épices et versez 1 litre d\'eau bouillante.',
        durationMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Laissez bouillir 8 min, puis incorporez les flocons d\'avoine en pluie en remuant pour éviter les grumeaux.',
        durationMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'Laissez épaissir 5 min à feu doux. Servez bien chaud avec un filet de jus de citron.',
        durationMinutes: 5
      }
    ],
    nutrition: {
      caloriesApprox: 160,
      proteinGrams: 6,
      carbsGrams: 24,
      fatsGrams: 5,
      fiberGrams: 5,
      healthBenefit: 'L\'avoine apporte des bêta-glucanes qui abaissent le cholestérol sanguin et favorisent la satiété prolongée.',
      dietitianAdvice: 'Un dîner réconfortant idéal pour soulager le système digestif et favoriser un sommeil réparateur.'
    },
    chefTip: 'Une pincée d\'origan sauvage (Zaatar) en fin de cuisson sublime le goût rustique de cette soupe.',
    storageTip: 'Se conserve 2 jours au frais. Ajoutez un peu d\'eau chaude lors du réchauffage.'
  },
  {
    id: 'sample-pasta-mediterranean',
    titleAr: 'Pâtes Méditerranéennes aux Tomates & Basilic',
    titleFr: 'Pâtes Méditerranéennes Express aux Tomates et Basilic',
    titleEn: 'Mediterranean Express Pasta with Tomatoes, Basil & Mozzarella',
    summaryDarija: 'Plat international équilibré prêt en 15 minutes, aux saveurs fraîches de tomates cerises, basilic et huile d\'olive.',
    category: 'international',
    categoryLabel: 'International',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeText: '15 min',
    difficulty: 'Très Facile',
    servings: 2,
    detectedIngredients: ['Pâtes complètes', 'Tomates cerises', 'Ail', 'Basilic frais', 'Huile d\'olive', 'Mozzarella légère'],
    ingredients: [
      { item: 'Pâtes au blé complet (Penne ou Fusilli)', amount: '180 g' },
      { item: 'Tomates cerises coupées en deux', amount: '200 g' },
      { item: 'Gousses d\'ail émincées en lamelles', amount: '2 pièces' },
      { item: 'Feuilles de basilic frais', amount: '1 poignée' },
      { item: 'Huile d\'olive extra vierge', amount: '2 c. à soupe' },
      { item: 'Mozzarella allégée ou parmesan', amount: '30 g' }
    ],
    spices: [
      { name: 'Sel pour l\'eau de cuisson et la sauce', amount: '1 c. à café' },
      { name: 'Poivre noir du moulin', amount: '1/2 c. à café' },
      { name: 'Flocons de piment rouge (facultatif)', amount: '1 pincée' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Faites cuire les pâtes dans un grand volume d\'eau bouillante salée selon les indications (al dente). Réservez 1/2 verre d\'eau de cuisson.',
        durationMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'Dans une poêle chaude, faites chauffer l\'huile d\'olive et dorer l\'ail 1 min sans le brûler.',
        durationMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Ajoutez les tomates, le sel et le poivre. Laissez compoter 4 min à feu vif.',
        durationMinutes: 4
      },
      {
        stepNumber: 4,
        instruction: 'Égouttez les pâtes et mélangez-les dans la poêle avec l\'eau de cuisson réservée, le basilic et le fromage. Servez aussitôt.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 390,
      proteinGrams: 14,
      carbsGrams: 62,
      fatsGrams: 9,
      fiberGrams: 6,
      healthBenefit: 'Les tomates cuites libèrent du lycopène hautement assimilable, et les glucides complexes procurent une énergie durable.',
      dietitianAdvice: 'Pour un repas complet, accompagnez d\'une source de protéines maigres (thon au naturel ou blanc de poulet grillé).'
    },
    chefTip: 'Ne rincez jamais vos pâtes à l\'eau froide afin que l\'amidon naturel lie parfaitement la sauce.',
    storageTip: 'À déguster immédiatement pour apprécier toute la fraîcheur du basilic.'
  }
];

export const SAMPLE_RECIPES_EN: Recipe[] = [
  {
    id: 'sample-tagine-poulet',
    titleAr: 'Moroccan Chicken Tagine with Preserved Lemon & Red Olives',
    titleFr: 'Tajine de Poulet au Citron Confit et Olives',
    titleEn: 'Moroccan Chicken Tagine with Preserved Lemon and Olives',
    summaryDarija: 'Authentic Moroccan slow-cooked chicken tagine with silky caramelized onion gravy (dghmira), tangy preserved lemon, and virgin olive oil.',
    category: 'moroccan',
    categoryLabel: 'Authentic Moroccan',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    totalTimeText: '55 min',
    difficulty: 'Very Easy',
    servings: 4,
    detectedIngredients: ['Chicken', 'Onion', 'Garlic', 'Preserved lemon', 'Red olives', 'Olive oil', 'Cilantro & Parsley'],
    ingredients: [
      { item: 'Free-range chicken cuts (breasts or thighs)', amount: '600 g', notes: 'Skin removed for lower saturated fat' },
      { item: 'White onions, finely sliced', amount: '2 medium' },
      { item: 'Grated garlic cloves', amount: '3 cloves' },
      { item: 'Fresh cilantro and parsley, finely chopped', amount: '2 tbsp' },
      { item: 'Preserved lemon (pulp diced, rind for garnish)', amount: '1/2 whole' },
      { item: 'Rinsed red or green olives', amount: '100 g' },
      { item: 'Extra virgin olive oil', amount: '3 tbsp' },
      { item: 'Warm water for simmering', amount: '150 ml' }
    ],
    spices: [
      { name: 'Ground ginger', amount: '1 heaped tsp' },
      { name: 'Ground turmeric', amount: '1 tsp' },
      { name: 'Black pepper', amount: '1/2 tsp' },
      { name: 'Pure saffron threads infused in warm water', amount: 'A pinch' },
      { name: 'Salt', amount: '1 pinch (olives and lemon are already salty)' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'In a bowl, marinate chicken with garlic, chopped herbs, ginger, turmeric, black pepper, saffron water, preserved lemon pulp, and 2 tbsp water. Let rest 10 min.',
        tip: 'The longer it marinates, the more flavorful and tender the chicken will be.',
        durationMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: 'In a tagine or pot, heat 1 tbsp olive oil, add sliced onions and marinated chicken. Sauté gently on low heat for 5-7 min until onions soften.',
        tip: 'Cook on low heat to avoid scorching delicate spices.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Pour warm water around the edges of the tagine, cover tightly, and simmer on very low heat for 30 minutes.',
        durationMinutes: 30
      },
      {
        stepNumber: 4,
        instruction: 'Add olives and preserved lemon peel. Uncover and let the sauce thicken for 8 min until a glossy, rich dghmira gravy forms.',
        tip: 'The sauce should be thick and coat the back of a spoon.',
        durationMinutes: 8
      }
    ],
    nutrition: {
      caloriesApprox: 380,
      proteinGrams: 36,
      carbsGrams: 12,
      fatsGrams: 20,
      fiberGrams: 4,
      healthBenefit: 'Packed with lean high-quality protein for muscle repair, potent anti-inflammatory curcumin & gingerol, and heart-healthy monounsaturated fats.',
      dietitianAdvice: 'A balanced, nutrient-dense meal. Best paired with whole wheat or barley bread in moderation to manage glycemic load.'
    },
    chefTip: 'Steep saffron threads in warm water first before adding to the chermoula for a vibrant golden color and deep aroma.',
    storageTip: 'Keeps well in the fridge for up to 3 days. Add a splash of warm water when reheating.'
  },
  {
    id: 'sample-zaalouk-diet',
    titleAr: 'Healthy Roasted Eggplant Zaalouk',
    titleFr: 'Zaalouk d\'Aubergines Grillées Light',
    titleEn: 'Healthy Roasted Eggplant Zaalouk (Low-Oil Diet)',
    summaryDarija: 'Famous Moroccan smoky eggplant dip, roasted without frying, high in dietary fiber and ideal for healthy weight management.',
    category: 'diet',
    categoryLabel: 'Diet & Healthy',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeText: '30 min',
    difficulty: 'Very Easy',
    servings: 4,
    detectedIngredients: ['Eggplant', 'Tomato', 'Garlic', 'Cilantro & Parsley', 'Olive oil', 'Cumin', 'Paprika'],
    ingredients: [
      { item: 'Firm eggplants', amount: '2 large (500 g)', notes: 'Roasted, peeled and chopped' },
      { item: 'Grated fresh tomatoes', amount: '2 medium' },
      { item: 'Minced garlic cloves', amount: '3 cloves' },
      { item: 'Fresh chopped parsley and cilantro', amount: '3 tbsp' },
      { item: 'Extra virgin olive oil', amount: '2 tbsp total' },
      { item: 'Fresh lemon juice', amount: '1 tbsp' }
    ],
    spices: [
      { name: 'Ground cumin', amount: '1 tsp' },
      { name: 'Sweet paprika', amount: '1 tsp' },
      { name: 'Cayenne pepper (optional)', amount: '1 pinch' },
      { name: 'Salt', amount: '1/2 tsp' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Roast eggplants over an open flame or in the oven until tender and charred. Place in a sealed bag for 5 min to peel easily, then finely chop.',
        durationMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: 'In a skillet, simmer grated tomatoes with garlic, 1 tbsp olive oil, paprika, cumin, and salt for 7 min until the liquid reduces.',
        durationMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: 'Add the chopped eggplant and fresh herbs. Mash gently with a fork while stirring until thoroughly combined and thick.',
        durationMinutes: 6
      },
      {
        stepNumber: 4,
        instruction: 'Remove from heat, drizzle the remaining raw olive oil and lemon juice. Serve warm or chilled.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 110,
      proteinGrams: 3,
      carbsGrams: 14,
      fatsGrams: 5,
      fiberGrams: 7,
      healthBenefit: 'Eggplants provide nasunin antioxidants protecting cell membranes, while abundant soluble fibers support gut health and blood sugar stability.',
      dietitianAdvice: 'An exceptional low-calorie, nutrient-dense appetizer or light dinner component for diabetes and weight-loss regimens.'
    },
    chefTip: 'Roasting directly on a gas flame gives that signature wood-fired smoky aroma.',
    storageTip: 'Store in an airtight glass container in the refrigerator for up to 5 days.'
  },
  {
    id: 'sample-soup-hrira-light',
    titleAr: 'Moroccan Quick Vegetable & Oat Soup',
    titleFr: 'Soupe Légère aux Légumes et Avoine',
    titleEn: 'Moroccan Quick Vegetable & Oat Detox Soup',
    summaryDarija: 'Warming, fiber-rich Moroccan vegetable soup thickened naturally with rolled oats and fragrant celery, ready in 25 minutes.',
    category: 'express',
    categoryLabel: 'Express & Quick',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    totalTimeText: '25 min',
    difficulty: 'Very Easy',
    servings: 4,
    detectedIngredients: ['Carrots', 'Zucchini', 'Onion', 'Celery', 'Rolled oats', 'Olive oil', 'Turmeric', 'Ginger'],
    ingredients: [
      { item: 'Finely grated carrots', amount: '2 pieces' },
      { item: 'Finely grated zucchini', amount: '2 pieces' },
      { item: 'Finely diced onion', amount: '1 piece' },
      { item: 'Chopped celery and parsley', amount: '3 tbsp' },
      { item: 'Whole rolled oats', amount: '80 g' },
      { item: 'Extra virgin olive oil', amount: '2 tbsp' },
      { item: 'Boiling water', amount: '1 liter' }
    ],
    spices: [
      { name: 'Ground turmeric', amount: '1 tsp' },
      { name: 'Ground ginger', amount: '1 tsp' },
      { name: 'Black pepper', amount: '1/2 tsp' },
      { name: 'Salt', amount: '1 level tsp' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'In a pot, sauté diced onion, grated carrots, and zucchini in olive oil for 4 minutes until softened.',
        durationMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: 'Add celery, parsley, turmeric, ginger, pepper, salt, and pour 1 liter of boiling water.',
        durationMinutes: 3
      },
      {
        stepNumber: 3,
        instruction: 'Simmer for 8 min, then stir in rolled oats gradually while stirring to prevent clumping.',
        durationMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: 'Simmer on low heat for 5 more minutes until the soup is velvety and rich. Serve hot with a squeeze of fresh lemon.',
        durationMinutes: 5
      }
    ],
    nutrition: {
      caloriesApprox: 160,
      proteinGrams: 6,
      carbsGrams: 24,
      fatsGrams: 5,
      fiberGrams: 5,
      healthBenefit: 'Beta-glucan fibers in oats help reduce LDL cholesterol, while celery and turmeric detoxify the body and enhance immunity.',
      dietitianAdvice: 'A light, soothing dinner that eases digestive strain and promotes restful sleep.'
    },
    chefTip: 'A pinch of wild dried oregano (Zaatar) at the very end adds an authentic mountain aroma.',
    storageTip: 'Keep refrigerated for up to 2 days. Reheat with a splash of hot water if it thickens.'
  },
  {
    id: 'sample-pasta-mediterranean',
    titleAr: 'Mediterranean 15-Minute Tomato & Basil Pasta',
    titleFr: 'Pâtes Méditerranéennes Express',
    titleEn: 'Mediterranean 15-Minute Tomato, Basil & Mozzarella Pasta',
    summaryDarija: 'Quick international weeknight meal ready in 15 minutes, featuring fresh cherry tomatoes, garlic, basil, and whole wheat pasta.',
    category: 'international',
    categoryLabel: 'International',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeText: '15 min',
    difficulty: 'Very Easy',
    servings: 2,
    detectedIngredients: ['Whole wheat pasta', 'Cherry tomatoes', 'Garlic', 'Fresh basil', 'Olive oil', 'Light mozzarella'],
    ingredients: [
      { item: 'Whole wheat penne or fusilli pasta', amount: '180 g' },
      { item: 'Halved cherry tomatoes', amount: '200 g' },
      { item: 'Thinly sliced garlic cloves', amount: '2 cloves' },
      { item: 'Fresh basil leaves', amount: '1 handful' },
      { item: 'Extra virgin olive oil', amount: '2 tbsp' },
      { item: 'Light mozzarella or shaved parmesan', amount: '30 g' }
    ],
    spices: [
      { name: 'Salt for pasta water & sauce', amount: '1 tsp' },
      { name: 'Freshly cracked black pepper', amount: '1/2 tsp' },
      { name: 'Red pepper chili flakes (optional)', amount: '1 pinch' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Cook pasta in salted boiling water until al dente (about 8-9 min). Reserve 1/2 cup of starchy pasta water.',
        durationMinutes: 8
      },
      {
        stepNumber: 2,
        instruction: 'In a skillet, warm olive oil and sliced garlic over medium heat for 1 minute until fragrant.',
        durationMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: 'Add cherry tomatoes, salt, and pepper. Cook for 4 min until tomatoes burst and form a rich sauce.',
        durationMinutes: 4
      },
      {
        stepNumber: 4,
        instruction: 'Toss drained pasta into the skillet along with reserved pasta water, fresh basil, and cheese. Serve immediately.',
        durationMinutes: 2
      }
    ],
    nutrition: {
      caloriesApprox: 390,
      proteinGrams: 14,
      carbsGrams: 62,
      fatsGrams: 9,
      fiberGrams: 6,
      healthBenefit: 'Cooked tomatoes provide bioavailable lycopene for cellular protection, while complex carbohydrates fuel sustained athletic stamina.',
      dietitianAdvice: 'Pair with lean grilled chicken breast or light tuna and a crisp green salad for a perfectly balanced macronutrient meal.'
    },
    chefTip: 'Never rinse cooked pasta with cold water; the surface starch is what binds the sauce seamlessly.',
    storageTip: 'Best enjoyed immediately for peak basil aroma and texture.'
  }
];

export const SAMPLE_RECIPES = SAMPLE_RECIPES_AR;

export function getLocalizedSampleRecipes(lang: Language): Recipe[] {
  if (lang === 'fr') return SAMPLE_RECIPES_FR;
  if (lang === 'en') return SAMPLE_RECIPES_EN;
  return SAMPLE_RECIPES_AR;
}

export const MOROCCAN_PANTRY_TAGS: Record<Language, PantryTagItem[]> = {
  ar: [
    { id: 'tomatoes', name: 'مطيشة (طماطم)', category: 'خضار' },
    { id: 'onions', name: 'بصلة', category: 'خضار' },
    { id: 'garlic', name: 'ثومة', category: 'خضار' },
    { id: 'potatoes', name: 'بطاطا', category: 'خضار' },
    { id: 'carrots', name: 'خيزو (جزر)', category: 'خضار' },
    { id: 'zucchini', name: 'قرعة خضرا (كوسة)', category: 'خضار' },
    { id: 'pumpkin', name: 'قرعة حمرا', category: 'خضار' },
    { id: 'eggplant', name: 'دنجال (باذنجان)', category: 'خضار' },
    { id: 'peppers', name: 'فلفلة حلوة', category: 'خضار' },
    { id: 'coriander_parsley', name: 'قزبور ومعدنوس', category: 'أعشاب' },
    { id: 'celery', name: 'كرافس', category: 'أعشاب' },
    { id: 'lemon_confit', name: 'حامض مصير / طري', category: 'منسمات' },
    { id: 'olives', name: 'زيتون أحمر / أخضر', category: 'منسمات' },
    { id: 'chicken', name: 'دجاج', category: 'بروتين' },
    { id: 'beef', name: 'لحم بقري / غنمي', category: 'بروتين' },
    { id: 'kefta', name: 'كفتة (لحم مفروم)', category: 'بروتين' },
    { id: 'fish', name: 'حوت (سردين، صول، ميرلا)', category: 'بروتين' },
    { id: 'tuna', name: 'طون معلب', category: 'بروتين' },
    { id: 'eggs', name: 'بيض بلدي / رومي', category: 'بروتين' },
    { id: 'lentils', name: 'عدس', category: 'قطاني' },
    { id: 'chickpeas', name: 'حمص', category: 'قطاني' },
    { id: 'beans', name: 'لوبيا بيضاء', category: 'قطاني' },
    { id: 'couscous', name: 'كسكس', category: 'حبوب' },
    { id: 'rice', name: 'روز أبيض / كامل', category: 'حبوب' },
    { id: 'pasta', name: 'مقرونية / شعرية', category: 'حبوب' },
    { id: 'oats', name: 'شوفان', category: 'حبوب' },
    { id: 'flour_semolina', name: 'سميدة / فينو', category: 'حبوب' },
    { id: 'olive_oil', name: 'زيت العود (زيت زيتون)', category: 'زيوت' },
    { id: 'smen', name: 'سمن حار مغربي', category: 'زيوت' },
    { id: 'cheese', name: 'جبن / فرماج / موزاريلا', category: 'ألبان' },
    { id: 'milk_yogurt', name: 'حليب / ياغورت طبيعي', category: 'ألبان' },
    { id: 'turmeric', name: 'خرقوم بلدي (كركم)', category: 'عطرية' },
    { id: 'ginger', name: 'سكنجبير (زنجبيل)', category: 'عطرية' },
    { id: 'cumin', name: 'كمون', category: 'عطرية' },
    { id: 'paprika', name: 'تحميرة (بابريكا)', category: 'عطرية' },
    { id: 'black_pepper', name: 'إبزار (فلفل أسود)', category: 'عطرية' },
    { id: 'cinnamon', name: 'قرفة', category: 'عطرية' },
    { id: 'saffron', name: 'زعفران حر', category: 'عطرية' },
    { id: 'ras_el_hanout', name: 'راس الحانوت / مروزية', category: 'عطرية' }
  ],
  fr: [
    { id: 'tomatoes', name: 'Tomates fraîches', category: 'Légumes' },
    { id: 'onions', name: 'Oignons', category: 'Légumes' },
    { id: 'garlic', name: 'Ail', category: 'Légumes' },
    { id: 'potatoes', name: 'Pommes de terre', category: 'Légumes' },
    { id: 'carrots', name: 'Carottes', category: 'Légumes' },
    { id: 'zucchini', name: 'Courgettes', category: 'Légumes' },
    { id: 'pumpkin', name: 'Courge rouge / Potiron', category: 'Légumes' },
    { id: 'eggplant', name: 'Aubergines', category: 'Légumes' },
    { id: 'peppers', name: 'Poivrons doux', category: 'Légumes' },
    { id: 'coriander_parsley', name: 'Coriandre & Persil frais', category: 'Herbes' },
    { id: 'celery', name: 'Céleri', category: 'Herbes' },
    { id: 'lemon_confit', name: 'Citron confit / frais', category: 'Condiments' },
    { id: 'olives', name: 'Olives rouges / vertes', category: 'Condiments' },
    { id: 'chicken', name: 'Poulet fermier', category: 'Protéines' },
    { id: 'beef', name: 'Viande de bœuf / agneau', category: 'Protéines' },
    { id: 'kefta', name: 'Viande hachée (Kefta)', category: 'Protéines' },
    { id: 'fish', name: 'Poisson (Sardines, colin)', category: 'Protéines' },
    { id: 'tuna', name: 'Thon au naturel', category: 'Protéines' },
    { id: 'eggs', name: 'Œufs frais', category: 'Protéines' },
    { id: 'lentils', name: 'Lentilles', category: 'Légumineuses' },
    { id: 'chickpeas', name: 'Pois chiches', category: 'Légumineuses' },
    { id: 'beans', name: 'Haricots blancs', category: 'Légumineuses' },
    { id: 'couscous', name: 'Couscous (semoule)', category: 'Féculents' },
    { id: 'rice', name: 'Riz blanc / complet', category: 'Féculents' },
    { id: 'pasta', name: 'Pâtes / Vermicelles', category: 'Féculents' },
    { id: 'oats', name: 'Flocons d\'avoine', category: 'Féculents' },
    { id: 'flour_semolina', name: 'Semoule fine / Farine', category: 'Féculents' },
    { id: 'olive_oil', name: 'Huile d\'olive extra vierge', category: 'Huiles' },
    { id: 'smen', name: 'Beurre rance (Smen)', category: 'Huiles' },
    { id: 'cheese', name: 'Fromage / Mozzarella', category: 'Produits laitiers' },
    { id: 'milk_yogurt', name: 'Lait / Yaourt nature', category: 'Produits laitiers' },
    { id: 'turmeric', name: 'Curcuma (Kharkoum)', category: 'Épices' },
    { id: 'ginger', name: 'Gingembre moulu', category: 'Épices' },
    { id: 'cumin', name: 'Cumin moulu', category: 'Épices' },
    { id: 'paprika', name: 'Paprika doux (Tahmira)', category: 'Épices' },
    { id: 'black_pepper', name: 'Poivre noir (Ibzar)', category: 'Épices' },
    { id: 'cinnamon', name: 'Cannelle', category: 'Épices' },
    { id: 'saffron', name: 'Safran pur', category: 'Épices' },
    { id: 'ras_el_hanout', name: 'Ras El Hanout / Mrouzia', category: 'Épices' }
  ],
  en: [
    { id: 'tomatoes', name: 'Fresh Tomatoes', category: 'Vegetables' },
    { id: 'onions', name: 'Onions', category: 'Vegetables' },
    { id: 'garlic', name: 'Garlic', category: 'Vegetables' },
    { id: 'potatoes', name: 'Potatoes', category: 'Vegetables' },
    { id: 'carrots', name: 'Carrots', category: 'Vegetables' },
    { id: 'zucchini', name: 'Zucchini / Courgette', category: 'Vegetables' },
    { id: 'pumpkin', name: 'Pumpkin / Butternut', category: 'Vegetables' },
    { id: 'eggplant', name: 'Eggplant / Aubergine', category: 'Vegetables' },
    { id: 'peppers', name: 'Bell peppers', category: 'Vegetables' },
    { id: 'coriander_parsley', name: 'Fresh Cilantro & Parsley', category: 'Herbs' },
    { id: 'celery', name: 'Celery stalks', category: 'Herbs' },
    { id: 'lemon_confit', name: 'Preserved / Fresh Lemon', category: 'Seasonings' },
    { id: 'olives', name: 'Red / Green Olives', category: 'Seasonings' },
    { id: 'chicken', name: 'Chicken', category: 'Proteins' },
    { id: 'beef', name: 'Beef / Lamb', category: 'Proteins' },
    { id: 'kefta', name: 'Minced meat (Kefta)', category: 'Proteins' },
    { id: 'fish', name: 'Fish (Sardines, Whiting)', category: 'Proteins' },
    { id: 'tuna', name: 'Canned Tuna', category: 'Proteins' },
    { id: 'eggs', name: 'Eggs', category: 'Proteins' },
    { id: 'lentils', name: 'Brown / Green Lentils', category: 'Legumes' },
    { id: 'chickpeas', name: 'Chickpeas', category: 'Legumes' },
    { id: 'beans', name: 'White Cannellini Beans', category: 'Legumes' },
    { id: 'couscous', name: 'Couscous semolina', category: 'Grains' },
    { id: 'rice', name: 'White / Brown Rice', category: 'Grains' },
    { id: 'pasta', name: 'Pasta / Noodles', category: 'Grains' },
    { id: 'oats', name: 'Rolled Oats', category: 'Grains' },
    { id: 'flour_semolina', name: 'Fine Semolina / Flour', category: 'Grains' },
    { id: 'olive_oil', name: 'Extra Virgin Olive Oil', category: 'Oils' },
    { id: 'smen', name: 'Aged Moroccan Butter (Smen)', category: 'Oils' },
    { id: 'cheese', name: 'Cheese / Mozzarella', category: 'Dairy' },
    { id: 'milk_yogurt', name: 'Milk / Plain Greek Yogurt', category: 'Dairy' },
    { id: 'turmeric', name: 'Ground Turmeric', category: 'Spices' },
    { id: 'ginger', name: 'Ground Ginger', category: 'Spices' },
    { id: 'cumin', name: 'Ground Cumin', category: 'Spices' },
    { id: 'paprika', name: 'Sweet Paprika', category: 'Spices' },
    { id: 'black_pepper', name: 'Black Pepper', category: 'Spices' },
    { id: 'cinnamon', name: 'Ground Cinnamon', category: 'Spices' },
    { id: 'saffron', name: 'Pure Saffron threads', category: 'Spices' },
    { id: 'ras_el_hanout', name: 'Ras El Hanout spice blend', category: 'Spices' }
  ]
};
