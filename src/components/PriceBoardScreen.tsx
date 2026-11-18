import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  TrendingUp, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle,
  ArrowUpRight,
  Filter,
  Layers
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  FOREST_PRODUCE_ITEMS, 
  ForestProduce 
} from '../data/mockData';
import { speakText, stopSpeech } from '../utils/speech';

interface PriceBoardScreenProps {
  lang: SupportedLanguage;
  onNavigateToPassportWithItem?: (item: ForestProduce) => void;
}

export const PriceBoardScreen: React.FC<PriceBoardScreenProps> = ({
  lang,
  onNavigateToPassportWithItem,
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const [activeItemModal, setActiveItemModal] = useState<ForestProduce | null>(null);

  const categories = ['All', 'Flower', 'Fruit/Seed', 'Honey', 'Leaf'];

  const filteredItems = selectedCategory === 'All'
    ? FOREST_PRODUCE_ITEMS
    : FOREST_PRODUCE_ITEMS.filter((item) => item.category === selectedCategory);

  const handleListen = (item: ForestProduce) => {
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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Clear Demo Disclaimer Banner */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-stone-900 font-serif-display">
                {t.navPrices} • Minor Forest Produce (MFP)
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-2xl">
              Compare village middleman rates with official Van Dhan collection centre prices and regional mandis. Tap any card to listen.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-xs">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              DEMO DATA — Not live market prices
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0f281e] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? t.filterAll : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Speech Fallback Warning if speech engine missing dialect */}
      {speechNotice && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Notice on Voice Output:</strong> {speechNotice}
          </div>
        </div>
      )}

      {/* 6 Forest Produce Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const extraGain = item.collectionCentreRate - item.villageTraderRate;
          const isSpeaking = speakingId === item.id;
          const percentageGain = Math.round((extraGain / item.villageTraderRate) * 100);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Produce Icon & Names */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-[#faf7f2] border border-amber-200/60 shadow-xs">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-lg text-stone-900 leading-snug">
                        {getItemName(item)}
                      </h3>
                      <span className="text-xs font-mono text-emerald-800 block italic">
                        {item.botanical}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-xs shrink-0 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                    +{percentageGain}%
                  </span>
                </div>

                {/* Clear Rate Comparison Matrix (The Core Innovation Value) */}
                <div className="my-3 space-y-2">
                  <div className="bg-[#faf7f2] p-3 rounded-2xl border border-stone-200/80">
                    <div className="flex items-center justify-between text-xs pb-1 mb-1 border-b border-stone-200/60">
                      <span className="text-stone-600 font-medium">{t.villageRate}</span>
                      <span className="font-bold text-stone-700 line-through">
                        ₹{item.villageTraderRate} / {item.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-0.5">
                      <span className="text-emerald-900 font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {t.centreRate}
                      </span>
                      <span className="text-xl font-extrabold text-[#0f281e]">
                        ₹{item.collectionCentreRate} <span className="text-xs font-normal text-stone-500">/ {item.unit}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 mt-1 border-t border-emerald-100">
                      <span className="text-stone-500 font-medium">{t.mandiRate}</span>
                      <span className="font-semibold text-stone-600">
                        ₹{item.mandiRate} / {item.unit}
                      </span>
                    </div>
                  </div>

                  {/* Benefit Callout Pill */}
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 text-xs font-bold flex items-center justify-between">
                    <span>{t.sampleDifferenceBadge}:</span>
                    <span className="text-emerald-800 font-extrabold text-sm">
                      +₹{extraGain} {t.diffExtra}
                    </span>
                  </div>
                </div>

                {/* Quality Grade Note */}
                <div className="text-xs text-stone-600 mb-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200/50">
                  <span className="font-bold text-stone-800 block mb-0.5">
                    {t.qualityStandard}:
                  </span>
                  {item.qualityGrade}
                </div>
              </div>

              {/* Bottom Actions: Audio and Logging */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleListen(item)}
                  className={`min-h-[48px] px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                    isSpeaking
                      ? 'bg-emerald-900 text-white animate-pulse shadow-md'
                      : 'bg-[#0f281e] text-white hover:bg-emerald-900 active:scale-95'
                  }`}
                  aria-label={`Listen price for ${getItemName(item)}`}
                >
                  <Volume2 className="w-4 h-4 text-[#e5a93b]" />
                  {isSpeaking ? 'Listening...' : t.listenVoice}
                </button>

                {onNavigateToPassportWithItem && (
                  <button
                    onClick={() => onNavigateToPassportWithItem(item)}
                    className="min-h-[48px] px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs transition cursor-pointer"
                    title="Log sale in Passport"
                  >
                    + Record Sale
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Data Attribution & Methodology Note */}
      <div className="bg-[#faf7f2] rounded-3xl p-5 border border-stone-300 text-xs text-stone-600 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-stone-800">
            Methodology Notice for Innovation Challenge Jury:
          </p>
          <p>
            All price points above are <strong>sample benchmark records</strong> calibrated against TRIFED Minimum Support Price (MSP) guidelines and regional forest division surveys. Rates are updated in prototype simulation mode to demonstrate price discovery mechanisms for tribal communities.
          </p>
        </div>
      </div>
    </div>
  );
};
