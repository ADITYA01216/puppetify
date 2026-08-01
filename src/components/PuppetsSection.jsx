import React from 'react';
import { Globe, Calendar, Bot, MessageSquare, BarChart3, ArrowRight, TrendingUp } from 'lucide-react';

const PUPPETS = [
  {
    id: 'website',
    Icon: Globe,
    title: 'Website & SEO Engine',
    badge: '100% Uptime',
    badgeColor: '#16a34a',
    desc: 'High-speed custom websites with built-in visibility & lead capture — the foundation for any business.',
    string: 'Your digital storefront, always live.',
  },
  {
    id: 'booking',
    Icon: Calendar,
    title: 'Booking & Scheduling',
    badge: 'Zero Missed Slots',
    badgeColor: '#2563eb',
    desc: 'Automated reservations, appointments & calendar sync — for gyms, clinics, restaurants or client calls.',
    string: 'Slots fill themselves, you show up.',
  },
  {
    id: 'ai',
    Icon: Bot,
    title: 'AI Automation Hub',
    badge: '24/7 Autopilot',
    badgeColor: '#9333ea',
    desc: 'Connects your CRM, inbox, WhatsApp, Slack & internal tools — fully automated end-to-end.',
    string: 'Every app talks to every other app.',
    featured: true,
  },
  {
    id: 'message',
    Icon: MessageSquare,
    title: 'Message & Alert Responder',
    badge: 'Instant Notify',
    badgeColor: '#ea580c',
    desc: 'Auto-replies across WhatsApp & DMs for customers, or deploy/error alerts straight to your team\'s Slack.',
    string: 'No message ever goes unanswered.',
  },
  {
    id: 'monitor',
    Icon: BarChart3,
    title: 'Monitor & Report',
    badge: '99.9% Coverage',
    badgeColor: '#0891b2',
    desc: 'Review collection & reputation tracking for local businesses, or uptime & QA monitoring for software teams.',
    string: 'You see everything. All the time.',
  },
];

export default function PuppetsSection({ onOpenAudit }) {
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#FAF8F4' }}>

      {/* Subtle rope texture line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f3ead8] border border-[#e2c98a] text-xs font-bold text-[#7c5a1e] uppercase tracking-widest mb-6">
            <span>✕</span> Meet Your 5 Puppets
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1a0f07] tracking-tight mb-4">
            Every string does <span style={{ color: '#8b5a1e' }}>one job. Perfectly.</span>
          </h2>
          <p className="text-lg text-[#5c4030] max-w-2xl mx-auto">
            Each puppet is a standalone automation you can deploy instantly — or combine them all for a fully orchestrated business on autopilot.
          </p>
        </div>

        {/* 5 Puppet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {PUPPETS.slice(0, 3).map((puppet) => {
            const Icon = puppet.Icon;
            return (
              <div
                key={puppet.id}
                className="relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: puppet.featured
                    ? 'linear-gradient(135deg, #2a1c11 0%, #4a2c18 100%)'
                    : 'white',
                  border: puppet.featured ? 'none' : '1.5px solid #e8ddd0',
                  boxShadow: puppet.featured
                    ? '0 20px 60px rgba(42,28,17,0.35)'
                    : '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                {/* Puppet hole at top — like the wooden tag */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: puppet.featured ? '#2a1c11' : 'white',
                    borderColor: puppet.featured ? '#c8a96e' : '#d4b483',
                  }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: puppet.featured ? '#c8a96e' : '#5c4030' }} />
                </div>

                {/* Top row */}
                <div className="flex items-start justify-between pt-2">
                  <div className="p-3 rounded-xl"
                    style={{ backgroundColor: puppet.featured ? 'rgba(200,169,110,0.2)' : '#fdf6ec' }}>
                    <Icon className="w-6 h-6" style={{ color: puppet.featured ? '#c8a96e' : puppet.badgeColor }} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: puppet.featured ? 'rgba(200,169,110,0.15)' : `${puppet.badgeColor}15`,
                      color: puppet.featured ? '#c8a96e' : puppet.badgeColor,
                      border: `1px solid ${puppet.featured ? 'rgba(200,169,110,0.3)' : `${puppet.badgeColor}30`}`
                    }}>
                    {puppet.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold tracking-tight"
                    style={{ color: puppet.featured ? '#fff' : '#1a0f07' }}>
                    {puppet.title}
                  </h3>
                  <p className="text-sm leading-relaxed"
                    style={{ color: puppet.featured ? 'rgba(255,255,255,0.7)' : '#5c4030' }}>
                    {puppet.desc}
                  </p>
                </div>

                {/* String quote */}
                <div className="text-xs font-bold italic border-t pt-4"
                  style={{
                    color: puppet.featured ? '#c8a96e' : '#9c7a4a',
                    borderColor: puppet.featured ? 'rgba(200,169,110,0.2)' : '#ede5d8'
                  }}>
                  "{puppet.string}"
                </div>

                {/* CTA */}
                <button
                  onClick={onOpenAudit}
                  className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3"
                  style={{ color: puppet.featured ? '#c8a96e' : '#7c5a1e' }}>
                  Deploy this Puppet <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PUPPETS.slice(3).map((puppet) => {
            const Icon = puppet.Icon;
            return (
              <div
                key={puppet.id}
                className="relative rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: 'white',
                  border: '1.5px solid #e8ddd0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white border-[#d4b483]">
                  <div className="w-2 h-2 rounded-full bg-[#5c4030]" />
                </div>
                <div className="flex items-start justify-between pt-2">
                  <div className="p-3 rounded-xl bg-[#fdf6ec]">
                    <Icon className="w-6 h-6" style={{ color: puppet.badgeColor }} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: `${puppet.badgeColor}15`,
                      color: puppet.badgeColor,
                      border: `1px solid ${puppet.badgeColor}30`
                    }}>
                    {puppet.badge}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-extrabold tracking-tight text-[#1a0f07]">{puppet.title}</h3>
                  <p className="text-sm leading-relaxed text-[#5c4030]">{puppet.desc}</p>
                </div>
                <div className="text-xs font-bold italic border-t border-[#ede5d8] pt-4 text-[#9c7a4a]">
                  "{puppet.string}"
                </div>
                <button onClick={onOpenAudit} className="flex items-center gap-2 text-sm font-bold text-[#7c5a1e] transition-all hover:gap-3">
                  Deploy this Puppet <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenAudit}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #2a1c11, #5c3a1e)' }}>
            <TrendingUp className="w-5 h-5" />
            Get All 5 Puppets Working For You
          </button>
          <p className="mt-3 text-sm text-[#9c7a4a]">Free audit · No credit card · Ships in 7 days</p>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent opacity-40" />
    </section>
  );
}
