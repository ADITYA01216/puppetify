import React, { useState } from 'react';
import { 
  Play, CheckCircle2, Zap, ArrowRight, RefreshCw, Cpu, Layers, ShieldCheck, Sparkles,
  Utensils, Inbox, MessageSquare, BarChart3, Dumbbell, Smartphone, ClipboardList,
  BookOpen, Package, Search, TrendingUp, Laptop, AlertTriangle, Settings, FileText,
  GraduationCap, Mail, Tag, Bot, Receipt, FileSpreadsheet, Building, AlertCircle
} from 'lucide-react';

const INDUSTRY_WORKFLOWS = [
  {
    id: 'restaurant',
    name: 'Restaurants & Cafes',
    icon: Utensils,
    description: 'Automate table bookings, order notifications, customer confirmations, and POS sheet logging seamlessly.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'New Booking / Order',
        detail: 'New booking or takeaway order received via web form or app',
        icon: Inbox,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Check Table Availability',
        detail: 'Checks seating capacity & open slot in table system',
        icon: Zap,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Send WhatsApp Confirm',
        detail: 'Dispatches instant booking confirmation & directions',
        icon: MessageSquare,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Log to Sheet / CRM',
        detail: 'Appends guest details and order info to main database',
        icon: BarChart3,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  },
  {
    id: 'gym',
    name: 'Gyms & Fitness Studios',
    icon: Dumbbell,
    description: 'Streamline member signups, trainer slot checking, automated reminders, and attendance logging.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'New Signup / Booking',
        detail: 'New membership signup or class slot requested by member',
        icon: Dumbbell,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Check Trainer Capacity',
        detail: 'Verifies instructor availability and room cap',
        icon: Zap,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Send Reminders',
        detail: 'Fires instant confirmation + 24h SMS reminder sequence',
        icon: Smartphone,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Update Attendance Log',
        detail: 'Syncs member check-in record to gym management app',
        icon: ClipboardList,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  },
  {
    id: 'retail',
    name: 'Bookstores & Retail',
    icon: BookOpen,
    description: 'Connect inventory lookups, customer SMS stock alerts, order notifications, and stock log updates.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'Order / Stock Inquiry',
        detail: 'New product order or inventory lookup request submitted',
        icon: Package,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Check Stock & Price',
        detail: 'Queries store database for quantity & active pricing',
        icon: Search,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Send Stock Alert',
        detail: 'Sends availability notification & pickup link via SMS',
        icon: MessageSquare,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Update Inventory Log',
        detail: 'Deducts stock quantity & updates master retail sheet',
        icon: TrendingUp,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  },
  {
    id: 'software',
    name: 'Software Companies',
    icon: Laptop,
    description: 'Automate build alerts, health checks, team Slack notifications, and incident log creation.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'Deploy / Error Alert',
        detail: 'New code deployment or error exception triggered',
        icon: AlertTriangle,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Check Test Suite & API',
        detail: 'Runs automated test suite & checks endpoint health',
        icon: Settings,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Post to Slack',
        detail: 'Broadcasts deployment status or bug report to dev channel',
        icon: MessageSquare,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Log Incident (if failed)',
        detail: 'Creates ticket in issue tracker if test suite fails',
        icon: FileText,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  },
  {
    id: 'teachers',
    name: 'Teachers & Educators',
    icon: GraduationCap,
    description: 'Automatically route student queries, categorize urgency, send replies, and log academic records.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'Student Email / Query',
        detail: 'Student query or assignment submission received',
        icon: Mail,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Categorize Topic & Urgency',
        detail: 'Evaluates question topic, course module, and priority',
        icon: Tag,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Auto-Reply / Route',
        detail: 'Sends FAQ answer or routes urgent note to teacher',
        icon: Bot,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Log Student Tracker',
        detail: 'Records interaction history in student progress sheet',
        icon: BookOpen,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  },
  {
    id: 'finance',
    name: 'Finance & CA Firms',
    icon: BarChart3,
    description: 'Automate invoice intake, line-item extraction, accounting sync, and anomaly review flagging.',
    steps: [
      {
        id: 1,
        type: 'TRIGGER',
        title: 'Invoice / Receipt Received',
        detail: 'Client submits digital invoice or expense receipt',
        icon: Receipt,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 2,
        type: 'LOGIC',
        title: 'Extract Line Items',
        detail: 'Extracts vendor, tax amount, and subtotal entries',
        icon: FileSpreadsheet,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 3,
        type: 'ACTION',
        title: 'Sync Accounting Tool',
        detail: 'Auto-categorizes tax ledger & posts entry to ledger software',
        icon: Building,
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 4,
        type: 'ACTION',
        title: 'Flag Anomaly Review',
        detail: 'Flags high-value or unusual entries for accountant sign-off',
        icon: AlertCircle,
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ]
  }
];

export default function WorkflowVisualizer({ onOpenDemo }) {
  const [activeTabId, setActiveTabId] = useState('restaurant');
  const [animatingStep, setAnimatingStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentWorkflow = INDUSTRY_WORKFLOWS.find(w => w.id === activeTabId) || INDUSTRY_WORKFLOWS[0];

  const handlePreviewFlow = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setAnimatingStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentWorkflow.steps.length) {
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

  return (
    <section id="workflows" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#FAF6EE' }}>
      
      {/* Subtle decorative wood border line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8c5e35] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0e3ce] border border-[#d8c3a5] text-xs font-bold text-[#6b4725] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#8c5e35]" /> Industry Workflows
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#2b1f15] tracking-tight">
            What We Automate, <span className="text-[#8c5e35]">By Industry</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5a4630] font-medium">
            Illustrative workflow examples showing how Puppetify connects your everyday business tools into seamless automated strings.
          </p>
        </div>

        {/* Top Industry Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {INDUSTRY_WORKFLOWS.map((tab) => {
            const isActive = activeTabId === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setAnimatingStep(-1);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 border shadow-sm ${
                  isActive
                    ? 'bg-[#2b1f15] text-white border-[#2b1f15] scale-[1.03] shadow-md'
                    : 'bg-white text-[#4a3625] border-[#dfd4c3] hover:border-[#8c5e35] hover:bg-[#faf4ea]'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8c5e35]'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Illustrative Workflow Box */}
        <div className="rounded-3xl bg-white border-2 border-[#d8c3a5] p-6 sm:p-10 shadow-2xl relative">
          
          {/* Header inside box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-[#ebdcc9] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6b4725] bg-[#f0e3ce] px-3 py-1 rounded-full border border-[#d8c3a5]">
                  Example Workflow
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#2b1f15] mt-3 flex items-center gap-2">
                <currentWorkflow.icon className="w-6 h-6 text-[#8c5e35]" /> {currentWorkflow.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5a4630] font-medium max-w-xl mt-1">
                {currentWorkflow.description}
              </p>
            </div>

            <button
              onClick={handlePreviewFlow}
              disabled={isPlaying}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all shrink-0 ${
                isPlaying
                  ? 'bg-[#8c5e35] opacity-80 cursor-not-allowed'
                  : 'bg-[#2b1f15] hover:bg-[#8c5e35] active:scale-95'
              }`}
            >
              {isPlaying ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Highlighting Steps...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Preview Step-By-Step
                </>
              )}
            </button>
          </div>

          {/* 4-Step Node Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 sm:gap-6 relative">
            {currentWorkflow.steps.map((step, idx) => {
              const isHighlight = animatingStep === idx;

              return (
                <div key={step.id} className="relative flex flex-col">
                  
                  {/* Connector arrow line between desktop nodes */}
                  {idx < currentWorkflow.steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 -right-4 w-8 h-[2px] bg-[#d8c3a5] z-10">
                      <div
                        className={`h-full bg-[#8c5e35] transition-all duration-300 ${
                          animatingStep > idx ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}

                  {/* Node Card */}
                  <div
                    className={`rounded-2xl p-5 border-2 flex flex-col justify-between h-full transition-all duration-300 relative ${
                      isHighlight
                        ? 'border-[#8c5e35] bg-[#fffaf3] shadow-xl scale-[1.03] ring-4 ring-[#8c5e35]/20'
                        : 'border-[#ebdcc9] bg-[#faf6ee] hover:border-[#b89b78]'
                    }`}
                  >
                    {/* Node Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${step.badgeColor}`}>
                          {step.type}
                        </span>
                        <step.icon className="w-5 h-5 text-[#8c5e35]" />
                      </div>

                      <h4 className="text-base font-extrabold text-[#2b1f15] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#5a4630] font-semibold leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    {/* Step Sequence Tag */}
                    <div className="mt-4 pt-3 border-t border-[#e8d7c2] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#8c6b43] font-bold">
                        Step 0{step.id}
                      </span>
                      {isHighlight && (
                        <span className="text-[10px] font-extrabold text-[#8c5e35] flex items-center gap-1 animate-pulse">
                          <Zap className="w-3 h-3 fill-[#8c5e35]" /> Active
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Execution Bar (Updated without live infrastructure implication) */}
          <div className="mt-10 p-5 rounded-2xl bg-[#2b1f15] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-[#8c5e35] text-white shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Custom Engineering Guaranteed</div>
                <div className="text-[#c2ab91] text-xs mt-0.5">
                  Every workflow is custom-built for your exact tools — no code required from your team.
                </div>
              </div>
            </div>

            <a
              href="mailto:puppetifyai@gmail.com"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8c5e35] hover:bg-[#a37042] text-white text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95"
            >
              <span>Build A String Workflow For Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
