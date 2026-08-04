import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Wrench, Lock, Clock } from 'lucide-react';

const STRING_CONFIG = [
  { id: 1, startX: 29.8, startY: 33.2, endX: 29.8, endY: 47.8, label: 'SEO Engine', maxRot: 1.5, duration: 8.4, delay: 0 },
  { id: 2, startX: 50.8, startY: 29.2, endX: 50.8, endY: 47.8, label: 'Booking', maxRot: 2.0, duration: 9.8, delay: 0.6 },
  { id: 3, startX: 72.8, startY: 25.2, endX: 72.8, endY: 47.8, label: 'Logic Engine', maxRot: 1.0, duration: 7.9, delay: 1.2 },
  { id: 4, startX: 42.2, startY: 32.2, endX: 40.5, endY: 72.2, label: 'Messaging', maxRot: 1.7, duration: 10.6, delay: 0.3 },
  { id: 5, startX: 63.2, startY: 27.2, endX: 61.5, endY: 72.2, label: 'Monitor', maxRot: 2.0, duration: 11.2, delay: 0.9 },
];

// ANIMATION 8: Floating Wood Dust Particles (8-12 particles, opacity < 8%)
const DUST_PARTICLES = [
  { id: 1, left: '15%', top: '25%', size: 4, duration: 22, delay: 0, dx: 18, dy: -30 },
  { id: 2, left: '28%', top: '65%', size: 3, duration: 26, delay: 3, dx: -15, dy: -25 },
  { id: 3, left: '42%', top: '35%', size: 5, duration: 20, delay: 1, dx: 20, dy: -35 },
  { id: 4, left: '58%', top: '75%', size: 3, duration: 24, delay: 4, dx: -22, dy: -20 },
  { id: 5, left: '68%', top: '20%', size: 4, duration: 28, delay: 2, dx: 15, dy: -40 },
  { id: 6, left: '78%', top: '55%', size: 3, duration: 21, delay: 5, dx: -18, dy: -28 },
  { id: 7, left: '88%', top: '30%', size: 4, duration: 25, delay: 1.5, dx: 12, dy: -32 },
  { id: 8, left: '22%', top: '80%', size: 3, duration: 27, delay: 3.5, dx: 25, dy: -22 },
  { id: 9, left: '50%', top: '15%', size: 4, duration: 23, delay: 0.8, dx: -14, dy: -36 },
  { id: 10, left: '82%', top: '82%', size: 3, duration: 29, delay: 2.2, dx: 16, dy: -24 },
];

export default function Hero({ onAction }) {
  const sectionRef = useRef(null);
  const heroContainerRef = useRef(null);

  // ANIMATION 9: Scroll Parallax & Scale
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.98]);
  const bgParallaxY = useTransform(scrollY, [0, 600], [0, 25]);

  // ANIMATION 4: Mouse Interaction State (Radius 120px, Max movement 8px, Max rotation 4°)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseXSpring = useSpring(-1000, { stiffness: 180, damping: 18 });
  const mouseYSpring = useSpring(-1000, { stiffness: 180, damping: 18 });

  const handleMouseMove = (e) => {
    if (!heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    mouseXSpring.set(x);
    mouseYSpring.set(y);
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    mouseXSpring.set(-1000);
    mouseYSpring.set(-1000);
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale: heroScale }}
      className="relative min-h-screen overflow-hidden bg-cover bg-center flex items-center pt-16 pb-12 transition-transform duration-100 will-change-transform"
    >
      {/* Dynamic Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/assets/wood_bg.png')",
          y: bgParallaxY,
        }}
      />

      {/* ── ANIMATION 7: AMBIENT WOOD LIGHTING ANIMATION (35s infinite subtle warm sunlight) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          opacity: [0.35, 0.38, 0.35, 0.37, 0.35],
          backgroundPosition: ['40% 30%', '65% 45%', '55% 55%', '40% 30%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(255, 245, 225, 0.48) 0%, rgba(230, 200, 160, 0.18) 50%, rgba(43, 26, 14, 0.25) 100%)',
          backgroundSize: '160% 160%',
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

      {/* ── FAINT CARVED WOOD CIRCUIT BACKGROUND LAYER ── */}
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

      {/* ── ANIMATION 8: FLOATING WOOD DUST PARTICLES (8-12 particles, opacity < 8%) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {DUST_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#f5e096]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.06,
            }}
            animate={{
              x: [0, p.dx, 0],
              y: [0, p.dy, 0],
              opacity: [0.03, 0.07, 0.03],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between min-h-screen relative z-10">

        {/* ── LEFT CONTENT (HERO COPY & CTAS - ANIMATION 5 & 6) ── */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center py-12 lg:py-20">

          {/* ANIMATION 5: Hero Text Staggered Reveal (First page load only) */}
          <h1 className="font-black leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.0, ease: 'easeOut' }}
              className="inline-block text-[#1a0f07] mr-3"
            >
              We sell
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="inline-block text-[#1a0f07]"
            >
              automations,
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.30, ease: 'easeOut' }}
              className="inline-block mr-3"
              style={{ color: '#7c4a1e' }}
            >
              what we call
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
              className="inline-block"
              style={{ color: '#7c4a1e' }}
            >
              puppets.
            </motion.span>
          </h1>

          {/* Sub-copy Paragraph (appears after 300ms) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
            className="text-[#4a3520] text-lg leading-relaxed mb-10 max-w-md font-medium"
          >
            Puppetify gives you full control over your automations.
            Connect apps, build workflows, and automate
            anything—your way.
          </motion.p>

          {/* CTAs (ANIMATION 6: Hover lift 4px, shadow increase, arrow slide 8px) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.05, ease: 'easeOut' }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <motion.a
              href="#workflows"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-base text-white transition-shadow duration-250 shadow-lg hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: '#1c1209' }}
            >
              <span>Explore Workflows</span>
              <motion.span
                className="inline-block transition-transform duration-250 group-hover:translate-x-2"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.a>

            <motion.a
              href="#problem"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-base text-[#1c1209] border-2 border-[#1c1209] bg-transparent transition-colors duration-250 hover:bg-[rgba(28,18,9,0.06)] cursor-pointer"
            >
              Why Puppetify
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-6 text-[#5c3a1e] text-sm font-semibold"
          >
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
          </motion.div>
        </div>

        {/* ── RIGHT CONTENT (ANIMATION 1, 2, 3, 4, 10 - Hand & Card Marionette Centerpiece) ── */}
        <div
          ref={heroContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full lg:w-[52%] flex items-center justify-center relative mt-6 lg:mt-0 select-none will-change-transform"
        >
          {/* ANIMATION 10: Workflow Reveal (Cards drop 12px, strings fade in) & ANIMATION 1: Hand Idle Motion */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="relative w-full max-w-[720px]"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* ANIMATION 1: Continuous Subtle Hand Idle Motion (wrist rot -2° to +2°, vert 4-6px, 12s loop, smooth cubic bezier) */}
            <motion.div
              animate={{
                rotate: [-1.8, 1.6, -1.2, 1.8, -1.5],
                y: [0, -5, 1, -6, 2, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: [0.45, 0, 0.55, 1],
              }}
              className="relative w-full h-auto"
            >
              {/* True Transparent PNG Hero Artwork */}
              <img
                src="/assets/puppet_hero_transparent.png"
                alt="Wooden puppet hand controlling automation cards"
                className="w-full h-auto object-contain block relative z-10"
                style={{ transform: 'translateZ(0)' }}
              />

              {/* SVG OVERLAY: ANIMATION 2 (Natural String Physics) & ANIMATION 3 (Card Pendulum Swings) */}
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

                {STRING_CONFIG.map((sp) => (
                  <g key={sp.id}>
                    {/* CONNECTOR PORTS precisely aligned inside Card Rope Holes */}
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
                  </g>
                ))}
              </svg>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}

