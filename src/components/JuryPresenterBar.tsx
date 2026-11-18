import React from 'react';
import { Volume2, VolumeX, Sparkles, CheckCircle2, ChevronRight, Play } from 'lucide-react';

interface JuryTourProps {
  currentStep: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpToStep: (step: number) => void;
}

export interface JuryStepInfo {
  step: number;
  tabKey: string;
  badge: string;
  title: string;
  cue: string;
  narrativeLine: string;
  actionHint: string;
}

export const JURY_STEPS: JuryStepInfo[] = [
  {
    step: 1,
    tabKey: 'home',
    badge: 'Step 1 of 6 • The Voice Hook',
    title: 'Listen to Daily Forest Rates',
    cue: 'Show the jury how an illiterate gatherer who walks 10km into the jungle does not need to read small numbers.',
    narrativeLine: '"Tribal gatherers lose up to 40% of their income to village traders simply due to price opacity. With one tap, VanDhan Saathi speaks today\'s government and centre rate."',
    actionHint: 'Tap the audio button or click "Hear Rates" to simulate browser speech.',
  },
  {
    step: 2,
    tabKey: 'prices',
    badge: 'Step 2 of 6 • Fair Value Discovery',
    title: 'Compare Trader vs. Centre vs. Mandi',
    cue: 'Point out the real-time sample gap (e.g. +₹12/kg on Mahua, +₹85/kg on Wild Honey).',
    narrativeLine: '"We don\'t just show prices. We quantify the exact extra money in their pocket—e.g. +₹12 per kg extra at the Van Dhan Kendra compared to the middlemen."',
    actionHint: 'Click on different produce items like Mahua or Wild Honey to see quality criteria.',
  },
  {
    step: 3,
    tabKey: 'ivr',
    badge: 'Step 3 of 6 • Zero-Data Accessibility',
    title: 'Simulate the 1800 Toll-Free Missed Call',
    cue: 'Explain that 75%+ of remote tribal collectors use basic 2G feature phones without mobile data.',
    narrativeLine: '"No smartphone or 4G required. The gatherer gives a missed call to our toll-free 1800 number and receives an automated interactive voice call back in their native dialect."',
    actionHint: 'Click "Simulate Missed Call" and press keys 1, 2, or 3 on the keypad.',
  },
  {
    step: 4,
    tabKey: 'centres',
    badge: 'Step 4 of 6 • Verified Supply Hubs',
    title: 'Find Operating Van Dhan Centres',
    cue: 'Highlight that knowing the price is useless if they walk to a centre that is closed or lacks weighing machines.',
    narrativeLine: '"Collectors see walking distance, verified digital weighing status, spot cash/DBT capability, and quality grading guidelines before carrying 40kg sacks."',
    actionHint: 'Filter by produce (e.g., Wild Honey) and inspect the clean topological map.',
  },
  {
    step: 5,
    tabKey: 'passport',
    badge: 'Step 5 of 6 • Financial Inclusivity',
    title: 'Digital Gatherer Passport & Ledger',
    cue: 'Demonstrate how paperless digital receipts build credit history and quantify total family earnings.',
    narrativeLine: '"Every sale logged creates an immutable, local-first transaction history. It proves how much extra value was retained away from exploitative loan sharks."',
    actionHint: 'Click "Load Sample Sales" to see the total earnings & extra gain calculation.',
  },
  {
    step: 6,
    tabKey: 'shg',
    badge: 'Step 6 of 6 • Institutional Scale',
    title: 'Self-Help Group & Bulk Buyer Hub',
    cue: 'Conclude the pitch with how SHGs aggregate forest produce and sell directly to ethical corporate buyers.',
    narrativeLine: '"VanDhan Saathi closes the loop: village SHGs pool produce into commercial quintals, attracting competitive bids from organic and Ayurvedic buyers."',
    actionHint: 'Click "Accept Bid" on a buyer offer or post a new demo bid.',
  },
];

export const JuryPresenterBar: React.FC<JuryTourProps> = ({
  currentStep,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onJumpToStep,
}) => {
  if (!isOpen) return null;

  const stepData = JURY_STEPS[currentStep - 1] || JURY_STEPS[0];

  return (
    <div className="fixed bottom-3 inset-x-3 md:inset-x-auto md:right-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#0f281e] text-white border-2 border-[#e5a93b]/70 rounded-2xl shadow-2xl p-4 md:p-5 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-emerald-900/60">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-[#e5a93b] animate-ping" />
            <span className="text-xs font-bold tracking-wider uppercase text-[#e5a93b]">
              {stepData.badge}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-mono">
              90s Demo Mode
            </span>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-emerald-950/60 text-xs transition"
              title="Close Walkthrough"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        {/* Step Title & Story Script */}
        <div className="space-y-2">
          <h4 className="text-base md:text-lg font-bold text-amber-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e5a93b] shrink-0" />
            {stepData.title}
          </h4>
          
          <div className="bg-emerald-950/70 border border-emerald-800/60 rounded-xl p-2.5 text-xs md:text-sm text-stone-200 leading-relaxed font-sans">
            <strong className="text-[#e5a93b] block text-[11px] uppercase tracking-wider mb-0.5">
              Presenter Pitch Script:
            </strong>
            {stepData.narrativeLine}
          </div>

          <div className="flex items-start gap-2 text-xs text-amber-200/90 bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-900/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#e5a93b] shrink-0 mt-0.5" />
            <span><strong>Suggested Action:</strong> {stepData.actionHint}</span>
          </div>
        </div>

        {/* Step dots & Controls */}
        <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-emerald-900/60">
          <div className="flex items-center gap-1.5">
            {JURY_STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => onJumpToStep(s.step)}
                className={`h-2 rounded-full transition-all ${
                  currentStep === s.step
                    ? 'w-6 bg-[#e5a93b]'
                    : 'w-2 bg-emerald-800 hover:bg-emerald-700'
                }`}
                aria-label={`Jump to step ${s.step}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={onPrev}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-200 transition"
              >
                Back
              </button>
            )}
            {currentStep < JURY_STEPS.length ? (
              <button
                onClick={onNext}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#e5a93b] text-[#0f281e] hover:bg-amber-400 flex items-center gap-1 shadow-md transition"
              >
                Next Step <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition"
              >
                Finish Demo ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
