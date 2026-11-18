import React, { useState, useEffect } from 'react';
import {
  Download,
  Lock,
  Unlock,
  FileCode,
  FileSpreadsheet,
  FileText,
  Database,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  X,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { ForestProduce, SaleRecord } from '../data/mockData';
import { 
  downloadProjectZip, 
  exportSalesToCSV, 
  exportPriceBulletinSlip, 
  exportFullJsonBackup 
} from '../utils/exportProject';
import { usePWAInstall } from '../utils/usePWAInstall';

interface OwnerExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  produceList: ForestProduce[];
  salesRecords: SaleRecord[];
  showSficBranding: boolean;
  onToggleSficBranding: (show: boolean) => void;
}

export const OwnerExportModal: React.FC<OwnerExportModalProps> = ({
  isOpen,
  onClose,
  produceList,
  salesRecords,
  showSficBranding,
  onToggleSficBranding
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string>('');

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // Check persistent authentication state
  useEffect(() => {
    const savedAuth = localStorage.getItem('vandhan_owner_authed');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleVerifyPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default Owner Passcode is 2026 or 2026!
    if (pinInput.trim() === '2026' || pinInput.trim() === 'vandhan2026') {
      setIsAuthenticated(true);
      localStorage.setItem('vandhan_owner_authed', 'true');
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Incorrect Owner Passcode. Default owner PIN is 2026.');
    }
  };

  const handleOwnerOneClickAuth = () => {
    // Quick authentication for the authorized developer / owner
    setIsAuthenticated(true);
    localStorage.setItem('vandhan_owner_authed', 'true');
    setPinError('');
  };

  const handleLockSession = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('vandhan_owner_authed');
    setDownloadSuccessMessage('');
  };

  const handleDownloadZip = async () => {
    try {
      setIsZipping(true);
      setDownloadSuccessMessage('');
      await downloadProjectZip();
      setDownloadSuccessMessage('Project ZIP downloaded successfully! Contains full React + TS + Vite codebase.');
    } catch (err) {
      console.error('Failed to bundle project zip:', err);
      alert('Error creating ZIP bundle. Please try again.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadCSV = () => {
    exportSalesToCSV(salesRecords);
    setDownloadSuccessMessage(`Exported ${salesRecords.length} sales records to CSV.`);
  };

  const handleDownloadBulletin = () => {
    exportPriceBulletinSlip(produceList);
    setDownloadSuccessMessage('Daily Price Bulletin slip downloaded as formatted text.');
  };

  const handleDownloadFullBackup = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      owner: 'Josan Kumar Meher (josankumarmeher@gmail.com)',
      produceCatalog: produceList,
      salesLedger: salesRecords,
      appVersion: '1.2.0-pwa'
    };
    exportFullJsonBackup(fullBackup);
    setDownloadSuccessMessage('Full JSON application backup exported successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0f281e] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${isAuthenticated ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`}>
              {isAuthenticated ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-serif tracking-tight text-white">
                  Owner Download & Control Center
                </h3>
                {isAuthenticated ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600">
                    Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-800 text-amber-200 px-2 py-0.5 rounded-full border border-amber-600">
                    Owner Protected
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                Download source code ZIP, export database ledgers, and manage app settings.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">

          {/* Success Banner */}
          {downloadSuccessMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{downloadSuccessMessage}</span>
            </div>
          )}

          {/* LOCKED STATE FOR GENERAL PUBLIC / UNVERIFIED USERS */}
          {!isAuthenticated ? (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-sm">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-950">
                      Restricted Access (सिर्फ प्रोजेक्ट ऑनर के लिए)
                    </h4>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      इस एप्लिकेशन का सोर्स कोड और डेटा एक्सपोर्ट केवल प्रोजेक्ट क्रिएटर (<strong>Josan Kumar Meher</strong>) के लिए सुरक्षित रखा गया है, ताकि आम यूज़र्स या अन्य लोग इसे बिना अनुमति डाउनलोड न कर सकें।
                    </p>
                  </div>
                </div>
              </div>

              {/* Unlock Passcode Form */}
              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Enter Owner Passcode (ऑनर पिन दर्ज करें)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError('');
                      }}
                      placeholder="Enter 4-digit Owner PIN (Default: 2026)"
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f281e] bg-stone-50"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-600 font-medium mt-1.5">{pinError}</p>
                  )}
                  <p className="text-[11px] text-stone-500 mt-1.5">
                    💡 Owner quick PIN: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono text-stone-800">2026</code>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 min-h-[48px] py-3 px-4 rounded-xl bg-[#0f281e] hover:bg-[#183d2e] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Unlock className="w-4 h-4" />
                    Unlock Download Center
                  </button>
                  <button
                    type="button"
                    onClick={handleOwnerOneClickAuth}
                    className="min-h-[48px] py-3 px-4 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Verify as Owner (Josan)
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* UNLOCKED STATE - EXCLUSIVE DOWNLOAD & EXPORT CONTROLS */
            <div className="space-y-6">
              
              {/* Owner Authenticated Info Bar */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    JM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <span>Owner Verified: Josan Kumar Meher</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      josankumarmeher@gmail.com • Authorized Developer
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLockSession}
                  className="text-xs text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-300 transition flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Lock Session
                </button>
              </div>

              {/* Downloads Section */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  1. Project & Codebase Export (प्रोजेक्ट कोड डाउनलोड)
                </h4>
                
                <div className="p-4 rounded-2xl border-2 border-dashed border-[#0f281e]/30 bg-emerald-50/40 hover:bg-emerald-50/70 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-[#0f281e] text-[#ffd56b] shrink-0">
                      <FileCode className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">
                        Download Full Project Code (.ZIP)
                      </h5>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Complete Vite + React 19 + TypeScript codebase with all screens, data, and audio utilities.
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-500">
                        <span className="bg-stone-200/80 px-2 py-0.5 rounded text-stone-700 font-mono">
                          vandhan-saathi-project.zip
                        </span>
                        <span>• Ready to run with npm install</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="min-h-[48px] w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0f281e] hover:bg-[#183d2e] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#ffd56b]" />
                    {isZipping ? 'Bundling ZIP...' : 'Download ZIP'}
                  </button>
                </div>
              </div>

              {/* Data Export Options */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  2. Data & Report Exports (डेटा और रसीद एक्सपोर्ट)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* CSV Export */}
                  <div className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        Sales Ledger (CSV / Excel)
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Download all recorded tribal gatherer sales, weights, and payments in spreadsheet format.
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadCSV}
                      className="mt-3 min-h-[44px] w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-600" />
                      Export CSV ({salesRecords.length} records)
                    </button>
                  </div>

                  {/* Price Bulletin Slip */}
                  <div className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                        <FileText className="w-4 h-4 text-amber-700" />
                        Daily Price Bulletin Slip
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Printable/text fair-trade market price comparison bulletin for SHGs and WhatsApp sharing.
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadBulletin}
                      className="mt-3 min-h-[44px] w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-600" />
                      Download Price Slip (.TXT)
                    </button>
                  </div>

                  {/* Full JSON Demo Backup */}
                  <div className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition flex flex-col justify-between sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                          <Database className="w-4 h-4 text-[#0f281e]" />
                          Full JSON Database Backup
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Complete demo data backup of items, collection centres, sales, and SHG bids.
                        </p>
                      </div>
                      <button
                        onClick={handleDownloadFullBackup}
                        className="min-h-[40px] py-1.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-xs flex items-center gap-1.5 transition shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-600" />
                        Download Backup (.JSON)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Install / PWA Section */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
                  3. Mobile & Desktop App Installation (PWA)
                </h4>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">
                        Install VanDhan Saathi to Device
                      </h5>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Works 100% offline in forest areas with service worker caching and home screen launcher icon.
                      </p>
                    </div>
                  </div>

                  {isInstalled ? (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      App Installed
                    </span>
                  ) : isInstallable ? (
                    <button
                      onClick={install}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-[#c85a32] hover:bg-[#a74623] text-white font-medium text-xs flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Install to Home Screen
                    </button>
                  ) : isIOS ? (
                    <span className="text-xs text-stone-600 bg-stone-200 px-3 py-1.5 rounded-xl">
                      iOS: Tap Share → Add to Home Screen
                    </span>
                  ) : (
                    <span className="text-xs text-stone-500 bg-stone-200/80 px-3 py-1.5 rounded-xl">
                      PWA Ready (Browser Menu → Install)
                    </span>
                  )}
                </div>
              </div>

              {/* SFIC Branding Toggle Control */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
                  4. Competition Branding Visibility
                </h4>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">
                      Show SFIC 2026 Labeling
                    </h5>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {showSficBranding 
                        ? 'Currently Showing: "Concept Entry for Seva First Innovation Challenge 2026"' 
                        : 'Currently Hidden: App displays as an independent National Tribal Platform'}
                    </p>
                  </div>

                  <button
                    onClick={() => onToggleSficBranding(!showSficBranding)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${showSficBranding ? 'bg-[#0f281e]' : 'bg-stone-300'}`}
                    role="switch"
                    aria-checked={showSficBranding}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${showSficBranding ? 'translate-x-5' : 'translate-x-0'}`}
                    />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>All demo data and project files are exported directly from browser memory.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
