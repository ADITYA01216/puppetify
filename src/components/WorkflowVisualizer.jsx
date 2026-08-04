import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SocialCards from './ui/card-fan-carousel';
import { 
  Utensils, Dumbbell, BookOpen, Laptop, GraduationCap, BarChart3, 
  ShoppingBag, Building2, Zap, CheckCircle2, Inbox, MessageSquare,
  Smartphone, ClipboardList, Package, Search, TrendingUp, AlertTriangle,
  Settings, FileText, Mail, Tag, Receipt, FileSpreadsheet, Building,
  AlertCircle, Play, RefreshCw
} from 'lucide-react';

const INDUSTRY_CARDS = [
  {
    id: 'restaurant',
    name: 'Restaurants & Cafes',
    tagline: 'Table Bookings & Kitchen Alerts',
    icon: Utensils,
    color: '#F7CE55',
    imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=750&fit=crop',
    summary: 'Automates table reservations, instant WhatsApp booking confirmations, Google review requests, and inventory alerts.',
    stringHighlights: ['Web/App Intake', 'Table Availability', 'WhatsApp Confirm', 'CRM & Sheet Log'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'New Booking / Order', detail: 'Received via web form or QR app', icon: Inbox },
      { id: 2, type: 'LOGIC', title: 'Check Table Availability', detail: 'Queries seating capacity in real-time', icon: Zap },
      { id: 3, type: 'ACTION', title: 'Send WhatsApp Confirm', detail: 'Dispatches instant booking confirmation', icon: MessageSquare },
      { id: 4, type: 'ACTION', title: 'Log to Sheet / CRM', detail: 'Appends guest details to master database', icon: BarChart3 }
    ]
  },
  {
    id: 'gym',
    name: 'Gyms & Fitness Studios',
    tagline: 'Member Signups & Pass Reminders',
    icon: Dumbbell,
    color: '#34D399',
    imgUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=750&fit=crop',
    summary: 'Streamlines membership signups, trainer slot checks, automated WhatsApp reminders, and daily check-in logs.',
    stringHighlights: ['Member Request', 'Trainer Slot Check', 'SMS/WhatsApp Ping', 'Attendance Sync'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'New Signup / Booking', detail: 'Member requests class slot or pass', icon: Dumbbell },
      { id: 2, type: 'LOGIC', title: 'Check Trainer Capacity', detail: 'Verifies instructor availability & cap', icon: Zap },
      { id: 3, type: 'ACTION', title: 'Send Reminders', detail: 'Fires instant confirmation + 24h SMS', icon: Smartphone },
      { id: 4, type: 'ACTION', title: 'Update Attendance Log', detail: 'Syncs check-in record to gym CRM', icon: ClipboardList }
    ]
  },
  {
    id: 'retail',
    name: 'Bookstores & Retail',
    tagline: 'Inventory Lookups & Stock Alerts',
    icon: BookOpen,
    color: '#60A5FA',
    imgUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&h=750&fit=crop',
    summary: 'Connects inventory lookups, customer SMS stock notifications, order updates, and automatic stock log deductions.',
    stringHighlights: ['Stock Lookup', 'Price Query', 'SMS Availability', 'Stock Log Sync'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Stock Inquiry / Order', detail: 'Customer searches title or product', icon: Package },
      { id: 2, type: 'LOGIC', title: 'Check Stock & Price', detail: 'Queries database for active inventory', icon: Search },
      { id: 3, type: 'ACTION', title: 'Send Stock Alert', detail: 'Dispatches pickup link via SMS', icon: MessageSquare },
      { id: 4, type: 'ACTION', title: 'Update Inventory Log', detail: 'Deducts stock & updates retail sheet', icon: TrendingUp }
    ]
  },
  {
    id: 'software',
    name: 'Software Companies',
    tagline: 'Build Alerts & Slack Notifications',
    icon: Laptop,
    color: '#A78BFA',
    imgUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=750&fit=crop',
    summary: 'Automates build error alerts, endpoint health checks, dev Slack broadcasts, and automatic incident ticket logging.',
    stringHighlights: ['Deploy Exception', 'API Health Check', 'Slack Channel Alert', 'Incident Ticket'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Deploy / Error Alert', detail: 'New build exception or code deploy', icon: AlertTriangle },
      { id: 2, type: 'LOGIC', title: 'Check API Health', detail: 'Runs automated test suite & endpoint ping', icon: Settings },
      { id: 3, type: 'ACTION', title: 'Post to Slack', detail: 'Broadcasts deploy status to dev team', icon: MessageSquare },
      { id: 4, type: 'ACTION', title: 'Log Incident Ticket', detail: 'Creates issue ticket if test suite fails', icon: FileText }
    ]
  },
  {
    id: 'teachers',
    name: 'Teachers & Educators',
    tagline: 'Student Queries & Auto-Routing',
    icon: GraduationCap,
    color: '#F472B6',
    imgUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=750&fit=crop',
    summary: 'Categorizes student query emails, sends automated FAQ responses, routes urgent notes, and logs progress sheets.',
    stringHighlights: ['Query Intake', 'Urgency Tagging', 'FAQ Auto-Reply', 'Student Log'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Student Query Email', detail: 'Question or assignment submitted', icon: Mail },
      { id: 2, type: 'LOGIC', title: 'Categorize & Prioritize', detail: 'Evaluates question topic & urgency', icon: Tag },
      { id: 3, type: 'ACTION', title: 'Auto-Reply / Route', detail: 'Sends FAQ answer or alerts teacher', icon: Mail },
      { id: 4, type: 'ACTION', title: 'Log Progress Sheet', detail: 'Records interaction in student tracker', icon: BookOpen }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & CA Firms',
    tagline: 'Receipt Intake & Ledger Sync',
    icon: BarChart3,
    color: '#FB923C',
    imgUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&h=750&fit=crop',
    summary: 'Automates receipt line-item extraction, tax ledger entries, accounting software sync, and anomaly review flagging.',
    stringHighlights: ['Receipt Upload', 'Line-Item Extract', 'Ledger Auto-Sync', 'Anomaly Flag'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Receipt Received', detail: 'Client submits digital invoice or receipt', icon: Receipt },
      { id: 2, type: 'LOGIC', title: 'Extract Line Items', detail: 'Extracts vendor, tax amount, & total', icon: FileSpreadsheet },
      { id: 3, type: 'ACTION', title: 'Sync Accounting Tool', detail: 'Posts entry directly to ledger software', icon: Building },
      { id: 4, type: 'ACTION', title: 'Flag Anomaly Review', detail: 'Flags high-value entries for CA audit', icon: AlertCircle }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & Orders',
    tagline: 'Abandoned Carts & Dispatch Alerts',
    icon: ShoppingBag,
    color: '#38BDF8',
    imgUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=750&fit=crop',
    summary: 'Triggers instant WhatsApp abandoned cart recovery codes, courier tracking updates, and automated review collection.',
    stringHighlights: ['Checkout Drop', 'Cart Recovery SMS', 'Courier Track', 'Review Request'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Cart Abandoned', detail: 'User leaves items in cart at checkout', icon: ShoppingBag },
      { id: 2, type: 'LOGIC', title: 'Generate Coupon Code', detail: 'Creates 10% discount promo token', icon: Tag },
      { id: 3, type: 'ACTION', title: 'Send WhatsApp Cart Link', detail: 'Dispatches 1-click cart recovery link', icon: MessageSquare },
      { id: 4, type: 'ACTION', title: 'Log Conversion', detail: 'Tracks recovered revenue in dashboard', icon: TrendingUp }
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate & Property',
    tagline: 'Site Visit Scheduling & Lead Nurturing',
    icon: Building2,
    color: '#FACC15',
    imgUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=750&fit=crop',
    summary: 'Captures property inquiries, checks agent calendar slots, dispatches site visit directions, and nurtures buyers.',
    stringHighlights: ['Property Inquiry', 'Calendar Check', 'Site Directions', 'Buyer Nurture'],
    steps: [
      { id: 1, type: 'TRIGGER', title: 'Property Inquiry', detail: 'Lead submits site visit booking form', icon: Building2 },
      { id: 2, type: 'LOGIC', title: 'Check Agent Slots', detail: 'Queries agent calendar for open slots', icon: Zap },
      { id: 3, type: 'ACTION', title: 'Send Visit Pin & Pass', detail: 'Dispatches Google Maps location & pass', icon: MessageSquare },
      { id: 4, type: 'ACTION', title: 'Update CRM Pipeline', detail: 'Logs buyer preferences in CRM pipeline', icon: BarChart3 }
    ]
  }
];

export default function WorkflowVisualizer({ onAction }) {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [animatingStep, setAnimatingStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedPlacard = INDUSTRY_CARDS[selectedIndex] || INDUSTRY_CARDS[0];

  const handlePreviewFlow = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setAnimatingStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < selectedPlacard.steps.length) {
        setAnimatingStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsPlaying(false);
          setAnimatingStep(-1);
        }, 1200);
      }
    }, 800);
  };

  // Render individual Placard card inside GSAP Fan Carousel
  const renderPlacardContent = (card, isCenter) => {
    const Icon = card.icon;

    return (
      <div 
        className={`w-full h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden relative transition-all duration-300 ${
          isCenter ? 'ring-2 ring-[#F7CE55] shadow-[0_20px_60px_rgba(247,206,85,0.3)]' : 'shadow-2xl'
        }`}
        style={{
          background: isCenter
            ? 'linear-gradient(145deg, rgba(42,25,12,0.96) 0%, rgba(18,9,3,0.98) 100%)'
            : 'linear-gradient(145deg, rgba(28,16,7,0.92) 0%, rgba(14,7,3,0.95) 100%)',
          backdropFilter: 'blur(24px)',
          border: isCenter ? '1.5px solid rgba(247,206,85,0.7)' : '1px solid rgba(232,215,197,0.25)',
        }}
      >
        {/* Background Subtle Industry Image Overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url(${card.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Top Header & Icon */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg border"
              style={{ 
                backgroundColor: `${card.color}18`,
                borderColor: `${card.color}40`,
                color: card.color 
              }}
            >
              <Icon className="w-5 h-5" />
            </div>

            <span 
              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border"
              style={{
                backgroundColor: `${card.color}15`,
                color: card.color,
                borderColor: `${card.color}30`
              }}
            >
              Autopilot
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1 leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
            {card.name}
          </h3>
          
          <p className="text-xs font-semibold mb-3 truncate" style={{ color: card.color }}>
            {card.tagline}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
            {card.summary}
          </p>
        </div>

        {/* String Highlights */}
        <div className="relative z-10 pt-3 border-t border-white/10 mt-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
            Automated String:
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {card.stringHighlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-center gap-1.5 text-[10px] text-white/90 bg-white/5 px-2 py-1 rounded-lg border border-white/10 truncate">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: card.color }} />
                <span className="truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status */}
        <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] font-bold text-slate-400">
          <span>{isCenter ? 'Center Focus' : 'Tap to Select'}</span>
          {isCenter && (
            <span className="flex items-center gap-1 text-[#F7CE55]">
              <Zap className="w-3 h-3 fill-[#F7CE55]" /> Selected
            </span>
          )}
        </div>
      </div>
    );
  };

  const cardsWithRenderer = INDUSTRY_CARDS.map(c => ({
    ...c,
    renderContent: renderPlacardContent,
  }));

  return (
    <section id="workflows" className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      
      {/* Divider */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            What We Automate, <span className="gold-text">By Industry</span>
          </h2>
          <p className="text-base sm:text-lg text-[#F7EFE7]">
            Select any industry placard below to explore how Puppetify’s automated strings replace manual work in your field.
          </p>
        </div>

        {/* GSAP 3D Card Fan Carousel */}
        <div className="w-full overflow-visible">
          <SocialCards 
            cards={cardsWithRenderer}
            selectedIndex={selectedIndex}
            onSelectCard={(idx) => {
              setSelectedIndex(idx);
              setAnimatingStep(-1);
              setIsPlaying(false);
            }}
          />
        </div>

      </div>
    </section>
  );
}
