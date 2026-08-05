import React from 'react';
import { Bot, Play, Pause, Settings2, Plus, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PuppetsPage() {
  const puppets = [
    { id: 1, name: 'Reservation Assistant', trigger: 'n8n Webhook / Request OTP', category: 'Restaurant', status: 'Running', executions: 420 },
    { id: 2, name: 'Gym Lead Follow-up Puppet', trigger: 'WhatsApp Webhook', category: 'Fitness', status: 'Running', executions: 289 },
    { id: 3, name: 'Inventory Replenishment Sentinel', trigger: 'Stock Check Cron', category: 'Retail', status: 'Running', executions: 154 },
    { id: 4, name: 'Slack Deploy Notification Bot', trigger: 'GitHub Webhook', category: 'DevOps', status: 'Paused', executions: 98 },
  ];

  return (
    <div className="space-y-6 text-white animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            Digital Puppets
          </h1>
          <p className="text-xs text-slate-300">
            Manage your autonomous automation string workers
          </p>
        </div>
        <Link to="/workflows" className="btn-gold py-2.5 px-4 text-xs font-bold justify-center">
          <Plus className="w-4 h-4 text-[#0D0703]" />
          <span>New Puppet</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {puppets.map((puppet) => (
          <div key={puppet.id} className="p-6 rounded-3xl glass-card border border-amber-500/20 space-y-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F5C842]">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{puppet.name}</h3>
                  <span className="text-[11px] text-amber-300 font-semibold">{puppet.category}</span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                puppet.status === 'Running' 
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {puppet.status}
              </span>
            </div>

            <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-slate-400 text-[10px] block">Trigger Method</span>
                <span className="font-mono text-amber-300 font-semibold">{puppet.trigger}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Total Runs</span>
                <span className="font-mono text-white font-bold">{puppet.executions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
