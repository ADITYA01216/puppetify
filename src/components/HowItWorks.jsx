import React from 'react';
import { Search, Hammer, Link, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorks({ onOpenAudit }) {
  const steps = [
    {
      num: '01',
      title: 'Free String Audit',
      subtitle: 'Identify Bottlenecks',
      icon: Search,
      desc: 'We analyze your current manual daily tasks—booking calls, review requests, inventory tracking—and map out where automated strings will save the most time.'
    },
    {
      num: '02',
      title: 'Build The Puppets',
      subtitle: 'Engineered for You',
      icon: Hammer,
      desc: 'Our team builds your high-converting website and custom AI automation workflows tailored specifically to your business operations and brand.'
    },
    {
      num: '03',
      title: 'Connect The Strings',
      subtitle: 'Seamless Integration',
      icon: Link,
      desc: 'We pull the strings together: linking your POS, WhatsApp Business, Google Calendar, and review platforms into one cohesive automated machine.'
    },
    {
      num: '04',
      title: 'Runs on Autopilot',
      subtitle: 'Reclaim 15+ Hrs/Week',
      icon: Rocket,
      desc: 'Your business operates effortlessly behind the scenes. Bookings flow, reviews accumulate, and alerts fire without you lifting a single finger.'
    }
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white relative border-y border-[var(--border-color)] overflow-hidden">
      
      {/* Background String Vector Graphic */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--string-color)] to-transparent pointer-events-none hidden md:block"></div>

      <div className="container mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--border-accent)] text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            <Link className="w-3.5 h-3.5" />
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            How We <span className="text-[var(--primary)]">Connect the Strings</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            From initial workflow audit to full autopilot execution in under 7 business days.
          </p>
        </div>

        {/* Horizontal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div 
                key={idx}
                className="puppet-card bg-[var(--bg-main)] hover:bg-white p-6 relative group transition-all duration-300 border border-[var(--border-color)] hover:border-[var(--border-accent)]"
              >
                {/* Joint Node Indicator */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="puppet-node group-hover:scale-125"></span>
                </div>

                {/* String Connector Line between cards */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-8 h-[2px] bg-[var(--primary)] relative">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] absolute -right-1 -top-[3px]"></div>
                    </div>
                  </div>
                )}

                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6 pt-2">
                  <span className="font-mono text-2xl font-black text-[var(--primary)] opacity-80">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white border border-[var(--border-color)] text-[var(--primary)] flex items-center justify-center shadow-sm group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  {step.subtitle}
                </div>

                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)]">
                  <span>Step {idx + 1} of 4</span>
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                </div>

              </div>
            );
          })}

        </div>

        {/* Process Guarantee Banner */}
        <div className="mt-16 max-w-3xl mx-auto p-6 rounded-2xl bg-[var(--primary-light)] border border-[var(--border-accent)] text-center space-y-3">
          <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">
            Ready to see how your specific business workflows map out?
          </h4>
          <p className="text-xs text-[var(--text-secondary)]">
            Our 15-minute automation audit is 100% free with zero obligation. We'll show you exactly which strings to automate first.
          </p>
          <div className="pt-2">
            <button 
              onClick={onOpenAudit}
              className="btn-primary py-3 px-6 text-sm"
            >
              <span>Schedule Your 15-Min Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
