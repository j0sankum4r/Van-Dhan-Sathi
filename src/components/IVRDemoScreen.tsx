import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  AlertCircle,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  FOREST_PRODUCE_ITEMS, 
  ForestProduce 
} from '../data/mockData';
import { speakText, stopSpeech } from '../utils/speech';

interface IVRDemoScreenProps {
  lang: SupportedLanguage;
}

type CallState = 'IDLE' | 'CALLING' | 'CONNECTED' | 'MENU_LANG' | 'MENU_PRODUCE' | 'PLAYING_RATE' | 'ENDED';

export const IVRDemoScreen: React.FC<IVRDemoScreenProps> = ({ lang }) => {
  const t = translations[lang];
  const [callState, setCallState] = useState<CallState>('IDLE');
  const [selectedIVRLang, setSelectedIVRLang] = useState<SupportedLanguage>(lang);
  const [selectedProduce, setSelectedProduce] = useState<ForestProduce | null>(null);
  const [callLog, setCallLog] = useState<string[]>([]);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  // Call timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (callState === 'CONNECTED' || callState === 'MENU_LANG' || callState === 'MENU_PRODUCE' || callState === 'PLAYING_RATE') {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setTimerSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState]);

  // Handle Missed Call trigger
  const startMissedCall = () => {
    stopSpeech();
    setSpeechNotice(null);
    setCallState('CALLING');
    setCallLog([
      '📱 Caller: Gatherer dialed 1800-000-0000 (Simulated)',
      '📞 Missed call registered on VanDhan Cloud Telephony Server',
      '⏳ Triggering instant zero-cost callback to gatherer handset...',
    ]);

    setTimeout(() => {
      setCallState('CONNECTED');
      setCallLog((prev) => [
        ...prev,
        '🔔 Incoming Call received from VanDhan Saathi IVRS',
        '🎙️ Automated Voice: "VanDhan Saathi mein aapka swaagat hai."',
      ]);
      
      // Auto prompt language selection after greeting
      speakVoice(
        'VanDhan Saathi mein aapka swaagat hai. For English press 1. Hindi ke liye 2 dabayein. Telugu kosam 3 nokkandi.',
        'hi',
        () => setCallState('MENU_LANG')
      );
    }, 2200);
  };

  const speakVoice = (text: string, voiceLang: SupportedLanguage, onFinished?: () => void) => {
    speakText(
      text,
      voiceLang,
      undefined,
      () => {
        if (onFinished) onFinished();
      },
      (err) => {
        setSpeechNotice(err);
        if (onFinished) onFinished();
      }
    );
  };

  const handleKeypadPress = (key: string) => {
    if (callState === 'IDLE' || callState === 'ENDED') return;

    if (callState === 'CONNECTED' || callState === 'MENU_LANG') {
      if (key === '1') {
        setSelectedIVRLang('en');
        setCallLog((prev) => [...prev, 'Key 1 pressed ➔ English selected.']);
        speakVoice('You have selected English. For Mahua Dry Flower press 1. For Wild Tamarind press 2. For Rock Bee Honey press 3. For Adda Leaves press 4.', 'en');
        setCallState('MENU_PRODUCE');
      } else if (key === '2') {
        setSelectedIVRLang('hi');
        setCallLog((prev) => [...prev, 'Key 2 pressed ➔ हिन्दी चुनी गई।']);
        speakVoice('आपने हिंदी भाषा चुनी है। महुआ सूखे फूल के भाव के लिए 1 दबाएं। इमली के लिए 2 दबाएं। जंगली शहद के लिए 3 दबाएं। अड्डा पत्तों के लिए 4 दबाएं।', 'hi');
        setCallState('MENU_PRODUCE');
      } else if (key === '3') {
        setSelectedIVRLang('te');
        setCallLog((prev) => [...prev, 'Key 3 pressed ➔ తెలుగు ఎంచుకున్నారు.']);
        speakVoice('మీరు తెలుగు ఎంచుకున్నారు. మహువా పూల ధర కొరకు 1 నొక్కండి. చింతపండు కొరకు 2 నొక్కండి. అడవి తేనె కొరకు 3 నొక్కండి. అడ్డా ఆకుల కొరకు 4 నొక్కండి.', 'te');
        setCallState('MENU_PRODUCE');
      }
    } else if (callState === 'MENU_PRODUCE' || callState === 'PLAYING_RATE') {
      let chosen: ForestProduce | undefined;
      if (key === '1') chosen = FOREST_PRODUCE_ITEMS.find((p) => p.id === 'mahua-flower');
      if (key === '2') chosen = FOREST_PRODUCE_ITEMS.find((p) => p.id === 'tamarind-seeded');
      if (key === '3') chosen = FOREST_PRODUCE_ITEMS.find((p) => p.id === 'wild-honey');
      if (key === '4') chosen = FOREST_PRODUCE_ITEMS.find((p) => p.id === 'adda-leaves');

      if (chosen) {
        setSelectedProduce(chosen);
        setCallState('PLAYING_RATE');
        const diff = chosen.collectionCentreRate - chosen.villageTraderRate;
        setCallLog((prev) => [
          ...prev,
          `Key ${key} pressed ➔ Selected: ${chosen?.nameEn}`,
          `📢 Centre Rate: ₹${chosen?.collectionCentreRate}/${chosen?.unit} (vs Trader ₹${chosen?.villageTraderRate}/${chosen?.unit})`,
        ]);

        let msg = chosen.audioPromptEn;
        if (selectedIVRLang === 'hi') msg = chosen.audioPromptHi;
        if (selectedIVRLang === 'te') msg = chosen.audioPromptTe;

        speakVoice(msg, selectedIVRLang);
      }
    }
  };

  const endCall = () => {
    stopSpeech();
    setCallState('ENDED');
    setCallLog((prev) => [...prev, '📴 Call Disconnected. Demo session completed.']);
  };

  const resetSimulation = () => {
    stopSpeech();
    setCallState('IDLE');
    setCallLog([]);
    setSelectedProduce(null);
    setSpeechNotice(null);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-900">
              <PhoneCall className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-serif-display">
              {t.ivrHeadline}
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-2xl">
            {t.ivrSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
            SIMULATION ONLY • 1800-000-0000
          </span>
        </div>
      </div>

      {speechNotice && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{speechNotice}</span>
        </div>
      )}

      {/* Main Simulation View: Handset + Interactive Transcript */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Phone Keypad Simulation */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 text-white rounded-[36px] p-6 sm:p-7 shadow-2xl border-4 border-stone-700 max-w-sm mx-auto w-full">
          {/* Phone Speaker & Status Header */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-1.5 bg-stone-700 rounded-full mb-3" />
            <div className="text-[11px] font-mono tracking-widest uppercase text-stone-400">
              VanDhan Voice Network (2G)
            </div>
            
            {/* Call State Display Screen */}
            <div className="w-full mt-3 p-4 rounded-2xl bg-stone-800/90 border border-stone-700 text-center min-h-[105px] flex flex-col justify-center items-center">
              {callState === 'IDLE' && (
                <div>
                  <span className="text-xs text-stone-400 block mb-1">Toll-Free Helpline</span>
                  <div className="text-xl font-bold text-amber-400 font-mono tracking-wider">
                    1800-000-0000
                  </div>
                  <span className="text-[11px] text-stone-300 mt-1 block">
                    Zero-cost missed call service
                  </span>
                </div>
              )}

              {callState === 'CALLING' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300">
                    <Radio className="w-3.5 h-3.5 animate-ping" />
                    Dialing server...
                  </div>
                  <div className="text-lg font-bold text-white font-mono">1800-000-0000</div>
                  <span className="text-[10px] text-stone-400">Simulating Missed Call</span>
                </div>
              )}

              {(callState === 'CONNECTED' || callState === 'MENU_LANG' || callState === 'MENU_PRODUCE' || callState === 'PLAYING_RATE') && (
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono px-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected
                    </span>
                    <span>{formatTimer(timerSeconds)}</span>
                  </div>
                  <div className="text-sm font-bold text-stone-100">
                    {callState === 'MENU_LANG' && 'Language Selection Menu'}
                    {callState === 'MENU_PRODUCE' && 'Choose Forest Produce'}
                    {callState === 'PLAYING_RATE' && selectedProduce?.nameEn}
                    {callState === 'CONNECTED' && 'IVRS Line Connected'}
                  </div>
                  <div className="text-[11px] text-[#e5a93b]">
                    {callState === 'MENU_LANG' && 'Press 1 (EN) • 2 (HI) • 3 (TE)'}
                    {callState === 'MENU_PRODUCE' && 'Press 1: Mahua | 2: Tamarind | 3: Honey'}
                    {callState === 'PLAYING_RATE' && `Centre: ₹${selectedProduce?.collectionCentreRate}/${selectedProduce?.unit}`}
                  </div>
                </div>
              )}

              {callState === 'ENDED' && (
                <div>
                  <span className="text-xs text-stone-400 block">Call Ended</span>
                  <span className="text-sm font-bold text-stone-200 mt-1 block">Thank you for calling</span>
                </div>
              )}
            </div>
          </div>

          {/* Dialpad Grid (Large accessible touch targets >= 48px) */}
          <div className="grid grid-cols-3 gap-3 my-4">
            {[
              { num: '1', sub: 'ENG / Mahua' },
              { num: '2', sub: 'HIN / Tamarind' },
              { num: '3', sub: 'TEL / Honey' },
              { num: '4', sub: 'Adda Leaves' },
              { num: '5', sub: 'Sal Seeds' },
              { num: '6', sub: 'Karanja' },
              { num: '7', sub: 'Centres' },
              { num: '8', sub: 'Repeat' },
              { num: '9', sub: 'Agent' },
              { num: '*', sub: 'Main Menu' },
              { num: '0', sub: 'Operator' },
              { num: '#', sub: 'Help' },
            ].map((k) => (
              <button
                key={k.num}
                onClick={() => handleKeypadPress(k.num)}
                disabled={callState === 'IDLE' || callState === 'ENDED'}
                className="min-h-[52px] p-2 rounded-2xl bg-stone-800 hover:bg-stone-700 active:bg-amber-600 disabled:opacity-40 disabled:hover:bg-stone-800 text-stone-100 font-bold transition flex flex-col items-center justify-center cursor-pointer shadow-inner"
              >
                <span className="text-lg leading-none">{k.num}</span>
                <span className="text-[9px] font-normal text-stone-400 leading-tight mt-0.5 truncate max-w-[80px]">
                  {k.sub}
                </span>
              </button>
            ))}
          </div>

          {/* Call / Hangup Trigger Buttons */}
          <div className="pt-2">
            {callState === 'IDLE' || callState === 'ENDED' ? (
              <button
                onClick={startMissedCall}
                className="w-full min-h-[52px] rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <PhoneCall className="w-5 h-5" />
                {t.missedCallBtn}
              </button>
            ) : (
              <button
                onClick={endCall}
                className="w-full min-h-[52px] rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
              >
                <PhoneOff className="w-5 h-5" />
                {t.endCall}
              </button>
            )}
          </div>
        </div>

        {/* Live Audio Transcript & Step-by-Step State Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-800" />
                Real-Time Telephony Protocol & Transcript
              </h3>
              <button
                onClick={resetSimulation}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 p-1 rounded cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Call
              </button>
            </div>

            {/* Quick Demo Controls for Presenter */}
            <div className="mb-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200/70 text-xs text-amber-950">
              <strong className="block mb-1 font-bold text-amber-900">
                Presenter Quick Guide for 90-sec Pitch:
              </strong>
              <ol className="list-decimal list-inside space-y-1 text-amber-900/90">
                <li>Click <strong>"Simulate Missed Call"</strong> on the phone above.</li>
                <li>When connected, press <strong>Key 2</strong> on the dialpad for Hindi (or 1 for English).</li>
                <li>Press <strong>Key 1</strong> for Mahua or <strong>Key 3</strong> for Wild Honey.</li>
                <li>Notice the audio speaks the exact government centre rate and extra rupee advantage.</li>
              </ol>
            </div>

            {/* Live Interactive Log */}
            <div className="bg-[#0f281e] text-emerald-100 rounded-2xl p-4 font-mono text-xs max-h-80 overflow-y-auto space-y-2 border border-emerald-950">
              <div className="text-[11px] text-emerald-400/80 pb-1 border-b border-emerald-900">
                --- VanDhan Cloud Telephony Callback Event Log ---
              </div>

              {callLog.length === 0 ? (
                <div className="text-stone-400 py-6 text-center italic">
                  Handset on standby. Click "Simulate Missed Call to 1800-000-0000" to begin.
                </div>
              ) : (
                callLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">➔</span>
                    <span className={log.includes('Centre Rate') ? 'text-amber-300 font-bold' : ''}>
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Simulated Selected Produce Detail Card */}
            {selectedProduce && (
              <div className="mt-4 p-4 rounded-2xl bg-[#faf7f2] border border-amber-300/80 animate-in fade-in">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedProduce.icon}</span>
                    <h4 className="font-extrabold text-base text-stone-900">
                      {selectedProduce.nameEn}
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-xs">
                    +₹{selectedProduce.collectionCentreRate - selectedProduce.villageTraderRate} Extra at Centre
                  </span>
                </div>

                <div className="text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200">
                  <strong className="text-stone-900">Audio playback sentence:</strong>
                  <p className="mt-1 italic text-stone-600">
                    "{selectedIVRLang === 'hi'
                      ? selectedProduce.audioPromptHi
                      : selectedIVRLang === 'te'
                      ? selectedProduce.audioPromptTe
                      : selectedProduce.audioPromptEn}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
