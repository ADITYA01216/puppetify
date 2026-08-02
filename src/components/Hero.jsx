import React from 'react';
import { ArrowRight, Wrench, Lock, Clock } from 'lucide-react';

const STRING_PATHS = [
  { id: 1, startX: 29.8, startY: 33.2, endX: 29.8, endY: 47.8, label: 'SEO Engine' },
  { id: 2, startX: 50.8, startY: 29.2, endX: 50.8, endY: 47.8, label: 'Booking' },
  { id: 3, startX: 72.8, startY: 25.2, endX: 72.8, endY: 47.8, label: 'AI Hub' },
  { id: 4, startX: 42.2, startY: 32.2, endX: 40.5, endY: 72.2, label: 'Messaging' },
  { id: 5, startX: 63.2, startY: 27.2, endX: 61.5, endY: 72.2, label: 'Monitor' },
];

export default function Hero({ onAction }) {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center pt-16 pb-12"
      style={{ backgroundImage: "url('/assets/wood_bg.png')" }}
    >
      {/* ── OPTION 3: THEATER STAGE SPOTLIGHT VIGNETTE & WOODEN ARCH TRIM ── */}
      
      {/* Soft Cinematic Stage Spotlight Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(255, 245, 225, 0.45) 0%, rgba(230, 200, 160, 0.15) 50%, rgba(43, 26, 14, 0.25) 100%)'
        }}
      />

      {/* Left Stage Pillar Arch Molding Accent */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-16 xl:w-24 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 800" fill="none">
          <path d="M 0,0 C 40,200 40,600 0,800 L 0,0 Z" fill="#3a2212" />
          <path d="M 0,0 C 30,200 30,600 0,800" stroke="#8c5e35" strokeWidth="3" fill="none" />
          <line x1="12" y1="100" x2="12" y2="700" stroke="#f5e096" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
        </svg>
      </div>

      {/* Right Stage Pillar Arch Molding Accent */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-16 xl:w-24 pointer-events-none z-0 opacity-40">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 800" fill="none">
          <path d="M 100,0 C 60,200 60,600 100,800 L 100,0 Z" fill="#3a2212" />
          <path d="M 100,0 C 70,200 70,600 100,800" stroke="#8c5e35" strokeWidth="3" fill="none" />
          <line x1="88" y1="100" x2="88" y2="700" stroke="#f5e096" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
        </svg>
      </div>

      {/* ── #3: FAINT CARVED WOOD CIRCUIT BACKGROUND LAYER ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="woodCircuitPattern" width="220" height="220" patternUnits="userSpaceOnUse">
          <path
            d="M 20,40 L 90,40 L 120,70 L 190,70 M 50,120 L 120,120 L 150,150 L 200,150 M 90,20 L 90,60 M 140,120 L 140,180"
            fill="none"
            stroke="#5c3a1e"
            strokeWidth="1.2"
            strokeDasharray="4,4"
          />
          <circle cx="90" cy="40" r="3" fill="#8c5e35" />
          <circle cx="120" cy="70" r="3" fill="#8c5e35" />
          <circle cx="120" cy="120" r="3" fill="#8c5e35" />
          <circle cx="150" cy="150" r="3" fill="#8c5e35" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#woodCircuitPattern)" />
      </svg>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between min-h-screen relative z-10">

        {/* ── LEFT CONTENT (HERO COPY & CTAS) ── */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center py-12 lg:py-20">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full mb-8 shadow-sm"
            style={{ backgroundColor: 'rgba(250,244,234,0.92)', border: '1px solid rgba(180,140,90,0.4)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c5e35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5c3a1e]"></span>
            </span>
            <span className="text-sm font-semibold text-[#2b1a0e]">Automate. Orchestrate. Repeat.</span>
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
            <span className="block text-[#1a0f07]">We sell automations,</span>
            <span className="block" style={{ color: '#7c4a1e' }}>what we call puppets.</span>
          </h1>

          {/* Sub-copy */}
          <p className="text-[#4a3520] text-lg leading-relaxed mb-10 max-w-md font-medium">
            Puppetify gives you full control over your automations.
            Connect apps, build workflows, and automate
            anything—your way.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#workflows"
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-base text-white transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#1c1209' }}>
              Explore Workflows <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#problem"
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-base text-[#1c1209] border-2 border-[#1c1209] bg-transparent transition-all hover:bg-[rgba(28,18,9,0.06)]">
              Why Puppetify
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 text-[#5c3a1e] text-sm font-semibold">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4 opacity-70" />
              Custom engineered for you
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 opacity-70" />
              100% data privacy
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 opacity-70" />
              24/7 Autopilot monitoring
            </div>
          </div>
        </div>

        {/* ── RIGHT CONTENT — True Native Transparent PNG + Ports & Pulses ── */}
        <div className="w-full lg:w-[52%] flex items-center justify-center relative mt-6 lg:mt-0 select-none will-change-transform">
          <div className="relative w-full max-w-[720px]" style={{ transform: 'translateZ(0)' }}>
            
            {/* True Transparent PNG (0% White Background) */}
            <img
              src="/assets/puppet_hero_transparent.png"
              alt="Wooden puppet hand controlling automation cards"
              className="w-full h-auto object-contain block relative z-10"
              style={{ transform: 'translateZ(0)' }}
            />

            {/* SVG OVERLAY: #1 STRING DATA PULSES & #5 PRECISELY ALIGNED CONNECTOR PORTS */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Metallic Brass Gradient for Connector Ports */}
                <radialGradient id="brassPort" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f5e096" />
                  <stop offset="60%" stopColor="#c89b3c" />
                  <stop offset="100%" stopColor="#5c3a1e" />
                </radialGradient>
              </defs>

              {STRING_PATHS.map((sp, idx) => (
                <g key={sp.id}>
                  {/* #5: CONNECTOR PORTS precisely aligned inside Card Rope Holes */}
                  <circle
                    cx={`${sp.endX}%`}
                    cy={`${sp.endY}%`}
                    r="1.1"
                    fill="url(#brassPort)"
                    stroke="#2b190c"
                    strokeWidth="0.3"
                  />
                  <circle
                    cx={`${sp.endX}%`}
                    cy={`${sp.endY}%`}
                    r="0.4"
                    fill="#2b190c"
                  />

                  {/* #1: STRING DATA PULSES (Flowing Energy Particles) */}
                  <circle
                    cx={`${sp.startX + (sp.endX - sp.startX) * 0.5}%`}
                    cy={`${sp.startY + (sp.endY - sp.startX) * 0.5}%`}
                    r="1.0"
                    fill="#c8a96e"
                    className="animate-ping"
                    style={{ animationDelay: `${idx * 0.6}s`, animationDuration: '2.5s' }}
                  />
                  
                  {/* Smooth data flow dot moving down the string */}
                  <circle
                    cx={`${sp.startX}%`}
                    cy={`${sp.startY}%`}
                    r="0.8"
                    fill="#8c5e35"
                    opacity="0.9"
                  >
                    <animate
                      attributeName="cx"
                      from={`${sp.startX}%`}
                      to={`${sp.endX}%`}
                      dur="3.2s"
                      begin={`${idx * 0.6}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      from={`${sp.startY}%`}
                      to={`${sp.endY}%`}
                      dur="3.2s"
                      begin={`${idx * 0.6}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </svg>

          </div>
        </div>

      </div>
    </section>
  );
}
