import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, KeyRound, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: 'Restaurant',
    biggestTimeWaster: 'Booking calls & reservation management',
    name: '',
    email: '',
    phone: '',
    websiteUrl: ''
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleGoToVerification = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setInputCode(code);
    setCodeError('');
    setStep(3);
  };

  const handleFinish = async (e) => {
    if (e) e.preventDefault();

    if (inputCode !== generatedCode) {
      setCodeError('Incorrect code. Please enter the 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('https://puppet.app.n8n.cloud/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Audit Request: ${formData.businessType} - Time waste: ${formData.biggestTimeWaster} - Website: ${formData.websiteUrl || 'N/A'}`,
          verified: true,
          verificationCode: generatedCode
        }),
      });
    } catch (err) {
      console.error('Webhook error:', err);
    } finally {
      setIsSubmitting(false);
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/puppet_logo.png" 
                alt="Puppetify Logo" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="font-heading text-xl font-bold text-[var(--text-primary)]">
                  Free 15-Min Automation Audit
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  We'll map out your strings & show you where to save 15+ hours/week.
                </p>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[var(--primary)]' : 'bg-[var(--bg-subtle)]'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[var(--primary)]' : 'bg-[var(--bg-subtle)]'}`}></div>
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[var(--primary)]' : 'bg-[var(--bg-subtle)]'}`}></div>
            </div>

            {step === 1 ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    1. Select Your Business Type:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Restaurant', 'Cafe', 'Bookstore', 'Gym / Studio', 'Other Local Business'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, businessType: type})}
                        className={`p-3 rounded-xl text-xs font-bold text-left transition-all border ${
                          formData.businessType === type
                            ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                            : 'bg-[var(--bg-main)] text-[var(--text-secondary)] border-[var(--border-color)]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                    2. What takes up most of your time today?
                  </label>
                  <select 
                    value={formData.biggestTimeWaster}
                    onChange={(e) => setFormData({...formData, biggestTimeWaster: e.target.value})}
                    className="w-full p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option>Booking calls & reservation management</option>
                    <option>Answering WhatsApp & social media messages</option>
                    <option>Collecting Google reviews & customer feedback</option>
                    <option>Inventory restock alerts & supplier calls</option>
                    <option>Lead follow-ups & membership renewals</option>
                  </select>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="btn-primary w-full justify-center py-3.5 text-xs mt-4"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : step === 2 ? (
              <form onSubmit={handleGoToVerification} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Work Email
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="jane@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Current Website (Optional)
                  </label>
                  <input 
                    type="url" 
                    placeholder="https://yourbusiness.com"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="btn-secondary py-3 text-xs"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary flex-1 justify-center py-3 text-xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                    <span>Verify Identity & Proceed</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Step 3: Verification */
              <div className="space-y-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#f0e3ce] border-2 border-[#8c5e35] mx-auto flex items-center justify-center text-[#7c4a1e]">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                    Verify Email Identity
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">
                    Security Passcode generated for <strong className="text-[var(--text-primary)]">{formData.email}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fdf8f0] border border-[#d8c3a5] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c5e35]">
                    Security Passcode
                  </div>
                  <div className="font-mono text-2xl font-black text-[#2b1f15]">
                    {generatedCode}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="w-full text-center font-mono text-lg font-black py-2.5 px-3 rounded-xl border-2 border-[#8c5e35] bg-white text-[#1c1209] tracking-widest focus:outline-none shadow-inner"
                  />
                  {codeError && (
                    <p className="text-xs text-red-600 font-bold mt-1">{codeError}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="btn-secondary py-2.5 text-xs"
                  >
                    Back
                  </button>
                  <button 
                    type="button"
                    onClick={handleFinish}
                    disabled={isSubmitting}
                    className="btn-primary flex-1 justify-center py-2.5 text-xs disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#f5e096]" />
                        <span>Verify & Confirm Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] text-[var(--primary)] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)]">
              Verified Audit Confirmed!
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              We have received your verified audit request for <strong className="text-[var(--text-primary)]">{formData.name}</strong> (Verified Code: <span className="font-mono font-bold text-[#8c5e35]">{generatedCode}</span>). Our automation engineer will send a calendar invite to <span className="text-[var(--primary)] font-mono">{formData.email}</span>.
            </p>
            <button 
              onClick={onClose}
              className="btn-primary text-xs py-2.5 px-6 mx-auto"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
