export type SupportedLanguage = 'en' | 'hi' | 'te';

export interface TranslationStrings {
  brandName: string;
  tagline: string;
  taglineSub: string;
  sevaChallengeBadge: string;
  demoNotice: string;
  demoNoticeShort: string;
  offlineReady: string;
  online: string;
  offline: string;
  juryDemoBtn: string;
  listenPriceHero: string;
  navHome: string;
  navPrices: string;
  navCentres: string;
  navPassport: string;
  navIVR: string;
  navSHG: string;
  sampleDifferenceBadge: string;
  viewAllProduce: string;
  verifiedCentre: string;
  todaySampleAvg: string;
  listenVoice: string;
  playingAudio: string;
  voiceNotAvailable: string;
  diffExtra: string;
  perKg: string;
  villageRate: string;
  centreRate: string;
  mandiRate: string;
  qualityStandard: string;
  lastUpdated: string;
  sourceNote: string;
  filterAll: string;
  recordSaleTitle: string;
  totalEarningsRecorded: string;
  totalGainOverTrader: string;
  addSaleRecord: string;
  loadDemoSales: string;
  resetDemoData: string;
  resetConfirm: string;
  ivrHeadline: string;
  ivrSub: string;
  missedCallBtn: string;
  callSimulating: string;
  callConnected: string;
  endCall: string;
  pressKey: string;
  shgBidNotice: string;
}

export const translations: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    brandName: 'VanDhan Saathi',
    tagline: 'Aaj ka sahi bhaav. Aapki awaaz mein.',
    taglineSub: 'Fair mandi & collection rates in your local tongue for tribal minor forest produce gatherers.',
    sevaChallengeBadge: 'Seva First Innovation Challenge 2026 • Tribal Logistics MVP',
    demoNotice: 'DEMO DATA — Not live market prices. Shown strictly for innovation prototyping and simulation.',
    demoNoticeShort: 'DEMO DATA — For demonstration only',
    offlineReady: 'Offline mode active • Local records stored safely on device',
    online: 'Live Demo Mode',
    offline: 'Offline Mode (Device Saved)',
    juryDemoBtn: '90-Sec Jury Walkthrough',
    listenPriceHero: 'Hear Today\'s Sample Rates',
    navHome: 'Home',
    navPrices: 'Price Board',
    navCentres: 'Centres',
    navPassport: 'My Passport',
    navIVR: 'IVR Demo (1800)',
    navSHG: 'SHG & Buyer Hub',
    sampleDifferenceBadge: 'Extra value vs trader',
    viewAllProduce: 'View 6 Produce Items',
    verifiedCentre: 'Van Dhan Kendra Verified',
    todaySampleAvg: 'Sample Centre Premium',
    listenVoice: 'Listen in English',
    playingAudio: 'Speaking rate...',
    voiceNotAvailable: 'Voice synthesis for this language is not supported on this browser. Showing readable card below.',
    diffExtra: 'extra per kg',
    perKg: 'per kg',
    villageRate: 'Village Middleman Rate',
    centreRate: 'Van Dhan Kendra Rate',
    mandiRate: 'Regional Mandi Rate',
    qualityStandard: 'Quality Spec',
    lastUpdated: 'Updated Sample',
    sourceNote: 'Benchmark Source',
    filterAll: 'All Forest Produce',
    recordSaleTitle: 'Digital Gatherer Passport',
    totalEarningsRecorded: 'Total Recorded Income',
    totalGainOverTrader: 'Direct Gain over Village Trader',
    addSaleRecord: '+ Log New Produce Sale',
    loadDemoSales: 'Load Sample Sales (3)',
    resetDemoData: 'Reset Demo Data',
    resetConfirm: 'Reset all local demo transactions?',
    ivrHeadline: 'Toll-Free Voice IVR Simulation',
    ivrSub: 'Designed for basic feature phones without internet. Tribal gatherers can give a missed call to receive voice rates.',
    missedCallBtn: 'Simulate Missed Call to 1800-000-0000',
    callSimulating: 'Calling 1800-000-0000... Connecting to VanDhan IVRS',
    callConnected: 'VanDhan Saathi Toll-Free Audio Line Connected',
    endCall: 'Hang Up Call',
    pressKey: 'Press Key on Phone Keypad',
    shgBidNotice: 'Live self-help group aggregate inventory & bulk buyer offers',
  },
  hi: {
    brandName: 'वनधन साथी',
    tagline: 'आज का सही भाव। आपकी आवाज़ में।',
    taglineSub: 'आदिवासी वनोपज संग्राहकों के लिए सही मंडी और केंद्र दरें, सीधी आपकी अपनी बोली में।',
    sevaChallengeBadge: 'सेवा फर्स्ट इनोवेशन चैलेंज 2026 • जनजातीय संभार-तंत्र (Logistics) एमवीपी',
    demoNotice: 'डेमो डेटा — यह वास्तविक बाजार मूल्य नहीं है। केवल नवाचार प्रदर्शन और सिमुलेशन के लिए।',
    demoNoticeShort: 'डेमो डेटा — केवल नवाचार परीक्षण हेतु',
    offlineReady: 'ऑफ़लाइन मोड सक्रिय • डेटा सुरक्षित रूप से आपके डिवाइस में सुरक्षित है',
    online: 'लाइव डेमो मोड',
    offline: 'ऑफ़लाइन मोड (डिवाइस सुरक्षित)',
    juryDemoBtn: '90-सेकंड जूरी डेमो',
    listenPriceHero: 'सुनें आज का सही भाव',
    navHome: 'होम',
    navPrices: 'मूल्य सूची (भाव)',
    navCentres: 'संग्रह केंद्र',
    navPassport: 'संग्राहक पासपोर्ट',
    navIVR: 'IVR फोन डेमो',
    navSHG: 'SHG एवं खरीदार',
    sampleDifferenceBadge: 'बिचौलियों से अधिक लाभ',
    viewAllProduce: 'सभी 6 वनोपज देखें',
    verifiedCentre: 'वन धन केंद्र सत्यापित',
    todaySampleAvg: 'केंद्र का अतिरिक्त लाभ',
    listenVoice: 'हिंदी में भाव सुनें',
    playingAudio: 'भाव सुनाया जा रहा है...',
    voiceNotAvailable: 'आपके ब्राउज़र में हिंदी वॉयस उपलब्ध नहीं है। कृपया नीचे लिखे विवरण को पढ़ें।',
    diffExtra: 'अधिक प्रति किलो',
    perKg: 'प्रति किलो',
    villageRate: 'गाँव के बिचौलिए का भाव',
    centreRate: 'वन धन केंद्र का भाव',
    mandiRate: 'क्षेत्रीय मंडी का भाव',
    qualityStandard: 'गुणवत्ता पैमाना',
    lastUpdated: 'अंतिम अपडेट',
    sourceNote: 'मूल्य संदर्भ',
    filterAll: 'सभी वनोपज',
    recordSaleTitle: 'डिजिटल संग्राहक पासपोर्ट',
    totalEarningsRecorded: 'कुल दर्ज की गई कमाई',
    totalGainOverTrader: 'बिचौलिए की तुलना में सीधा अतिरिक्त लाभ',
    addSaleRecord: '+ नई बिक्री दर्ज करें',
    loadDemoSales: 'नमूना बिक्री लोड करें (3)',
    resetDemoData: 'डेमो डेटा रीसेट करें',
    resetConfirm: 'क्या आप सभी स्थानीय डेमो रिकॉर्ड रीसेट करना चाहते हैं?',
    ivrHeadline: 'टोल-फ्री वॉयस IVR सिमुलेशन',
    ivrSub: 'साधारण कीपैड (फीचर) फोन के लिए बनाया गया। वनवासी केवल मिस्ड कॉल देकर अपनी भाषा में भाव सुन सकते हैं।',
    missedCallBtn: '1800-000-0000 पर मिस्ड कॉल दें',
    callSimulating: '1800-000-0000 पर कॉल लग रही है... वनधन IVRS से संपर्क हो रहा है',
    callConnected: 'वनधन साथी टोल-फ्री वॉयस लाइन से जुड़ाव',
    endCall: 'कॉल समाप्त करें',
    pressKey: 'कीपैड पर बटन दबाएं',
    shgBidNotice: 'एसएचजी का सामूहिक स्टॉक और थोक खरीदारों की बोलियां (Bids)',
  },
  te: {
    brandName: 'వన్‌ధన్ సాథీ',
    tagline: 'నేటి సరైన ధర. మీ భాషలోనే మీ కోసం.',
    taglineSub: 'గిరిజన అటవీ ఉత్పత్తుల సేకరణదారులకు పారదర్శకమైన ధరల సమాచారం మరియు కేంద్రాల వివరాలు.',
    sevaChallengeBadge: 'సేవా ఫస్ట్ ఇన్నోవేషన్ ఛాలెంజ్ 2026 • ట్రైబల్ లాజిస్టిక్స్ డెమో',
    demoNotice: 'డెమో సమాచారం — ఇది వాస్తవ మార్కెట్ రేటు కాదు. ఆవిష్కరణ నమూనా ప్రదర్శన కోసం మాత్రమే.',
    demoNoticeShort: 'డెమో డేటా — నమూనా పరిశీలనకు మాత్రమే',
    offlineReady: 'ఆఫ్‌లైన్ మోడ్ సిద్ధంగా ఉంది • వివరాలు మీ ఫోన్‌లో భద్రంగా ఉంటాయి',
    online: 'లైవ్ డెమో మోడ్',
    offline: 'ఆఫ్‌లైన్ మోడ్ (ఫోన్‌లో నిక్షిప్తం)',
    juryDemoBtn: '90-సెకన్ల జ్యూరీ డెమో',
    listenPriceHero: 'ఈనాటి ధరలు వినండి',
    navHome: 'హోమ్',
    navPrices: 'ధరల పట్టిక',
    navCentres: 'సేకరణ కేంద్రాలు',
    navPassport: 'సేకరణదారు పాస్‌పోర్ట్',
    navIVR: 'IVR కాల్ డెమో',
    navSHG: 'SHG & కొనుగోలుదారులు',
    sampleDifferenceBadge: 'దళారీల కంటే అదనపు లాభం',
    viewAllProduce: 'అన్ని 6 ఉత్పత్తులు',
    verifiedCentre: 'వన్‌ధన్ కేంద్రం ద్వారా ధృవీకరించబడింది',
    todaySampleAvg: 'కేంద్రంలో అదనపు లాభం',
    listenVoice: 'తెలుగులో ధర వినండి',
    playingAudio: 'ధర వినిపిస్తోంది...',
    voiceNotAvailable: 'మీ బ్రౌజర్‌లో తెలుగు వాయిస్ అందుబాటులో లేదు. వివరాలు క్రింద చదవగలరు.',
    diffExtra: 'కేజీకి అదనంగా',
    perKg: 'కేజీకి',
    villageRate: 'గ్రామ దళారీ ధర',
    centreRate: 'వన్‌ధన్ సేకరణ కేంద్రం ధర',
    mandiRate: 'ప్రాంతీయ మండి ధర',
    qualityStandard: 'నాణ్యత ప్రమాణం',
    lastUpdated: 'నవీకరించబడిన తేదీ',
    sourceNote: 'ధరల మూలం',
    filterAll: 'అన్ని అటవీ ఉత్పత్తులు',
    recordSaleTitle: 'డిజిటల్ సేకరణదారు పాస్‌పోర్ట్',
    totalEarningsRecorded: 'మొత్తం నమోదు చేసిన ఆదాయం',
    totalGainOverTrader: 'దళారీ కంటే పొందిన అదనపు లాభం',
    addSaleRecord: '+ కొత్త విక్రయాన్ని నమోదు చేయండి',
    loadDemoSales: 'నమూనా విక్రయాలు లోడ్ చేయండి (3)',
    resetDemoData: 'డేటాను రీసెట్ చేయండి',
    resetConfirm: 'అన్ని నమూనా రికార్డులను తీసివేయాలనుకుంటున్నారా?',
    ivrHeadline: 'టోల్-ఫ్రీ వాయిస్ IVR నమూనా',
    ivrSub: 'ఇంటర్నెట్ లేని చిన్న ఫీచర్ ఫోన్‌ల కోసం రూపొందించబడింది. గిరిజనులు కేవలం మిస్డ్ కాల్ ఇచ్చి ధరలు వినవచ్చు.',
    missedCallBtn: '1800-000-0000 కి మిస్డ్ కాల్ ఇవ్వండి',
    callSimulating: '1800-000-0000 కి కనెక్ట్ అవుతోంది... వన్‌ధన్ IVRS సిద్ధమవుతోంది',
    callConnected: 'వన్‌ధన్ సాథీ టోల్-ఫ్రీ వాయిస్ లైన్ కనెక్ట్ అయింది',
    endCall: 'కాల్ ముగించండి',
    pressKey: 'ఫోన్ కీప్యాడ్‌లో బటన్ నొక్కండి',
    shgBidNotice: 'స్వయం సహాయక సంఘాల నిల్వలు మరియు బయ్యర్ల బిడ్‌లు',
  },
};

export interface ForestProduce {
  id: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  botanical: string;
  icon: string;
  villageTraderRate: number;
  collectionCentreRate: number;
  mandiRate: number;
  unit: string;
  qualityGrade: string;
  sourceLabel: string;
  lastUpdated: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionTe: string;
  audioPromptEn: string;
  audioPromptHi: string;
  audioPromptTe: string;
  category: 'Flower' | 'Fruit/Seed' | 'Leaf' | 'Honey' | 'Gum';
}

export const FOREST_PRODUCE_ITEMS: ForestProduce[] = [
  {
    id: 'mahua-flower',
    nameEn: 'Mahua Dry Flowers',
    nameHi: 'महुआ सूखा फूल',
    nameTe: 'మహువా ఎండిన పువ్వులు',
    botanical: 'Madhuca longifolia',
    icon: '🌸',
    villageTraderRate: 34,
    collectionCentreRate: 46,
    mandiRate: 52,
    unit: 'kg',
    qualityGrade: 'Grade A (Sun-dried, Moisture < 12%, Sand-free)',
    sourceLabel: 'TRIFED MSP & Koraput Sample Benchmark',
    lastUpdated: 'Today 08:30 AM',
    descriptionEn: 'Collected at dawn. High value for nutrition, food items, and traditional medicinal uses.',
    descriptionHi: 'सुबह सवेरे चुना गया सूखा महुआ। वन धन केंद्र पर नमी 12% से कम होने पर उच्चतम दर मिलती है।',
    descriptionTe: 'తెల్లవారుజామున సేకరించిన ఎండిన పువ్వులు. తేమ శాతం 12 కన్నా తక్కువ ఉంటే మంచి గిట్టుబాటు ధర.',
    audioPromptEn: 'Today sample rate for Mahua flower: Village trader is offering 34 rupees. Van Dhan Centre rate is 46 rupees per kilogram. That is 12 rupees extra per kilo at your centre.',
    audioPromptHi: 'महुआ फूल का आज का नमूना भाव: गाँव के बिचौलिए की दर 34 रुपये है। वन धन केंद्र पर 46 रुपये प्रति किलो का भाव है। केंद्र पर बेचने पर आपको 12 रुपये प्रति किलो अधिक मिलेंगे।',
    audioPromptTe: 'ఈరోజు మహువా పూల నమూనా ధర: గ్రామ దళారీ ధర 34 రూపాయలు. వన్ ధన్ కేంద్రం ధర 46 రూపాయలు. కేంద్రంలో అమ్మితే కిలోకు 12 రూపాయలు ఎక్కువ లభిస్తాయి.',
    category: 'Flower',
  },
  {
    id: 'tamarind-seeded',
    nameEn: 'Wild Tamarind (De-seeded)',
    nameHi: 'इमली (बीज रहित)',
    nameTe: 'చింతపండు (గింజలు తీసినది)',
    botanical: 'Tamarindus indica',
    icon: '🥜',
    villageTraderRate: 42,
    collectionCentreRate: 58,
    mandiRate: 64,
    unit: 'kg',
    qualityGrade: 'De-seeded, Clean cake bricks, Rich amber color',
    sourceLabel: 'TRIFED Van Dhan Baseline • Demo Model',
    lastUpdated: 'Today 09:15 AM',
    descriptionEn: 'High demand spice staple processed by SHG de-seeding micro-units.',
    descriptionHi: 'स्वयं सहायता समूहों द्वारा साफ की गई बीज रहित इमली। सीधा मसाला प्रसंस्करण इकाइयों को आपूर्ति।',
    descriptionTe: 'గింజలు తీసి శుభ్రపరచిన చింతపండు కేకులు. మహిళా సంఘాల ద్వారా విలువ ఆధారిత ప్రాసెసింగ్.',
    audioPromptEn: 'Sample price for clean Tamarind: Village trader pays 42 rupees. Van Dhan Centre pays 58 rupees per kilogram. Extra 16 rupees per kilogram at the centre.',
    audioPromptHi: 'साफ बीज-रहित इमली का भाव: गाँव के व्यापारी से 42 रुपये, जबकि वन धन केंद्र पर 58 रुपये प्रति किलो। आपको 16 रुपये प्रति किलो का शुद्ध अतिरिक्त लाभ है।',
    audioPromptTe: 'చింతపండు నమూనా ధర: గ్రామ వ్యాపారి 42 రూపాయలు ఇవ్వగా, కేంద్రంలో 58 రూపాయలు. కిలోకు 16 రూపాయలు అదనపు లాభం.',
    category: 'Fruit/Seed',
  },
  {
    id: 'wild-honey',
    nameEn: 'Rock Bee Wild Honey',
    nameHi: 'जंगली शहद (रॉक बी)',
    nameTe: 'అడవి తేనె (రాతి తేనెటీగలు)',
    botanical: 'Apis dorsata',
    icon: '🍯',
    villageTraderRate: 210,
    collectionCentreRate: 295,
    mandiRate: 340,
    unit: 'kg',
    qualityGrade: 'Raw unfiltered, Moisture tested < 19%, Zero jaggery adulteration',
    sourceLabel: 'Girijan Co-op / ITDA Sample Rate (Demo)',
    lastUpdated: 'Today 07:45 AM',
    descriptionEn: 'Sustainably harvested from deep forest cliffs without destroying beehives.',
    descriptionHi: 'चट्टानों से वैज्ञानिक तरीके से निकाला गया शुद्ध प्राकृतिक शहद। रिफाइंड ऑर्गेनिक गुणवत्ता।',
    descriptionTe: 'కొండరాళ్ల నుండి శాస్త్రీయ పద్ధతిలో సేకరించిన స్వచ్ఛమైన తేనె. కల్తీ లేని నాణ్యత.',
    audioPromptEn: 'Wild honey sample rate: Local trader rate is 210 rupees. Van Dhan collection centre rate is 295 rupees per kilogram. Extra 85 rupees per kilo.',
    audioPromptHi: 'जंगली शहद का भाव: गाँव में बिचौलिए केवल 210 रुपये देते हैं। वन धन केंद्र पर 295 रुपये प्रति किलो मिलते हैं। प्रति किलो 85 रुपये का भारी मुनाफा।',
    audioPromptTe: 'అడవి తేనె నమూనా ధర: గ్రామంలో 210 రూపాయలు, సేకరణ కేంద్రంలో 295 రూపాయలు. కిలోకు ఏకంగా 85 రూపాయల లాభం.',
    category: 'Honey',
  },
  {
    id: 'adda-leaves',
    nameEn: 'Adda / Siali Leaves',
    nameHi: 'अड्डा / सियाली पत्ते',
    nameTe: 'అడ్డా ఆకులు (విస్తరాకులు)',
    botanical: 'Bauhinia vahlii',
    icon: '🍃',
    villageTraderRate: 38,
    collectionCentreRate: 52,
    mandiRate: 59,
    unit: 'bundle (50 leaves)',
    qualityGrade: 'Uniform size, green-cured, tear-free stitching bundles',
    sourceLabel: 'Eco-plate Value Chain Survey 2026',
    lastUpdated: 'Yesterday 05:00 PM',
    descriptionEn: 'Used for biodegradable dining leaf-plates and bowls, replacing single-use plastics.',
    descriptionHi: 'इको-फ्रेंडली पत्तल-दोने बनाने के लिए उच्च गुणवत्ता वाले पत्ते। प्लास्टिक प्रतिबंध से भारी मांग।',
    descriptionTe: 'పర్యావరణ హిత విస్తరాకుల తయారీకి వాడే నాణ్యమైన ఆకులు. ప్లాస్టిక్ నిషేధం వల్ల మంచి డిమాండ్.',
    audioPromptEn: 'Adda leaves bundle rate: Trader pays 38 rupees. Centre pays 52 rupees per bundle. You gain 14 rupees extra per bundle.',
    audioPromptHi: 'अड्डा पत्ते के बंडल का भाव: स्थानीय व्यापारी 38 रुपये देता है, केंद्र पर 52 रुपये प्रति बंडल। 14 रुपये का अतिरिक्त लाभ।',
    audioPromptTe: 'అడ్డా ఆకుల కట్ట ధర: దళారీ 38 రూపాయలు చెల్లించగా, కేంద్రంలో 52 రూపాయలు లభిస్తాయి. కట్టకు 14 రూపాయలు అదనం.',
    category: 'Leaf',
  },
  {
    id: 'sal-seeds',
    nameEn: 'Sal Tree Seeds',
    nameHi: 'साल के बीज',
    nameTe: 'సాల వృక్ష విత్తనాలు',
    botanical: 'Shorea robusta',
    icon: '🌰',
    villageTraderRate: 24,
    collectionCentreRate: 33,
    mandiRate: 38,
    unit: 'kg',
    qualityGrade: 'Decorticated dry seeds, Oil content > 18%',
    sourceLabel: 'State Forest Dev Corp Demo Schedule',
    lastUpdated: 'Today 10:00 AM',
    descriptionEn: 'Crucial for natural cocoa-butter confectionery substitutes and cosmetics manufacturing.',
    descriptionHi: 'साल के बीजों से कीमती तेल निकलता है जो चॉकलेट और कॉस्मेटिक्स में इस्तेमाल होता है।',
    descriptionTe: 'చాక్లెట్లు మరియు సౌందర్య ఉత్పత్తులలో వాడే నూనె తయారీకి అవసరమైన నాణ్యమైన విత్తనాలు.',
    audioPromptEn: 'Sal seeds sample rate: Village rate is 24 rupees. Collection centre pays 33 rupees per kilo. 9 rupees extra.',
    audioPromptHi: 'साल बीज का भाव: गाँव में 24 रुपये, केंद्र पर 33 रुपये प्रति किलो। प्रति किलो 9 रुपये अतिरिक्त कमाई।',
    audioPromptTe: 'సాల విత్తనాల ధర: గ్రామంలో 24 రూపాయలు, కేంద్రంలో 33 రూపాయలు. కిలోకు 9 రూపాయలు ఎక్కువ.',
    category: 'Fruit/Seed',
  },
  {
    id: 'karanj-karanja',
    nameEn: 'Karanja / Pongamia Seeds',
    nameHi: 'करंज के बीज',
    nameTe: 'కానుగ విత్తనాలు',
    botanical: 'Pongamia pinnata',
    icon: '🌱',
    villageTraderRate: 28,
    collectionCentreRate: 39,
    mandiRate: 45,
    unit: 'kg',
    qualityGrade: 'Clean mature pods, Moisture < 10%, Bio-fuel certified',
    sourceLabel: 'Bio-energy Supply Logistics Model',
    lastUpdated: 'Today 09:00 AM',
    descriptionEn: 'Used for organic bio-diesel, Ayurvedic skin therapies, and plant-based biopesticides.',
    descriptionHi: 'बायो-डीजल और जैविक कीटनाशक बनाने के लिए महत्वपूर्ण वनोपज।',
    descriptionTe: 'బయో డీజిల్ మరియు సేంద్రీయ పురుగుమందుల తయారీకి అధిక డిమాండ్ ఉన్న విత్తనాలు.',
    audioPromptEn: 'Karanja seeds sample rate: Local trader pays 28 rupees. Centre offers 39 rupees per kilogram. 11 rupees gain.',
    audioPromptHi: 'करंज बीज का भाव: बिचौलिया 28 रुपये देता है, केंद्र पर 39 रुपये प्रति किलो। 11 रुपये प्रति किलो का लाभ।',
    audioPromptTe: 'కానుగ విత్తనాల ధర: దళారీ 28 రూపాయలు, కేంద్రంలో 39 రూపాయలు. కిలోకు 11 రూపాయల లాభం.',
    category: 'Fruit/Seed',
  },
];

export interface CollectionCentre {
  id: string;
  name: string;
  tehsil: string;
  distanceKm: number;
  status: 'Open Today' | 'Opens 1:00 PM' | 'Closed for Weighing';
  timings: string;
  operatorName: string;
  phoneDemo: string;
  acceptedProduceIds: string[];
  digitalWeighing: boolean;
  spotPaymentMode: string;
  qualityAdvisoryEn: string;
  qualityAdvisoryHi: string;
  qualityAdvisoryTe: string;
  coordinates: { x: number; y: number }; // Relative coordinates for clean illustrated mini-map
}

export const SAMPLE_CENTRES: CollectionCentre[] = [
  {
    id: 'centre-1',
    name: 'Van Dhan Vikas Kendra - Borigumma Hub',
    tehsil: 'Borigumma Sector 2',
    distanceKm: 2.8,
    status: 'Open Today',
    timings: '07:30 AM – 04:30 PM',
    operatorName: 'Sunita Majhi (Lead SHG Facilitator)',
    phoneDemo: '+91 94370 XXXXX (Simulated)',
    acceptedProduceIds: ['mahua-flower', 'tamarind-seeded', 'wild-honey', 'adda-leaves'],
    digitalWeighing: true,
    spotPaymentMode: 'Direct Aadhaar DBT / Cash on spot',
    qualityAdvisoryEn: 'Bring sun-dried Mahua with moisture below 12% for Grade-A instant payout.',
    qualityAdvisoryHi: 'महुआ धूप में सुखाकर लाएं। 12% से कम नमी होने पर तुरंत ग्रेड-ए भुगतान प्राप्त करें।',
    qualityAdvisoryTe: '12% కన్నా తక్కువ తేమ ఉన్న మహువా పూలను తెచ్చి వెంటనే గ్రేడ్-ఎ నగదు పొందండి.',
    coordinates: { x: 32, y: 38 },
  },
  {
    id: 'centre-2',
    name: 'Malkangiri Tribal Primary Procurement Centre',
    tehsil: 'Mathili Forest Range',
    distanceKm: 5.4,
    status: 'Open Today',
    timings: '08:00 AM – 05:00 PM',
    operatorName: 'Rameshwar Konda (VDVK Secretary)',
    phoneDemo: '+91 98612 XXXXX (Simulated)',
    acceptedProduceIds: ['wild-honey', 'sal-seeds', 'karanj-karanja', 'tamarind-seeded'],
    digitalWeighing: true,
    spotPaymentMode: 'Co-op Bank Transfer & Voucher',
    qualityAdvisoryEn: 'Fresh honey refractometer testing on spot; avoid warming honey over direct fire.',
    qualityAdvisoryHi: 'शहद को कभी सीधी आग पर न उबालें। केंद्र पर तुरंत रिफ्रैक्टोमीटर से शुद्धता जांची जाती है।',
    qualityAdvisoryTe: 'తేనెను వేడి చేయవద్దు. కేంద్రం వద్దే నాణ్యత పరీక్షించి తక్షణ రసీదు ఇస్తారు.',
    coordinates: { x: 68, y: 28 },
  },
  {
    id: 'centre-3',
    name: 'Rayagada Hill Gatherers Sub-Center',
    tehsil: 'Bissam Cuttack Block',
    distanceKm: 8.9,
    status: 'Opens 1:00 PM',
    timings: '01:00 PM – 06:30 PM',
    operatorName: 'Kamala Pangi (SHG Treasurer)',
    phoneDemo: '+91 94391 XXXXX (Simulated)',
    acceptedProduceIds: ['mahua-flower', 'adda-leaves', 'sal-seeds'],
    digitalWeighing: true,
    spotPaymentMode: 'Instant UPI / Cash',
    qualityAdvisoryEn: 'Adda leaves bundles should be tied in 50 leaves sets with moist fiber wrap.',
    qualityAdvisoryHi: 'अड्डा पत्तों की 50-50 पत्तियों की गड्डियां बनाएं ताकि परिवहन में पत्ते न फटें।',
    qualityAdvisoryTe: 'అడ్డా ఆకులను 50 ఆకుల చొప్పున కట్టలు కట్టి తెస్తే త్వరగా తూకం వేస్తారు.',
    coordinates: { x: 52, y: 72 },
  },
];

export interface SaleRecord {
  id: string;
  produceId: string;
  produceName: string;
  quantityKg: number;
  pricePerKg: number;
  totalReceived: number;
  buyerName: string;
  buyerType: 'Van Dhan Centre' | 'Village Trader' | 'SHG Aggregator';
  date: string;
  paymentStatus: 'Paid (Cash)' | 'Paid (DBT)' | 'Pending Verification';
  receiptCode: string;
  villageRateAtSale: number; // for calculating gain
}

export const INITIAL_SAMPLE_SALES: SaleRecord[] = [
  {
    id: 'sale-1',
    produceId: 'mahua-flower',
    produceName: 'Mahua Dry Flowers',
    quantityKg: 40,
    pricePerKg: 46,
    totalReceived: 1840,
    buyerName: 'Van Dhan Vikas Kendra - Borigumma Hub',
    buyerType: 'Van Dhan Centre',
    date: '2026-11-02',
    paymentStatus: 'Paid (DBT)',
    receiptCode: 'VD-2026-0982',
    villageRateAtSale: 34,
  },
  {
    id: 'sale-2',
    produceId: 'wild-honey',
    produceName: 'Rock Bee Wild Honey',
    quantityKg: 6,
    pricePerKg: 295,
    totalReceived: 1770,
    buyerName: 'Malkangiri Tribal Procurement Centre',
    buyerType: 'Van Dhan Centre',
    date: '2026-10-29',
    paymentStatus: 'Paid (Cash)',
    receiptCode: 'VD-2026-0814',
    villageRateAtSale: 210,
  },
  {
    id: 'sale-3',
    produceId: 'tamarind-seeded',
    produceName: 'Wild Tamarind (De-seeded)',
    quantityKg: 25,
    pricePerKg: 58,
    totalReceived: 1450,
    buyerName: 'Van Dhan Vikas Kendra - Borigumma Hub',
    buyerType: 'Van Dhan Centre',
    date: '2026-10-25',
    paymentStatus: 'Paid (DBT)',
    receiptCode: 'VD-2026-0723',
    villageRateAtSale: 42,
  },
];

export interface SHGInventoryItem {
  id: string;
  produceName: string;
  shgCluster: string;
  availableQuintals: number;
  qualityGrade: string;
  reservePricePerQuintal: number;
  warehouseLocation: string;
  bidsCount: number;
}

export interface BuyerBid {
  id: string;
  produceName: string;
  buyerCompany: string;
  bidPricePerQuintal: number;
  quantityRequestedQuintals: number;
  totalOfferValue: number;
  destination: string;
  status: 'Open' | 'Accepted' | 'Negotiating';
  timestamp: string;
  verifiedFSSAI: boolean;
}

export const INITIAL_SHG_INVENTORY: SHGInventoryItem[] = [
  {
    id: 'inv-1',
    produceName: 'Mahua Dry Flowers (Sun-Dried Grade A)',
    shgCluster: 'Maa Tarini Tribal Mahila SHG Federation',
    availableQuintals: 45,
    qualityGrade: 'Grade A (< 11% moisture)',
    reservePricePerQuintal: 4800,
    warehouseLocation: 'Borigumma Central Van Dhan Godown',
    bidsCount: 2,
  },
  {
    id: 'inv-2',
    produceName: 'Wild Rock Bee Honey (Raw Filtered)',
    shgCluster: 'Koya Hill Forest Gatherers Collective',
    availableQuintals: 12,
    qualityGrade: 'Export Ready (< 19% water)',
    reservePricePerQuintal: 31000,
    warehouseLocation: 'Jeypore Cold Processing Unit',
    bidsCount: 3,
  },
  {
    id: 'inv-3',
    produceName: 'De-seeded Sweet Tamarind Bricks',
    shgCluster: 'Sabari Van Dhan Producers Group',
    availableQuintals: 80,
    qualityGrade: 'Vacuum sealed 1kg bricks',
    reservePricePerQuintal: 6200,
    warehouseLocation: 'Malkangiri Aggregation Centre',
    bidsCount: 1,
  },
];

export const INITIAL_BUYER_BIDS: BuyerBid[] = [
  {
    id: 'bid-101',
    produceName: 'Mahua Dry Flowers (Sun-Dried Grade A)',
    buyerCompany: 'Patanjali Agro Forest Division (Sample Demo Buyer)',
    bidPricePerQuintal: 4950,
    quantityRequestedQuintals: 30,
    totalOfferValue: 148500,
    destination: 'Nagpur Processing Hub',
    status: 'Open',
    timestamp: '15 mins ago',
    verifiedFSSAI: true,
  },
  {
    id: 'bid-102',
    produceName: 'Wild Rock Bee Honey (Raw Filtered)',
    buyerCompany: 'Organic India Herbal Supply (Sample Demo Buyer)',
    bidPricePerQuintal: 32500,
    quantityRequestedQuintals: 10,
    totalOfferValue: 325000,
    destination: 'Hyderabad QC Centre',
    status: 'Open',
    timestamp: '42 mins ago',
    verifiedFSSAI: true,
  },
  {
    id: 'bid-103',
    produceName: 'De-seeded Sweet Tamarind Bricks',
    buyerCompany: 'Mother Dairy Fresh Produce (Sample Demo Buyer)',
    bidPricePerQuintal: 6400,
    quantityRequestedQuintals: 50,
    totalOfferValue: 320000,
    destination: 'Visakhapatnam Warehouse',
    status: 'Open',
    timestamp: '2 hours ago',
    verifiedFSSAI: true,
  },
];
