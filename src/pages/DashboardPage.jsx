import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Bot, Workflow, Sparkles, Zap, ArrowUpRight, Play, CheckCircle2, Shield, Activity, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { fullName, profile } = useAuth();
  const firstName = fullName ? fullName.split(' ')[0] : 'User';
  const credits = profile?.credits_remaining ?? 100;
  const plan = profile?.subscription_plan || 'Free';

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-slate-950/80 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C842]" />
            <span>Passkey Session Active</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back, <span className="gold-text-bright">{firstName}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Your digital puppets are running on 24/7 autopilot. Track real-time execution logs and automated strings below.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            to="/workflows"
            className="btn-gold py-3 px-5 text-xs font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0D0703]" />
            <span>Deploy New Puppet</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Subscription Plan</span>
            <Shield className="w-4 h-4 text-[#F5C842]" />
          </div>
          <div className="text-2xl font-bold text-white">{plan} Plan</div>
          <div className="text-[11px] text-amber-300/80 font-medium">100 Credits renewed monthly</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Credits Remaining</span>
            <Sparkles className="w-4 h-4 text-[#F5C842]" />
          </div>
          <div className="text-2xl font-bold text-[#F5C842] font-mono">{credits} CR</div>
          <div className="text-[11px] text-slate-400">Approx. 400 workflow executions</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Active Puppets</span>
            <Bot className="w-4 h-4 text-[#F5C842]" />
          </div>
          <div className="text-2xl font-bold text-white">4 Puppets</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Uptime
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Hours Reclaimed</span>
            <Zap className="w-4 h-4 text-[#F5C842]" />
          </div>
          <div className="text-2xl font-bold text-white">18.5 hrs/wk</div>
          <div className="text-[11px] text-amber-300 font-medium">Auto-confirmed 142 tasks</div>
        </div>

      </div>

      {/* Active Puppets List */}
      <div className="p-6 rounded-3xl glass-card border border-amber-500/20 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
            Deployed Automation Strings
          </h2>
          <Link to="/puppets" className="text-xs font-bold text-[#F5C842] hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {[
            { name: 'Table Reservation & WhatsApp Dispatches', industry: 'Restaurants & Cafes', triggers: 'Form / Webhook', status: 'Active (24/7)' },
            { name: 'Member Signups & Pass Reminders', industry: 'Gyms & Studios', triggers: 'QR Code Intake', status: 'Active (24/7)' },
            { name: 'Stock Lookup & Inventory Alert String', industry: 'Retail & Books', triggers: 'Inventory Webhook', status: 'Active (24/7)' },
            { name: 'Automated Slack Exception Handler', industry: 'Software Dev', triggers: 'Deploy Alert', status: 'Active (24/7)' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F5C842] font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{item.industry}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px] bg-amber-500/10 px-2 py-0.5 rounded text-amber-300">{item.triggers}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
