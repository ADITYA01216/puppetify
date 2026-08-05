import React from 'react';
import { Settings, Bell, Shield, Sliders } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 text-white animate-fadeIn max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
          Workspace Settings
        </h1>
        <p className="text-xs text-slate-300">
          Configure global automation controls and notifications
        </p>
      </div>

      <div className="p-6 rounded-3xl glass-card border border-amber-500/20 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#F5C842]" /> Notification Pings
          </h2>
          
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/10 cursor-pointer">
            <span className="text-xs text-slate-200 font-medium">Email me when a puppet string fails</span>
            <input type="checkbox" defaultChecked className="accent-[#F5C842] w-4 h-4" />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/10 cursor-pointer">
            <span className="text-xs text-slate-200 font-medium">Daily summary digest of active executions</span>
            <input type="checkbox" defaultChecked className="accent-[#F5C842] w-4 h-4" />
          </label>
        </div>

        <div className="pt-4 border-t border-amber-500/10 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F5C842]" /> Security & Rate Limits
          </h2>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-amber-500/10 cursor-pointer">
            <span className="text-xs text-slate-200 font-medium">Strict CORS validation on incoming webhooks</span>
            <input type="checkbox" defaultChecked className="accent-[#F5C842] w-4 h-4" />
          </label>
        </div>
      </div>
    </div>
  );
}
