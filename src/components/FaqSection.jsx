import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

export default function FaqSection({ onOpenDemo }) {
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
    <section id="faq" className="section-padding bg-[#FAF8F5]">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-xs font-bold text-[#B45309] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#1C1917] tracking-tight">
            Got Questions About <span className="text-[#D97706]">Puppet Automations</span>?
          </h2>
          <p className="text-base sm:text-lg text-[#44403C]">
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
                className={`wooden-box transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#D97706] bg-white shadow-md' : 'bg-[#FFFDF9]'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="puppet-node shrink-0 scale-90"></span>
                    <span className="font-heading text-base sm:text-lg font-bold text-[#1C1917]">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${
                    isOpen ? 'bg-[#D97706] text-white rotate-180' : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E6DDD0] text-sm text-[#44403C] leading-relaxed animate-in slide-in-from-top-2 duration-200">
                    <p className="pl-7">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#78716C] mb-4">
            Have a custom workflow question not answered here?
          </p>
          <a 
            href="mailto:puppetifyai@gmail.com"
            className="btn-secondary text-xs px-6 py-3 inline-flex"
          >
            <span>Ask Our Puppetify Engineers</span>
            <ArrowRight className="w-4 h-4 text-[#D97706]" />
          </a>
        </div>

      </div>
    </section>
  );
}
