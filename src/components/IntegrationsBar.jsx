import React from 'react';
import { 
  Workflow, MessageSquare, Zap, CreditCard, Calendar, ShoppingBag, Database, 
  Layers, ShieldCheck, Mail, Smartphone, BarChart3
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
  { name: 'Google Sheets', category: 'Database', icon: Database },
  { name: 'Airtable', category: 'Base', icon: BarChart3 },
  { name: 'Calendly', category: 'Scheduling', icon: Calendar },
  { name: 'Make.com', category: 'Automation', icon: Workflow },
  { name: 'Twilio', category: 'SMS', icon: Smartphone },
  { name: 'Gmail', category: 'Email Engine', icon: Mail },
];

export default function IntegrationsBar() {
  return (
    <div style={{ background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '24px 0' }}>

      {/* Infinite marquee wrapper */}
      <div className="mask-fade py-2 overflow-hidden">
        <div className="animate-marquee flex items-center gap-6 w-max">
          {INTEGRATIONS.concat(INTEGRATIONS).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl glass-card text-sm font-bold text-white cursor-default select-none"
              style={{ border: '1px solid rgba(232, 215, 197, 0.25)', backgroundColor: 'rgba(255, 248, 240, 0.08)' }}
            >
              <span className="text-[#C49A6C] font-mono text-xs">•</span>
              <span style={{ color: '#FFFFFF', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
