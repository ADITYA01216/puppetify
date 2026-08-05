import React, { useState } from 'react';
import { Key, Copy, Check, Eye, EyeOff, Plus } from 'lucide-react';

export default function ApiKeysPage() {
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const mockKey = "pup_live_89f7a934b12c4e568d90a12b";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 text-white animate-fadeIn max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            API Keys & Webhooks
          </h1>
          <p className="text-xs text-slate-300">
            Authentication tokens for triggering n8n & Supabase workflows
          </p>
        </div>

        <button className="btn-gold py-2.5 px-4 text-xs font-bold justify-center">
          <Plus className="w-4 h-4 text-[#0D0703]" />
          <span>Create Key</span>
        </button>
      </div>

      <div className="p-6 rounded-3xl glass-card border border-amber-500/20 space-y-4">
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Production Secret Key</div>

        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
          <span className="font-mono text-xs text-amber-200 flex-1 truncate">
            {showKey ? mockKey : "pup_live_••••••••••••••••••••••••"}
          </span>

          <button
            onClick={() => setShowKey(!showKey)}
            className="p-1.5 rounded-lg hover:bg-amber-500/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-[#F5C842] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
