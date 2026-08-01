import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Cpu, Sparkles, MessageSquare, Calendar, ShoppingBag, CheckCircle2 } from 'lucide-react';

const AUTOMATION_EXAMPLES = [
  {
    id: 'leads',
    label: '💬 WhatsApp Lead',
    icon: MessageSquare,
    trigger: 'New Customer Message',
    triggerSub: 'WhatsApp / Web Form',
    logic: 'Puppet AI Qualification',
    logicSub: 'Checks availability & intent',
    action: 'Instant SMS + CRM Sync',
    actionSub: '0.8s automated response',
  },
  {
    id: 'booking',
    label: '📅 Auto Booking',
    icon: Calendar,
    trigger: 'Appointment Requested',
    triggerSub: 'Web Calendar Widget',
    logic: 'Google & Outlook Lock',
    logicSub: 'Prevents double-booking',
    action: 'Confirm SMS & Reminders',
    actionSub: 'Auto 24h & 1h alert strings',
  },
  {
    id: 'ecommerce',
    label: '🛍️ Order Abandoned',
    icon: ShoppingBag,
    trigger: 'Cart Left Unpaid',
    triggerSub: 'Shopify / Checkout',
    logic: 'Puppet Voucher Engine',
    logicSub: 'Generates custom 10% coupon',
    action: 'WhatsApp Recover Link',
    actionSub: '32% instant recovery rate',
  },
];

export default function HeroAutomationPipeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle through examples every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % AUTOMATION_EXAMPLES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = AUTOMATION_EXAMPLES[activeIdx];

  return (
    <div className="w-full mb-8 max-w-lg">
      
      {/* Industry / Workflow Selector Tabs */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-[#5c3a1e] uppercase tracking-wider mr-1">
          How Puppet Works:
        </span>
        {AUTOMATION_EXAMPLES.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setActiveIdx(idx)}
            className={`text-xs font-extrabold px-3 py-1.5 rounded-full transition-all whitespace-nowrap border ${
              activeIdx === idx
                ? 'bg-[#1c1209] text-[#f5ebd9] border-[#1c1209] shadow-md scale-105'
                : 'bg-[#faf4ea]/80 text-[#5c3a1e] border-[#b48c5a]/30 hover:bg-[#faf4ea]'
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* 3-Step Micro Pipeline Widget */}
      <div 
        className="rounded-2xl p-4 border-2 border-[#b48c5a]/40 shadow-xl relative overflow-hidden"
        style={{
          backgroundImage: "url('/assets/wood_bg.png')",
          backgroundSize: '300px',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7), inset -2px -2px 4px rgba(0,0,0,0.15), 0 8px 16px rgba(28,18,9,0.12)'
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-center text-center">
          
          {/* STEP 1: TRIGGER */}
          <div className="bg-[#faf4ea]/90 p-2.5 rounded-xl border border-[#b48c5a]/30 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#7c4a1e] uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              1. TRIGGER
            </div>
            <div className="font-extrabold text-xs text-[#1c1209] truncate w-full">
              {current.trigger}
            </div>
            <div className="text-[10px] font-semibold text-[#5c3a1e] truncate w-full mt-0.5 opacity-80">
              {current.triggerSub}
            </div>
          </div>

          {/* CONNECTING STRING 1 -> 2 */}
          <div className="hidden sm:flex flex-col items-center justify-center -my-2">
            <div className="flex items-center gap-1 text-[#8c5e35] animate-pulse">
              <span className="h-[2px] w-6 bg-[#8c5e35]/60" />
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-black text-[#7c4a1e] mt-0.5">STRING</span>
          </div>

          {/* STEP 2: PUPPET LOGIC */}
          <div className="bg-[#1c1209] text-[#f5ebd9] p-2.5 rounded-xl border border-[#c8a96e]/40 flex flex-col items-center shadow-md relative">
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#c8a96e] uppercase tracking-wider mb-1">
              <Cpu className="w-3 h-3 text-[#c8a96e]" />
              2. PUPPET AI
            </div>
            <div className="font-extrabold text-xs text-white truncate w-full">
              {current.logic}
            </div>
            <div className="text-[10px] font-semibold text-[#c8a96e] truncate w-full mt-0.5 opacity-90">
              {current.logicSub}
            </div>
          </div>

          {/* CONNECTING STRING 2 -> 3 */}
          <div className="hidden sm:flex flex-col items-center justify-center -my-2">
            <div className="flex items-center gap-1 text-[#8c5e35] animate-pulse">
              <span className="h-[2px] w-6 bg-[#8c5e35]/60" />
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-black text-[#7c4a1e] mt-0.5">AUTO</span>
          </div>

          {/* STEP 3: ACTION */}
          <div className="bg-[#faf4ea]/90 p-2.5 rounded-xl border border-[#b48c5a]/30 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1">
              <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
              3. ACTION
            </div>
            <div className="font-extrabold text-xs text-[#1c1209] truncate w-full">
              {current.action}
            </div>
            <div className="text-[10px] font-semibold text-[#5c3a1e] truncate w-full mt-0.5 opacity-80">
              {current.actionSub}
            </div>
          </div>

        </div>

        {/* Bottom indicator text */}
        <div className="mt-2.5 pt-2 border-t border-[#b48c5a]/20 flex items-center justify-between text-[10px] font-bold text-[#5c3a1e]">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Zero manual coding required
          </span>
          <span className="text-[#7c4a1e] hover:underline cursor-pointer" onClick={() => setActiveIdx((activeIdx + 1) % AUTOMATION_EXAMPLES.length)}>
            Next Recipe &rarr;
          </span>
        </div>
      </div>

    </div>
  );
}
