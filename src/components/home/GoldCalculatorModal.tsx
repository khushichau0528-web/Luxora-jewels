import React, { useState } from 'react';
import { X, Calculator, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { GoldPurity } from '../../types';

export const GoldCalculatorModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    goldRates, 
    updateGoldRate, 
    calculateJewelleryPrice, 
    currentUser 
  } = useStore();

  const [weight, setWeight] = useState<number>(10.5);
  const [purity, setPurity] = useState<GoldPurity>('22K');
  const [makingCharges, setMakingCharges] = useState<number>(120);
  const [stoneCharges, setStoneCharges] = useState<number>(250);

  // Admin edit rate states
  const [editingRate, setEditingRate] = useState<boolean>(false);
  const [tempRates, setTempRates] = useState<Record<string, number>>({
    '24K': goldRates.find(r => r.karat === '24K')?.ratePerGram || 86.5,
    '22K': goldRates.find(r => r.karat === '22K')?.ratePerGram || 79.8,
    '18K': goldRates.find(r => r.karat === '18K')?.ratePerGram || 65.2,
    '14K': goldRates.find(r => r.karat === '14K')?.ratePerGram || 51.0
  });

  if (activeModal !== 'goldCalculator') return null;

  const calculation = calculateJewelleryPrice(weight, purity, makingCharges, stoneCharges);
  const selectedRate = goldRates.find(r => r.karat === purity)?.ratePerGram || 79.8;

  const handleSaveRates = () => {
    Object.entries(tempRates).forEach(([karat, rate]) => {
      updateGoldRate(karat as GoldPurity, rate);
    });
    setEditingRate(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#12141c] border border-[#3b372a] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#28251e] bg-[#161822]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#d4af37]/15 text-[#d4af37]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-luxury text-lg text-white font-semibold flex items-center gap-2">
                Jewellery Price Calculator
                <span className="text-[10px] uppercase font-sans tracking-wider px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37]">
                  Algorithm 8
                </span>
              </h3>
              <p className="text-xs text-[#9d9b93]">
                Academic Gold Rate Breakdown: Weight × Rate + Making + Stone + 3% Tax
              </p>
            </div>
          </div>
          <button
            id="close-gold-calc-modal-btn"
            onClick={() => setActiveModal(null)}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Live Gold Rates Ribbon */}
          <div className="p-4 rounded-xl bg-[#181a24] border border-[#2b281f] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Current Gold Market Rates per Gram
              </span>
              {currentUser?.role === 'Admin' && (
                <button
                  id="btn-edit-gold-rates-admin"
                  onClick={() => setEditingRate(!editingRate)}
                  className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  {editingRate ? 'Cancel Edit' : 'Admin: Update Rates'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {goldRates.map(r => (
                <div key={r.karat} className="p-2.5 rounded-lg bg-[#0e1017] border border-[#24221b] text-center">
                  <span className="text-[11px] text-[#999] block font-mono">{r.karat} Gold</span>
                  {editingRate ? (
                    <input
                      type="number"
                      value={tempRates[r.karat] || r.ratePerGram}
                      onChange={(e) => setTempRates({ ...tempRates, [r.karat]: parseFloat(e.target.value) || 0 })}
                      className="w-full text-center bg-[#1d202b] border border-[#3b382d] text-xs text-white rounded mt-1 py-0.5"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white block mt-0.5">
                      ${r.ratePerGram.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[9px] text-[#777] block">per gram</span>
                </div>
              ))}
            </div>

            {editingRate && (
              <div className="pt-2 flex justify-end">
                <button
                  id="btn-save-gold-rates"
                  onClick={handleSaveRates}
                  className="px-3 py-1 bg-[#d4af37] text-black font-semibold rounded text-xs hover:bg-[#c49f2c] transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Save Updated Rates
                </button>
              </div>
            )}
          </div>

          {/* Calculator Input Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#cfccc4] mb-1 font-medium">Gold Purity (Karat)</label>
              <select
                id="calc-select-purity"
                value={purity}
                onChange={(e) => setPurity(e.target.value as GoldPurity)}
                className="w-full bg-[#181a24] border border-[#363226] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              >
                <option value="24K">24K (Pure Gold - 99.9%)</option>
                <option value="22K">22K (Jewellery Hallmark 916)</option>
                <option value="18K">18K (Diamond Standard 750)</option>
                <option value="14K">14K (Durable Setting 585)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#cfccc4] mb-1 font-medium">Gross Weight in Grams</label>
              <input
                id="calc-input-weight"
                type="number"
                step="0.1"
                min="0.1"
                value={weight}
                onChange={(e) => setWeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#181a24] border border-[#363226] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#cfccc4] mb-1 font-medium">Making / Crafting Charges ($)</label>
              <input
                id="calc-input-making"
                type="number"
                min="0"
                value={makingCharges}
                onChange={(e) => setMakingCharges(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#181a24] border border-[#363226] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#cfccc4] mb-1 font-medium">Diamond / Gemstone Charges ($)</label>
              <input
                id="calc-input-stones"
                type="number"
                min="0"
                value={stoneCharges}
                onChange={(e) => setStoneCharges(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#181a24] border border-[#363226] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Mathematical Calculation Breakdown (Algorithm 8) */}
          <div className="p-4 rounded-xl bg-[#0c0d12] border border-[#2d2920] space-y-3">
            <h4 className="text-xs font-semibold text-[#a9a7a0] uppercase tracking-wider">
              Calculation Breakdown
            </h4>

            <div className="space-y-2 text-xs divide-y divide-[#1e2029]">
              <div className="flex justify-between items-center pt-1 text-[#ccc]">
                <span>1. Gold Value ({weight}g × ${selectedRate.toFixed(2)}/g):</span>
                <span className="font-mono font-medium text-white">${calculation.goldValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-[#ccc]">
                <span>2. Artisan Making Charges:</span>
                <span className="font-mono font-medium text-white">${calculation.makingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-[#ccc]">
                <span>3. Precious Stone Charges:</span>
                <span className="font-mono font-medium text-white">${calculation.stoneCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-[#ccc]">
                <span>Subtotal (Base Product Cost):</span>
                <span className="font-mono font-medium text-[#d4af37]">${calculation.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-[#ccc]">
                <span>4. Luxury Jewellery Tax (3%):</span>
                <span className="font-mono font-medium text-white">${calculation.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 text-sm font-bold text-white">
                <span className="text-[#d4af37]">Final Estimated Jewellery Price:</span>
                <span className="text-lg text-[#d4af37] font-mono">${calculation.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#7a7872] italic text-center">
            * This calculator demonstrates Algorithm 8 as requested. Real-world jewellery pricing may incorporate dynamic carat wastage, purity certificates, and hallmarking fees.
          </div>
        </div>
      </div>
    </div>
  );
};
