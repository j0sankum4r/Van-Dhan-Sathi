import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  MapPin, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  TreePine,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  FOREST_PRODUCE_ITEMS, 
  SAMPLE_CENTRES, 
  ForestProduce 
} from '../data/mockData';
import { speakText, stopSpeech } from '../utils/speech';

interface HomeScreenProps {
  lang: SupportedLanguage;
  onNavigate: (tab: string) => void;
  onStartJuryDemo: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  lang,
  onNavigate,
  onStartJuryDemo,
}) => {
  const t = translations[lang];
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const [showLanguagePackModal, setShowLanguagePackModal] = useState(false);

  // Top 3 spotlight produce items for home
  const spotlightProduce = FOREST_PRODUCE_ITEMS.slice(0, 3);

  const handleListenProduce = (item: ForestProduce) => {
    setSpeechNotice(null);
    let speechText = item.audioPromptEn;
    if (lang === 'hi') speechText = item.audioPromptHi;
    if (lang === 'te') speechText = item.audioPromptTe;

    if (speakingId === item.id) {
      stopSpeech();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(item.id);
    const ok = speakText(
      speechText,
      lang,
      () => setSpeakingId(item.id),
      () => setSpeakingId(null),
      (errMsg) => {
        setSpeechNotice(errMsg);
        setSpeakingId(null);
      }
    );

    if (!ok && !speechNotice) {
      setSpeakingId(null);
    }
  };

  const getItemName = (item: ForestProduce) => {
    if (lang === 'hi') return item.nameHi;
    if (lang === 'te') return item.nameTe;
    return item.nameEn;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f281e] via-[#183d2e] to-[#20533f] text-white p-6 sm:p-10 shadow-xl border border-emerald-900/50">
        {/* Subtle decorative nature pattern */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#e5a93b]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-[#c85a32]/10 blur-3xl pointer-events-none" />
        
        {/* Challenge Flag */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e5a93b]/20 text-[#e5a93b] border border-[#e5a93b]/40 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t.sevaChallengeBadge}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-200 border border-amber-500/30">
            DEMO DATA PROTOTYPE
          </span>
        </div>

        {/* Brand & Tagline */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-serif-display">
            {t.brandName}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-[#e5a93b] mb-3">
            “{t.tagline}”
          </p>
          <p className="text-sm sm:text-base text-stone-200/90 leading-relaxed max-w-xl">
            {t.taglineSub}
          </p>
        </div>

        {/* Primary Action Buttons (48px+ touch targets) */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleListenProduce(spotlightProduce[0])}
            className="min-h-[48px] px-6 py-3 rounded-2xl bg-[#e5a93b] text-[#0f281e] font-bold text-base sm:text-lg shadow-lg hover:bg-amber-400 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Volume2 className={`w-5 h-5 ${speakingId ? 'animate-bounce' : ''}`} />
            {speakingId ? t.playingAudio : t.listenPriceHero}
          </button>

          <button
            onClick={onStartJuryDemo}
            className="min-h-[48px] px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 border-2 border-[#e5a93b]/80 text-white font-bold text-base shadow-md backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#e5a93b]" />
            {t.juryDemoBtn}
          </button>

          <button
            onClick={() => onNavigate('ivr')}
            className="min-h-[48px] px-5 py-3 rounded-2xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            1800 Missed-Call IVR Demo
          </button>
        </div>

        {/* Speech Fallback Notification if needed */}
        {speechNotice && (
          <div className="relative z-10 mt-4 p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs sm:text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#e5a93b] shrink-0 mt-0.5" />
            <span>{speechNotice}</span>
          </div>
        )}

        {/* Tribal Dialects Review Box */}
        <div className="relative z-10 mt-6 pt-5 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Supported interfaces: <strong>English, हिन्दी, తెలుగు</strong></span>
          </div>
          <button
            onClick={() => setShowLanguagePackModal(true)}
            className="text-[#e5a93b] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Savara & Konda Dialect Review Packs →
          </button>
        </div>
      </div>

      {/* Quick Access Tiles to 4 Core Features */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-emerald-950">
            Quick Navigation & Tools
          </h3>
          <span className="text-xs text-stone-500 font-medium">
            Touch target: 48px+ optimized
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <button
            onClick={() => onNavigate('prices')}
            className="min-h-[96px] p-4 rounded-2xl bg-[#faf7f2] border-2 border-emerald-900/10 hover:border-emerald-700 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 group-hover:bg-[#0f281e] group-hover:text-white transition">
                <TrendingUp className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-900 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900">{t.navPrices}</div>
              <div className="text-[11px] text-stone-500">6 Produce items rate gap</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('centres')}
            className="min-h-[96px] p-4 rounded-2xl bg-[#faf7f2] border-2 border-emerald-900/10 hover:border-emerald-700 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-amber-100 text-amber-900 group-hover:bg-[#e5a93b] group-hover:text-stone-900 transition">
                <MapPin className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900">{t.navCentres}</div>
              <div className="text-[11px] text-stone-500">3 verified Kendras nearby</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('passport')}
            className="min-h-[96px] p-4 rounded-2xl bg-[#faf7f2] border-2 border-emerald-900/10 hover:border-emerald-700 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 group-hover:bg-[#0f281e] group-hover:text-white transition">
                <BookOpen className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-900 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900">{t.navPassport}</div>
              <div className="text-[11px] text-stone-500">Sales log & fair bonus calc</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('ivr')}
            className="min-h-[96px] p-4 rounded-2xl bg-[#faf7f2] border-2 border-emerald-900/10 hover:border-emerald-700 hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="p-2.5 rounded-xl bg-orange-100 text-orange-900 group-hover:bg-[#c85a32] group-hover:text-white transition">
                <PhoneCall className="w-5 h-5" />
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-orange-900 group-hover:translate-x-1 transition" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-900">{t.navIVR}</div>
              <div className="text-[11px] text-stone-500">Feature phone callback audio</div>
            </div>
          </button>
        </div>
      </div>

      {/* Sample Price Highlight Cards */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-700" />
              Sample Daily Rate Comparison
            </h3>
            <p className="text-xs text-stone-500">
              Clear demonstration of middleman price vs. Van Dhan verified centre rate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('prices')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
          >
            {t.viewAllProduce} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spotlightProduce.map((item) => {
            const diff = item.collectionCentreRate - item.villageTraderRate;
            const isSpeaking = speakingId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl p-1.5 rounded-xl bg-amber-50">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-bold text-base text-stone-900">
                          {getItemName(item)}
                        </h4>
                        <span className="text-[11px] text-stone-500 italic block">
                          {item.botanical}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                      +₹{diff}/{item.unit}
                    </span>
                  </div>

                  {/* Rate Grid */}
                  <div className="my-4 grid grid-cols-2 gap-2 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                        Village Trader
                      </span>
                      <span className="text-base font-bold text-stone-600 line-through">
                        ₹{item.villageTraderRate}
                      </span>
                      <span className="text-[10px] text-stone-400 block">per {item.unit}</span>
                    </div>

                    <div className="border-l border-stone-200 pl-3">
                      <span className="text-[10px] text-emerald-700 uppercase font-bold block">
                        Centre Rate
                      </span>
                      <span className="text-xl font-extrabold text-emerald-900">
                        ₹{item.collectionCentreRate}
                      </span>
                      <span className="text-[10px] text-emerald-600 block">per {item.unit}</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                    {lang === 'hi'
                      ? item.descriptionHi
                      : lang === 'te'
                      ? item.descriptionTe
                      : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                    DEMO DATA
                  </span>

                  <button
                    onClick={() => handleListenProduce(item)}
                    className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      isSpeaking
                        ? 'bg-emerald-900 text-white animate-pulse'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    {isSpeaking ? 'Playing...' : 'Listen Rate'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Showcase & Architecture Summary */}
      <div className="bg-[#faf7f2] rounded-3xl p-6 sm:p-8 border border-stone-300/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-800">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-900 text-[#e5a93b] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-stone-900">
                Guaranteed Fair Weight & Rates
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Calibrated digital load cells connected via Bluetooth/manual code prevent the standard 15-20% under-weighing by rogue middlemen.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-[#c85a32] text-white shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-stone-900">
                Zero-Data Voice Accessibility
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Toll-free IVRS callback system delivers daily rates in spoken local dialects so that smartphone ownership is never a bottleneck.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-800 text-amber-100 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-stone-900">
                Direct SHG Buyer Linkages
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Aggregates village gatherer stocks into commercial bulk lots for competitive bidding by food, cosmetic, and Ayurvedic industries.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Language Pack Modal (Honest explanation about tribal dialects) */}
      {showLanguagePackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h4 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#e5a93b]" />
                Community Dialect Packs (Savara & Konda)
              </h4>
              <button
                onClick={() => setShowLanguagePackModal(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
              In accordance with ethical tribal product design standards, <strong>VanDhan Saathi does not invent automated machine translations</strong> for unwritten or low-resource tribal languages like Savara, Koya, or Konda.
            </p>

            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/80 text-xs text-amber-900 space-y-2 mb-5">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                Phase 1: Real-human Audio Recordings
              </div>
              <p>
                Local ITDA field coordinators and tribal SHG elders record short verified audio clips for prices and quality instructions in Savara and Konda dialects.
              </p>
              <div className="flex items-center gap-2 font-bold pt-1">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                Phase 2: Local Community Review
              </div>
              <p>
                No audio is pushed live until 3 tribal community reviewers sign off on dialect accuracy and tone.
              </p>
            </div>

            <button
              onClick={() => setShowLanguagePackModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-sm transition"
            >
              Understood • Return to Demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
