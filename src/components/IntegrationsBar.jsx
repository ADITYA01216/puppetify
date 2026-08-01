import React from 'react';

const INTEGRATIONS = [
  { name: 'n8n', category: 'Workflow Engine', icon: '🔴' },
  { name: 'WhatsApp', category: 'Messaging', icon: '💬' },
  { name: 'Slack', category: 'Team Alerts', icon: '⚡' },
  { name: 'Stripe', category: 'Payments', icon: '💳' },
  { name: 'Google Calendar', category: 'Booking', icon: '📅' },
  { name: 'Zapier', category: 'Workflows', icon: '🟧' },
  { name: 'Shopify', category: 'E-Commerce', icon: '🛍️' },
  { name: 'Notion', category: 'Database', icon: '📓' },
  { name: 'HubSpot', category: 'CRM', icon: '🟧' },
  { name: 'OpenAI', category: 'AI Models', icon: '🤖' },
  { name: 'Airtable', category: 'Base', icon: '📊' },
  { name: 'Calendly', category: 'Scheduling', icon: '🗓️' },
  { name: 'Make.com', category: 'Automation', icon: '🟣' },
  { name: 'Twilio', category: 'SMS', icon: '📲' },
  { name: 'Gmail', category: 'Email Engine', icon: '✉️' },
];

export default function IntegrationsBar() {
  return (
    <div className="w-full py-6 border-y border-[#e2d5c3] relative overflow-hidden" style={{ backgroundColor: '#FAF6EE' }}>
      
      {/* Label header */}
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#8c6b43] bg-[#f0e3ce] px-3.5 py-1 rounded-full border border-[#d8c3a5]">
          ⚡ Seamless String Integrations — 100+ Apps Supported
        </span>
      </div>

      {/* Infinite marquee wrapper */}
      <div className="flex overflow-hidden select-none gap-6 mask-gradient py-2">
        <div className="flex shrink-0 animate-marquee items-center justify-around gap-6">
          {INTEGRATIONS.concat(INTEGRATIONS).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/90 border border-[#e5d8c5] shadow-sm hover:border-[#8c5e35] transition-all hover:scale-105 cursor-pointer"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-[#2b1f15] tracking-tight">{item.name}</span>
                <span className="text-[10px] font-semibold text-[#8c6b43]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
