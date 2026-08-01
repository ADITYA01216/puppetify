import React, { useState } from 'react';
import { Utensils, Coffee, BookOpen, Dumbbell, ArrowRight, CheckCircle2, Sliders, Play } from 'lucide-react';

export default function IndustriesSection({ onOpenAudit, onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('restaurants');

  const verticals = [
    {
      id: 'restaurants',
      title: 'Restaurants & Bistros',
      icon: Utensils,
      pitch: 'Fill tables during off-peak hours and automate reservation pings.',
      stats: '14 hrs saved / week',
      statLabel: 'Peak kitchen hours reclaimed',
      workflows: [
        'Instant Table Booking String (SMS + Calendar sync)',
        'Post-Dining 5-Star Google Review Trigger (Sent at +2h)',
        'Deposit collection for parties of 6+ to prevent no-shows',
        'Kitchen WhatsApp alert for special VIP dietary notes'
      ],
      quote: '"We used to spend 2 hours taking reservation calls every afternoon. Now tables book themselves while we prepare food."'
    },
    {
      id: 'cafes',
      title: 'Cafes & Bakeries',
      icon: Coffee,
      pitch: 'Cut morning rush queues with instant WhatsApp pre-orders and loyalty strings.',
      stats: '+45% repeat orders',
      statLabel: 'Via automated loyalty pings',
      workflows: [
        'WhatsApp Morning Pre-Order Puppet (Order ahead & skip line)',
        'Low Coffee Bean & Pastry Stock Warning to Suppliers',
        'Digital Coffee Stamp Card String on Apple Wallet / Google Pay',
        'Google Maps ranking review booster puppet'
      ],
      quote: '"Morning coffee pre-orders through WhatsApp doubled our peak revenue without hiring extra counter staff."'
    },
    {
      id: 'bookstores',
      title: 'Indie Bookstores',
      icon: BookOpen,
      pitch: 'Automate author event ticketing, stock pings, and book club reminders.',
      stats: '0 missed re-orders',
      statLabel: 'Automatic supplier alert sync',
      workflows: [
        'Author Event & Book Club Ticketing Puppet (Ticket Tailor sync)',
        'Back-in-Stock Instant Customer WhatsApp Alert',
        'Pre-Order Book Reservation & Deposit String',
        'Monthly Reading Club Membership auto-renewal'
      ],
      quote: '"Managing author reading events used to take days of email back-and-forth. Puppetify connected the strings completely."'
    },
    {
      id: 'gyms',
      title: 'Gyms & Fitness Studios',
      icon: Dumbbell,
      pitch: 'Convert free trial leads instantly and eliminate drop-offs with auto check-in strings.',
      stats: '3.4x lead conversion',
      statLabel: 'Instant lead response string',
      workflows: [
        'Class Pass & Trial Session Booking String (Mindbody/Wodify sync)',
        'Instant 2-Minute WhatsApp Follow-up for Web Leads',
        'Unattended Member Check-in Alert & Win-back String',
        'Post-workout review request puppet'
      ],
      quote: '"Lead response time dropped from 4 hours to 45 seconds. Our trial conversion shot up immediately."'
    }
  ];

  const currentVertical = verticals.find(v => v.id === activeTab);

  return (
    <section id="industries" className="section-padding bg-string-grid relative">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--border-accent)] text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Tailored Industry Automations
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Built for Your <span className="text-[var(--primary)]">Specific Business</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            We don't build generic software. We engineer string automations tailored to how your industry operates.
          </p>
        </div>

        {/* Industry Card Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {verticals.map((vert) => {
            const Icon = vert.icon;
            const isSelected = activeTab === vert.id;

            return (
              <button
                key={vert.id}
                onClick={() => setActiveTab(vert.id)}
                className={`puppet-card text-left p-6 transition-all duration-300 ${
                  isSelected 
                    ? 'puppet-card-featured bg-white shadow-lg ring-2 ring-[var(--primary)]' 
                    : 'bg-white/80 hover:bg-white'
                }`}
              >
                {/* Node motif */}
                <div className="absolute -top-2 left-6">
                  <span className="puppet-node"></span>
                </div>

                <div className="flex items-center justify-between mb-4 pt-1">
                  <div className={`p-3 rounded-xl ${
                    isSelected ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-subtle)] text-[var(--text-primary)]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[var(--primary-light)] text-[var(--primary)]">
                      Active Vertical
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">
                  {vert.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {vert.pitch}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Industry Workflow Showcase */}
        {currentVertical && (
          <div className="puppet-card bg-white p-8 md:p-10 shadow-xl border-2 border-[var(--border-accent)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Vertical Overview */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[var(--primary)] text-white">
                    <currentVertical.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
                      {currentVertical.title}
                    </h3>
                    <span className="text-xs font-semibold text-[var(--primary)]">
                      {currentVertical.pitch}
                    </span>
                  </div>
                </div>

                {/* Highlight Metric */}
                <div className="p-4 rounded-xl bg-[var(--primary-light)] border border-[var(--border-accent)] flex items-center gap-4">
                  <div className="font-mono text-3xl font-black text-[var(--primary)]">
                    {currentVertical.stats}
                  </div>
                  <div className="text-xs font-semibold text-[var(--text-secondary)]">
                    {currentVertical.statLabel}
                  </div>
                </div>

                {/* Client Quote */}
                <blockquote className="italic text-xs text-[var(--text-secondary)] bg-[var(--bg-main)] p-4 rounded-xl border border-[var(--border-color)]">
                  {currentVertical.quote}
                </blockquote>

                <div className="pt-2 flex gap-3">
                  <button onClick={onOpenAudit} className="btn-primary py-3 text-xs">
                    <span>Audit My {currentVertical.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={onOpenDemo} className="btn-secondary py-3 text-xs">
                    <Play className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>See Interactive Demo</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Key Automated Strings List */}
              <div className="lg:col-span-7 bg-[var(--bg-main)] p-6 md:p-8 rounded-2xl border border-[var(--border-color)] space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                  <span>Pre-Configured Automation Puppets Included:</span>
                  <span className="font-mono text-[var(--primary)]">4 Active Strings</span>
                </div>

                <div className="space-y-3">
                  {currentVertical.workflows.map((wf, wIdx) => (
                    <div 
                      key={wIdx} 
                      className="p-3.5 rounded-xl bg-white border border-[var(--border-color)] flex items-center justify-between hover:border-[var(--border-accent)] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0" />
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                          {wf}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--primary-light)] text-[var(--primary)]">
                        Autopilot
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-[var(--text-muted)] text-center">
                  ⚡ All workflows connect to your existing POS, WhatsApp & Google accounts in minutes.
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
