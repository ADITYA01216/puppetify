import React, { useState, useEffect } from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, Zap, CheckCircle2 } from 'lucide-react';

const PUPPET_SERVICES = [
  {
    id: 'website',
    title: 'Website & SEO',
    icon: Globe,
    badge: '100% Uptime',
    detail: 'Lead capture & live search indexing',
    pos: { left: '16%', top: '47%', width: '25%' },
    stringTop: { x: '29.5%', y: '30%' },
    stringCard: { x: '29.5%', y: '47%' }
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    icon: Calendar,
    badge: 'Zero Missed Slots',
    detail: 'Auto-confirm SMS & calendar lock',
    pos: { left: '44.5%', top: '47%', width: '25%' },
    stringTop: { x: '57%', y: '26%' },
    stringCard: { x: '57%', y: '47%' }
  },
  {
    id: 'ai',
    title: 'AI Automation Hub',
    icon: Bot,
    badge: '24/7 Autopilot',
    detail: 'Connecting 100+ business apps',
    pos: { left: '73%', top: '47%', width: '25%' },
    stringTop: { x: '85.5%', y: '23%' },
    stringCard: { x: '85.5%', y: '47%' }
  },
  {
    id: 'message',
    title: 'Message Responder',
    icon: MessageSquare,
    badge: 'Instant Reply',
    detail: '24/7 WhatsApp & DM auto-responder',
    pos: { left: '30.5%', top: '69%', width: '25%' },
    stringTop: { x: '43%', y: '30%' },
    stringCard: { x: '43%', y: '69%' }
  },
  {
    id: 'monitor',
    title: 'Monitor & Report',
    icon: BarChart3,
    badge: '99.9% Coverage',
    detail: 'Real-time performance & alert sync',
    pos: { left: '58.5%', top: '69%', width: '25%' },
    stringTop: { x: '71%', y: '25%' },
    stringCard: { x: '71%', y: '69%' }
  }
];

export default function HeroPhotorealisticInteractive({ onOpenAudit }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeAutoId, setActiveAutoId] = useState('ai');

  // Auto cycle active automation every 3 seconds if not hovered
  useEffect(() => {
    if (hoveredId) return;
    const ids = ['website', 'booking', 'ai', 'message', 'monitor'];
    const interval = setInterval(() => {
      setActiveAutoId(prev => {
        const nextIdx = (ids.indexOf(prev) + 1) % ids.length;
        return ids[nextIdx];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [hoveredId]);

  const currentActiveId = hoveredId || activeAutoId;

  return (
    <div className="relative w-full max-w-[720px] mx-auto select-none">
      
      {/* Base Layer: High-Res 3D Photorealistic Hand & Cards */}
      <img
        src="/assets/puppet_hero_complete.png"
        alt="Wooden puppet hand controlling service cards"
        className="w-full h-auto object-contain mix-blend-multiply"
        style={{ filter: 'contrast(1.05) saturate(1.1)' }}
      />

      {/* SVG Overlay: Animated Automation Data Pulses along strings */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        {PUPPET_SERVICES.map(srv => {
          const isActive = currentActiveId === srv.id;
          if (!isActive) return null;

          return (
            <g key={srv.id}>
              {/* Highlight active string line */}
              <line
                x1={srv.stringTop.x}
                y1={srv.stringTop.y}
                x2={srv.stringCard.x}
                y2={srv.stringCard.y}
                stroke="#c8a96e"
                strokeWidth="0.8"
                strokeDasharray="2,2"
                className="animate-pulse"
              />
              {/* Flowing energy dot along string */}
              <circle
                cx={srv.stringCard.x}
                cy={srv.stringCard.y}
                r="1.8"
                fill="#8c5e35"
                className="animate-ping"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Overlays over the 5 Wooden Cards */}
      {PUPPET_SERVICES.map(srv => {
        const Icon = srv.icon;
        const isActive = currentActiveId === srv.id;

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
              height: '24%'
            }}
          >
            {/* Interactive Card Hover & Lift state */}
            <div
              className={`w-full h-full rounded-2xl transition-all duration-300 flex flex-col items-center justify-center p-3 relative ${
                isActive
                  ? '-translate-y-3 shadow-2xl ring-2 ring-[#8c5e35]/60 bg-[#8c5e35]/15 backdrop-blur-[2px]'
                  : 'hover:-translate-y-1'
              }`}
            >
              {/* Status Badge popup floating right above the card */}
              {isActive && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#1a0f07] text-[#f5ebd9] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full shadow-2xl border border-[#c8a96e]/50 flex items-center gap-1.5 animate-bounce z-40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{srv.badge}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Floating Active Automation Bar at Bottom Right of Graphic */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#1a0f07]/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl border border-[#c8a96e]/40 shadow-2xl flex items-center gap-3 z-40 max-w-sm w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#8c5e35] text-white">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-[#f5ebd9]">
              {PUPPET_SERVICES.find(s => s.id === currentActiveId)?.title}
            </div>
            <div className="text-[10px] text-[#c8a96e] font-semibold">
              {PUPPET_SERVICES.find(s => s.id === currentActiveId)?.detail}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenAudit}
          className="text-[10px] font-extrabold px-3 py-1 rounded-lg bg-[#c8a96e] hover:bg-[#d8b97e] text-[#1a0f07] transition-all"
        >
          Deploy
        </button>
      </div>

    </div>
  );
}
