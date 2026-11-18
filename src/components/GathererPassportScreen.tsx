import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  RotateCcw, 
  TrendingUp, 
  Sparkles, 
  Receipt, 
  CheckCircle2, 
  Calendar, 
  Scale, 
  Tag, 
  AlertCircle,
  Download,
  Trash2
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  FOREST_PRODUCE_ITEMS, 
  INITIAL_SAMPLE_SALES, 
  SaleRecord, 
  ForestProduce 
} from '../data/mockData';

interface GathererPassportScreenProps {
  lang: SupportedLanguage;
  preselectedProduce?: ForestProduce | null;
}

const STORAGE_KEY = 'vandhan_saathi_demo_sales_v1';

export const GathererPassportScreen: React.FC<GathererPassportScreenProps> = ({
  lang,
  preselectedProduce,
}) => {
  const t = translations[lang];

  // Local state persisted in localStorage
  const [sales, setSales] = useState<SaleRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return INITIAL_SAMPLE_SALES;
        }
      }
    }
    return INITIAL_SAMPLE_SALES;
  });

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedProduceId, setSelectedProduceId] = useState<string>(
    preselectedProduce?.id || FOREST_PRODUCE_ITEMS[0].id
  );
  const [quantityInput, setQuantityInput] = useState<string>('30');
  const [buyerInput, setBuyerInput] = useState<string>('Van Dhan Vikas Kendra - Borigumma Hub');
  const [buyerTypeInput, setBuyerTypeInput] = useState<'Van Dhan Centre' | 'Village Trader' | 'SHG Aggregator'>('Van Dhan Centre');
  const [paymentStatusInput, setPaymentStatusInput] = useState<'Paid (Cash)' | 'Paid (DBT)' | 'Pending Verification'>('Paid (DBT)');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
    }
  }, [sales]);

  // Aggregate Calculations
  const totalEarned = sales.reduce((acc, s) => acc + s.totalReceived, 0);
  
  // Total gain over village trader: sum of (pricePerKg - villageRateAtSale) * quantity
  const totalGainOverVillageTrader = sales.reduce((acc, s) => {
    const diff = s.pricePerKg - s.villageRateAtSale;
    return acc + (diff > 0 ? diff * s.quantityKg : 0);
  }, 0);

  const totalQuantityKg = sales.reduce((acc, s) => acc + s.quantityKg, 0);

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(quantityInput);
    if (!qty || qty <= 0) {
      alert('Please enter a valid weight/quantity in kg.');
      return;
    }

    const prod = FOREST_PRODUCE_ITEMS.find((p) => p.id === selectedProduceId) || FOREST_PRODUCE_ITEMS[0];
    
    // Determine price per kg based on buyer type
    let rate = prod.collectionCentreRate;
    if (buyerTypeInput === 'Village Trader') {
      rate = prod.villageTraderRate;
    } else if (buyerTypeInput === 'SHG Aggregator') {
      rate = prod.collectionCentreRate + 2; // small premium
    }

    const newSale: SaleRecord = {
      id: `sale-${Date.now()}`,
      produceId: prod.id,
      produceName: prod.nameEn,
      quantityKg: qty,
      pricePerKg: rate,
      totalReceived: Math.round(qty * rate),
      buyerName: buyerInput,
      buyerType: buyerTypeInput,
      date: new Date().toISOString().split('T')[0],
      paymentStatus: paymentStatusInput,
      receiptCode: `VD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      villageRateAtSale: prod.villageTraderRate,
    };

    setSales([newSale, ...sales]);
    setShowAddModal(false);
    setNoticeMessage(`Added sale record for ${prod.nameEn}. Saved to your browser device memory.`);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  const loadSampleSales = () => {
    setSales(INITIAL_SAMPLE_SALES);
    setNoticeMessage('Loaded standard sample sales dataset (3 records).');
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  const resetAllData = () => {
    if (confirm(t.resetConfirm)) {
      setSales([]);
      localStorage.removeItem(STORAGE_KEY);
      setNoticeMessage('All local demo sales reset. Clean ledger state.');
      setTimeout(() => setNoticeMessage(null), 4000);
    }
  };

  const deleteSingleSale = (id: string) => {
    setSales(sales.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-serif-display">
              {t.recordSaleTitle}
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-2xl">
            Immutable offline ledger of forest-produce transactions. Displays total cumulative earnings and extra value retained away from middleman extortion.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#0f281e] hover:bg-emerald-900 text-white font-bold text-sm shadow-md flex items-center gap-2 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#e5a93b]" />
            {t.addSaleRecord}
          </button>
        </div>
      </div>

      {noticeMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-center justify-between animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            {noticeMessage}
          </span>
          <button onClick={() => setNoticeMessage(null)} className="text-stone-400 hover:text-stone-700 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Aggregate Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block">
            {t.totalEarningsRecorded}
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-stone-900">
              ₹{totalEarned.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Across {sales.length} logged transactions ({totalQuantityKg} kg total)
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg w-fit">
            100% On-Device Storage
          </span>
        </div>

        <div className="bg-gradient-to-br from-[#0f281e] to-[#183d2e] text-white rounded-3xl p-5 border border-emerald-900 shadow-sm flex flex-col justify-between">
          <span className="text-xs text-[#e5a93b] font-bold uppercase tracking-wider block">
            {t.totalGainOverTrader}
          </span>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-amber-300">
              +₹{totalGainOverVillageTrader.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-stone-300">
              Direct extra cash retained by selling at Van Dhan Kendras
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#e5a93b] bg-white/10 px-2.5 py-0.5 rounded-lg w-fit">
            Fair Trade Premium
          </span>
        </div>

        <div className="bg-[#faf7f2] rounded-3xl p-5 border border-stone-300 flex flex-col justify-between">
          <span className="text-xs text-stone-600 font-bold uppercase tracking-wider block">
            Demo Ledger Controls
          </span>
          <div className="flex flex-col gap-2 my-2">
            <button
              onClick={loadSampleSales}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              {t.loadDemoSales}
            </button>
            <button
              onClick={resetAllData}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-700" />
              {t.resetDemoData}
            </button>
          </div>
          <span className="text-[10px] text-stone-500 italic">
            Demo data resets cleanly without lingering cookies.
          </span>
        </div>
      </div>

      {/* Transactions Table / Cards */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-800" />
            Recorded Sales Ledger
          </h3>
          <span className="text-xs text-stone-500 font-medium">
            {sales.length} entries found
          </span>
        </div>

        {sales.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
            <div className="text-stone-700 font-bold">No sales recorded yet</div>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Click "+ Log New Produce Sale" or click "Load Sample Sales" to view realistic tribal market transactions.
            </p>
            <button
              onClick={loadSampleSales}
              className="px-4 py-2 rounded-xl bg-emerald-900 text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Load 3 Sample Sales
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {sales.map((sale) => {
              const diffPerKg = sale.pricePerKg - sale.villageRateAtSale;
              const totalBenefit = diffPerKg > 0 ? diffPerKg * sale.quantityKg : 0;
              const produceObj = FOREST_PRODUCE_ITEMS.find((p) => p.id === sale.produceId);

              return (
                <div
                  key={sale.id}
                  className="p-4 rounded-2xl bg-stone-50/70 hover:bg-stone-50 border border-stone-200/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      {produceObj?.icon || '📦'}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-stone-900">
                          {sale.produceName}
                        </h4>
                        <span className="text-[11px] font-mono text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded">
                          {sale.receiptCode}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>Buyer: <strong>{sale.buyerName}</strong></span>
                        <span>•</span>
                        <span>Date: <strong>{sale.date}</strong></span>
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {sale.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Figures */}
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0 border-stone-200">
                    <div className="text-left md:text-right">
                      <div className="text-xs text-stone-500">
                        {sale.quantityKg} kg × ₹{sale.pricePerKg}/kg
                      </div>
                      <div className="text-lg font-extrabold text-[#0f281e]">
                        ₹{sale.totalReceived.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {totalBenefit > 0 && (
                      <div className="text-left md:text-right bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                        <span className="text-[10px] font-bold text-amber-950 block">
                          Benefit vs Trader:
                        </span>
                        <span className="text-xs font-extrabold text-emerald-800">
                          +₹{totalBenefit.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => deleteSingleSale(sale.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Sale Modal Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h4 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#e5a93b]" />
                Log Minor Forest Produce Sale
              </h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Forest Produce Item
                </label>
                <select
                  value={selectedProduceId}
                  onChange={(e) => setSelectedProduceId(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-sm font-semibold text-stone-800 focus:outline-emerald-800"
                >
                  {FOREST_PRODUCE_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.icon} {item.nameEn} (Centre: ₹{item.collectionCentreRate}/{item.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Quantity / Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(e.target.value)}
                    className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold text-stone-900 focus:outline-emerald-800"
                    placeholder="e.g. 40"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Buyer Category
                  </label>
                  <select
                    value={buyerTypeInput}
                    onChange={(e) => setBuyerTypeInput(e.target.value as any)}
                    className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-xs font-semibold text-stone-800"
                  >
                    <option value="Van Dhan Centre">Van Dhan Centre (Official)</option>
                    <option value="SHG Aggregator">SHG Cluster Collective</option>
                    <option value="Village Trader">Village Trader (Middleman)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Buyer / Collection Centre Name
                </label>
                <input
                  type="text"
                  value={buyerInput}
                  onChange={(e) => setBuyerInput(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-medium text-stone-800"
                  placeholder="e.g. Van Dhan Kendra - Borigumma"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Payment Mode / Status
                </label>
                <select
                  value={paymentStatusInput}
                  onChange={(e) => setPaymentStatusInput(e.target.value as any)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-sm font-semibold text-stone-800"
                >
                  <option value="Paid (DBT)">Direct Bank Transfer (Aadhaar DBT)</option>
                  <option value="Paid (Cash)">Spot Cash with Digital Receipt</option>
                  <option value="Pending Verification">Pending Moisture Inspection</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="min-h-[48px] px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[48px] px-6 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Save to Passport
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
