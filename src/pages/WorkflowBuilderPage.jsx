import React, { useState } from 'react';
import { Workflow, Plus, Zap, ArrowRight, Save, Play, CheckCircle2, MessageSquare, Database, Mail } from 'lucide-react';

export default function WorkflowBuilderPage() {
  const [nodes, setNodes] = useState([
    { id: 1, type: 'TRIGGER', title: 'Webhook Intake', icon: Zap, status: 'Active' },
    { id: 2, type: 'LOGIC', title: 'Validation & Deduplication', icon: Database, status: 'Active' },
    { id: 3, type: 'ACTION', title: 'Send WhatsApp Alert', icon: MessageSquare, status: 'Active' },
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-white animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'var(--font-display)' }}>
            Workflow String Builder
          </h1>
          <p className="text-xs text-slate-300">
            Construct end-to-end automation strings visually
          </p>
        </div>

        <button onClick={handleSave} className="btn-gold py-2.5 px-5 text-xs font-bold justify-center cursor-pointer">
          <Save className="w-4 h-4 text-[#0D0703]" />
          <span>{saved ? 'String Saved!' : 'Save & Deploy String'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#F5C842]" />
          <span>Workflow string deployed successfully to production engine!</span>
        </div>
      )}

      {/* Visual Canvas */}
      <div className="p-8 rounded-3xl glass-card border border-amber-500/20 space-y-6 min-h-[420px] flex flex-col justify-center items-center relative">
        <div className="w-full max-w-2xl space-y-4">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <React.Fragment key={node.id}>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex items-center justify-between gap-4 shadow-xl hover:border-[#F5C842] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-[#F5C842] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">{node.type} STEP {index + 1}</div>
                      <div className="text-sm font-bold text-white">{node.title}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Ready
                  </span>
                </div>

                {index < nodes.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-[#F5C842] to-amber-600 animate-pulse" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
