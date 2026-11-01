import { LegalDocumentAnalysis, SupportedLanguageCode } from '../types/docutrust';

export interface LanguageOption {
  code: SupportedLanguageCode;
  nameEnglish: string;
  nameNative: string;
  tier: 'MVP' | 'P1';
  speechLang: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nameEnglish: 'English', nameNative: 'English', tier: 'MVP', speechLang: 'en-IN' },
  { code: 'hi', nameEnglish: 'Hindi', nameNative: 'हिन्दी', tier: 'MVP', speechLang: 'hi-IN' },
  { code: 'ta', nameEnglish: 'Tamil', nameNative: 'தமிழ்', tier: 'MVP', speechLang: 'ta-IN' },
  { code: 'te', nameEnglish: 'Telugu', nameNative: 'తెలుగు', tier: 'MVP', speechLang: 'te-IN' },
  { code: 'bn', nameEnglish: 'Bengali', nameNative: 'বাংলা', tier: 'MVP', speechLang: 'bn-IN' },
  { code: 'mr', nameEnglish: 'Marathi', nameNative: 'मराठी', tier: 'P1', speechLang: 'mr-IN' },
  { code: 'gu', nameEnglish: 'Gujarati', nameNative: 'ગુજરાતી', tier: 'P1', speechLang: 'gu-IN' },
  { code: 'kn', nameEnglish: 'Kannada', nameNative: 'ಕನ್ನಡ', tier: 'P1', speechLang: 'kn-IN' },
  { code: 'ml', nameEnglish: 'Malayalam', nameNative: 'മലയാളം', tier: 'P1', speechLang: 'ml-IN' },
  { code: 'pa', nameEnglish: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', tier: 'P1', speechLang: 'pa-IN' },
  { code: 'or', nameEnglish: 'Odia', nameNative: 'ଓଡ଼ିଆ', tier: 'P1', speechLang: 'or-IN' },
  { code: 'ur', nameEnglish: 'Urdu', nameNative: 'اردو', tier: 'P1', speechLang: 'ur-IN' },
];

export const UI_CHROME_TRANSLATIONS: Record<
  SupportedLanguageCode,
  {
    tagline: string;
    verifyCardTitle: string;
    verifyCardSub: string;
    understandCardTitle: string;
    understandCardSub: string;
    disclaimer: string;
  }
> = {
  en: {
    tagline: 'Verify. Understand. Decide.',
    verifyCardTitle: 'Verify a document',
    verifyCardSub: 'Takes about 30 seconds. Your file is deleted after the check.',
    understandCardTitle: 'Understand a document',
    understandCardSub: 'Plain-language summary, risk flags, and regional translation in seconds.',
    disclaimer:
      'DocuTrust AI analyzes visual and structural signs of editing and explains documents in simple language. Results are indicators, not proof of authenticity or forgery, and this is not legal advice. For official confirmation, contact the issuing authority or a qualified professional.',
  },
  hi: {
    tagline: 'जाँचें। समझें। सही निर्णय लें।',
    verifyCardTitle: 'दस्तावेज़ की सत्यता जाँचें (Verify)',
    verifyCardSub: 'लगभग 30 सेकंड लगते हैं। जाँच के बाद आपकी फ़ाइल स्वतः हटा दी जाती है।',
    understandCardTitle: 'कानूनी दस्तावेज़ समझें (Understand)',
    understandCardSub: 'सरल भाषा में सारांश, जोखिम संकेत (Risk Flags) और आपकी अपनी भाषा में अनुवाद।',
    disclaimer:
      'DocuTrust AI संपादन के दृश्य और संरचनात्मक संकेतों का विश्लेषण करता है और सरल भाषा में दस्तावेज़ समझाता है। परिणाम केवल संकेतक हैं, प्रामाणिकता या जालसाजी का कानूनी प्रमाण नहीं, और यह कानूनी सलाह नहीं है। आधिकारिक पुष्टि के लिए जारीकर्ता संस्था या योग्य पेशेवर से संपर्क करें।',
  },
  ta: {
    tagline: 'சரிபார்க்கவும். புரிந்துகொள்ளவும். முடிவெடுக்கவும்.',
    verifyCardTitle: 'ஆவணத்தைச் சரிபார்க்கவும் (Verify)',
    verifyCardSub: 'சுமார் 30 வினாடிகள் ஆகும். ஆய்வுக்குப் பிறகு உங்கள் கோப்பு நீக்கப்படும்.',
    understandCardTitle: 'சட்ட ஆவணத்தைப் புரிந்துகொள்ளவும் (Understand)',
    understandCardSub: 'எளிய தமிழில் சுருக்கம், முக்கிய விதிகள் மற்றும் ஆபத்து எச்சரிக்கைகள்.',
    disclaimer:
      'DocuTrust AI ஆவணத் திருத்தங்களின் அறிகுறிகளை ஆய்வு செய்து எளிய மொழியில் விளக்குகிறது. இவை வழிகாட்டிகள் மட்டுமே, சட்டப்பூர்வ ஆதாரம் அல்லது சட்ட ஆலோசனை அல்ல. அதிகாரப்பூர்வ உறுதிப்படுத்தலுக்கு ஆவணம் வழங்கிய துறையை அணுகவும்.',
  },
  te: {
    tagline: 'ధృవీకరించండి. అర్థం చేసుకోండి. నిర్ణయించండి.',
    verifyCardTitle: 'పత్రాన్ని ధృవీకరించండి (Verify)',
    verifyCardSub: 'సుమారు 30 సెకన్లు పడుతుంది. తనిఖీ తర్వాత మీ ఫైల్ తొలగించబడుతుంది.',
    understandCardTitle: 'చట్టపరమైన పత్రాన్ని అర్థం చేసుకోండి (Understand)',
    understandCardSub: 'సరళమైన తెలుగులో సారాంశం, ముఖ్య నిబంధనలు మరియు ప్రమాద హెచ్చరికలు.',
    disclaimer:
      'DocuTrust AI సవరణ సంకేతాలను విశ్లేషిస్తుంది మరియు పత్రాలను సరళమైన భాషలో వివరిస్తుంది. ఫలితాలు సూచికలు మాత్రమే, చట్టపరమైన రుజువు లేదా న్యాయ సలహా కాదు.',
  },
  bn: {
    tagline: 'যাচাই করুন। বুঝুন। সিদ্ধান্ত নিন।',
    verifyCardTitle: 'নথি যাচাই করুন (Verify)',
    verifyCardSub: 'প্রায় ৩০ সেকেন্ড সময় লাগে। যাচাইয়ের পর আপনার ফাইল মুছে ফেলা হয়।',
    understandCardTitle: 'আইনি নথি বুঝুন (Understand)',
    understandCardSub: 'সহজ বাংলায় সারাংশ, মূল শর্তাবলী এবং ঝুঁকির সতর্কতা।',
    disclaimer:
      'DocuTrust AI সম্পাদনার দৃশ্যমান ও কাঠামোগত লক্ষণ বিশ্লেষণ করে এবং সহজ ভাষায় নথি ব্যাখ্যা করে। ফলাফলগুলো নির্দেশক মাত্র, আইনি প্রমাণ বা আইনি পরামর্শ নয়।',
  },
  mr: {
    tagline: 'तपासा. समजून घ्या. निर्णय घ्या.',
    verifyCardTitle: 'दस्तऐवज तपासा (Verify)',
    verifyCardSub: 'सुमारे ३० सेकंद लागतात. तपासणीनंतर तुमची फाइल हटवली जाते.',
    understandCardTitle: 'कायदेशीर दस्तऐवज समजून घ्या (Understand)',
    understandCardSub: 'सोप्या मराठीत सारांश, महत्त्वाची कलमे आणि जोखीम सूचना.',
    disclaimer:
      'DocuTrust AI बदलांच्या खुणा तपासते आणि सोप्या भाषेत कागदपत्रे समजावून सांगते. हे केवळ दर्शक आहेत, कायदेशीर पुरावा किंवा सल्ला नाही.',
  },
  gu: {
    tagline: 'ચકાસો. સમજો. નિર્ણય લો.',
    verifyCardTitle: 'દસ્તાવેજ ચકાસો (Verify)',
    verifyCardSub: 'આશરે 30 સેકન્ડ લાગે છે. ચકાસણી પછી તમારી ફાઇલ કાઢી નાખવામાં આવે છે.',
    understandCardTitle: 'કાનૂની દસ્તાવેજ સમજો (Understand)',
    understandCardSub: 'સરળ ગુજરાતીમાં સારાંश, મુખ્ય કલમો અને જોખમ ચેતવણીઓ.',
    disclaimer:
      'DocuTrust AI ફેરફારના સંકેતોનું વિશ્લેષણ કરે છે અને સરળ ભાષામાં દસ્તાવેજો સમજાવે છે. આ કાનૂની પુરાવો કે સલાહ નથી.',
  },
  kn: {
    tagline: 'ಪರಿಶೀಲಿಸಿ. ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ನಿರ್ಧರಿಸಿ.',
    verifyCardTitle: 'ದಾಖಲೆಯನ್ನು ಪರಿಶೀಲಿಸಿ (Verify)',
    verifyCardSub: 'ಸುಮಾರು 30 ಸೆಕೆಂಡುಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ಪರಿಶೀಲನೆಯ ನಂತರ ಫೈಲ್ ಅಳಿಸಲಾಗುತ್ತದೆ.',
    understandCardTitle: 'ಕಾನೂನು ದಾಖಲೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ (Understand)',
    understandCardSub: 'ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಸಾರಾಂಶ, ಪ್ರಮುಖ ಷರತ್ತುಗಳು ಮತ್ತು ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು.',
    disclaimer:
      'DocuTrust AI ದಾಖಲೆಯ ಬದಲಾವಣೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸುತ್ತದೆ. ಇದು ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.',
  },
  ml: {
    tagline: 'പരിശോധിക്കുക. മനസ്സിലാക്കുക. തീരുമാനിക്കുക.',
    verifyCardTitle: 'രേഖ പരിശോധിക്കുക (Verify)',
    verifyCardSub: 'ഏകദേശം 30 സെക്കൻഡ് എടുക്കും. പരിശോധനയ്ക്ക് ശേഷം ഫയൽ നീക്കം ചെയ്യപ്പെടും.',
    understandCardTitle: 'നിയമപരമായ രേഖ മനസ്സിലാക്കുക (Understand)',
    understandCardSub: 'ലളിതമായ മലയാളത്തിൽ സംഗ്രഹവും പ്രധാന വ്യവസ്ഥകളും അപകട സൂചനകളും.',
    disclaimer:
      'DocuTrust AI രേഖകളിലെ മാറ്റങ്ങൾ বিশകലനം ചെയ്ത് ലളിതമായ ഭാഷയിൽ വിശദീകരിക്കുന്നു. ഇത് നിയമോപദേശമല്ല.',
  },
  pa: {
    tagline: 'ਜਾਂਚੋ। ਸਮਝੋ। ਫੈਸਲਾ ਕਰੋ।',
    verifyCardTitle: 'ਦਸਤਾਵੇਜ਼ ਦੀ ਜਾਂਚ ਕਰੋ (Verify)',
    verifyCardSub: 'ਲਗਭਗ 30 ਸਕਿੰਟ ਲੱਗਦੇ ਹਨ। ਜਾਂਚ ਤੋਂ ਬਾਅਦ ਤੁਹਾਡੀ ਫਾਈਲ ਮਿਟਾ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।',
    understandCardTitle: 'ਕਾਨੂੰਨੀ ਦਸਤਾਵੇਜ਼ ਸਮਝੋ (Understand)',
    understandCardSub: 'ਸਰਲ ਪੰਜਾਬੀ ਵਿੱਚ ਸਾਰ, ਮੁੱਖ ਧਾਰਾਵਾਂ ਅਤੇ ਜੋਖਮ ਚੇਤਾਵਨੀਆਂ।',
    disclaimer:
      'DocuTrust AI ਸੰਪਾਦਨ ਦੇ ਸੰਕੇਤਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰਦਾ ਹੈ ਅਤੇ ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਵਿਆਖਿਆ ਕਰਦਾ ਹੈ। ਇਹ ਕਾਨੂੰਨੀ ਸਲਾਹ ਨਹੀਂ ਹੈ।',
  },
  or: {
    tagline: 'যাଞ୍ଚ କରନ୍ତୁ। ବୁଝନ୍ତୁ। ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।',
    verifyCardTitle: 'ଦଲିଲ୍ ଯାଞ୍ଚ କରନ୍ତୁ (Verify)',
    verifyCardSub: 'ପ୍ରାୟ ୩୦ ସେକେଣ୍ଡ ଲାগେ। ଯାଞ୍ଚ ପରେ ଆପଣଙ୍କ ଫାଇଲ୍ ଡିଲିଟ୍ ହୋଇଯାଏ।',
    understandCardTitle: 'ଆଇନଗତ ଦଲିଲ୍ ବୁଝନ୍ତୁ (Understand)',
    understandCardSub: 'ସରଳ ଓଡ଼ିଆରେ ସାରାଂଶ, ମୁଖ୍ୟ ସର୍ତ୍ତାବଳୀ ଏବଂ ବିପଦ ସୂଚନା।',
    disclaimer:
      'DocuTrust AI ଦଲିଲର ସମ୍ପାଦନା ଚିହ୍ନ ବିଶ୍ଳେଷଣ କରେ ଏବଂ ସରଳ ଭାଷାରେ ବୁଝାଏ। ଏହା ଆଇନଗତ ପରାମର୍ଶ ନୁହେଁ।',
  },
  ur: {
    tagline: 'تصدیق کریں۔ سمجھیں۔ فیصلہ کریں۔',
    verifyCardTitle: 'دستاویز کی تصدیق کریں (Verify)',
    verifyCardSub: 'تقریباً 30 سیکنڈ لگتے ہیں۔ جانچ کے بعد آپ کی فائل حذف کر دی جاتی ہے۔',
    understandCardTitle: 'قانونی دستاویز کو سمجھیں (Understand)',
    understandCardSub: 'آسان اردو میں خلاصہ، اہم شقیں اور خطرات کی نشاندہی۔',
    disclaimer:
      'DocuTrust AI دستاویزات میں تبدیلی کے نشانات کا تجزیہ کرتا ہے اور آسان زبان میں وضاحت کرتا ہے۔ یہ قانونی مشورہ نہیں ہے۔',
  },
};

const RENTAL_EN = {
  inShortSummary: {
    Simple:
      'This is an 11-month house rental agreement in Chennai for ₹22,000 per month with a ₹1,50,000 security deposit. Watch out: Two clauses give the landlord unfair power to raise rent anytime without notice and keep half your deposit if you leave before 9 months.',
    Standard:
      'An 11-month residential lease between S. Narayanan (Landlord) and Meena K. (Tenant) at ₹22,000/month rent and ₹1,50,000 interest-free refundable security deposit. While utility and termination notice terms are standard, Clause 4.2 permits unilateral mid-term rent hikes and Clause 9.1 imposes a punitive 50% deposit forfeiture during a 9-month lock-in period.',
    Detailed:
      'Residential Lease Agreement executed for Flat 3B, Adyar, Chennai for an 11-month term commencing 01 Nov 2026. Monthly license fee is ₹22,000 (exclusive of ₹2,400 society maintenance) with an interest-free security deposit of ₹1,50,000. High-risk departures from standard Tamil Nadu tenancy practice include: (1) Clause 4.2 granting the Lessor unfettered discretion to revise rent mid-tenancy without prior written notice, and (2) Clause 9.1 enforcing a 9-month lock-in where early vacation by the Lessee forfeits ₹75,000 (50% of deposit) plus full painting charges regardless of wear and tear.',
  },
  partyAObligations: [
    'Pay ₹22,000 rent on or before the 5th of every month plus ₹2,400 monthly maintenance.',
    'Pay ₹1,50,000 interest-free security deposit before taking possession of the keys.',
    'Use the flat strictly for residential family stay (no commercial sub-letting).',
    'Bear minor day-to-day plumbing and electrical bulb/fuse replacements under ₹1,000.',
  ],
  partyBObligations: [
    'Hand over peaceful vacant possession of Flat 3B with working water and electricity meters.',
    'Pay municipal property taxes and major structural seepage or external wall repairs.',
    'Refund the security deposit upon key handover (subject to disputed deductions in Clause 9.1).',
  ],
  keyFacts: [
    { label: 'Parties', value: 'S. Narayanan (Landlord) & Meena K. (Tenant)', clauseRef: 'Preamble' },
    { label: 'Monthly Rent & Maintenance', value: '₹22,000/mo + ₹2,400/mo maintenance', clauseRef: 'Clause 3.1' },
    { label: 'Security Deposit', value: '₹1,50,000 (6.8 months rent, interest-free)', clauseRef: 'Clause 3.2' },
    { label: 'Duration & Lock-in', value: '11 Months total; 9 Months strict lock-in', clauseRef: 'Clause 2 & 9.1' },
    { label: 'Late Payment Penalty', value: '18% p.a. compounded + ₹500/day after 7th', clauseRef: 'Clause 4.1' },
    { label: 'Notice Period & Jurisdiction', value: '2 Months written notice | Chennai Courts', clauseRef: 'Clause 11 & 14' },
  ],
  riskFlags: [
    {
      id: 'rf-1',
      level: 'Red' as const,
      clauseNumber: 'Clause 4.2',
      title: 'Unilateral Rent Increase Any Time',
      oneLineReason: 'Landlord may increase rent any time during the 11 months without prior notice.',
    },
    {
      id: 'rf-2',
      level: 'Red' as const,
      clauseNumber: 'Clause 9.1',
      title: '50% Security Deposit Forfeiture (₹75,000)',
      oneLineReason:
        'Leaving before 9 months—even for job transfer or medical emergency—forfeits half your ₹1,50,000 deposit.',
    },
    {
      id: 'rf-3',
      level: 'Amber' as const,
      clauseNumber: 'Clause 6.4',
      title: 'Broad One-Sided Indemnity (indemnity)',
      oneLineReason:
        'Tenant must compensate landlord for building damage even if caused by old wiring or external pipe bursts.',
    },
    {
      id: 'rf-4',
      level: 'Amber' as const,
      clauseNumber: 'Clause 8.2',
      title: 'Unannounced Landlord Entry',
      oneLineReason:
        'Allows landlord or broker to enter the house for inspection at any hour without 24-hour prior notice.',
    },
    {
      id: 'rf-5',
      level: 'Green' as const,
      clauseNumber: 'Clause 11.1',
      title: 'Mutual 2-Month Notice After Lock-in',
      oneLineReason: 'Standard two-month notice period applies symmetrically after month 9.',
    },
  ],
  questionsToAsk: [
    'Can we remove Clause 4.2 and fix the rent at ₹22,000 for the full 11 months, with a maximum 5%–7% increase only upon renewal?',
    'In Clause 9.1, instead of forfeiting 50% of the deposit (₹75,000), can we agree on a standard 1-month rent notice deduction if I have to vacate early?',
    'Can we add "with at least 24 hours prior phone/WhatsApp notice" to Clause 8.2 before landlord inspections?',
    'Can we specify in Clause 9.2 that normal wear and tear is excluded from deposit deductions?',
  ],
  clauses: [
    {
      id: 'c-4-2',
      clauseNumber: 'Clause 4.2',
      title: 'Rent Revision & Escalation',
      originalText:
        '4.2 Notwithstanding anything contained herein, the Lessor reserves the absolute and unfettered right to revise, enhance, or modify the monthly license fee at any juncture during the subsistence of this Agreement without assigning any reason or prior notice to the Lessee.',
      simplifiedText: {
        Simple:
          'The landlord can raise your monthly rent whenever they want during the 11 months, without giving you any warning or reason.',
        Standard:
          'Overrides fixed-rent protections: grants the landlord unilateral authority to increase monthly rent mid-lease without notice.',
        Detailed:
          'Contains a non-obstante ("notwithstanding") override giving the Lessor unilateral discretion to hike the ₹22,000 monthly fee mid-term without prior written notice or mutual consent.',
      },
      riskLevel: 'Red' as const,
      riskReason: 'Landlord may increase rent any time without notice.',
    },
    {
      id: 'c-9-1',
      clauseNumber: 'Clause 9.1',
      title: 'Lock-In Period & Deposit Forfeiture',
      originalText:
        '9.1 The initial nine (9) months of the term shall constitute a strict Lock-In Period. In the event the Lessee vacates or terminates the tenancy prior to expiry of the Lock-In Period for any cause whatsoever, fifty percent (50%) of the Security Deposit amounting to Rs. 75,000/- shall stand ipso facto forfeited in favor of the Lessor in addition to mandatory two-coat repainting charges.',
      simplifiedText: {
        Simple:
          'You cannot leave the house during the first 9 months. If you move out early for any reason, the landlord will keep ₹75,000 from your deposit plus charge you for repainting the whole flat.',
        Standard:
          'Enforces a 9-month lock-in period with automatic forfeiture of 50% of the security deposit (₹75,000) plus full repainting costs upon early exit.',
        Detailed:
          'Establishes an asymmetric 9-month lock-in on an 11-month lease. Early termination by the Lessee triggers automatic ("ipso facto") forfeiture of ₹75,000 plus two-coat repainting deductions.',
      },
      riskLevel: 'Red' as const,
      riskReason: 'Automatic ₹75,000 deposit forfeiture on early exit.',
    },
    {
      id: 'c-6-4',
      clauseNumber: 'Clause 6.4',
      title: 'Indemnity & Structural Liability',
      originalText:
        '6.4 The Lessee shall indemnify and hold harmless the Lessor against all losses, municipal penalties, structural seepage, electrical short-circuits, or third-party claims arising in or around the Demised Premises during the term.',
      simplifiedText: {
        Simple:
          'This indemnity (indemnity) clause makes you pay for any damage, fire, or water leakage in the flat—even if it happened because of old building pipes or faulty wiring.',
        Standard:
          'Broad indemnity (indemnity) shifting structural seepage and electrical fault liability onto the tenant.',
        Detailed:
          'Overbroad indemnification obligation making the Lessee financially liable for structural seepage, electrical short-circuits, and municipal fines that normally belong to the property owner.',
      },
      riskLevel: 'Amber' as const,
      riskReason: 'Makes tenant liable for building wiring and structural seepage.',
    },
    {
      id: 'c-8-2',
      clauseNumber: 'Clause 8.2',
      title: 'Right of Entry & Inspection',
      originalText:
        '8.2 The Lessor or his authorized agents shall have unrestricted liberty to enter upon and inspect the Demised Premises at any time of day to examine the state of maintenance or show the flat to prospective purchasers.',
      simplifiedText: {
        Simple:
          'The landlord or their broker can walk into the flat at any time without asking you in advance.',
        Standard:
          'Permits landlord or agents to enter the premises at any time without a prior notice requirement.',
        Detailed:
          'Grants unrestricted entry rights without the statutory 24-hour prior written notice required under the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act.',
      },
      riskLevel: 'Amber' as const,
      riskReason: 'No 24-hour advance notice required before landlord enters.',
    },
    {
      id: 'c-11-1',
      clauseNumber: 'Clause 11.1',
      title: 'Post Lock-In Notice Period',
      originalText:
        '11.1 Subject to Clause 9.1, either party may terminate this Agreement after the ninth month by serving two (2) calendar months prior written notice or paying two months license fee in lieu thereof.',
      simplifiedText: {
        Simple:
          'After 9 months are over, either you or the landlord can end the agreement by giving 2 months advance written notice.',
        Standard:
          'Standard two-month written notice requirement (or two months rent in lieu) after the lock-in period ends.',
        Detailed:
          'Mutual termination clause operative post-month 9, requiring 60 days written notice or equivalent license fee compensation.',
      },
      riskLevel: 'Green' as const,
      riskReason: 'Balanced 2-month mutual notice after lock-in.',
    },
  ],
  glossary: [
    {
      term: 'Indemnity',
      originalTermBracketed: 'compensation promise (indemnity)',
      definition:
        'A legal promise where one person agrees to pay for any financial loss or damage suffered by the other person.',
      clauseRef: 'Clause 6.4',
    },
    {
      term: 'Ipso Facto',
      originalTermBracketed: 'automatically by that very fact (ipso facto)',
      definition:
        'Means "automatically as a direct result" without needing a separate court order or notice.',
      clauseRef: 'Clause 9.1',
    },
    {
      term: 'Demised Premises',
      originalTermBracketed: 'the rented house/flat (Demised Premises)',
      definition: 'The specific apartment, parking space, and fittings being rented out to you.',
      clauseRef: 'Clause 6.4 & 8.2',
    },
    {
      term: 'Lessor / Lessee',
      originalTermBracketed: 'Landlord (Lessor) / Tenant (Lessee)',
      definition:
        'Lessor is the property owner (landlord); Lessee is the person renting the house (tenant).',
      clauseRef: 'Clause 4.2 & 9.1',
    },
  ],
};

const RENTAL_TA = {
  inShortSummary: {
    Simple:
      'இது சென்னையில் மாதம் ₹22,000 வாடகை மற்றும் ₹1,50,000 முன்பணம் (Security Deposit) கொண்ட 11 மாத வீட்டு வாடகை ஒப்பந்தம். கவனம்: இதில் உள்ள இரண்டு விதிகள் வீட்டு உரிமையாளருக்கு முன்னறிவிப்பின்றி எப்போது வேண்டுமானாலும் வாடகையை உயர்த்தவும், 9 மாதங்களுக்கு முன் காலி செய்தால் ₹75,000 முன்பணத்தை எடுத்துக்கொள்ளவும் அதிகாரம் அளிக்கின்றன.',
    Standard:
      'எஸ். நாராயணன் (வீட்டு உரிமையாளர்) மற்றும் மீனா கே. (வாடகைதாரர்) இடையேயான 11 மாத வாடகை ஒப்பந்தம். மாத வாடகை ₹22,000 மற்றும் முன்பணம் ₹1,50,000. பிரிவு 4.2 முன்னறிவிப்பின்றி வாடகையை உயர்த்த அனுமதிக்கிறது; பிரிவு 9.1-ன் படி 9 மாதங்களுக்குள் வீட்டைக் காலி செய்தால் 50% முன்பணம் (₹75,000) பிடித்தம் செய்யப்படும்.',
    Detailed:
      'சென்னை அடையாறு பிளாட் 3B-க்கான 11 மாத குடியிருப்பு வாடகை ஒப்பந்தம் (மாத வாடகை ₹22,000 + பராமரிப்பு ₹2,400, வட்டியில்லா முன்பணம் ₹1,50,000). இதில் வாடகைதாரருக்கு பாதகமான முக்கிய அம்சங்கள்: (1) பிரிவு 4.2-ன் கீழ் உரிமையாளர் எந்நேரமும் வாடகையை உயர்த்தலாம், (2) பிரிவு 9.1-ன் கீழ் 9 மாத கட்டாயக் காலத்திற்கு (Lock-in period) முன் காலி செய்தால் ₹75,000 முன்பணம் இழப்பு (forfeiture) மற்றும் முழு பெயிண்டிங் செலவு விதிக்கப்படும்.',
  },
  partyAObligations: [
    'ప్రತಿ மாதமும் 5-ம் தேதிக்குள் ₹22,000 வாடகை மற்றும் ₹2,400 பராமரிப்புத் தொகையைச் செலுத்த வேண்டும்.',
    'சாவி வாங்கும் முன் ₹1,50,000 வட்டியில்லா பாதுகாப்பு முன்பணம் (Security Deposit) செலுத்த வேண்டும்.',
    'வீட்டைக் குடும்பக் குடியிருப்புக்கு மட்டுமே பயன்படுத்த வேண்டும் (உள்வாடகைக்கு விடக்கூடாது).',
    '₹1,000-க்குள் வரும் சிறிய குழாய் மற்றும் மின்விளக்கு பழுதுகளை வாடகைதாரரே பார்க்க வேண்டும்.',
  ].map((s, idx) =>
    idx === 0
      ? 'ஒவ்வொரு மாதமும் 5-ம் தேதிக்குள் ₹22,000 வாடகை மற்றும் ₹2,400 பராமரிப்புத் தொகையைச் செலுத்த வேண்டும்.'
      : s
  ),
  partyBObligations: [
    'குடிநீர் மற்றும் மின்சார வசதியுடன் பிளாட் 3B-ன் சாவியை ஒப்படைக்க வேண்டும்.',
    'சொத்து வரி மற்றும் கட்டிடத்தின் பெரிய விரிசல்/கசிவு பழுதுகளை உரிமையாளரே ஏற்க வேண்டும்.',
    'வீட்டைக் காலி செய்யும்போது முன்பணத்தைத் திருப்பித் தர வேண்டும் (பிரிவு 9.1 பிடித்தங்களுக்கு உட்பட்டு).',
  ],
  keyFacts: [
    { label: 'தரப்பினர்கள் (Parties)', value: 'எஸ். நாராயணன் (உரிமையாளர்) & மீனா கே. (வாடகைதாரர்)', clauseRef: 'முகப்புரை' },
    { label: 'மாத வாடகை (Monthly Rent)', value: '₹22,000 + ₹2,400 பராமரிப்பு', clauseRef: 'பிரிவு 3.1' },
    { label: 'முன்பணம் (Security Deposit)', value: '₹1,50,000 (வட்டியில்லாதது)', clauseRef: 'பிரிவு 3.2' },
    { label: 'கால அளவு (Duration & Lock-in)', value: '11 மாதங்கள் | 9 மாத கட்டாயக் காலம் (Lock-in)', clauseRef: 'பிரிவு 2 & 9.1' },
    { label: 'தாமத அபராதம் (Late Penalty)', value: '18% வட்டி + 7-ம் தேதிக்குப் பின் நாள் ஒன்றுக்கு ₹500', clauseRef: 'பிரிவு 4.1' },
    { label: 'முன்னறிவிப்பு (Notice Period)', value: '2 மாத எழுத்துப்பூர்வ அறிவிப்பு | சென்னை நீதிமன்றம்', clauseRef: 'பிரிவு 11 & 14' },
  ],
  riskFlags: [
    {
      id: 'rf-1',
      level: 'Red' as const,
      clauseNumber: 'Clause 4.2',
      title: 'முன்னறிவிப்பின்றி வாடகை உயர்வு (Unilateral Rent Increase)',
      oneLineReason: '11 மாதங்களுக்குள் வீட்டு உரிமையாளர் எப்போது வேண்டுமானாலும் முன்னறிவிப்பின்றி வாடகையை உயர்த்தலாம்.',
    },
    {
      id: 'rf-2',
      level: 'Red' as const,
      clauseNumber: 'Clause 9.1',
      title: '50% முன்பணம் பறிமுதல் — ₹75,000 (Deposit Forfeiture)',
      oneLineReason: '9 மாதங்களுக்கு முன் வீட்டைக் காலி செய்தால் உங்களின் ₹1,50,000 முன்பணத்தில் பாதி (₹75,000) திருப்பித் தரப்படாது.',
    },
    {
      id: 'rf-3',
      level: 'Amber' as const,
      clauseNumber: 'Clause 6.4',
      title: 'இழப்பீட்டு உறுதி (indemnity)',
      oneLineReason: 'பழைய மின் வயரிங் அல்லது குழாய் உடைப்பால் ஏற்படும் சேதத்திற்கும் வாடகைதாரரே பணம் கட்ட வேண்டும் என்கிறது.',
    },
    {
      id: 'rf-4',
      level: 'Amber' as const,
      clauseNumber: 'Clause 8.2',
      title: 'முன்னறிவிப்பின்றி வீட்டு ஆய்வு (Unannounced Entry)',
      oneLineReason: '24 மணி நேர முன்னறிவிப்பு இல்லாமல் உரிமையாளர் எந்த நேரத்திலும் வீட்டைப் பார்வையிட வரலாம்.',
    },
    {
      id: 'rf-5',
      level: 'Green' as const,
      clauseNumber: 'Clause 11.1',
      title: '2 மாத முன்னறிவிப்பு (Mutual Notice)',
      oneLineReason: '9 மாதங்களுக்குப் பிறகு இரு தரப்பினரும் 2 மாத முன்னறிவிப்பு கொடுத்து ஒப்பந்தத்தை முடிக்கலாம்.',
    },
  ],
  questionsToAsk: [
    'பிரிவு 4.2-ஐ நீக்கிவிட்டு, 11 மாதங்களுக்கும் ₹22,000 நிலையான வாடகை என்று மாற்ற முடியுமா?',
    'பிரிவு 9.1-ல் 50% முன்பணம் (₹75,000) பிடித்தம் என்பதற்குப் பதிலாக 1 மாத வாடகை மட்டும் பிடித்தம் என மாற்றலாமா?',
    'பிரிவு 8.2-ல் வீட்டைப் பார்வையிட வருவதற்கு 24 மணி நேரத்திற்கு முன்பே தகவல் சொல்ல வேண்டும் எனச் சேர்க்கலாமா?',
    'சாதாரண தேய்மானத்திற்கு (normal wear and tear) முன்பணத்தில் பிடித்தம் செய்யக்கூடாது எனக் குறிப்பிடலாமா?',
  ],
  clauses: [
    {
      id: 'c-4-2',
      clauseNumber: 'Clause 4.2',
      title: 'வாடகை உயர்வு விதி (Rent Revision & Escalation)',
      originalText: RENTAL_EN.clauses[0].originalText,
      simplifiedText: {
        Simple:
          'இந்த 11 மாத காலத்திற்குள் வீட்டு உரிமையாளர் உங்களுக்கு எந்த முன்னறிவிப்பும் காரணமும் சொல்லாமல் எப்போது வேண்டுமானாலும் மாத வாடகையை உயர்த்தலாம்.',
        Standard:
          'ஒப்பந்த காலத்தின் இடையே முன்னறிவிப்பின்றி வாடகையை உயர்த்த உரிமையாளருக்கு (Lessor) முழு அதிகாரம் அளிக்கிறது.',
        Detailed:
          'பிற விதிகளில் என்ன கூறப்பட்டிருந்தாலும் (Notwithstanding), ஒப்பந்த காலத்தில் எந்த நேரத்திலும் வாடகைதாரரின் ஒப்புதல் இன்றி வாடகையை மாற்றியமைக்க உரிமையாளருக்கு அதிகாரம் வழங்குகிறது.',
      },
      riskLevel: 'Red' as const,
      riskReason: 'முன்னறிவிப்பின்றி எப்போது வேண்டுமானாலும் வாடகையை உயர்த்தலாம்.',
    },
    {
      id: 'c-9-1',
      clauseNumber: 'Clause 9.1',
      title: 'கட்டாயக் காலம் மற்றும் முன்பணம் இழப்பு (Lock-In & Forfeiture)',
      originalText: RENTAL_EN.clauses[1].originalText,
      simplifiedText: {
        Simple:
          'முதல் 9 மாதங்களுக்கு நீங்கள் வீட்டைக் காலி செய்ய முடியாது (Lock-In Period). எந்தக் காரணத்திற்காகவாவது 9 மாதத்திற்கு முன் காலி செய்தால், உங்கள் முன்பணத்தில் ₹75,000-ஐ உரிமையாளர் எடுத்துக்கொள்வார்; மேலும் பெயிண்டிங் செலவையும் நீங்களே தர வேண்டும்.',
        Standard:
          '9 மாத கட்டாயக் காலத்திற்குள் (Lock-in period) காலி செய்தால் தானாகவே (ipso facto) ₹75,000 முன்பணம் பறிமுதல் செய்யப்படும்.',
        Detailed:
          '11 மாத ஒப்பந்தத்தில் 9 மாதங்கள் கட்டாயக் காலமாக (Lock-in period) நிர்ணயிக்கப்பட்டுள்ளது. இதற்கு முன் காலி செய்தால் 50% முன்பணம் (₹75,000) இழப்பு (forfeiture) மற்றும் இரண்டு கோட் பெயிண்டிங் கட்டணம் பிடித்தம் செய்யப்படும்.',
      },
      riskLevel: 'Red' as const,
      riskReason: '9 மாதத்திற்கு முன் காலி செய்தால் ₹75,000 முன்பணம் பறிமுதல்.',
    },
    {
      id: 'c-6-4',
      clauseNumber: 'Clause 6.4',
      title: 'இழப்பீட்டு உறுதி (Indemnity & Liability)',
      originalText: RENTAL_EN.clauses[2].originalText,
      simplifiedText: {
        Simple:
          'இழப்பீட்டு உறுதி (indemnity) விதியின்படி, வீட்டில் நீர் கசிவு அல்லது மின் கசிவு ஏற்பட்டால் கூட அதற்கான முழுச் செலவையும் வாடகைதாரரே ஏற்க வேண்டும்.',
        Standard:
          'கட்டிடக் கசிவு மற்றும் மின்சார பழுதுகளுக்கும் வாடகைதாரரே இழப்பீட்டு உறுதி (indemnity) அளிக்க வேண்டும் என்கிறது.',
        Detailed:
          'வாடகை வீட்டில் (Demised Premises) ஏற்படும் கட்டிடக் கசிவு, மின் கசிவு மற்றும் மாநகராட்சி அபராதங்களுக்கு வாடகைதாரரே பொறுப்பேற்க வேண்டும் என்ற ஒருதலைப்பட்சமான விதி.',
      },
      riskLevel: 'Amber' as const,
      riskReason: 'கட்டிடக் கசிவு மற்றும் மின் பழுதுகளை வாடகைதாரர் தலையில் கட்டுகிறது.',
    },
    {
      id: 'c-8-2',
      clauseNumber: 'Clause 8.2',
      title: 'வீட்டைப் பார்வையிடும் உரிமை (Right of Entry)',
      originalText: RENTAL_EN.clauses[3].originalText,
      simplifiedText: {
        Simple:
          'வீட்டு உரிமையாளரோ அல்லது புரோக்கரோ உங்களுக்கு முன்கூட்டியே தகவல் சொல்லாமல் எந்த நேரத்திலும் வீட்டிற்குள் வந்து பார்க்கலாம்.',
        Standard:
          'முன்னறிவிப்பு இல்லாமல் எந்த நேரத்திலும் வீட்டை ஆய்வு செய்ய உரிமையாளருக்கு அனுமதி அளிக்கிறது.',
        Detailed:
          'தமிழ்நாடு வாடகைச் சட்டப்படி 24 மணி நேர முன்னறிவிப்பு அவசியம்; ஆனால் இந்த விதி எந்த நேரத்திலும் தடையின்றி நுழைய உரிமையாளருக்கு அதிகாரம் அளிக்கிறது.',
      },
      riskLevel: 'Amber' as const,
      riskReason: '24 மணி நேர முன்னறிவிப்பு விதி இல்லை.',
    },
    {
      id: 'c-11-1',
      clauseNumber: 'Clause 11.1',
      title: 'முன்னறிவிப்பு காலம் (Post Lock-In Notice Period)',
      originalText: RENTAL_EN.clauses[4].originalText,
      simplifiedText: {
        Simple:
          '9 மாதங்கள் முடிந்த பிறகு, நீங்களோ அல்லது உரிமையாளரோ 2 மாதங்களுக்கு முன்பே எழுத்துப்பூர்வமாகத் தகவல் கொடுத்து ஒப்பந்தத்தை முடித்துக்கொள்ளலாம்.',
        Standard: '9 மாதங்களுக்குப் பின் இரு தரப்பிற்கும் பொதுவான 2 மாத முன்னறிவிப்பு விதி.',
        Detailed:
          'பிரிவு 9.1-க்கு உட்பட்டு, 9-வது மாதத்திற்குப் பிறகு 2 மாத எழுத்துப்பூர்வ அறிவிப்பு அல்லது 2 மாத வாடகை கொடுத்து ஒப்பந்தத்தை முடிக்கலாம்.',
      },
      riskLevel: 'Green' as const,
      riskReason: 'சமநிலையான 2 மாத முன்னறிவிப்பு.',
    },
  ],
  glossary: [
    {
      term: 'Indemnity',
      originalTermBracketed: 'இழப்பீட்டு உறுதி (indemnity)',
      definition: 'மற்றவருக்கு ஏற்படும் நஷ்டம் அல்லது சேதச் செலவை நானே ஈடுகட்டுகிறேன் என்று கொடுக்கும் சட்டப்பூர்வ வாக்குறுதி.',
      clauseRef: 'Clause 6.4',
    },
    {
      term: 'Ipso Facto',
      originalTermBracketed: 'தானாகவே / உடனடியாக (ipso facto)',
      definition: 'தனியாக நோட்டீஸ் அல்லது நீதிமன்ற உத்தரவு இல்லாமல் அந்தச் செயலினாலேயே தானாக அமலுக்கு வருவது.',
      clauseRef: 'Clause 9.1',
    },
    {
      term: 'Demised Premises',
      originalTermBracketed: 'வாடகைக்கு விடப்படும் வீடு (Demised Premises)',
      definition: 'நீங்கள் வாடகைக்கு எடுக்கும் குறிப்பிட்ட பிளாட் மற்றும் அதனுடன் இணைந்த இடங்கள்.',
      clauseRef: 'Clause 6.4 & 8.2',
    },
    {
      term: 'Lessor / Lessee',
      originalTermBracketed: 'வீட்டு உரிமையாளர் (Lessor) / வாடகைதாரர் (Lessee)',
      definition: 'Lessor என்றால் சொத்து உரிமையாளர்; Lessee என்றால் வாடகைக்கு குடியிருப்பவர்.',
      clauseRef: 'Clause 4.2 & 9.1',
    },
  ],
};

const RENTAL_HI = {
  inShortSummary: {
    Simple:
      'यह चेन्नई में ₹22,000 प्रति माह किराए और ₹1,50,000 सिक्योरिटी डिपॉज़िट वाला 11 महीने का रेंटल एग्रीमेंट है। सावधान रहें: इसमें दो शर्तें मकान मालिक को बिना नोटिस कभी भी किराया बढ़ाने और 9 महीने से पहले घर छोड़ने पर आपका आधा डिपॉज़िट (₹75,000) ज़ब्त करने का एकतरफा अधिकार देती हैं।',
    Standard:
      'एस. नारायणन (मकान मालिक) और मीना के. (किरायेदार) के बीच ₹22,000/माह किराए और ₹1,50,000 ब्याज-मुक्त डिपॉज़िट का 11-माह का अनुबंध। क्लॉज़ 4.2 बिना पूर्व सूचना किराया बढ़ाने की अनुमति देता है और क्लॉज़ 9.1 में 9 महीने के लॉक-इन से पहले घर खाली करने पर 50% डिपॉज़िट (₹75,000) ज़ब्ती का जोखिम है।',
    Detailed:
      'फ्लैट 3B, अड्यार, चेन्नई के लिए 11 महीने का आवासीय पट्टा अनुबंध (मासिक किराया ₹22,000 + मेंटेनेंस ₹2,400, सिक्योरिटी डिपॉज़िट ₹1,50,000)। प्रमुख जोखिम बिंदु: (1) क्लॉज़ 4.2 मकान मालिक (Lessor) को बिना किसी पूर्व लिखित नोटिस के कभी भी किराया बढ़ाने का पूर्ण अधिकार देता है, और (2) क्लॉज़ 9.1 के तहत 9 महीने के लॉक-इन पीरियड में घर छोड़ने पर ₹75,000 की स्वतः ज़ब्ती (ipso facto forfeiture) तथा पूरे घर की पेंटिंग का खर्च किरायेदार पर डाला गया है।',
  },
  partyAObligations: [
    'हर महीने की 5 तारीख तक ₹22,000 किराया और ₹2,400 सोसाइटी मेंटेनेंस जमा करना होगा।',
    'चाबी लेने से पहले ₹1,50,000 ब्याज-मुक्त सिक्योरिटी डिपॉज़िट देना होगा।',
    'फ्लैट का उपयोग केवल परिवार के रहने के लिए करना होगा (किसी और को सब-लेट नहीं कर सकते)।',
    '₹1,000 तक के छोटे नल या बल्ब/फ़्यूज़ की मरम्मत किरायेदार को स्वयं करानी होगी।',
  ],
  partyBObligations: [
    'पानी और बिजली कनेक्शन के साथ फ्लैट 3B का शांतिपूर्ण कब्ज़ा सौंपना होगा।',
    'नगर निगम प्रॉपर्टी टैक्स और बड़ी संरचनात्मक मरम्मत मकान मालिक की ज़िम्मेदारी होगी।',
    'घर खाली करने पर सिक्योरिटी डिपॉज़िट वापस करना होगा (क्लॉज़ 9.1 की कटौतियों के अधीन)।',
  ],
  keyFacts: [
    { label: 'पक्षकार (Parties)', value: 'एस. नारायणन (मकान मालिक) व मीना के. (किरायेदार)', clauseRef: 'प्रस्तावना' },
    { label: 'मासिक किराया (Rent)', value: '₹22,000/माह + ₹2,400 मेंटेनेंस', clauseRef: 'क्लॉज़ 3.1' },
    { label: 'सिक्योरिटी डिपॉज़िट', value: '₹1,50,000 (ब्याज-मुक्त)', clauseRef: 'क्लॉज़ 3.2' },
    { label: 'अवधि और लॉक-इन', value: '11 महीने कुल | 9 महीने सख्त लॉक-इन', clauseRef: 'क्लॉज़ 2 व 9.1' },
    { label: 'देरी पर जुर्माना (Penalty)', value: '18% वार्षिक ब्याज + 7 तारीख के बाद ₹500/दिन', clauseRef: 'क्लॉज़ 4.1' },
    { label: 'नोटिस पीरियड', value: '2 महीने का लिखित नोटिस | चेन्नई न्यायालय', clauseRef: 'क्लॉज़ 11 व 14' },
  ],
  riskFlags: [
    {
      id: 'rf-1',
      level: 'Red' as const,
      clauseNumber: 'Clause 4.2',
      title: 'बिना नोटिस कभी भी किराया वृद्धि (Unilateral Rent Hike)',
      oneLineReason: 'मकान मालिक 11 महीनों के दौरान बिना किसी पूर्व सूचना के कभी भी किराया बढ़ा सकता है।',
    },
    {
      id: 'rf-2',
      level: 'Red' as const,
      clauseNumber: 'Clause 9.1',
      title: '50% डिपॉज़िट ज़ब्ती — ₹75,000 (Deposit Forfeiture)',
      oneLineReason: '9 महीने से पहले घर छोड़ने पर आपका ₹75,000 डिपॉज़िट ज़ब्त हो जाएगा और पेंटिंग खर्च अलग से कटेगा।',
    },
    {
      id: 'rf-3',
      level: 'Amber' as const,
      clauseNumber: 'Clause 6.4',
      title: 'एकतरफा क्षतिपूर्ति शर्त — हर्जाना वचन (indemnity)',
      oneLineReason: 'पुरानी वायरिंग या सीलन से होने वाले नुकसान की भरपाई भी किरायेदार पर डाली गई है।',
    },
    {
      id: 'rf-4',
      level: 'Amber' as const,
      clauseNumber: 'Clause 8.2',
      title: 'बिना पूर्व सूचना घर में प्रवेश (Unannounced Entry)',
      oneLineReason: 'मकान मालिक या ब्रोकर बिना 24 घंटे के नोटिस के किसी भी समय निरीक्षण के लिए आ सकते हैं।',
    },
    {
      id: 'rf-5',
      level: 'Green' as const,
      clauseNumber: 'Clause 11.1',
      title: 'लॉक-इन के बाद 2 महीने का नोटिस',
      oneLineReason: '9 महीने पूरे होने के बाद दोनों पक्ष 2 महीने का नोटिस देकर अनुबंध समाप्त कर सकते हैं।',
    },
  ],
  questionsToAsk: [
    'क्या हम क्लॉज़ 4.2 को हटाकर पूरे 11 महीनों के लिए किराया ₹22,000 फिक्स कर सकते हैं?',
    'क्लॉज़ 9.1 में ₹75,000 ज़ब्ती के बजाय क्या हम 1 महीने के नोटिस किराए की मानक शर्त रख सकते हैं?',
    'क्या क्लॉज़ 8.2 में घर देखने आने से पहले "कम से कम 24 घंटे पूर्व सूचना" जोड़ सकते हैं?',
    'क्या सामान्य टूट-फूट (normal wear and tear) को डिपॉज़िट कटौती से बाहर रखा जा सकता है?',
  ],
  clauses: [
    {
      id: 'c-4-2',
      clauseNumber: 'Clause 4.2',
      title: 'किराया संशोधन और वृद्धि (Rent Revision)',
      originalText: RENTAL_EN.clauses[0].originalText,
      simplifiedText: {
        Simple:
          'मकान मालिक 11 महीने के बीच में जब चाहे, बिना आपको पहले बताए या कोई कारण दिए आपका मासिक किराया बढ़ा सकता है।',
        Standard:
          'मकान मालिक (Lessor) को अनुबंध अवधि के दौरान बिना पूर्व सूचना के एकतरफा किराया बढ़ाने का अधिकार देता है।',
        Detailed:
          'अन्य सभी शर्तों को दरकिनार करते हुए (Notwithstanding), यह धारा मकान मालिक को बिना लिखित नोटिस या सहमति के ₹22,000 मासिक शुल्क बढ़ाने का असीमित अधिकार देती है।',
      },
      riskLevel: 'Red' as const,
      riskReason: 'बिना नोटिस कभी भी किराया बढ़ाने का अधिकार।',
    },
    {
      id: 'c-9-1',
      clauseNumber: 'Clause 9.1',
      title: 'लॉक-इन पीरियड और डिपॉज़िट ज़ब्ती (Lock-In & Forfeiture)',
      originalText: RENTAL_EN.clauses[1].originalText,
      simplifiedText: {
        Simple:
          'शुरुआती 9 महीनों में आप घर खाली नहीं कर सकते। किसी भी कारण से जल्दी छोड़ने पर मकान मालिक आपके डिपॉज़िट से ₹75,000 रख लेगा और दो कोट पेंटिंग का पैसा भी काटेगा।',
        Standard:
          '9 महीने के लॉक-इन से पहले घर खाली करने पर 50% सिक्योरिटी डिपॉज़िट (₹75,000) की स्वतः ज़ब्ती (ipso facto forfeiture)।',
        Detailed:
          '11 महीने के अनुबंध में 9 महीने का सख्त लॉक-इन निर्धारित करता है, जिसके उल्लंघन पर ₹75,000 की तत्काल ज़ब्ती और पेंटिंग शुल्क लागू होता है।',
      },
      riskLevel: 'Red' as const,
      riskReason: '9 महीने से पहले छोड़ने पर ₹75,000 डिपॉज़िट ज़ब्त।',
    },
    {
      id: 'c-6-4',
      clauseNumber: 'Clause 6.4',
      title: 'क्षतिपूर्ति और दायित्व (Indemnity & Liability)',
      originalText: RENTAL_EN.clauses[2].originalText,
      simplifiedText: {
        Simple:
          'इस हर्जाना वचन (indemnity) शर्त के कारण फ्लैट में सीलन या शॉर्ट-सर्किट से होने वाले नुकसान का पैसा भी आपको देना पड़ सकता है।',
        Standard:
          'व्यापक क्षतिपूर्ति वचन (indemnity) जो सीलन और बिजली शॉर्ट-सर्किट की ज़िम्मेदारी किरायेदार पर डालता है।',
        Detailed:
          'किराये के परिसर (Demised Premises) में संरचनात्मक सीलन, शॉर्ट-सर्किट और नगर निगम जुर्माने के लिए किरायेदार को उत्तरदायी बनाता है।',
      },
      riskLevel: 'Amber' as const,
      riskReason: 'पुरानी वायरिंग व सीलन का खर्च किरायेदार पर।',
    },
    {
      id: 'c-8-2',
      clauseNumber: 'Clause 8.2',
      title: 'प्रवेश और निरीक्षण का अधिकार (Right of Entry)',
      originalText: RENTAL_EN.clauses[3].originalText,
      simplifiedText: {
        Simple: 'मकान मालिक या उनका एजेंट बिना पहले बताए दिन में किसी भी समय घर के अंदर जांच करने आ सकता है।',
        Standard: 'बिना पूर्व सूचना के किसी भी समय परिसर के निरीक्षण की अनुमति देता है।',
        Detailed: '24 घंटे के पूर्व नोटिस की मानक आवश्यकता के बिना मकान मालिक को असीमित प्रवेश अधिकार देता है।',
      },
      riskLevel: 'Amber' as const,
      riskReason: 'निरीक्षण से पहले 24 घंटे के नोटिस की शर्त नहीं है।',
    },
    {
      id: 'c-11-1',
      clauseNumber: 'Clause 11.1',
      title: 'नोटिस पीरियड (Post Lock-In Notice Period)',
      originalText: RENTAL_EN.clauses[4].originalText,
      simplifiedText: {
        Simple: '9 महीने पूरे होने के बाद आप या मकान मालिक 2 महीने पहले लिखित सूचना देकर एग्रीमेंट खत्म कर सकते हैं।',
        Standard: '9वें महीने के बाद दोनों पक्षों के लिए 2 महीने के लिखित नोटिस की संतुलित शर्त।',
        Detailed: 'क्लॉज़ 9.1 के अधीन, 9 महीने बाद 60 दिन के लिखित नोटिस या 2 माह के किराए के बदले अनुबंध समाप्त किया जा सकता है।',
      },
      riskLevel: 'Green' as const,
      riskReason: 'संतुलित 2 महीने का आपसी नोटिस पीरियड।',
    },
  ],
  glossary: [
    {
      term: 'Indemnity',
      originalTermBracketed: 'हर्जाना / क्षतिपूर्ति वचन (indemnity)',
      definition: 'दूसरे पक्ष को होने वाले किसी भी आर्थिक नुकसान या मुक़दमे के खर्च की भरपाई करने का कानूनी वादा।',
      clauseRef: 'Clause 6.4',
    },
    {
      term: 'Ipso Facto',
      originalTermBracketed: 'स्वतः ही / उसी तथ्य से (ipso facto)',
      definition: 'बिना किसी अलग नोटिस या कोर्ट आदेश के तुरंत अपने-आप लागू हो जाना।',
      clauseRef: 'Clause 9.1',
    },
    {
      term: 'Demised Premises',
      originalTermBracketed: 'किराये पर दिया गया फ्लैट (Demised Premises)',
      definition: 'वह विशिष्ट घर या अपार्टमेंट जो आपको किराये पर रहने के लिए दिया जा रहा है।',
      clauseRef: 'Clause 6.4 & 8.2',
    },
    {
      term: 'Lessor / Lessee',
      originalTermBracketed: 'मकान मालिक (Lessor) / किरायेदार (Lessee)',
      definition: 'Lessor संपत्ति का मालिक है; Lessee संपत्ति किराये पर लेने वाला व्यक्ति है।',
      clauseRef: 'Clause 4.2 & 9.1',
    },
  ],
};

const RENTAL_TE = {
  ...RENTAL_EN,
  inShortSummary: {
    Simple:
      'ఇది చెన్నైలో నెలకు ₹22,000 అద్దె మరియు ₹1,50,000 సెక్యూరిటీ డిపాజిట్‌తో కూడిన 11 నెలల ఇంటి అద్దె ఒప్పందం. జాగ్రత్త: ఇందులోని రెండు నిబంధనలు యజమానికి ముందస్తు నోటీసు లేకుండా ఎప్పుడైనా అద్దె పెంచే అధికారాన్ని మరియు 9 నెలల లోపు ఖాళీ చేస్తే ₹75,000 డిపాజిట్ మినహాయించుకునే అధికారాన్ని ఇస్తున్నాయి.',
    Standard:
      'ఎస్. నారాయణన్ (యజమాని) మరియు మీనా కె. (అద్దెదారు) మధ్య ₹22,000 నెలవారీ అద్దె మరియు ₹1,50,000 డిపాజిట్ ఒప్పందం. క్లాజ్ 4.2 నోటీసు లేకుండా అద్దె పెంపును అనుమతిస్తుంది; క్లాజ్ 9.1 ప్రకారం 9 నెలల లాక్-ఇన్ కంటే ముందు ఖాళీ చేస్తే 50% డిపాజిట్ (₹75,000) జప్తు చేయబడుతుంది.',
    Detailed:
      'ఫ్లాట్ 3B, అడయార్ కోసం 11 నెలల రెసిడెన్షియల్ లీజు ఒప్పందం. క్లాజ్ 4.2 యజమానికి ఏకపక్షంగా అద్దె పెంచే హక్కును ఇస్తుంది మరియు క్లాజ్ 9.1 కింద 9 నెలల లాక్-ఇన్ సమయంలో ఖాళీ చేస్తే ₹75,000 డిపాజిట్ కోత (forfeiture) మరియు పెయింటింగ్ ఛార్జీలు వర్తిస్తాయి.',
  },
  glossary: [
    {
      term: 'Indemnity',
      originalTermBracketed: 'నష్టపరిహార హామీ (indemnity)',
      definition: 'ఇతర పక్షానికి కలిగే ఆర్థిక నష్టాన్ని భర్తీ చేస్తామని ఇచ్చే చట్టపరమైన వాగ్దానం.',
      clauseRef: 'Clause 6.4',
    },
    ...RENTAL_EN.glossary.slice(1),
  ],
};

const RENTAL_BN = {
  ...RENTAL_EN,
  inShortSummary: {
    Simple:
      'এটি চেন্নাইতে মাসে ₹২২,০০০ ভাড়া এবং ₹১,৫০,০০০ সিকিউরিটি ডিপোজিটের একটি ১১ মাসের বাড়ি ভাড়ার চুক্তি। সতর্কতা: দুটি শর্ত বাড়িওয়ালাকে বিনা নোটিশে যেকোনো সময় ভাড়া বাড়ানোর এবং ৯ মাসের আগে বাড়ি ছাড়লে আপনার অর্ধেক ডিপোজিট (₹৭৫,০০০) কেটে রাখার একতরফা ক্ষমতা দেয়।',
    Standard:
      'এস. নারায়ণন (বাড়িওয়ালা) এবং মীনা কে. (ভাড়াটে)-এর মধ্যে ১১ মাসের ভাড়ার চুক্তি। ধারা ৪.২ বিনা নোটিশে ভাড়া বৃদ্ধির অনুমতি দেয় এবং ধারা ৯.১ অনুযায়ী ৯ মাসের লক-ইন পিরিয়ডের আগে ছেড়ে দিলে ৫০% ডিপোজিট (₹৭৫,০০০) বাজেয়াপ্ত হবে।',
    Detailed:
      'ফ্ল্যাট ৩বি, আদিয়ার, চেন্নাইয়ের জন্য ১১ মাসের আবাসিক লিজ চুক্তি। ধারা ৪.২ বাড়িওয়ালাকে একতরফা ভাড়া বৃদ্ধির ক্ষমতা দেয় এবং ধারা ৯.১ অনুযায়ী ৯ মাসের আগে ফ্ল্যাট খালি করলে ₹৭৫,০০০ ডিপোজিট বাজেয়াপ্ত (forfeiture) এবং সম্পূর্ণ রঙ করার খরচ ভাড়াটের ওপর চাপানো হয়েছে।',
  },
  glossary: [
    {
      term: 'Indemnity',
      originalTermBracketed: 'ক্ষতিপূরণের অঙ্গীকার (indemnity)',
      definition: 'অন্য পক্ষের কোনো আর্থিক ক্ষতি হলে তা পূরণ করার আইনি প্রতিশ্রুতি।',
      clauseRef: 'Clause 6.4',
    },
    ...RENTAL_EN.glossary.slice(1),
  ],
};

export const LEGAL_SAMPLES: LegalDocumentAnalysis[] = [
  {
    id: 'leg-rental-chennai',
    documentId: 'doc-leg-001',
    title: 'Residential Rental Agreement — Flat 3B, Adyar (14 Pages)',
    agreementType: 'Rental Agreement',
    pages: 14,
    sha256Hash: '9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    createdAt: '2026-10-31T07:50:00Z',
    translations: {
      en: RENTAL_EN,
      ta: RENTAL_TA,
      hi: RENTAL_HI,
      te: RENTAL_TE,
      bn: RENTAL_BN,
      mr: RENTAL_HI,
      gu: RENTAL_EN,
      kn: RENTAL_EN,
      ml: RENTAL_EN,
      pa: RENTAL_HI,
      or: RENTAL_EN,
      ur: RENTAL_EN,
    },
  },
  {
    id: 'leg-employment-tech',
    documentId: 'doc-leg-002',
    title: 'Software Engineer Employment & IP Assignment Agreement (9 Pages)',
    agreementType: 'Employment Contract',
    pages: 9,
    sha256Hash: '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    createdAt: '2026-10-30T18:15:00Z',
    translations: {
      en: {
        inShortSummary: {
          Simple:
            'Full-time employment contract for Senior Product Engineer at ₹24,00,000 CTC. Watch out: It requires a 90-day notice period from you (while the company can terminate with 15 days notice), claims ownership of your weekend personal side projects, and includes a ₹3,00,000 training bond if you leave within 18 months.',
          Standard:
            'Employment agreement with ₹24 LPA fixed + variable compensation. Contains three high-risk asymmetries: (1) Clause 7.2 imposes an 18-month ₹3,00,000 liquidated damages bond, (2) Clause 10.1 assigns all personal side-project IP created even off-duty on personal devices, and (3) Clause 12.1 sets a 90-day employee notice vs 15-day employer termination notice.',
          Detailed:
            'Executive Employment & Proprietary Information Agreement. Key legal exposures include an enforceable vs penalty test under Section 74 of the Indian Contract Act (Clause 7.2 ₹3L bond), overbroad assignment of non-workplace inventions (Clause 10.1), and a 24-month post-termination competitor restriction (Clause 11.3, largely unenforceable post-employment under Section 27 of the Indian Contract Act, 1872).',
        },
        partyAObligations: [
          'Devote full working hours (45 hours/week) and maintain confidentiality of client codebases.',
          'Serve 90 calendar days notice before resigning or pay 3 months gross salary in lieu.',
          'Pay ₹3,00,000 bond penalty if resigning before completing 18 months of service.',
        ],
        partyBObligations: [
          'Credit monthly salary by the last working day of each month after statutory PF and TDS deductions.',
          'Provide health insurance coverage of ₹5,00,000 for employee and dependents.',
        ],
        keyFacts: [
          { label: 'Role & Annual CTC', value: 'Senior Software Engineer | ₹24,00,000 p.a.', clauseRef: 'Annexure A' },
          { label: 'Employment Bond', value: '₹3,00,000 penalty if leaving before 18 months', clauseRef: 'Clause 7.2' },
          { label: 'Notice Period', value: '90 days by Employee | 15 days by Employer', clauseRef: 'Clause 12.1' },
          { label: 'Non-Compete Window', value: '24 months after exit across all SaaS firms', clauseRef: 'Clause 11.3' },
          { label: 'IP Ownership Scope', value: 'Includes off-hours personal projects', clauseRef: 'Clause 10.1' },
          { label: 'Arbitration Seat', value: 'Sole arbitrator appointed by Company | Bengaluru', clauseRef: 'Clause 16.2' },
        ],
        riskFlags: [
          {
            id: 'emp-rf-1',
            level: 'Red',
            clauseNumber: 'Clause 7.2',
            title: '₹3,00,000 Employment Bond for 18 Months',
            oneLineReason: 'Leaving before 18 months requires paying ₹3,00,000 even if no external training was provided.',
          },
          {
            id: 'emp-rf-2',
            level: 'Red',
            clauseNumber: 'Clause 10.1',
            title: '24/7 Personal Side-Project IP Capture',
            oneLineReason: 'Company claims ownership over code or apps you build at home on weekends on your own laptop.',
          },
          {
            id: 'emp-rf-3',
            level: 'Amber',
            clauseNumber: 'Clause 12.1',
            title: 'Asymmetric Notice Period (90 Days vs 15 Days)',
            oneLineReason: 'You must give 90 days notice to quit, but the company can let you go with just 15 days notice.',
          },
          {
            id: 'emp-rf-4',
            level: 'Green',
            clauseNumber: 'Clause 5.1',
            title: 'Statutory Gratuity & EPF Compliance',
            oneLineReason: 'Complies with standard Employees Provident Fund and Payment of Gratuity Act rules.',
          },
        ],
        questionsToAsk: [
          'Can we add an exclusion to Clause 10.1 for personal open-source and weekend projects built without company laptops or confidential data?',
          'Can Clause 12.1 notice period be made symmetrical (60 days for both employee and employer)?',
          'Is the ₹3,00,000 bond in Clause 7.2 tied to a specific external certification, or can it be prorated/waived?',
        ],
        clauses: [
          {
            id: 'emp-c-1',
            clauseNumber: 'Clause 7.2',
            title: 'Minimum Service Commitment & Liquidated Damages',
            originalText:
              '7.2 The Employee undertakes to serve the Company for a minimum period of eighteen (18) months. Should the Employee resign prior to completion of 18 months, the Employee shall pay Rs. 3,00,000/- as pre-estimated liquidated damages prior to issuance of relieving letter.',
            simplifiedText: {
              Simple:
                'If you quit before 18 months, the company demands ₹3,00,000 before giving you your relieving and experience letters.',
              Standard:
                'Imposes a ₹3,00,000 minimum-service bond for 18 months and links relieving letter issuance to payment.',
              Detailed:
                'Stipulates ₹3,00,000 as liquidated damages (liquidated damages) for exit prior to 18 months. Under Indian labour law (Section 74 Contract Act), employers can only recover actual proved training expenditure, not arbitrary penalties.',
            },
            riskLevel: 'Red',
            riskReason: 'Withholds relieving letter unless ₹3,00,000 bond is paid.',
          },
          {
            id: 'emp-c-2',
            clauseNumber: 'Clause 10.1',
            title: 'Assignment of Intellectual Property',
            originalText:
              '10.1 All inventions, software, designs, and works of authorship conceived or developed by the Employee during the period of employment, whether during or outside working hours and whether using Company equipment or personal equipment, shall be the sole and exclusive property of the Company.',
            simplifiedText: {
              Simple:
                'Any app, website, or project you create while employed here—even on Sundays on your personal computer—automatically belongs to the company.',
              Standard:
                'Assigns all intellectual property (intellectual property) created during the employment term, including off-hours work on personal hardware.',
              Detailed:
                'Overbroad "all-time, all-device" IP assignment that captures unrelated personal projects created outside the scope of employment.',
            },
            riskLevel: 'Red',
            riskReason: 'Claims ownership of weekend personal projects built on your own laptop.',
          },
        ],
        glossary: [
          {
            term: 'Liquidated Damages',
            originalTermBracketed: 'pre-decided penalty amount (liquidated damages)',
            definition: 'A fixed money penalty written into a contract in case someone breaks a rule early.',
            clauseRef: 'Clause 7.2',
          },
          {
            term: 'Intellectual Property',
            originalTermBracketed: 'ownership of code/ideas (Intellectual Property)',
            definition: 'Legal ownership over software code, designs, inventions, or written content.',
            clauseRef: 'Clause 10.1',
          },
        ],
      },
      hi: RENTAL_HI,
      ta: RENTAL_TA,
      te: RENTAL_TE,
      bn: RENTAL_BN,
      mr: RENTAL_HI,
      gu: RENTAL_EN,
      kn: RENTAL_EN,
      ml: RENTAL_EN,
      pa: RENTAL_HI,
      or: RENTAL_EN,
      ur: RENTAL_EN,
    },
  },
];
