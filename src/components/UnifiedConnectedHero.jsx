import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, Zap } from 'lucide-react';

const SERVICES = [
  {
    id: 'website',
    title: 'Website & SEO',
    icon: Globe,
    badge: '100% Uptime',
    detail: 'Lead capture & live search indexing',
    pos: { left: '16.5%', top: '48%', width: '25%', height: '23%' },
    stringKnot: { x: 29.5, y: 33 },
    stringCard: { x: 29.5, y: 48 }
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    icon: Calendar,
    badge: 'Zero Missed Slots',
    detail: 'Auto-confirm SMS & calendar lock',
    pos: { left: '44.5%', top: '48%', width: '25%', height: '23%' },
    stringKnot: { x: 56.5, y: 29 },
    stringCard: { x: 56.5, y: 48 }
  },
  {
    id: 'ai',
    title: 'AI Automation Hub',
    icon: Bot,
    badge: '24/7 Autopilot',
    detail: 'Connecting 100+ business apps',
    pos: { left: '72.5%', top: '48%', width: '25%', height: '23%' },
    stringKnot: { x: 85.5, y: 25 },
    stringCard: { x: 85.5, y: 48 }
  },
  {
    id: 'message',
    title: 'Message Responder',
    icon: MessageSquare,
    badge: 'Instant Reply',
    detail: '24/7 WhatsApp & DM auto-responder',
    pos: { left: '30.5%', top: '69%', width: '25%', height: '23%' },
    stringKnot: { x: 43.5, y: 32 },
    stringCard: { x: 43.5, y: 69 }
  },
  {
    id: 'monitor',
    title: 'Monitor & Report',
    icon: BarChart3,
    badge: '99.9% Coverage',
    detail: 'Real-time performance & alert sync',
    pos: { left: '58.5%', top: '69%', width: '25%', height: '23%' },
    stringKnot: { x: 71.5, y: 27 },
    stringCard: { x: 71.5, y: 69 }
  }
];

export default function UnifiedConnectedHero({ onOpenAudit }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAutoId, setActiveAutoId] = useState('ai');

  // Auto-cycle active card every 3 seconds if not hovered
  useEffect(() => {
    if (hoveredId) return;
    const ids = SERVICES.map(s => s.id);
    const interval = setInterval(() => {
      setActiveAutoId(prev => {
        const nextIdx = (ids.indexOf(prev) + 1) % ids.length;
        return ids[nextIdx];
      });
    }, 3200);
    return () => clearInterval(interval);
  }, [hoveredId]);

  const activeId = hoveredId || activeAutoId;
  const currentService = SERVICES.find(s => s.id === activeId) || SERVICES[2];

  return (
    <div className="relative w-full max-w-[720px] mx-auto select-none">
      
      {/* ── 1. MASTER PHOTOREALISTIC GRAPHIC (HAND + CROSSBAR + STRINGS + CARDS) ── */}
      {/* mix-blend-multiply directly on section background completely removes white background */}
      <img
        src="/assets/puppet_hero_complete.png"
        alt="Wooden puppet hand controlling automation cards"
        className="w-full h-auto object-contain mix-blend-multiply block"
        style={{ filter: 'contrast(1.06) saturate(1.1)' }}
      />

      {/* ── 2. ANIMATED SVG AUTOMATION DATA PULSES ALONG THE REAL CONNECTED STRINGS ── */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-20" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {SERVICES.map((srv) => {
          const isActive = activeId === srv.id;
          if (!isActive) return null;

          return (
            <g key={srv.id}>
              {/* Highlight line overlaid on string */}
              <line
                x1={`${srv.stringKnot.x}%`}
                y1={`${srv.stringKnot.y}%`}
                x2={`${srv.stringCard.x}%`}
                y2={`${srv.stringCard.y}%`}
                stroke="#8c5e35"
                strokeWidth="1.2"
                strokeDasharray="2,2"
                className="animate-pulse"
              />
              {/* Glowing energy dot traveling down string */}
              <circle
                cx={`${srv.stringCard.x}%`}
                cy={`${(srv.stringKnot.y + srv.stringCard.y) / 2}%`}
                r="1.6"
                fill="#8c5e35"
                className="animate-ping"
              />
            </g>
          );
        })}
      </svg>

      {/* ── 3. INTERACTIVE CARDS & FLOATING STATUS BADGES OVERLAID EXACTLY ON CARDS ── */}
      {SERVICES.map((srv) => {
        const isActive = activeId === srv.id;

        return (
          <div
            key={srv.id}
            onMouseEnter={() => setHoveredId(srv.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={onOpenAudit}
            className="absolute cursor-pointer z-30 transition-all duration-300 group"
            style={{
              left: srv.pos.left,
              top: srv.pos.top,
              width: srv.pos.width,
              height: srv.pos.height,
            }}
          >
            {/* Hover Lift & Glow Highlight */}
            <div
              className={`w-full h-full rounded-2xl transition-all duration-300 relative flex items-center justify-center ${
                isActive
                  ? '-translate-y-3.5 shadow-2xl ring-4 ring-[#8c5e35]/50 bg-[#8c5e35]/10'
                  : 'hover:-translate-y-1.5'
              }`}
            >
              {/* Live Status Badge floating right above the card */}
              {isActive && (
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1c1209] text-[#f5ebd9] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full shadow-2xl border border-[#c8a96e]/50 flex items-center gap-1.5 animate-bounce z-40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{srv.badge}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* ── 4. LIVE AUTOMATION EXECUTION BAR AT BOTTOM ── */}
      <div className="mt-4 mx-auto max-w-md bg-[#1c1209]/95 text-white p-3 rounded-2xl border border-[#c8a96e]/40 shadow-2xl flex items-center justify-between gap-3 z-40 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#8c5e35] text-white">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-black text-[#f5ebd9]">
              {currentService.title}
            </div>
            <div className="text-[10px] text-[#c8a96e] font-semibold">
              ⚡ {currentService.detail}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAudit}
          className="text-[10px] font-extrabold px-3 py-1.5 rounded-xl bg-[#c8a96e] hover:bg-[#d8b97e] text-[#1c1209] transition-all shadow-md shrink-0"
        >
          Automate
        </button>
      </div>

    </div>
  );
}
