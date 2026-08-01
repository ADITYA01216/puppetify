import React, { useState } from 'react';
import { Award, TrendingUp, Clock, Star, Users, ArrowRight, Quote } from 'lucide-react';

export default function CaseStudySection({ onOpenAudit }) {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      client: 'Artisanal Bistro & Bar',
      vertical: 'Restaurant',
      location: 'Austin, TX',
      metric: '16 hrs/week saved',
      submetric: 'Cut manual booking time from 2.5h/day to 0h',
      highlight: 'Zero missed weekend reservation calls',
      story: 'Artisanal Bistro was losing up to 15 weekend guests due to unanswered phone calls during peak kitchen prep hours. Puppetify built an instant table booking puppet connected to SMS & Google Calendar.',
      results: [
        '100% automated table reservation confirmations',
        '+28% increase in weekend table turnover',
        'Gathered 142 5-star Google reviews in first 90 days'
      ],
      quote: 'Puppetify gave us back 16 hours every single week. Our floor staff focuses on guest experience instead of answering the phone.',
      author: 'Chef Marco Rossi, Owner'
    },
    {
      client: 'FitPulse Studio',
      vertical: 'Boutique Gym',
      location: 'Denver, CO',
      metric: '+340% 5-Star Reviews',
      submetric: 'Automated post-workout review requests',
      highlight: '#1 ranked gym on Google Maps in district',
      story: 'FitPulse had great class attendance but only 19 reviews on Google Maps. We implemented an automatic WhatsApp review string that triggers 2 hours post-workout.',
      results: [
        'Grew from 19 to 184 Google reviews in 60 days',
        'Lead response time dropped from 4 hours to 45 seconds',
        '+35% free trial to paid membership conversion'
      ],
      quote: 'The automated WhatsApp lead string pays for itself tenfold. Prospects get an instant response even at 9 PM on Sunday.',
      author: 'Elena Vance, Founder'
    },
    {
      client: 'PageTurn Indie Books',
      vertical: 'Bookstore & Cafe',
      location: 'Portland, OR',
      metric: '12 hrs/week saved',
      submetric: 'Auto event ticketing & inventory pings',
      highlight: '100% sold-out author readings',
      story: 'PageTurn struggled to track event RSVPs and re-order bestsellers on time. Puppet.ai built an integrated website with automated Ticket Tailor event sync and stock alert puppets.',
      results: [
        'Zero out-of-stock incidents for bestseller list',
        '12 hours saved on event management per month',
        'Automated WhatsApp book club reminders'
      ],
      quote: 'It feels like having an extra full-time operations manager pulling strings behind the scenes without the payroll cost.',
      author: 'Samuel Croft, Co-Founder'
    }
  ];

  return (
    <section id="proof" className="section-padding bg-white relative border-y border-[var(--border-color)]">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--border-accent)] text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Verified Client Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Real Small Business <span className="text-[var(--primary)]">Results</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            See how small business owners cut manual work and increased revenue with automated strings.
          </p>
        </div>

        {/* Top Metric Counter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="puppet-card bg-[var(--bg-main)] text-center p-6 space-y-2">
            <div className="font-mono text-4xl font-black text-[var(--primary)]">15.4 hrs</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Average Weekly Time Saved</div>
            <div className="text-xs text-[var(--text-muted)]">Per small business owner</div>
          </div>
          <div className="puppet-card bg-[var(--bg-main)] text-center p-6 space-y-2">
            <div className="font-mono text-4xl font-black text-[var(--primary)]">+310%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Increase in Google Reviews</div>
            <div className="text-xs text-[var(--text-muted)]">Via automated review puppets</div>
          </div>
          <div className="puppet-card bg-[var(--bg-main)] text-center p-6 space-y-2">
            <div className="font-mono text-4xl font-black text-[var(--primary)]">&lt; 7 Days</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Setup & String Connection</div>
            <div className="text-xs text-[var(--text-muted)]">From audit to live execution</div>
          </div>
        </div>

        {/* Interactive Case Study Selector & Showcase */}
        <div className="max-w-5xl mx-auto">
          
          {/* Case Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {cases.map((cs, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCase(idx)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all border ${
                  activeCase === idx
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-md'
                    : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)] hover:bg-[var(--bg-subtle)]'
                }`}
              >
                {cs.client} ({cs.vertical})
              </button>
            ))}
          </div>

          {/* Selected Case Study Card */}
          {cases[activeCase] && (
            <div className="puppet-card bg-white p-8 md:p-12 shadow-xl border border-[var(--border-accent)] relative">
              <div className="absolute -top-3 left-10">
                <span className="puppet-node"></span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Result Highlight */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--primary)] uppercase tracking-wider block mb-1">
                      {cases[activeCase].vertical} • {cases[activeCase].location}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                      {cases[activeCase].client}
                    </h3>
                  </div>

                  <div className="p-6 rounded-2xl bg-[var(--primary-light)] border border-[var(--border-accent)] space-y-2">
                    <div className="font-mono text-3xl font-extrabold text-[var(--primary)]">
                      {cases[activeCase].metric}
                    </div>
                    <div className="text-xs font-bold text-[var(--text-primary)]">
                      {cases[activeCase].submetric}
                    </div>
                  </div>

                  <blockquote className="space-y-3 bg-[var(--bg-main)] p-5 rounded-xl border border-[var(--border-color)] relative">
                    <Quote className="w-6 h-6 text-[var(--primary)] opacity-40 mb-1" />
                    <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                      "{cases[activeCase].quote}"
                    </p>
                    <div className="text-xs font-bold text-[var(--text-primary)] not-italic pt-2">
                      — {cases[activeCase].author}
                    </div>
                  </blockquote>
                </div>

                {/* Right Problem & Results Breakdown */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      The Challenge:
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {cases[activeCase].story}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                      Key Quantifiable Outcomes:
                    </h4>
                    {cases[activeCase].results.map((res, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-medium">
                        <TrendingUp className="w-4 h-4 text-[var(--primary)] shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button onClick={onOpenAudit} className="btn-primary py-3 text-xs">
                      <span>Get Similar Results for Your Business</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
