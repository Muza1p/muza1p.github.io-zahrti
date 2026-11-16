import { MajorCategory, RiasecCode } from '@/src/types';

export type KawaiiCharacterId =
  | 'hero_trio'
  | 'intro_bunny'
  | 'analyzing_fairy'
  | 'results_celebration'
  | 'health_cat'
  | 'engineering_bunny'
  | 'computing_bear'
  | 'arts_cat'
  | 'education_lamb'
  | 'law_swan'
  | 'science_butterfly'
  | 'agri_deer'
  | 'humanities_panda';

export interface KawaiiCharacterAsset {
  id: KawaiiCharacterId;
  nameAr: string;
  roleAr: string;
  altAr: string;
  imageSrc: string;
  accentBg: string;
  accentBorder: string;
  greetingsAr: string[];
  fallbackCategory?: MajorCategory;
}

export const KAWAII_CHARACTERS: Record<KawaiiCharacterId, KawaiiCharacterAsset> = {
  hero_trio: {
    id: 'hero_trio',
    nameAr: 'القطة البيضاء والأرنوبة والدبوبة',
    roleAr: 'رفيقات عالم زهرتي',
    altAr: 'مشهد ثلاثي الأبعاد للقطة البيضاء بالفيونكة الوردية والأرنوبة اللافندر والدبوبة الصغيرة وسط الورود والكتب',
    imageSrc: '/src/assets/images/hero_kawaii_trio_1794857239157.jpg',
    accentBg: '#FCEBF0',
    accentBorder: '#E8CED5',
    greetingsAr: [
      'أهلاً بج في عالم زهرتي! مستعدة تستكشفين ميولج بهدوء؟',
      'كل وردة إلها طريقتها بالتفتح، وإنتِ أيضاً إلج مسارج الخاص.',
      'خذي وقتج في القراءة والاستكشاف، إحنا هنا نرافقج بكل خطوة!',
    ],
  },
  intro_bunny: {
    id: 'intro_bunny',
    nameAr: 'الأرنوبة المُرشدة',
    roleAr: 'رفيقة البداية والدراسة',
    altAr: 'شخصية ثلاثية الأبعاد لأرنوبة بيضاء لطيفة بأذنين طويلتين تحمل دفتراً وقلماً بجانب فنجان شاي مزهر',
    imageSrc: '/src/assets/images/intro_study_bunny_1794857240713.jpg',
    accentBg: '#FBF1F3',
    accentBorder: '#E8CED5',
    greetingsAr: [
      'تذكري: ماكو إجابة صح أو خطأ، اختاري اللي يريح قلبج وفضولج.',
      'رتبت لج دفتري! جاوبي ٣٠ عبارة قصيرة وبنهايتها نرسم خريطة اهتماماتج.',
      'تكدرين تتوقفين بأي وقت وترجعين بعدين، إجاباتج محفوظة بجهازج فقط.',
    ],
  },
  analyzing_fairy: {
    id: 'analyzing_fairy',
    nameAr: 'جنية الزهور والفراشة السحرية',
    roleAr: 'حارسة التحليل الهادئ',
    altAr: 'مشهد ثلاثي الأبعاد لجنية الزهور بتاج ورد وأجنحة شفافة مع فراشة مضيئة فوق غيوم لافندر ناعمة',
    imageSrc: '/src/assets/images/fairy_analyzing_scene_1794857241486.jpg',
    accentBg: '#F4EFF8',
    accentBorder: '#D8CBE7',
    greetingsAr: [
      'نجمع إجاباتج بهدوء عبر الأنماط الستة لنرسم صورتج الواضحة...',
      'لحظات لطيفة وتكون خريطة اهتماماتج جاهزة للاستكشاف!',
    ],
  },
  results_celebration: {
    id: 'results_celebration',
    nameAr: 'دبدوبة القلب وحارسة النجوم',
    roleAr: 'رفيقتا الاحتفال بالنتائج',
    altAr: 'مشهد ثلاثي الأبعاد لدبدوبة كريمية تحمل قلباً وردياً مع حارسة النجوم الصغيرة وبتلات الورد',
    imageSrc: '/src/assets/images/results_celebration_bear_1794857242217.jpg',
    accentBg: '#FAF0F4',
    accentBorder: '#E4C6D2',
    greetingsAr: [
      'أحسنتِ بإتمام الرحلة! تعالي نشوف التخصصات اللي تتقاطع مع ميولج.',
      'تذكري دائماً: النتيجة بداية حوار مع نفسج واستكشاف، مو قرار نهائي.',
      'جربي مقارنة تخصصين أو ثلاثة حتى تتضح لج تفاصيل الدراسة والتحديات.',
    ],
  },
  health_cat: {
    id: 'health_cat',
    nameAr: 'القطة الطبيبة',
    roleAr: 'مجال الصحة والطب',
    altAr: 'قطة بيضاء لطيفة ثلاثية الأبعاد بمعطف طبي وسماعة وفيونكة وردية',
    imageSrc: '/src/assets/images/domain_health_cat_1794857243649.jpg',
    accentBg: '#FBF1F3',
    accentBorder: '#E8CED5',
    greetingsAr: [
      'الرعاية الصحية تجمع بين الدقة العلمية واللطف الإنساني.',
      'تخصصات الطب والتمريض والصيدلة والتحليلات تتطلب صبراً واهتماماً بالتفاصيل.',
    ],
    fallbackCategory: 'health_medicine',
  },
  engineering_bunny: {
    id: 'engineering_bunny',
    nameAr: 'أرنوبة الهندسة',
    roleAr: 'مجال الهندسة',
    altAr: 'أرنوبة لافندر ثلاثية الأبعاد بخوذة مهندسة وردية تحمل مخططات هندسية',
    imageSrc: '/src/assets/images/domain_engineering_bunny_1794857244758.jpg',
    accentBg: '#F4EFF8',
    accentBorder: '#D8CBE7',
    greetingsAr: [
      'الهندسة تحوّل الأفكار والمخططات إلى مبانٍ وشبكات وأجهزة نافعة!',
      'تحبين حل المشكلات العملية والربط بين الرياضيات والواقع؟',
    ],
    fallbackCategory: 'engineering',
  },
  computing_bear: {
    id: 'computing_bear',
    nameAr: 'دبدوبة الحاسوب',
    roleAr: 'مجال الحاسوب والتكنولوجيا',
    altAr: 'دبدوبة كريمية ثلاثية الأبعاد بفيونكة أمام حاسوب محمول لافندر مزين بالورود',
    imageSrc: '/src/assets/images/domain_computing_bear_1794857244036.jpg',
    accentBg: '#F2EEF8',
    accentBorder: '#D5C7E4',
    greetingsAr: [
      'عالم البرمجيات والبيانات يفتح أبواباً لبناء حلول ذكية ومنظمة.',
      'الممارسة المستمرة والمشاريع الصغيرة تصنع الفارق في التقنية.',
    ],
    fallbackCategory: 'computing_tech',
  },
  arts_cat: {
    id: 'arts_cat',
    nameAr: 'القطة الرسامة',
    roleAr: 'مجال الفنون والإعلام',
    altAr: 'قطة وردية ثلاثية الأبعاد بقبعة رسم تحمل فرشاة ولوحة ألوان باستيل',
    imageSrc: '/src/assets/images/domain_arts_cat_1794857245476.jpg',
    accentBg: '#FCEBF0',
    accentBorder: '#E8CED5',
    greetingsAr: [
      'التصميم والفنون والإعلام تمنح الأفكار صوتاً وصورة مؤثرة.',
      'الإبداع يحتاج شغفاً بصرياً وبناء معرض أعمال يعبر عن أسلوبج.',
    ],
    fallbackCategory: 'arts_media',
  },
  education_lamb: {
    id: 'education_lamb',
    nameAr: 'الخروف القارئ',
    roleAr: 'مجال التربية والتعليم',
    altAr: 'خروف صغير ناعم ثلاثي الأبعاد بنظارات وربطة موف يحمل كتاباً مفتوحاً',
    imageSrc: '/src/assets/images/domain_education_lamb_1794857244837.jpg',
    accentBg: '#F6F1F8',
    accentBorder: '#DFD2E9',
    greetingsAr: [
      'مشاركة المعرفة ومساعدة الآخرين على الفهم رسالة راقية ومؤثرة.',
      'التربية والإرشاد التربوي مناسبان لمن تستمتع بالشرح والتواصل الإنساني.',
    ],
    fallbackCategory: 'education',
  },
  law_swan: {
    id: 'law_swan',
    nameAr: 'البجعة والميزان',
    roleAr: 'مجال القانون والإدارة والاقتصاد',
    altAr: 'بجعة بيضاء أنيقة ثلاثية الأبعاد بتاج لؤلؤي وربطة موف بجانب ميزان رمزي',
    imageSrc: '/src/assets/images/domain_law_swan_1794857245649.jpg',
    accentBg: '#F4EFF8',
    accentBorder: '#D8CBE7',
    greetingsAr: [
      'القانون والإدارة والاقتصاد تجمع بين وضوح الحجة وتنظيم المشاريع.',
      'التفكير التحليلي واللباقة في التعبير مهارات أساسية في هذا المجال.',
    ],
    fallbackCategory: 'law_management_econ',
  },
  science_butterfly: {
    id: 'science_butterfly',
    nameAr: 'فراشة المختبر',
    roleAr: 'مجال العلوم',
    altAr: 'فراشة ثلاثية الأبعاد بأجنحة متدرجة لطيفة بجانب قوارير مختبر باستيل وزهور',
    imageSrc: '/src/assets/images/domain_science_butterfly_1794857246727.jpg',
    accentBg: '#F5F2F9',
    accentBorder: '#D8CBE7',
    greetingsAr: [
      'العلوم الأساسية تكشف أسرار الكائنات والمادة والأرقام بفضول لا ينتهي.',
      'مناسبة لمن تحب المختبر، التجربة، وطرح سؤال: لماذا وكيف؟',
    ],
    fallbackCategory: 'sciences',
  },
  agri_deer: {
    id: 'agri_deer',
    nameAr: 'الغزالة والزهور',
    roleAr: 'مجال الزراعة والبيئة',
    altAr: 'غزالة صغيرة لطيفة ثلاثية الأبعاد بطوق ورد وسط الزهور والأوراق النباتية',
    imageSrc: '/src/assets/images/domain_agri_deer_1794857247266.jpg',
    accentBg: '#FAF2F4',
    accentBorder: '#E5CED5',
    greetingsAr: [
      'الاهتمام بالطبيعة والتربة والمياه والنباتات يصنع بيئة صحية ومستدامة.',
      'مسارات الزراعة والبيئة تجمع بين العمل الميداني والبحث الحيوي.',
    ],
    fallbackCategory: 'agriculture_env',
  },
  humanities_panda: {
    id: 'humanities_panda',
    nameAr: 'الباندا القارئة',
    roleAr: 'مجال العلوم الإنسانية والاجتماعية',
    altAr: 'شخصية باندا بناتية لطيفة بألوان برقوقي وكريمي مع كتب وفنجان شاي مزهر',
    imageSrc: '/src/assets/images/domain_humanities_panda_1794857247203.jpg',
    accentBg: '#F7EFF3',
    accentBorder: '#DFC5D2',
    greetingsAr: [
      'فهم الإنسان واللغة والمجتمع والتاريخ يعمّق نظرتنا للعالم.',
      'علم النفس واللغات والاجتماع والسياسة تفتح مسارات فكرية وثقافية غنية.',
    ],
    fallbackCategory: 'humanities_social',
  },
};

export const DOMAIN_CHARACTER_MAP: Record<MajorCategory, KawaiiCharacterId> = {
  health_medicine: 'health_cat',
  engineering: 'engineering_bunny',
  computing_tech: 'computing_bear',
  sciences: 'science_butterfly',
  education: 'education_lamb',
  law_management_econ: 'law_swan',
  arts_media: 'arts_cat',
  humanities_social: 'humanities_panda',
  agriculture_env: 'agri_deer',
};

export const RIASEC_CHARACTER_MAP: Record<RiasecCode, KawaiiCharacterId> = {
  realistic: 'engineering_bunny',
  investigative: 'science_butterfly',
  artistic: 'arts_cat',
  social: 'education_lamb',
  enterprising: 'law_swan',
  conventional: 'computing_bear',
};

export interface QuizMilestoneInfo {
  checkpoint: 5 | 10 | 15 | 20 | 25 | 30;
  characterId: KawaiiCharacterId;
  titleAr: string;
  messageAr: string;
}

export const QUIZ_MILESTONES: Record<number, QuizMilestoneInfo> = {
  5: {
    checkpoint: 5,
    characterId: 'intro_bunny',
    titleAr: 'بداية لطيفة (٥ من ٣٠)',
    messageAr: 'خطوة رائعة! أنجزتِ أول ٥ أسئلة بهدوء. استمري بالاختيار وفق ما يشعرج بالارتياح.',
  },
  10: {
    checkpoint: 10,
    characterId: 'education_lamb',
    titleAr: 'ثلث الطريق (١٠ من ٣٠)',
    messageAr: 'أنهيتِ ١٠ عبارات! وضوح إجاباتج الحقيقية يجعل خريطة اهتماماتج أدق لج.',
  },
  15: {
    checkpoint: 15,
    characterId: 'science_butterfly',
    titleAr: 'منتصف الرحلة (١٥ من ٣٠)',
    messageAr: 'وصلتِ لنصف الاختبار! خذي نفساً لطيفاً وتابعي وفق فضولج الشخصي.',
  },
  20: {
    checkpoint: 20,
    characterId: 'arts_cat',
    titleAr: 'تقدم جميل (٢٠ من ٣٠)',
    messageAr: 'تبقّت ١٠ أسئلة فقط! كل اختيار يقربنا أكثر من ملامح اهتماماتج الستة.',
  },
  25: {
    checkpoint: 25,
    characterId: 'analyzing_fairy',
    titleAr: 'اقتربنا من النهاية (٢٥ من ٣٠)',
    messageAr: 'ممتاز! لم يتبقَّ سوى ٥ أسئلة وتستكشفين ملف اهتماماتج الكامل.',
  },
  30: {
    checkpoint: 30,
    characterId: 'results_celebration',
    titleAr: 'أكملتِ جميع الأسئلة (٣٠ من ٣٠)!',
    messageAr: 'أحسنتِ! جميع الإجابات جاهزة، اضغطي «إنهاء وعرض النتيجة» لمشاهدة ملفج.',
  },
};
