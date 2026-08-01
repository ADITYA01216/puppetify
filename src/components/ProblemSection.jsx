import React from 'react';
import { AlertCircle, Clock, CheckCircle2, XCircle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function ProblemSection({ onOpenDemo }) {
  return (
    <section id="problem" className="section-padding relative border-y border-[var(--border-color)]" style={{ backgroundColor: '#FAF6EE' }}>
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-light)] border border-[var(--border-accent)] text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            The Small Business Reality
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Stop Pulling Every String <span className="text-[var(--primary)]">By Hand</span>.
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            As a business owner, you spend up to <strong className="text-[var(--text-primary)] font-bold">18 hours every single week</strong> manually managing reservations, answering WhatsApp messages, asking for Google reviews, and chasing inventory alerts.
          </p>
        </div>

        {/* Side-by-Side Comparison: Manual vs Puppetify Autopilot Way */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
          
          {/* Connecting Vertical String Line between sections on desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-[var(--primary)] shadow-md flex items-center justify-center text-[var(--primary)] font-mono text-xs font-bold">
              VS
            </div>
          </div>

          {/* Card 1: The Manual Way */}
          <div className="puppet-card bg-white border-red-200 p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 text-red-600 flex items-center justify-center font-bold">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    The Manual Way
                  </h3>
                  <span className="text-xs text-red-600 font-semibold">Owner Pulls Every String</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">
                18 hrs/week lost
              </span>
            </div>

            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Manually answering table booking calls during peak kitchen hours</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Forgetting to send follow-up WhatsApp messages to gym leads</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Zero automated Google review requests after customer visits</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>Running out of popular book stock or coffee beans unexpectedly</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-red-200 text-xs text-red-600 font-semibold flex items-center justify-between">
              <span>Result: Burnout & missed revenue</span>
              <span className="font-mono">High Stress</span>
            </div>
          </div>

          {/* Card 2: The Puppet.ai Autopilot Way */}
          <div className="puppet-card puppet-card-featured bg-white p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-light)] border border-[var(--border-accent)] text-[var(--primary)] flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    The Puppetify Way
                  </h3>
                  <span className="text-xs text-[var(--primary)] font-semibold">Strings Pull Themselves 24/7</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full border border-[var(--border-accent)]">
                0 hrs manual work
              </span>
            </div>

            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>Instant 24/7 online table reservation widget with auto SMS confirmation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>Automated WhatsApp pings for membership pass reminders & order updates</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>Smart 1-click Google review requests sent automatically 2 hrs post-purchase</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>Real-time inventory alerts sent straight to supplier & kitchen manager</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--primary)] font-semibold">
              <span>Result: Reclaim 18 hrs & double reviews</span>
              <span className="font-mono">100% Autopilot</span>
            </div>
          </div>

        </div>

        {/* CTA Strip */}
        <div className="mt-12 text-center">
          <a 
            href="#workflows"
            className="btn-primary inline-flex"
          >
            <span>Replace Manual Work with AI Puppets</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
