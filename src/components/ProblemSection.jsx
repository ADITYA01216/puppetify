import React from 'react';
import { Clock, CheckCircle2, XCircle, ArrowRight, Zap, Globe, Lock } from 'lucide-react';

export default function ProblemSection({ onAction }) {
  return (
    <section id="problem" className="py-24 relative overflow-hidden scroll-mt-24" style={{ backgroundColor: 'var(--bg-deep)' }}>
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Stop Pulling Every String <span className="gold-text">By Hand</span>.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#F7EFE7]">
            As a business owner, you spend up to <strong className="text-[#F7CE55] font-bold">18 hours every single week</strong> manually managing reservations, answering WhatsApp messages, asking for Google reviews, and chasing inventory alerts.
          </p>
        </div>

        {/* MacBook Laptop Screen Mockup */}
        <div className="max-w-5xl mx-auto relative pt-2 pb-6">
          
          {/* MacBook Outer Display Bezel */}
          <div 
            className="relative rounded-t-[20px] sm:rounded-t-[32px] bg-[#0E0E10] border-[4px] sm:border-[10px] border-[#1C1D21] p-1 sm:p-3"
            style={{
              boxShadow: '0 30px 70px -12px rgba(0, 0, 0, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Top Camera Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-36 h-3 sm:h-4.5 bg-[#1C1D21] rounded-b-xl flex items-center justify-center gap-2 z-30">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#090A0C] border border-[#2A2B30]" />
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#152438]" />
            </div>

            {/* macOS Browser Header Bar */}
            <div className="bg-[#181512] rounded-t-xl px-2.5 sm:px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs text-white/70 select-none z-20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-[#2B231D] px-2.5 sm:px-4 py-1 rounded-md text-[10px] sm:text-[11px] text-white/80 font-mono border border-white/10 max-w-[210px] sm:max-w-none overflow-hidden text-ellipsis whitespace-nowrap">
                <Lock className="w-3 h-3 text-[#C49A6C] shrink-0" />
                <span className="text-[#C49A6C] shrink-0">https://</span>
                <span className="font-bold text-white shrink-0">puppetify.com</span>
                <span className="text-white/40 truncate hidden xs:inline">/autopilot-comparison</span>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[10px] font-mono text-white/50">
                <span>macOS Autopilot OS</span>
              </div>
            </div>

            {/* Laptop Display Content Viewport */}
            <div className="bg-[#120A04] p-3.5 sm:p-8 rounded-b-xl border-t border-white/5 relative">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Connecting VS Badge */}
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-9 h-9 rounded-full bg-[#24150A] border border-amber-500/40 shadow-xl flex items-center justify-center text-[#F7CE55] font-mono text-xs font-bold">
                    VS
                  </div>
                </div>

                {/* Card 1: The Manual Way */}
                <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.04)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold">
                        <XCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                          The Manual Way
                        </h3>
                        <span className="text-[11px] text-red-400 font-semibold">Owner Pulls Every String</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-red-500/10 text-red-300 px-2.5 py-1 rounded-full border border-red-500/20">
                      18 hrs/week lost
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Manually answering table booking calls during peak kitchen hours</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Forgetting to send follow-up WhatsApp messages to gym leads</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Zero automated Google review requests after customer visits</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>Running out of popular book stock or coffee beans unexpectedly</span>
                    </li>
                  </ul>

                  <div className="pt-3 border-t border-red-500/20 text-[11px] text-red-400 font-semibold flex items-center justify-between">
                    <span>Result: Burnout & missed revenue</span>
                    <span className="font-mono">High Stress</span>
                  </div>
                </div>

                {/* Card 2: The Puppetify Autopilot Way */}
                <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-5 relative overflow-hidden" style={{ border: '1px solid rgba(247, 206, 85, 0.4)', backgroundColor: 'rgba(247, 206, 85, 0.05)', boxShadow: '0 0 30px rgba(247, 206, 85, 0.08)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#F7CE55] flex items-center justify-center font-bold">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                          The Puppetify Way
                        </h3>
                        <span className="text-[11px] text-[#F7CE55] font-semibold">Strings Pull Themselves 24/7</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-[#F7CE55] px-2.5 py-1 rounded-full border border-amber-500/30">
                      0 hrs manual work
                    </span>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Instant 24/7 online table reservation widget with auto SMS confirmation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Automated WhatsApp pings for membership pass reminders & order updates</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Smart 1-click Google review requests sent automatically 2 hrs post-purchase</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Real-time inventory alerts sent straight to supplier & kitchen manager</span>
                    </li>
                  </ul>

                  <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-[#F7CE55] font-semibold">
                    <span>Result: Reclaim 18 hrs & double reviews</span>
                    <span className="font-mono">100% Autopilot</span>
                  </div>
                </div>

              </div>

              {/* macOS Bottom Dock Bar */}
              <div className="mt-6 sm:mt-8 flex justify-center w-full">
                <div className="max-w-[98%] overflow-x-auto rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 p-1.5 sm:p-2 shadow-2xl flex items-center justify-center">
                  <img 
                    src="/assets/macos_dock.png" 
                    alt="macOS Dock Bar" 
                    className="h-9 sm:h-11 w-auto object-contain rounded-lg"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Laptop Aluminum Stand Base */}
          <div 
            className="h-3.5 sm:h-5 bg-gradient-to-r from-[#707275] via-[#C8C9CC] to-[#707275] rounded-b-xl sm:rounded-b-2xl shadow-2xl relative flex justify-center border-t border-[#8E9093]"
          >
            {/* Thumb Groove Notch */}
            <div className="w-20 sm:w-28 h-1.5 sm:h-2 bg-[#4A4B4E] rounded-b-md" />
          </div>

          {/* Floor Shadow */}
          <div className="w-[92%] mx-auto h-4 bg-black/70 blur-md rounded-full mt-0.5" />

        </div>

      </div>
    </section>
  );
}
