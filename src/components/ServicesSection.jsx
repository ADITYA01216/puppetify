import React, { useState } from 'react';
import { Globe, Bot, Layers, ArrowRight, ShoppingBag, Briefcase, UserCheck, Store, User, Check, Sparkles } from 'lucide-react';

export default function ServicesSection({ onOpenAudit }) {
  const [selectedCategory, setSelectedCategory] = useState('ecommerce');

  const categories = [
    { id: 'ecommerce', name: 'E-Commerce & Retail', icon: ShoppingBag },
    { id: 'agency', name: 'Agencies & B2B', icon: Briefcase },
    { id: 'creator', name: 'Creators & Personal', icon: UserCheck },
    { id: 'local', name: 'Local Businesses', icon: Store },
    { id: 'solo', name: 'Solopreneurs', icon: User },
  ];

  const categoryExamples = {
    ecommerce: {
      website: 'High-speed storefront with 1-click checkout, dynamic inventory counters, and mobile optimization.',
      puppets: 'Shopify order sync, abandoned cart WhatsApp recovery string, low stock supplier re-order alerts.',
      combo: 'Complete e-commerce store + WhatsApp order recovery puppet + automated Google review collector.'
    },
    agency: {
      website: 'Elite agency landing page with case study portfolios, interactive ROI calculator, and lead intake forms.',
      puppets: 'Automated lead qualification string, instant Calendly booking sync, proposal PDF generator string.',
      combo: 'Client portal website + CRM lead qualification puppet + monthly automated report engine.'
    },
    creator: {
      website: 'Sleek link-in-bio & creator store website for digital downloads, courses, and newsletter signups.',
      puppets: 'Instagram DM auto-responder string, Gumroad digital product delivery, fan welcome email string.',
      combo: 'Creator store website + Instagram DM automation puppet + automated course access sync.'
    },
    local: {
      website: 'Local business site with instant table/appointment booking, floor maps, and Google Maps local SEO.',
      puppets: '24/7 SMS appointment confirmations, post-visit Google 5-star review collector, staff schedule alerts.',
      combo: 'Local business website + booking system puppet + 5-star Google review generator.'
    },
    solo: {
      website: 'Professional 1-page personal brand site highlighting services, testimonials, and contact widgets.',
      puppets: 'Instant invoice generator string, Stripe payment confirmation ping, Google Sheets client logger.',
      combo: 'Personal site + automated invoicing puppet + client onboarding workflow.'
    }
  };

  const services = [
    {
      tier: 'Tier 1',
      title: 'High-Converting Websites',
      icon: Globe,
      badge: 'Web Foundation',
      desc: 'Sleek, lightning-fast websites engineered to convert online traffic into loyal paying clients.',
      useCaseKey: 'website',
      features: [
        'Mobile-first responsive design',
        'Built-in instant booking & lead forms',
        'SEO optimized for high search visibility',
        '100% editable content CMS',
        'Domain & fast cloud hosting included'
      ]
    },
    {
      tier: 'Tier 2',
      title: 'AI Automations ("Puppets")',
      icon: Bot,
      badge: 'Core Engine',
      featured: true,
      desc: 'Custom automated workflows ("puppets") running on suspended strings behind the scenes.',
      useCaseKey: 'puppets',
      features: [
        '24/7 Multi-channel lead capture string',
        'Instant WhatsApp & SMS notifications',
        'Automatic Google review collector string',
        'Inventory & database auto-sync',
        'Zapier, Make & custom API webhooks'
      ]
    },
    {
      tier: 'Tier 3',
      title: 'Full Combo Package',
      icon: Layers,
      badge: 'Best Value',
      desc: 'The complete digital puppet master suite: custom website + full AI puppets + 24/7 string monitoring.',
      useCaseKey: 'combo',
      features: [
        'Custom website + full design system',
        '3 Custom AI automation puppets',
        'WhatsApp & Instagram API integration',
        'Monthly string performance reports',
        'Priority 24/7 string monitoring & fixes'
      ]
    }
  ];

  return (
    <section id="services" className="section-padding bg-[#FAF8F5]">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-xs font-bold text-[#B45309] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Universal Automation Offerings
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            Websites & AI <span className="text-[#D97706]">Workflow Puppets</span>
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
            Whether you are an e-commerce brand, agency, creator, local shop, or freelancer — choose your building blocks or the full suite.
          </p>
        </div>

        {/* Universal Industry Category Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-16 bg-white p-2.5 rounded-2xl border-2 border-[#D9A05B] shadow-sm">
          <div className="text-xs font-bold text-[#78716C] uppercase tracking-wider px-3 pt-2 pb-2.5 text-center">
            Select Your Business Category to Preview Custom Strings:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs transition-all ${
                    isSelected
                      ? 'bg-[#D97706] text-white shadow-md scale-[1.02]'
                      : 'bg-[#FAF8F5] text-[#44403C] hover:bg-[#FEF3C7]'
                  }`}
                >
                  <CatIcon className="w-4 h-4 shrink-0" />
                  <span className="text-center sm:text-left">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Wooden Box Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            const currentUseCase = categoryExamples[selectedCategory][srv.useCaseKey];

            return (
              <div 
                key={idx}
                className={`wooden-box p-8 flex flex-col justify-between transition-all duration-300 ${
                  srv.featured ? 'wooden-box-active' : ''
                }`}
              >
                {/* Node Pivot Header */}
                <div className="absolute -top-3 left-8">
                  <span className="puppet-node"></span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#78716C]">
                      {srv.tier}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      srv.featured 
                        ? 'bg-[#D97706] text-white' 
                        : 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]'
                    }`}>
                      {srv.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${
                      srv.featured ? 'bg-[#D97706] text-white' : 'bg-[#FEF3C7] text-[#D97706]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-[#1C1917]">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#44403C] mb-6 leading-relaxed">
                    {srv.desc}
                  </p>

                  {/* Category Live Use-Case Highlight */}
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E6DDD0] mb-6 space-y-1.5">
                    <div className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]"></span>
                      String Example for {categories.find(c => c.id === selectedCategory)?.name}:
                    </div>
                    <p className="text-xs text-[#1C1917] font-semibold leading-normal">
                      "{currentUseCase}"
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#44403C] font-semibold">
                        <Check className="w-4 h-4 text-[#D97706] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <button 
                  onClick={onOpenAudit}
                  className={`w-full justify-center ${srv.featured ? 'btn-primary' : 'btn-secondary'}`}
                >
                  <span>Build This Puppet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
