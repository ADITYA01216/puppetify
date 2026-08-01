import React from 'react';
import { 
  Workflow, MessageSquare, Zap, CreditCard, Calendar, ShoppingBag, Database, 
  Bot, BarChart3, Mail, Smartphone, Layers, ShieldCheck
} from 'lucide-react';

const INTEGRATIONS = [
  { name: 'n8n', category: 'Workflow Engine', icon: Workflow },
  { name: 'WhatsApp', category: 'Messaging', icon: MessageSquare },
  { name: 'Slack', category: 'Team Alerts', icon: Zap },
  { name: 'Stripe', category: 'Payments', icon: CreditCard },
  { name: 'Google Calendar', category: 'Booking', icon: Calendar },
  { name: 'Zapier', category: 'Workflows', icon: Workflow },
  { name: 'Shopify', category: 'E-Commerce', icon: ShoppingBag },
  { name: 'Notion', category: 'Database', icon: Database },
  { name: 'HubSpot', category: 'CRM', icon: Layers },
  { name: 'OpenAI', category: 'AI Models', icon: Bot },
  { name: 'Airtable', category: 'Base', icon: BarChart3 },
  { name: 'Calendly', category: 'Scheduling', icon: Calendar },
  { name: 'Make.com', category: 'Automation', icon: Workflow },
  { name: 'Twilio', category: 'SMS', icon: Smartphone },
  { name: 'Gmail', category: 'Email Engine', icon: Mail },
];

export default function IntegrationsBar() {
  return (
    <div className="w-full py-6 border-y border-[#e2d5c3] relative overflow-hidden" style={{ backgroundColor: '#FAF6EE' }}>
      
      {/* Label header */}
      <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#8c6b43] bg-[#f0e3ce] px-3.5 py-1 rounded-full border border-[#d8c3a5] inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8c5e35]" />
          Seamless String Integrations — 100+ Apps Supported
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
              <item.icon className="w-4 h-4 text-[#8c5e35]" />
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
