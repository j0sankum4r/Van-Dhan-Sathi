import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  Phone, 
  Scale, 
  CreditCard, 
  ShieldCheck, 
  Filter, 
  Navigation,
  Info
} from 'lucide-react';
import { 
  SupportedLanguage, 
  translations, 
  SAMPLE_CENTRES, 
  FOREST_PRODUCE_ITEMS, 
  CollectionCentre 
} from '../data/mockData';

interface CollectionCentresScreenProps {
  lang: SupportedLanguage;
}

export const CollectionCentresScreen: React.FC<CollectionCentresScreenProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedProduceFilter, setSelectedProduceFilter] = useState<string>('all');
  const [activeCentreId, setActiveCentreId] = useState<string>(SAMPLE_CENTRES[0].id);

  const filteredCentres = selectedProduceFilter === 'all'
    ? SAMPLE_CENTRES
    : SAMPLE_CENTRES.filter((c) => c.acceptedProduceIds.includes(selectedProduceFilter));

  const activeCentre = SAMPLE_CENTRES.find((c) => c.id === activeCentreId) || SAMPLE_CENTRES[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
              <MapPin className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-stone-900 font-serif-display">
              {t.navCentres} • Van Dhan Vikas Kendras
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-2xl">
            Locate nearby tribal procurement stations, verify daily opening status, and check quality standards prior to walking.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          3 Sample Verified Centres
        </span>
      </div>

      {/* Produce Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-[#faf7f2] p-4 rounded-2xl border border-stone-200/80">
        <span className="text-xs font-semibold text-stone-600 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter by Produce Accepted:
        </span>
        <button
          onClick={() => setSelectedProduceFilter('all')}
          className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
            selectedProduceFilter === 'all'
              ? 'bg-[#0f281e] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          All Centres
        </button>
        {FOREST_PRODUCE_ITEMS.slice(0, 4).map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedProduceFilter(p.id)}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedProduceFilter === p.id
                ? 'bg-[#0f281e] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>{p.icon}</span>
            <span>{lang === 'hi' ? p.nameHi : lang === 'te' ? p.nameTe : p.nameEn}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Clean Illustrated Map + Centre Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Illustrated Vector Mini-Map (No External Map API needed, pristine SVG landscape) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-800" />
              Regional Forest Territory Map
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">Koraput - Malkangiri Zone</span>
          </div>

          {/* SVG Illustrated Map Canvas */}
          <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#f0ebd9] border-2 border-stone-300 overflow-hidden shadow-inner">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Forest terrain polygons */}
              <path
                d="M0,0 Q30,40 50,20 T100,50 L100,0 Z"
                fill="#d8e8dc"
                opacity="0.7"
              />
              <path
                d="M20,100 Q60,60 80,90 T100,100 Z"
                fill="#c6decb"
                opacity="0.6"
              />
              <path
                d="M0,70 Q40,80 50,100 L0,100 Z"
                fill="#d2e3d5"
                opacity="0.8"
              />
              
              {/* Forest Ridge Lines */}
              <path
                d="M10,25 Q40,35 90,20"
                stroke="#a8cbb0"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                fill="none"
              />
              <path
                d="M5,65 Q50,45 95,80"
                stroke="#a8cbb0"
                strokeWidth="1.5"
                strokeDasharray="2,2"
                fill="none"
              />

              {/* River/Water Stream */}
              <path
                d="M-5,40 C30,35 45,65 105,45"
                fill="none"
                stroke="#85b8cb"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Village Collector Base Pin */}
              <circle cx="18" cy="52" r="3.5" fill="#c85a32" />
              <circle cx="18" cy="52" r="7" fill="#c85a32" opacity="0.25" />
              <text x="23" y="55" fontSize="4" fontWeight="bold" fill="#7a2a0e">
                You (Village Base)
              </text>

              {/* Collection Centres */}
              {SAMPLE_CENTRES.map((c) => {
                const isSelected = c.id === activeCentreId;
                return (
                  <g key={c.id} className="cursor-pointer" onClick={() => setActiveCentreId(c.id)}>
                    {isSelected && (
                      <circle
                        cx={c.coordinates.x}
                        cy={c.coordinates.y}
                        r="8"
                        fill="#e5a93b"
                        opacity="0.35"
                        className="animate-pulse"
                      />
                    )}
                    <circle
                      cx={c.coordinates.x}
                      cy={c.coordinates.y}
                      r="4.5"
                      fill={isSelected ? '#e5a93b' : '#0f281e'}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text
                      x={c.coordinates.x + 6}
                      y={c.coordinates.y + 1.5}
                      fontSize="3.8"
                      fontWeight="bold"
                      fill="#0f281e"
                    >
                      {c.name.split('-')[1]?.trim() || c.name.slice(0, 15)} ({c.distanceKm}km)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend overlay */}
            <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs p-2 rounded-xl text-[10px] text-stone-700 flex items-center justify-between border border-stone-200">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c85a32]" />
                Your Village
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0f281e]" />
                Van Dhan Centre
              </span>
              <span className="font-semibold text-emerald-800">Tap pins to switch</span>
            </div>
          </div>

          {/* Active Centre Spotlight Highlight */}
          <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-amber-300 text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900">
              <span>{activeCentre.name}</span>
              <span className="text-emerald-800 font-extrabold">{activeCentre.distanceKm} km away</span>
            </div>
            <p className="text-stone-600 text-[11px]">
              {lang === 'hi'
                ? activeCentre.qualityAdvisoryHi
                : lang === 'te'
                ? activeCentre.qualityAdvisoryTe
                : activeCentre.qualityAdvisoryEn}
            </p>
          </div>
        </div>

        {/* 3 Centre Detail Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredCentres.map((centre) => {
            const isSelected = centre.id === activeCentreId;
            return (
              <div
                key={centre.id}
                onClick={() => setActiveCentreId(centre.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-emerald-800 shadow-md ring-2 ring-emerald-800/10'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                      {centre.name}
                    </h3>
                    <span className="text-xs text-stone-500 font-medium block">
                      {centre.tehsil}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        centre.status === 'Open Today'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {centre.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-stone-100 font-bold text-xs text-stone-700">
                      {centre.distanceKm} km
                    </span>
                  </div>
                </div>

                {/* Logistics Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs text-stone-700 bg-stone-50 p-3 rounded-2xl border border-stone-200/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span><strong>Hours:</strong> {centre.timings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Digital Calibrated Scale: <strong>Yes</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Payment: <strong>{centre.spotPaymentMode}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>Coordinator: <strong>{centre.operatorName}</strong></span>
                  </div>
                </div>

                {/* Accepted Produce Icons */}
                <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-stone-500">Buys today:</span>
                    {centre.acceptedProduceIds.map((pid) => {
                      const item = FOREST_PRODUCE_ITEMS.find((p) => p.id === pid);
                      return item ? (
                        <span
                          key={pid}
                          className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-950 text-xs font-medium border border-emerald-200/60 flex items-center gap-1"
                        >
                          <span>{item.icon}</span>
                          <span>{item.nameEn.split(' ')[0]}</span>
                        </span>
                      ) : null;
                    })}
                  </div>

                  <span className="text-[11px] text-amber-800 font-bold">
                    Demo Simulated Centre
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
