import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Check, Sparkles, Shield, Zap } from 'lucide-react';

export default function BillingPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8 text-white animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
          Billing & Subscription
        </h1>
        <p className="text-xs text-slate-300">
          Manage your automation credits and subscription tier
        </p>
      </div>

      {/* Current Plan Overview */}
      <div className="p-6 rounded-3xl glass-card border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Active Subscription</div>
          <div className="text-2xl font-bold text-white">{profile?.subscription_plan || 'Free'} Plan</div>
          <div className="text-xs text-slate-300 mt-1">100 monthly automation credits included</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-right">
          <div className="text-xs text-slate-400 font-bold uppercase">Balance</div>
          <div className="text-2xl font-bold text-[#F5C842] font-mono">{profile?.credits_remaining ?? 100} CR</div>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Starter Autopilot', price: '$29/mo', credits: '500 Credits/mo', active: profile?.subscription_plan === 'Free' },
          { name: 'Pro Autopilot', price: '$79/mo', credits: '2,500 Credits/mo', active: false, popular: true },
          { name: 'Enterprise Strings', price: '$199/mo', credits: '10,000 Credits/mo', active: false },
        ].map((plan, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-3xl glass-card border space-y-4 relative flex flex-col justify-between ${
              plan.popular ? 'border-[#F5C842] shadow-[0_0_30px_rgba(245,200,66,0.15)]' : 'border-amber-500/20'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#F5C842] text-[#0D0703] font-bold text-[10px] uppercase">
                Most Popular
              </span>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <div className="text-2xl font-extrabold text-[#F5C842] my-2">{plan.price}</div>
              <div className="text-xs text-slate-300 font-medium">{plan.credits}</div>

              <ul className="space-y-2 text-xs text-slate-300 mt-4">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F5C842]" /> 24/7 Autopilot Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F5C842]" /> n8n & Supabase Webhooks
                </li>
              </ul>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold text-xs cursor-pointer ${
              plan.active 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'btn-gold text-[#0D0703] justify-center'
            }`}>
              {plan.active ? 'Current Plan' : 'Upgrade Tier'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
