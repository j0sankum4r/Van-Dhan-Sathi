import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  BookOpen, 
  TrendingUp, 
  Building2, 
  Globe, 
  Wifi, 
  WifiOff, 
  RotateCcw,
  TreePine,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  ForestProduce
} from './data/mockData';
import { HomeScreen } from './components/HomeScreen';
import { PriceBoardScreen } from './components/PriceBoardScreen';
import { CollectionCentresScreen } from './components/CollectionCentresScreen';
import { GathererPassportScreen } from './components/GathererPassportScreen';
import { IVRDemoScreen } from './components/IVRDemoScreen';
import { SHGBuyerDashboard } from './components/SHGBuyerDashboard';
import { JuryPresenterBar, JURY_STEPS } from './components/JuryPresenterBar';

export default function App() {
  const [lang, setLang] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isJuryTourOpen, setIsJuryTourOpen] = useState<boolean>(false);
  const [juryStep, setJuryStep] = useState<number>(1);
  const [preselectedItem, setPreselectedItem] = useState<ForestProduce | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showSficBranding] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vandhan_show_sfic');
      return stored !== 'false';
    }
    return true;
  });

  // Monitor browser network status for realistic offline indicator
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const t = translations[lang];

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartJuryTour = () => {
    setIsJuryTourOpen(true);
    setJuryStep(1);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJuryStepChange = (newStep: number) => {
    setJuryStep(newStep);
    const stepObj = JURY_STEPS[newStep - 1];
    if (stepObj) {
      setActiveTab(stepObj.tabKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateToPassportWithItem = (item: ForestProduce) => {
    setPreselectedItem(item);
    setActiveTab('passport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#1a2b22] font-sans antialiased">
      {/* Top Persistent System Bar */}
      <header className="sticky top-0 z-40 bg-[#0f281e] text-white border-b border-emerald-950/80 shadow-md">
        {/* Banner with competition credentials / platform mode and demo warning */}
        <div className="bg-[#183d2e] px-4 py-1.5 text-[11px] sm:text-xs text-stone-200 border-b border-emerald-900/60 flex flex-wrap items-center justify-between gap-2">
          {showSficBranding ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e5a93b]" />
              <span className="font-semibold text-amber-200">
                Concept Entry: Seva First Innovation Challenge 2026
              </span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="hidden sm:inline text-stone-300">
                Tribal Minor Forest Produce & Logistics Platform
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-emerald-200">
                VanDhan Saathi
              </span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="hidden sm:inline text-stone-300">
                National Minor Forest Produce & Fair Supply Chain Platform
              </span>
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Offline/Online Indicator */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              {isOnline ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Wifi className="w-3 h-3" />
                  <span className="hidden xs:inline">Live Mode</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-amber-300">
                  <WifiOff className="w-3 h-3" />
                  <span>Offline Ready</span>
                </span>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-950/80 p-0.5 rounded-lg border border-emerald-800/80">
              <Globe className="w-3 h-3 text-[#e5a93b] ml-1 shrink-0" />
              {(['en', 'hi', 'te'] as SupportedLanguage[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition cursor-pointer ${
                    lang === l
                      ? 'bg-[#e5a93b] text-[#0f281e]'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  aria-label={`Switch language to ${l}`}
                >
                  {l === 'en' ? 'ENG' : l === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#e5a93b] to-amber-600 flex items-center justify-center text-[#0f281e] shadow-md group-hover:scale-105 transition">
              <TreePine className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 font-serif-display">
                VanDhan Saathi
                <span className="text-[10px] font-mono font-bold bg-[#e5a93b] text-[#0f281e] px-1.5 py-0.2 rounded-md">
                  MVP
                </span>
              </div>
              <div className="text-[11px] text-[#e5a93b] font-medium leading-none">
                Aaj ka sahi bhaav. Aapki awaaz mein.
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => handleNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => handleNavigate('prices')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'prices'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {t.navPrices}
            </button>
            <button
              onClick={() => handleNavigate('ivr')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ivr'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              {t.navIVR}
            </button>
            <button
              onClick={() => handleNavigate('centres')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'centres'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {t.navCentres}
            </button>
            <button
              onClick={() => handleNavigate('passport')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'passport'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {t.navPassport}
            </button>
            <button
              onClick={() => handleNavigate('shg')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'shg'
                  ? 'bg-emerald-900/90 text-[#e5a93b] border border-emerald-700/80'
                  : 'text-stone-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              {t.navSHG}
            </button>
          </nav>

          {/* Desktop Right Actions: Jury Demo button */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleStartJuryTour}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#e5a93b] hover:bg-amber-400 active:scale-95 text-[#0f281e] font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {t.juryDemoBtn}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleStartJuryTour}
              className="px-2.5 py-1.5 rounded-lg bg-[#e5a93b] text-[#0f281e] font-bold text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Jury
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-950 text-stone-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-emerald-900/80 bg-[#0f281e] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => handleNavigate('home')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'home' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <TreePine className="w-4 h-4" />
              {t.navHome}
            </button>
            <button
              onClick={() => handleNavigate('prices')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'prices' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {t.navPrices}
            </button>
            <button
              onClick={() => handleNavigate('ivr')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'ivr' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-orange-400" />
              {t.navIVR}
            </button>
            <button
              onClick={() => handleNavigate('centres')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'centres' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {t.navCentres}
            </button>
            <button
              onClick={() => handleNavigate('passport')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'passport' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t.navPassport}
            </button>
            <button
              onClick={() => handleNavigate('shg')}
              className={`w-full min-h-[48px] px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center gap-2.5 ${
                activeTab === 'shg' ? 'bg-[#e5a93b] text-[#0f281e]' : 'text-stone-200 hover:bg-emerald-950'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              {t.navSHG}
            </button>

            <div className="pt-3 border-t border-emerald-900/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleStartJuryTour();
                }}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e5a93b] to-amber-500 text-[#0f281e] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                Start 90-Sec Presentation Demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Persistent Demo Warning Bar */}
      <div className="bg-amber-100/90 border-b border-amber-300 px-4 py-1.5 text-center text-[11px] sm:text-xs font-bold text-amber-950 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-800 shrink-0" />
        <span>{t.demoNotice}</span>
      </div>

      {/* Main App Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {activeTab === 'home' && (
          <HomeScreen
            lang={lang}
            onNavigate={handleNavigate}
            onStartJuryDemo={handleStartJuryTour}
          />
        )}

        {activeTab === 'prices' && (
          <PriceBoardScreen
            lang={lang}
            onNavigateToPassportWithItem={handleNavigateToPassportWithItem}
          />
        )}

        {activeTab === 'ivr' && (
          <IVRDemoScreen lang={lang} />
        )}

        {activeTab === 'centres' && (
          <CollectionCentresScreen lang={lang} />
        )}

        {activeTab === 'passport' && (
          <GathererPassportScreen
            lang={lang}
            preselectedProduce={preselectedItem}
          />
        )}

        {activeTab === 'shg' && (
          <SHGBuyerDashboard lang={lang} />
        )}
      </main>

      {/* 90-Second Jury Guided Presentation Drawer */}
      <JuryPresenterBar
        currentStep={juryStep}
        isOpen={isJuryTourOpen}
        onClose={() => setIsJuryTourOpen(false)}
        onNext={() => handleJuryStepChange(Math.min(JURY_STEPS.length, juryStep + 1))}
        onPrev={() => handleJuryStepChange(Math.max(1, juryStep - 1))}
        onJumpToStep={handleJuryStepChange}
      />

      {/* Accessible Footer */}
      <footer className="bg-[#0f281e] text-stone-300 border-t border-emerald-950 py-8 px-4 text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-200 font-bold">
            <span className="text-[#e5a93b]">VanDhan Saathi</span>
            <span>•</span>
            {showSficBranding ? (
              <span>Seva First Innovation Challenge 2026</span>
            ) : (
              <span>National Tribal Fair Supply Chain Platform</span>
            )}
            <span>•</span>
            <span>Tribal Welfare & MFP Logistics</span>
          </div>
          <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
            All prices, collection centres, buyers, and transaction ledgers are strictly simulated demo data designed to demonstrate end-to-end fair supply chain empowerment for tribal forest-produce gatherers.
          </p>
          <div className="pt-2 text-stone-500 text-[11px]">
            Designed with high contrast, touch targets ≥ 48px, voice-first accessibility, and offline local storage.
          </div>
        </div>
      </footer>
    </div>
  );
}
