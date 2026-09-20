import React, { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export default function DemoVideoSection() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Disconnect after first intersection to avoid re-triggering
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="demo-video" 
      ref={containerRef}
      className="py-16 sm:py-24 relative overflow-hidden scroll-mt-24" 
      style={{ backgroundColor: 'var(--bg-deep)' }}
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(247, 206, 85, 0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            See It <span className="gold-text-bright">In Action</span>
          </h2>

          <p className="text-base sm:text-lg text-[#F7EFE7] max-w-2xl mx-auto leading-relaxed">
            Experience how Puppetify's digital puppets pull the strings behind the scenes — connecting your apps and executing workflows 24/7 on autopilot.
          </p>
        </div>

        {/* Video Card Container */}
        <div 
          className="relative rounded-3xl p-3 sm:p-5 transition-all duration-500 glass-card group"
          style={{
            background: 'linear-gradient(145deg, rgba(36,21,10,0.85) 0%, rgba(13,7,3,0.95) 100%)',
            border: '1.5px solid rgba(247, 206, 85, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* HTML5 Video Element Wrapper */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl">
            {isInView ? (
              <video
                ref={videoRef}
                className="w-full h-auto max-h-[620px] object-cover rounded-2xl block"
                controls
                preload="metadata"
                poster="/assets/video_frame.jpg"
              >
                <source src="/assets/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              /* Skeleton / Placeholder prior to scroll lazy-load */
              <div className="w-full aspect-video bg-[#120904] flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5">
                <img 
                  src="/assets/video_frame.jpg" 
                  alt="Demo video poster frame" 
                  className="w-full h-full object-cover rounded-2xl opacity-60 absolute inset-0"
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#F7CE55]/20 border border-[#F7CE55] backdrop-blur-md flex items-center justify-center text-[#F7CE55] shadow-lg">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    Scroll to Load Demo Video
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Caption Footer */}
          <div className="mt-4 px-2 py-3 sm:px-4 flex items-center justify-center sm:justify-start border-t border-white/10">
            <p className="text-xs sm:text-sm text-[#F7EFE7] leading-relaxed max-w-3xl font-medium text-center sm:text-left">
              <span className="text-[#F7CE55] font-bold">What this demo shows:</span> Automate the entire hiring process — from candidate screening and scoring to interview scheduling, communication, and rescheduling, with minimal HR intervention.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
