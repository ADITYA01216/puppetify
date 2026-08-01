import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, Zap } from 'lucide-react';

const CARDS_DATA = [
  {
    id: 'website',
    title: 'Website & SEO',
    icon: Globe,
    badge: '100% Uptime',
    subText: 'Auto-syncing leads 24/7',
    row: 1,
    col: 1,
    anchorX: 20, // percentage position on crossbar
    cardX: 18,
    cardY: 42,
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    icon: Calendar,
    badge: 'Zero Missed Slots',
    subText: 'SMS & calendar lock',
    row: 1,
    col: 2,
    anchorX: 45,
    cardX: 47,
    cardY: 42,
  },
  {
    id: 'ai',
    title: 'AI Automation Hub',
    icon: Bot,
    badge: '24/7 Autopilot',
    subText: '100+ app integrations',
    row: 1,
    col: 3,
    anchorX: 75,
    cardX: 76,
    cardY: 42,
  },
  {
    id: 'message',
    title: 'Message Responder',
    icon: MessageSquare,
    badge: 'Instant Reply',
    subText: 'WhatsApp & DM autopilot',
    row: 2,
    col: 1,
    anchorX: 32,
    cardX: 32.5,
    cardY: 72,
  },
  {
    id: 'monitor',
    title: 'Monitor & Report',
    icon: BarChart3,
    badge: '99.9% Coverage',
    subText: 'Uptime & review engine',
    row: 2,
    col: 2,
    anchorX: 62,
    cardX: 61.5,
    cardY: 72,
  },
];

export default function Pure3DAnimatedMarionette({ onOpenAudit }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAutoId, setActiveAutoId] = useState('ai');

  // Auto-cycle through cards when not hovered
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

  // Calculate tilt angle of crossbar based on active card position
  let crossbarRotate = 0;
  if (activeId === 'website' || activeId === 'message') crossbarRotate = -4;
  else if (activeId === 'ai' || activeId === 'monitor') crossbarRotate = 4;
  else if (activeId === 'booking') crossbarRotate = -1;

  return (
    <div className="relative w-full max-w-[650px] mx-auto py-6 select-none">
      
      {/* ── 1. 3D VECTOR WOODEN MANNEQUIN HAND & CROSSBAR (PURE SVG) ── */}
      <div 
        className="relative w-full h-32 transition-transform duration-500 ease-out z-20"
        style={{ transform: `rotate(${crossbarRotate}deg)` }}
      >
        <svg viewBox="0 0 650 160" className="w-full h-full overflow-visible">
          <defs>
            {/* Wood Gradients for realistic 3D shading */}
            <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a37042" />
              <stop offset="50%" stopColor="#7c4a1e" />
              <stop offset="100%" stopColor="#4a2c11" />
            </linearGradient>

            <linearGradient id="woodBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c8a96e" />
              <stop offset="40%" stopColor="#8c5e35" />
              <stop offset="100%" stopColor="#3b2310" />
            </linearGradient>

            <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5e096" />
              <stop offset="50%" stopColor="#c89b3c" />
              <stop offset="100%" stopColor="#7a5a18" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#1a0f07" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* WOODEN MANNEQUIN HAND EXTENDING FROM RIGHT */}
          <g filter="url(#shadow3d)">
            {/* Wrist / Arm cylinder */}
            <path
              d="M 520,0 L 650,25 L 650,75 L 530,55 Z"
              fill="url(#woodGradient)"
              stroke="#3b2310"
              strokeWidth="2"
            />
            {/* Wrist Joint Sphere */}
            <circle cx="525" cy="38" r="22" fill="#8c5e35" stroke="#3b2310" strokeWidth="2.5" />
            <circle cx="525" cy="38" r="8" fill="#4a2c11" />

            {/* Palm */}
            <path
              d="M 450,25 Q 510,15 520,38 Q 510,65 440,55 Z"
              fill="url(#woodGradient)"
              stroke="#3b2310"
              strokeWidth="2"
            />

            {/* Jointed Wooden Fingers wrapped over the crossbar */}
            {/* Finger 1 */}
            <rect x="420" y="22" width="38" height="14" rx="7" fill="url(#woodBarGradient)" stroke="#2b190c" strokeWidth="2" />
            {/* Finger 2 */}
            <rect x="430" y="38" width="42" height="14" rx="7" fill="url(#woodBarGradient)" stroke="#2b190c" strokeWidth="2" />
            {/* Finger 3 */}
            <rect x="445" y="54" width="36" height="13" rx="6.5" fill="url(#woodBarGradient)" stroke="#2b190c" strokeWidth="2" />
            {/* Thumb wrapped from under */}
            <path d="M 470,62 Q 450,80 435,72 Q 425,60 445,52 Z" fill="url(#woodGradient)" stroke="#2b190c" strokeWidth="2" />
          </g>

          {/* MAIN HORIZONTAL WOODEN CROSSBAR CONTROLLER */}
          <g filter="url(#shadow3d)">
            {/* Main Bar */}
            <rect
              x="60"
              y="40"
              width="500"
              height="24"
              rx="12"
              fill="url(#woodBarGradient)"
              stroke="#2b190c"
              strokeWidth="2.5"
            />

            {/* Bevel highlight along top edge of crossbar */}
            <line x1="72" y1="44" x2="548" y2="44" stroke="#f5ebd9" strokeWidth="1.5" opacity="0.6" />

            {/* Center Pivot Joint Ring */}
            <circle cx="310" cy="52" r="12" fill="url(#brassGradient)" stroke="#2b190c" strokeWidth="2" />
            <circle cx="310" cy="52" r="5" fill="#2b190c" />

            {/* 5 Brass Attachment Rings for Marionette Strings */}
            {[130, 245, 310, 400, 500].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy="52" r="7" fill="url(#brassGradient)" stroke="#2b190c" strokeWidth="1.5" />
                <circle cx={cx} cy="52" r="3" fill="#2b190c" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* ── 2. SVG MARIONETTE ROPE STRINGS WITH FLOWING PULSES ── */}
      <svg className="w-full h-[380px] absolute top-16 left-0 pointer-events-none z-10 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {CARDS_DATA.map((card) => {
          const isActive = activeId === card.id;

          return (
            <g key={card.id}>
              {/* Main rope string line */}
              <line
                x1={`${card.anchorX}%`}
                y1="12"
                x2={`${card.cardX}%`}
                y2={`${card.cardY}%`}
                stroke={isActive ? "#8c5e35" : "#b0916e"}
                strokeWidth={isActive ? "1.2" : "0.7"}
                strokeDasharray={isActive ? "none" : "none"}
                className="transition-all duration-300"
              />

              {/* Animated data pulse along the string when active */}
              {isActive && (
                <circle
                  cx={`${(card.anchorX + card.cardX) / 2}%`}
                  cy={`${(12 + card.cardY) / 2}%`}
                  r="1.8"
                  fill="#8c5e35"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── 3. 5 SUSPENDED 3D WOODEN SERVICE CARDS (EXACT 2-ROW LAYOUT) ── */}
      <div className="relative pt-6 z-20 space-y-6">

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
