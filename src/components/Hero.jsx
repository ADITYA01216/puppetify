import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Check, Shield, Clock, Zap } from 'lucide-react';

/* ───────────────────────────────────────
   HERO CANVAS FRAME ENGINE (Lando Norris Style Canvas Animation)
─────────────────────────────────────── */
function HeroCanvasAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let currentFrame = 0;
    const totalFrames = 239;
    const frames = [];
    let isMounted = true;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Preload image frame sequence
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/assets/hero_frames/frame_${numStr}.jpg`;
      frames.push(img);
    }

    let lastTime = performance.now();
    const fps = 24;
    const interval = 1000 / fps;

    const render = (now) => {
      if (!isMounted) return;

      const elapsed = now - lastTime;
      if (elapsed > interval) {
        lastTime = now - (elapsed % interval);
        currentFrame = (currentFrame + 1) % totalFrames;

        const img = frames[currentFrame];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Calculate cover aspect fill
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width / 2) - (img.width / 2) * scale;
          const y = (canvas.height / 2) - (img.height / 2) * scale;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'block',
      }}
    />
  );
}

export default function Hero({ onAction }) {
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 110]);
  const heroOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-deep)',
        marginTop: '-80px',
      }}
    >
      {/* Full-screen HTML5 Canvas Background Animation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
        tabIndex={-1}
      >
        <HeroCanvasAnimation />

        {/* Deep dark luxury gradient overlays for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,7,3,0.72) 0%, rgba(13,7,3,0.4) 40%, rgba(13,7,3,0.92) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 55% at 65% 38%, rgba(245,200,66,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,7,3,0.75) 0%, rgba(13,7,3,0.3) 42%, transparent 65%)', pointerEvents: 'none' }} />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY,
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingTop: '100px',
        }}
      >
        <div
          style={{
            maxWidth: '880px',
            margin: '0 auto',
            padding: '5rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >


          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 5.5vw, 5.8rem)',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            We sell automations<br />
            <span className="gold-text-bright">what we call puppets</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38 }}
            style={{
              color: '#F7EFE7',
              fontSize: '1.15rem',
              lineHeight: 1.7,
              maxWidth: '580px',
              marginBottom: 40,
              textAlign: 'center',
              margin: '0 auto 40px',
            }}
          >
            Puppetify gives you full control over your automations. Automate repetitive tasks, APIs, and business logic with intelligent digital puppets.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}
          >
            <span style={{ display: 'flex', items: 'center', gap: 7, color: '#E8D7C5', fontSize: '0.85rem' }}>
              <Check style={{ width: 15, height: 15, color: '#F7CE55' }} /> Custom engineered for you
            </span>
            <span style={{ display: 'flex', items: 'center', gap: 7, color: '#E8D7C5', fontSize: '0.85rem' }}>
              <Shield style={{ width: 15, height: 15, color: '#F7CE55' }} /> 100% data privacy
            </span>
            <span style={{ display: 'flex', items: 'center', gap: 7, color: '#E8D7C5', fontSize: '0.85rem' }}>
              <Clock style={{ width: 15, height: 15, color: '#F7CE55' }} /> 24/7 Autopilot monitoring
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
