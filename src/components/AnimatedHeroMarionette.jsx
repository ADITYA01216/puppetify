import React, { useState } from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, Zap } from 'lucide-react';

const CARDS = [
  {
    id: 'website',
    title: 'Website & SEO',
    icon: Globe,
    badge: '100% Uptime',
    crossbarAnchorX: 20, // percentage on crossbar
    row: 1,
    col: 1,
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    icon: Calendar,
    badge: 'Zero Missed Slots',
    crossbarAnchorX: 50,
    row: 1,
    col: 2,
  },
  {
    id: 'ai',
    title: 'AI Automation Hub',
    icon: Bot,
    badge: '24/7 Autopilot',
    crossbarAnchorX: 80,
    row: 1,
    col: 3,
  },
  {
    id: 'message',
    title: 'Message Responder',
    icon: MessageSquare,
    badge: 'Instant Reply',
    crossbarAnchorX: 35,
    row: 2,
    col: 1,
  },
  {
    id: 'monitor',
    title: 'Monitor & Report',
    icon: BarChart3,
    badge: '99.9% Coverage',
    crossbarAnchorX: 65,
    row: 2,
    col: 2,
  },
];

export default function AnimatedHeroMarionette({ onOpenAudit }) {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Calculate crossbar tilt angle based on hovered card position
  let crossbarTilt = 0;
  if (hoveredCardId === 'website' || hoveredCardId === 'message') {
    crossbarTilt = -4.5;
  } else if (hoveredCardId === 'ai' || hoveredCardId === 'monitor') {
    crossbarTilt = 4.5;
  } else if (hoveredCardId === 'booking') {
    crossbarTilt = -1.5;
  }

  return (
    <div className="relative w-full max-w-[620px] mx-auto py-8 select-none">
      
      {/* ── 1. WOODEN HAND & CROSSBAR CONTROL ASSEMBLY ── */}
      <div 
        className="relative mx-auto w-[85%] h-14 transition-transform duration-500 ease-out z-20 flex items-center justify-center"
        style={{ transform: `rotate(${crossbarTilt}deg)` }}
      >
        {/* Wooden Hand Wrist graphic representation */}
        <div className="absolute -top-10 right-4 w-28 h-12 rounded-r-full bg-[#5c3a1e] border-2 border-[#3b2310] shadow-xl overflow-hidden hidden sm:block">
          <div className="w-full h-full opacity-30 bg-repeat" style={{ backgroundImage: "url('/assets/wood_bg.png')" }} />
          {/* Hand Joint carve lines */}
          <div className="absolute top-2 left-4 w-1 h-8 bg-[#3b2310] rounded-full" />
          <div className="absolute top-2 left-10 w-1 h-8 bg-[#3b2310] rounded-full" />
        </div>

        {/* Main Wooden Crossbar */}
        <div 
          className="w-full h-7 rounded-full relative flex items-center justify-between px-6 border-2 border-[#4a2e16] shadow-2xl overflow-hidden"
          style={{ 
            backgroundImage: "url('/assets/wood_bg.png')",
            backgroundSize: '350px',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset -2px -2px 4px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.25)'
          }}
        >
          {/* Grain texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#5c3a1e]/20 via-transparent to-[#5c3a1e]/20 pointer-events-none" />

          {/* Anchor Hook Rings where strings attach */}
          {[15, 35, 50, 65, 85].map((pct, i) => (
            <div 
              key={i} 
              className="w-3.5 h-3.5 rounded-full border-2 border-[#3b2310] bg-[#8c5e35] shadow-inner flex items-center justify-center z-10"
              style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#2b190c]" />
            </div>
          ))}
        </div>

        {/* Center Control Joint */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-6 h-6 rounded-full bg-[#3b2310] border border-[#8c5e35] shadow-md flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#c8a96e]" />
        </div>
      </div>

      {/* ── 2. SVG SUSPENDED MARIONETTE STRINGS ── */}
      <svg className="w-full h-[380px] absolute top-12 left-0 pointer-events-none z-10 overflow-visible">
        {/* Row 1 Strings */}
        {CARDS.slice(0, 3).map((card, idx) => {
          const isHovered = hoveredCardId === card.id;
          const startX = 15 + idx * 35; // %
          const endX = 16.6 + idx * 33.3; // %
          
          return (
            <g key={card.id}>
              {/* Rope line */}
              <line
                x1={`${startX}%`}
                y1="10"
                x2={`${endX}%`}
                y2={isHovered ? "65" : "75"}
                stroke={isHovered ? "#8c5e35" : "#a88863"}
                strokeWidth={isHovered ? "2.5" : "1.8"}
                strokeDasharray={isHovered ? "none" : "none"}
                className="transition-all duration-300"
              />

              {/* Glowing Pulse dot along string when hovered */}
              {isHovered && (
                <circle
                  cx={`${(startX + endX) / 2}%`}
                  cy="40"
                  r="4"
                  fill="#c8a96e"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* Row 2 Strings (hanging longer) */}
        {CARDS.slice(3).map((card, idx) => {
          const isHovered = hoveredCardId === card.id;
          const startX = 35 + idx * 30; // %
          const endX = 33 + idx * 34; // %
          
          return (
            <g key={card.id}>
              <line
                x1={`${startX}%`}
                y1="10"
                x2={`${endX}%`}
                y2={isHovered ? "200" : "215"}
                stroke={isHovered ? "#8c5e35" : "#a88863"}
                strokeWidth={isHovered ? "2.5" : "1.8"}
                className="transition-all duration-300"
              />

              {isHovered && (
                <circle
                  cx={`${(startX + endX) / 2}%`}
                  cy="110"
                  r="4"
                  fill="#c8a96e"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── 3. WOODEN SERVICE CARDS ASSEMBLY ── */}
      <div className="relative pt-10 z-20 space-y-6">

        {/* ROW 1: 3 Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 px-2">
          {CARDS.slice(0, 3).map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={onOpenAudit}
                className={`relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 border-2 select-none ${
                  isHovered
                    ? '-translate-y-4 scale-105 shadow-2xl border-[#8c5e35]'
                    : 'translate-y-0 border-[#7c542b]/40 shadow-lg hover:-translate-y-1'
                }`}
                style={{
                  backgroundImage: "url('/assets/wood_bg.png')",
                  backgroundSize: '280px',
                  minHeight: '145px',
                  boxShadow: isHovered
                    ? 'inset 0 3px 6px rgba(255,255,255,0.8), inset -3px -3px 6px rgba(0,0,0,0.3), 0 20px 30px rgba(43,26,14,0.35)'
                    : 'inset 0 3px 6px rgba(255,255,255,0.7), inset -3px -3px 6px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.18)',
                  animation: `marionetteSway 4s ease-in-out infinite ${idx * 0.6}s`
                }}
              >
                {/* Rope Grommet Hole at top center */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#2b190c] border-2 border-[#c8a96e] shadow-inner flex items-center justify-center -mt-1 mb-1">
                  <div className="w-1 h-1 rounded-full bg-[#c8a96e]" />
                </div>

                {/* Carved Wooden Icon */}
                <div className={`p-2 rounded-xl transition-transform ${isHovered ? 'scale-110 text-[#5c3a1e]' : 'text-[#3b2310]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                </div>

                {/* Carved Wood Label */}
                <div className="font-extrabold text-xs sm:text-sm text-[#2b190c] tracking-tight leading-tight mb-1" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
                  {card.title}
                </div>

                {/* Status Badge */}
                {isHovered ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2b190c] text-[#c8a96e] border border-[#c8a96e]/40 animate-pulse">
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

        {/* ROW 2: 2 Cards Centered */}
        <div className="grid grid-cols-2 gap-4 px-12 sm:px-16 max-w-md mx-auto">
          {CARDS.slice(3).map((card, idx) => {
            const Icon = card.icon;
            const isHovered = hoveredCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={onOpenAudit}
                className={`relative rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 border-2 select-none ${
                  isHovered
                    ? '-translate-y-4 scale-105 shadow-2xl border-[#8c5e35]'
                    : 'translate-y-0 border-[#7c542b]/40 shadow-lg hover:-translate-y-1'
                }`}
                style={{
                  backgroundImage: "url('/assets/wood_bg.png')",
                  backgroundSize: '280px',
                  minHeight: '145px',
                  boxShadow: isHovered
                    ? 'inset 0 3px 6px rgba(255,255,255,0.8), inset -3px -3px 6px rgba(0,0,0,0.3), 0 20px 30px rgba(43,26,14,0.35)'
                    : 'inset 0 3px 6px rgba(255,255,255,0.7), inset -3px -3px 6px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.18)',
                  animation: `marionetteSway 4.5s ease-in-out infinite ${(idx + 3) * 0.5}s`
                }}
              >
                {/* Rope Hole */}
                <div className="w-3.5 h-3.5 rounded-full bg-[#2b190c] border-2 border-[#c8a96e] shadow-inner flex items-center justify-center -mt-1 mb-1">
                  <div className="w-1 h-1 rounded-full bg-[#c8a96e]" />
                </div>

                {/* Carved Icon */}
                <div className={`p-2 rounded-xl transition-transform ${isHovered ? 'scale-110 text-[#5c3a1e]' : 'text-[#3b2310]'}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                </div>

                {/* Title */}
                <div className="font-extrabold text-xs sm:text-sm text-[#2b190c] tracking-tight leading-tight mb-1" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.4)' }}>
                  {card.title}
                </div>

                {/* Badge */}
                {isHovered ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2b190c] text-[#c8a96e] border border-[#c8a96e]/40 animate-pulse">
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

      {/* Sway Keyframes Animation Styles */}
      <style>{`
        @keyframes marionetteSway {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(0.6deg); }
        }
      `}</style>

    </div>
  );
}
