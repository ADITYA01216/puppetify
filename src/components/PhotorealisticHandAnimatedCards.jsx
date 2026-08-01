import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, Zap } from 'lucide-react';

const CARDS_DATA = [
  {
    id: 'website',
    title: 'Website & SEO',
    icon: Globe,
    badge: '100% Uptime',
    subText: 'Auto-syncing leads 24/7',
    anchorX: 23, // % position on crossbar
    cardX: 18,
    cardY: 46,
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    icon: Calendar,
    badge: 'Zero Missed Slots',
    subText: 'SMS & calendar lock',
    anchorX: 47,
    cardX: 47,
    cardY: 46,
  },
  {
    id: 'ai',
    title: 'AI Automation Hub',
    icon: Bot,
    badge: '24/7 Autopilot',
    subText: '100+ app integrations',
    anchorX: 74,
    cardX: 76,
    cardY: 46,
  },
  {
    id: 'message',
    title: 'Message Responder',
    icon: MessageSquare,
    badge: 'Instant Reply',
    subText: 'WhatsApp & DM autopilot',
    anchorX: 36,
    cardX: 32.5,
    cardY: 74,
  },
  {
    id: 'monitor',
    title: 'Monitor & Report',
    icon: BarChart3,
    badge: '99.9% Coverage',
    subText: 'Uptime & review engine',
    anchorX: 62,
    cardX: 61.5,
    cardY: 74,
  },
];

export default function PhotorealisticHandAnimatedCards({ onOpenAudit }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAutoId, setActiveAutoId] = useState('ai');

  // Auto-cycle active card every 3.2 seconds if not hovered
  useEffect(() => {
    if (hoveredId) return;
    const ids = CARDS_DATA.map(c => c.id);
    const interval = setInterval(() => {
      setActiveAutoId(prev => {
        const nextIdx = (ids.indexOf(prev) + 1) % ids.length;
        return ids[nextIdx];
      });
    }, 3200);
    return () => clearInterval(interval);
  }, [hoveredId]);

  const activeId = hoveredId || activeAutoId;

  // Calculate tilt angle of photorealistic hand & crossbar based on active card
  let handRotate = 0;
  if (activeId === 'website' || activeId === 'message') handRotate = -3.5;
  else if (activeId === 'ai' || activeId === 'monitor') handRotate = 3.5;
  else if (activeId === 'booking') handRotate = -1;

  return (
    <div className="relative w-full max-w-[680px] mx-auto py-4 select-none">
      
      {/* ── 1. ORIGINAL PHOTOREALISTIC 3D WOODEN MANNEQUIN HAND & CROSSBAR ── */}
      <div 
        className="relative w-full h-[170px] transition-transform duration-500 ease-out z-20 pointer-events-none"
        style={{ transform: `rotate(${handRotate}deg)` }}
      >
        {/* Render photorealistic 3D image clipped with CSS clip-path to eliminate any white boxes */}
        <img
          src="/assets/puppet_hero_complete.png"
          alt="3D Wooden mannequin hand and marionette crossbar"
          className="w-full h-auto mix-blend-multiply block"
          style={{ 
            clipPath: 'inset(0% 0% 58% 0%)',
            filter: 'contrast(1.08) saturate(1.1)',
            transform: 'translateY(-2%)'
          }}
        />
      </div>

      {/* ── 2. SVG ROPE STRINGS WITH FLOWING PULSES ── */}
      <svg 
        className="w-full h-[380px] absolute top-[135px] left-0 pointer-events-none z-10 overflow-visible" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {CARDS_DATA.map((card) => {
          const isActive = activeId === card.id;

          return (
            <g key={card.id}>
              {/* String line from crossbar down to card */}
              <line
                x1={`${card.anchorX}%`}
                y1="0"
                x2={`${card.cardX}%`}
                y2={`${card.cardY}%`}
                stroke={isActive ? "#8c5e35" : "#a88863"}
                strokeWidth={isActive ? "1.4" : "0.9"}
                className="transition-all duration-300"
              />

              {/* Glowing energy pulse along active string */}
              {isActive && (
                <circle
                  cx={`${(card.anchorX + card.cardX) / 2}%`}
                  cy={`${card.cardY / 2}%`}
                  r="1.8"
                  fill="#8c5e35"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── 3. THE 5 ANIMATED WOODEN CARDS (APPROVED BY USER) ── */}
      <div className="relative pt-2 z-20 space-y-6">

        {/* ROW 1: 3 CARDS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 px-2">
          {CARDS_DATA.slice(0, 3).map((card, idx) => {
            const Icon = card.icon;
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={onOpenAudit}
                className={`relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 border-2 select-none ${
                  isActive
                    ? '-translate-y-4 scale-105 shadow-2xl border-[#8c5e35] ring-4 ring-[#8c5e35]/30'
                    : 'translate-y-0 border-[#6b4725]/40 shadow-xl hover:-translate-y-1'
                }`}
                style={{
                  backgroundImage: "url('/assets/wood_bg.png')",
                  backgroundSize: '280px',
                  minHeight: '145px',
                  boxShadow: isActive
                    ? 'inset 0 3px 6px rgba(255,255,255,0.85), inset -3px -3px 6px rgba(0,0,0,0.35), 0 20px 35px rgba(43,26,14,0.35)'
                    : 'inset 0 3px 6px rgba(255,255,255,0.7), inset -3px -3px 6px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.18)',
                  animation: `marionetteFloat 4s ease-in-out infinite ${idx * 0.6}s`
                }}
              >
                {/* Brass Grommet Rope Ring at Top Center */}
                <div className="w-4 h-4 rounded-full bg-[#2b190c] border-2 border-[#c8a96e] shadow-inner flex items-center justify-center -mt-1.5 mb-1 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                </div>

                {/* Carved Wooden Icon */}
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'scale-110 text-[#5c3a1e]' : 'text-[#3b2310]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                </div>

                {/* Carved Wood Title */}
                <div className="font-extrabold text-xs sm:text-sm text-[#2b190c] tracking-tight leading-tight mb-1" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
                  {card.title}
                </div>

                {/* Live Status Badge */}
                {isActive ? (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#2b190c] text-[#c8a96e] border border-[#c8a96e]/50 animate-bounce">
                    ⚡ {card.badge}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-[#6b4725] opacity-80">
                    {card.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ROW 2: 2 CARDS CENTERED */}
        <div className="grid grid-cols-2 gap-4 px-12 sm:px-16 max-w-md mx-auto">
          {CARDS_DATA.slice(3).map((card, idx) => {
            const Icon = card.icon;
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={onOpenAudit}
                className={`relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 border-2 select-none ${
                  isActive
                    ? '-translate-y-4 scale-105 shadow-2xl border-[#8c5e35] ring-4 ring-[#8c5e35]/30'
                    : 'translate-y-0 border-[#6b4725]/40 shadow-xl hover:-translate-y-1'
                }`}
                style={{
                  backgroundImage: "url('/assets/wood_bg.png')",
                  backgroundSize: '280px',
                  minHeight: '145px',
                  boxShadow: isActive
                    ? 'inset 0 3px 6px rgba(255,255,255,0.85), inset -3px -3px 6px rgba(0,0,0,0.35), 0 20px 35px rgba(43,26,14,0.35)'
                    : 'inset 0 3px 6px rgba(255,255,255,0.7), inset -3px -3px 6px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.18)',
                  animation: `marionetteFloat 4.5s ease-in-out infinite ${(idx + 3) * 0.5}s`
                }}
              >
                {/* Brass Grommet Ring */}
                <div className="w-4 h-4 rounded-full bg-[#2b190c] border-2 border-[#c8a96e] shadow-inner flex items-center justify-center -mt-1.5 mb-1 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                </div>

                {/* Icon */}
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'scale-110 text-[#5c3a1e]' : 'text-[#3b2310]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                </div>

                {/* Title */}
                <div className="font-extrabold text-xs sm:text-sm text-[#2b190c] tracking-tight leading-tight mb-1" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
                  {card.title}
                </div>

                {/* Badge */}
                {isActive ? (
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#2b190c] text-[#c8a96e] border border-[#c8a96e]/50 animate-bounce">
                    ⚡ {card.badge}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-[#6b4725] opacity-80">
                    {card.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Automation Execution Bar */}
      <div className="mt-6 mx-auto max-w-sm bg-[#2b190c] text-white p-3.5 rounded-2xl border border-[#c8a96e]/40 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#8c5e35] text-white">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-[#f5ebd9]">
              {CARDS_DATA.find(c => c.id === activeId)?.title}
            </div>
            <div className="text-[10px] text-[#c8a96e] font-semibold">
              {CARDS_DATA.find(c => c.id === activeId)?.subText}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAudit}
          className="text-[10px] font-extrabold px-3 py-1.5 rounded-xl bg-[#8c5e35] hover:bg-[#a37042] text-white transition-all shadow-md shrink-0"
        >
          Automate
        </button>
      </div>

      {/* Sway Keyframes Animation Styles */}
      <style>{`
        @keyframes marionetteFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(0.8deg); }
        }
      `}</style>

    </div>
  );
}
