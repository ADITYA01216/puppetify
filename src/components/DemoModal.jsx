import React, { useState } from 'react';
import { X, Play, RefreshCw, CheckCircle2, MessageSquare, Calendar, Star, PackageCheck, Zap } from 'lucide-react';

export default function DemoModal({ isOpen, onClose }) {
  const [activeSimulation, setActiveSimulation] = useState('booking');
  const [isPulling, setIsPulling] = useState(false);
  const [logs, setLogs] = useState([
    'System initialized. Standing by for string trigger...'
  ]);

  if (!isOpen) return null;

  const triggerString = (id) => {
    setActiveSimulation(id);
    setIsPulling(true);
    
    let newLog = '';
    if (id === 'booking') {
      newLog = '[STRING PULLED] Customer clicked "Book Table 7PM" → Automated SMS confirmation sent → Calendar slot locked.';
    } else if (id === 'whatsapp') {
      newLog = '[STRING PULLED] Order #482 placed → Instant WhatsApp ping triggered: "Your coffee is ready for pickup!"';
    } else if (id === 'reviews') {
      newLog = '[STRING PULLED] Guest checked out → 2-hour timer started → Auto 5-star Google review request link dispatched.';
    } else if (id === 'inventory') {
      newLog = '[STRING PULLED] Espresso bean weight dropped below 5kg → Automated restock email sent to vendor.';
    }

    setTimeout(() => {
      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
      setIsPulling(false);
    }, 600);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative max-w-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                Live Puppet String Simulator
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Click any puppet string below to simulate background automation triggers in real time.
              </p>
            </div>
          </div>

          {/* Interactive Trigger Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'booking', title: 'Booking Puppet', icon: Calendar },
              { id: 'whatsapp', title: 'WhatsApp Puppet', icon: MessageSquare },
              { id: 'reviews', title: 'Review Puppet', icon: Star },
              { id: 'inventory', title: 'Inventory Puppet', icon: PackageCheck },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSimulation === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => triggerString(item.id)}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md scale-105'
                      : 'bg-[var(--bg-main)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* String Visual Tension Box */}
          <div className="p-6 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] relative overflow-hidden text-center space-y-4">
            
            <div className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase">
              Marionette String Tension Visualizer
            </div>

            {/* String Animation Element */}
            <div className="h-16 relative flex items-center justify-center">
              <div className={`w-[2px] h-full bg-[var(--primary)] transition-all duration-300 ${
                isPulling ? 'scale-y-125 opacity-100 shadow-[0_0_15px_var(--primary)]' : 'opacity-60'
              }`}>
                <div className={`w-3 h-3 rounded-full bg-[var(--primary)] absolute -top-1.5 -left-[5px] ${isPulling ? 'animate-ping' : ''}`}></div>
              </div>
            </div>

            <div className="text-xs font-semibold text-[var(--text-primary)]">
              {isPulling ? (
                <span className="text-[var(--primary)] font-bold animate-pulse">
                  ⚡ String Pulled! Executing background trigger...
                </span>
              ) : (
                <span>Click a puppet button above to test string tension</span>
              )}
            </div>

          </div>

          {/* Live Action Output Log */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-[10px] pb-1 border-b border-slate-800">
              <span>AUTOMATION ENGINE LOGS</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            {logs.map((log, idx) => (
              <div key={idx} className={`${idx === 0 ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>
                &gt; {log}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
