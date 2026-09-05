import React from 'react';
import { Award, Shield, Heart, Sparkles, Gem, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          The Luxora Atelier Heritage
        </span>
        <h1 className="font-luxury text-4xl sm:text-5xl text-white font-bold leading-tight">
          Where Regal Artistry Meets Modern Perfection
        </h1>
        <p className="text-sm text-[#a9a7a0] leading-relaxed">
          Founded in 1988, Luxora Jewels crafts exquisite ornaments that celebrate personal milestones, royal bridal moments, and rare solitaires passed through generations.
        </p>
      </div>

      {/* Story & Visual Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-[#3b372a] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200"
            alt="Handcrafting luxury jewellery in atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
            <div className="text-white space-y-1">
              <span className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">Fifth Avenue Atelier</span>
              <p className="text-sm font-light">Over 1,200 hours of precision gem-setting per royal bridal necklace.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#bab8b0] leading-relaxed">
          <h2 className="font-luxury text-2xl text-white font-bold">
            The Philosophy of Uncompromised Purity
          </h2>
          <p>
            Every piece bearing the Luxora hallmark undergoes rigorous laser-spectrometry testing to guarantee exact karat purities—from pure 24K bullion to durable 18K and 22K jewellery alloys.
          </p>
          <p>
            Our diamonds are ethically procured in strict compliance with the Kimberley Process, hand-selected by master gemmologists for exceptional fire, brilliance, and symmetry.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#141622] border border-[#272938]">
              <Award className="w-6 h-6 text-[#d4af37] mb-2" />
              <h3 className="font-luxury text-sm text-white font-bold">BIS Hallmarked</h3>
              <p className="text-[11px] text-[#888] mt-1">Government-certified 916 gold with micro laser hallmark stamps.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#141622] border border-[#272938]">
              <Gem className="w-6 h-6 text-sky-400 mb-2" />
              <h3 className="font-luxury text-sm text-white font-bold">GIA & IGI Graded</h3>
              <p className="text-[11px] text-[#888] mt-1">Every solitaire features individual certification dossier numbers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Commitments */}
      <div className="p-8 rounded-3xl bg-[#12141c] border border-[#2b271d] space-y-8">
        <h3 className="font-luxury text-xl font-bold text-center text-white">
          Our Four Pillars of Custodianship
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Conflict-Free</h4>
            <p className="text-[#888]">100% natural, traceable, and ethically mined diamonds and gems.</p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Lifetime Exchange</h4>
            <p className="text-[#888]">Exchange gold weight at prevailing market rates anytime.</p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Complimentary Service</h4>
            <p className="text-[#888]">Annual ultrasonic cleaning, inspection and prong adjustments.</p>
          </div>

          <div className="space-y-2 text-center p-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#1b1e2a] flex items-center justify-center text-[#d4af37]">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Tamper-Proof Delivery</h4>
            <p className="text-[#888]">Insured transit with sealed velvet presentation keepsakes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
