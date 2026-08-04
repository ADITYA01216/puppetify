import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export default function FaqSection({ onAction }) {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      question: 'What kinds of businesses or workflows can Puppetify automate?',
      answer: 'Puppetify builds automations for virtually any business, creator, agency, or individual! Whether you run an e-commerce store, a digital agency, a boutique shop, a coaching business, or personal workflows, we connect your tools (WhatsApp, Instagram, Shopify, Stripe, Gmail, Notion, Google Sheets, etc.) so your repetitive tasks run on autopilot.'
    },
    {
      question: 'Do I need any technical knowledge or coding skills?',
      answer: 'Zero! We handle 100% of the technical heavy lifting. We design the workflow, write the integration code, test string connections, and host the puppets on secure cloud servers. You simply watch your business run smoothly.'
    },
    {
      question: 'Which apps and platforms can Puppetify connect together?',
      answer: 'We can connect almost any modern app or web platform! Common integrations include WhatsApp Business, Instagram DMs, Shopify, WooCommerce, Stripe, OpenTable, Mindbody, Gmail, Notion, Slack, Airtable, HubSpot, Zapier, and Make.com.'
    },
    {
      question: 'How fast can a custom puppet workflow be deployed?',
      answer: 'Most puppet workflows go live in 5 to 7 business days! After your initial 15-minute String Audit, we craft the puppet, connect the API strings, run live test trials, and deploy it straight into your business.'
    },
    {
      question: 'What happens if one of my app integrations changes or breaks?',
      answer: 'Every Puppetify plan comes with 24/7 Marionette String Monitoring. If an app updates its API or a webhook fails, our system instantly alerts our team and we repair the connection before it impacts your business.'
    },
    {
      question: 'How do I get started with Puppetify?',
      answer: 'Simply click "Book Free Audit" to schedule a quick 15-minute call. We will review your current manual tasks, identify which strings will save you the most time, and map out your custom puppet roadmap.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Got Questions About <span className="gold-text">Puppet Automations</span>?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about how our puppet strings work behind the scenes to run your business.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`glass-card rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-amber-400/40 bg-amber-500/10 shadow-lg shadow-amber-500/10' : ''
                }`}
                style={{ border: '1px solid rgba(245,200,66,0.15)' }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#F5C842] shrink-0" style={{ boxShadow: '0 0 8px #F5C842' }}></span>
                    <span className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${
                    isOpen ? 'bg-[#F5C842] text-[#0D0703] rotate-180' : 'bg-amber-500/10 text-[#F5C842]'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-amber-500/15 text-sm text-slate-300 leading-relaxed">
                    <p className="pl-5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 mb-4">
            Have a custom workflow question not answered here?
          </p>
          <a 
            href="mailto:puppetifyai@gmail.com"
            className="btn-ghost text-xs px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Ask Our Puppetify Engineers</span>
            <ArrowRight className="w-4 h-4 text-[#F5C842]" />
          </a>
        </div>

      </div>
    </section>
  );
}
