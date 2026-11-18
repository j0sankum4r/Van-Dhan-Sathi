import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  Plus, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  SupportedLanguage, 
  INITIAL_SHG_INVENTORY, 
  INITIAL_BUYER_BIDS, 
  SHGInventoryItem, 
  BuyerBid 
} from '../data/mockData';

interface SHGBuyerDashboardProps {
  lang: SupportedLanguage;
}

export const SHGBuyerDashboard: React.FC<SHGBuyerDashboardProps> = ({ lang }) => {
  const [inventory, setInventory] = useState<SHGInventoryItem[]>(INITIAL_SHG_INVENTORY);
  const [bids, setBids] = useState<BuyerBid[]>(INITIAL_BUYER_BIDS);
  const [showPostBidModal, setShowPostBidModal] = useState<boolean>(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Bid Form State
  const [bidProduce, setBidProduce] = useState<string>(inventory[0].produceName);
  const [buyerName, setBuyerName] = useState<string>('Dabur India Ayurvedic Sourcing (Sample)');
  const [bidPrice, setBidPrice] = useState<string>('5100');
  const [bidQuantity, setBidQuantity] = useState<string>('25');
  const [destination, setDestination] = useState<string>('Baddi Manufacturing Plant');

  const handleAcceptBid = (bidId: string) => {
    setBids(
      bids.map((b) => (b.id === bidId ? { ...b, status: 'Accepted' } : b))
    );
    const acceptedBid = bids.find((b) => b.id === bidId);
    setSuccessToast(
      `Accepted bid of ₹${acceptedBid?.bidPricePerQuintal}/quintal from ${acceptedBid?.buyerCompany}! Digital dispatch contract generated.`
    );
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const handlePostBid = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(bidPrice);
    const qtyNum = parseFloat(bidQuantity);

    if (!priceNum || !qtyNum) {
      alert('Please enter valid price and quantity values.');
      return;
    }

    const newBid: BuyerBid = {
      id: `bid-${Date.now()}`,
      produceName: bidProduce,
      buyerCompany: buyerName,
      bidPricePerQuintal: priceNum,
      quantityRequestedQuintals: qtyNum,
      totalOfferValue: priceNum * qtyNum,
      destination: destination,
      status: 'Open',
      timestamp: 'Just now',
      verifiedFSSAI: true,
    };

    setBids([newBid, ...bids]);
    setShowPostBidModal(false);
    setSuccessToast(`Bid of ₹${priceNum}/quintal posted by ${buyerName} into live demo pool.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-serif-display">
              SHG & Bulk Buyer B2B Exchange
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-2xl">
            Empowering tribal Self-Help Group federations to aggregate forest lots and negotiate directly with corporate food, herbal, and cosmetic manufacturers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-700" />
            DEMO DASHBOARD • Sample Bids
          </span>

          <button
            onClick={() => setShowPostBidModal(true)}
            className="min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#0f281e] hover:bg-emerald-900 text-white font-bold text-xs shadow-md flex items-center gap-2 active:scale-95 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#e5a93b]" />
            + Post Buyer Bid
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm flex items-center justify-between animate-in fade-in shadow-xs">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            {successToast}
          </span>
          <button onClick={() => setSuccessToast(null)} className="text-stone-400 hover:text-stone-700 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Aggregate SHG Stocks in Godowns */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div>
            <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-800" />
              Aggregated Tribal SHG Inventory Available
            </h3>
            <span className="text-xs text-stone-500">
              Graded and tested lots stored in Van Dhan cold/dry storage godowns.
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900">
            {inventory.length} Active Lots
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inventory.map((lot) => (
            <div
              key={lot.id}
              className="p-4 rounded-2xl bg-[#faf7f2] border border-stone-300/80 hover:border-emerald-700 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  {lot.shgCluster}
                </span>
                <h4 className="font-extrabold text-base text-stone-900 mb-2">
                  {lot.produceName}
                </h4>
                
                <div className="space-y-1 text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
                  <div className="flex justify-between">
                    <span>Available Volume:</span>
                    <strong className="text-stone-900">{lot.availableQuintals} Quintals ({lot.availableQuintals * 100} kg)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Grade:</span>
                    <strong className="text-emerald-800">{lot.qualityGrade}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Reserve Floor Price:</span>
                    <strong className="text-[#0f281e]">₹{lot.reservePricePerQuintal.toLocaleString('en-IN')}/Qtl</strong>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-200">
                <span>📍 {lot.warehouseLocation}</span>
                <span className="font-bold text-amber-800">{lot.bidsCount} Bids Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer Bids Table / Active Bids */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div>
            <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#c85a32]" />
              Live Corporate & Institutional Buyer Bids
            </h3>
            <span className="text-xs text-stone-500">
              Clear demonstration of sample B2B procurement bids. Buyers are clearly labelled as sample demo data.
            </span>
          </div>
          <span className="text-xs text-stone-500">
            {bids.length} total bids
          </span>
        </div>

        <div className="space-y-3">
          {bids.map((bid) => {
            const isAccepted = bid.status === 'Accepted';
            return (
              <div
                key={bid.id}
                className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isAccepted
                    ? 'bg-emerald-50/80 border-emerald-400'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-extrabold text-base text-stone-900">
                      {bid.buyerCompany}
                    </span>
                    {bid.verifiedFSSAI && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> FSSAI Verified
                      </span>
                    )}
                    <span className="text-xs text-stone-400">• {bid.timestamp}</span>
                  </div>

                  <div className="text-xs text-stone-700 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>Produce: <strong>{bid.produceName}</strong></span>
                    <span>Quantity: <strong>{bid.quantityRequestedQuintals} Qtl</strong></span>
                    <span>Destination: <strong>{bid.destination}</strong></span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-stone-200">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-stone-500 block">Offered Bid Price</span>
                    <div className="text-xl font-extrabold text-stone-900">
                      ₹{bid.bidPricePerQuintal.toLocaleString('en-IN')}{' '}
                      <span className="text-xs text-stone-500 font-normal">/ Qtl</span>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-bold block">
                      Total: ₹{bid.totalOfferValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {isAccepted ? (
                    <span className="min-h-[48px] px-5 py-2.5 rounded-2xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                      <CheckCircle className="w-4 h-4" /> Bid Accepted ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAcceptBid(bid.id)}
                      className="min-h-[48px] px-5 py-2.5 rounded-2xl bg-[#0f281e] hover:bg-emerald-900 active:scale-95 text-white font-bold text-xs shadow-md transition cursor-pointer"
                    >
                      Accept Bid
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post Buyer Bid Modal */}
      {showPostBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
              <h4 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#c85a32]" />
                Post Commercial Bulk Buyer Offer (Demo)
              </h4>
              <button
                onClick={() => setShowPostBidModal(false)}
                className="text-stone-400 hover:text-stone-700 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostBid} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Target Minor Forest Produce
                </label>
                <select
                  value={bidProduce}
                  onChange={(e) => setBidProduce(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-sm font-semibold text-stone-800"
                >
                  {inventory.map((lot) => (
                    <option key={lot.id} value={lot.produceName}>
                      {lot.produceName} (Floor: ₹{lot.reservePricePerQuintal}/Qtl)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Buyer Company Name (Demo Tagged)
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-medium text-stone-800"
                  placeholder="e.g. Dabur Herbal Division (Sample Buyer)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Bid Price (₹ per Quintal)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="50"
                    value={bidPrice}
                    onChange={(e) => setBidPrice(e.target.value)}
                    className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold text-stone-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Quantity (Quintals)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={bidQuantity}
                    onChange={(e) => setBidQuantity(e.target.value)}
                    className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold text-stone-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full min-h-[48px] px-3 py-2 rounded-xl border border-stone-300 text-sm font-medium text-stone-800"
                  placeholder="e.g. Hyderabad Central Processing Facility"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Notice: All bids posted are tagged as interactive simulation data.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostBidModal(false)}
                  className="min-h-[48px] px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[48px] px-6 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Post Bid to Live Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
