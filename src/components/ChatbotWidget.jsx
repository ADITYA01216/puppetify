import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm here to help you learn about our automation services. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const userText = input.trim();
    if (!userText || isLoading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://puppet.app.n8n.cloud/webhook/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data?.reply || data?.message || data?.text || "Thank you for reaching out! Our automation engine has received your message.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: replyText
        }
      ]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          isError: true,
          text: "Something went wrong, please try again or reach out through our contact form."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      
      {/* ── EXPANDED CHAT PANEL ── */}
      {isOpen && (
        <div 
          className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-[#FFFDF9] border-2 border-[#8c5e35] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200"
          style={{ backdropFilter: 'blur(12px)' }}
        >
          {/* Panel Header */}
          <div className="bg-[#2b1f15] text-white p-4 flex items-center justify-between border-b-2 border-[#8c5e35] relative">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/assets/puppet_logo.png" 
                  alt="Puppetify Logo" 
                  className="h-8 w-auto object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
                  Chat with Puppetify
                  <Sparkles className="w-3.5 h-3.5 text-[#c8a96e]" />
                </h3>
                <p className="text-[10px] text-[#e8d7c2] font-mono">
                  Automation Assistant • Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-[rgba(255,255,255,0.15)] text-[#e8d7c2] hover:text-white transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF6EE]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${
                      isUser
                        ? 'bg-[#8c5e35] text-white'
                        : 'bg-[#2b1f15] text-[#e8d7c2] border border-[#8c5e35]'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-medium shadow-sm ${
                      isUser
                        ? 'bg-[#1c1209] text-white rounded-tr-none'
                        : msg.isError
                        ? 'bg-rose-50 text-rose-800 border border-rose-200 rounded-tl-none'
                        : 'bg-[#f0e3ce] text-[#2b1f15] border border-[#d8c3a5] rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#2b1f15] text-[#e8d7c2] border border-[#8c5e35] shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#f0e3ce] border border-[#d8c3a5] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#8c5e35] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-[#8c5e35] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-[#8c5e35] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#ebdcc9] flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#d8c3a5] bg-[#faf6ee] text-xs text-[#1c1209] font-medium placeholder-[#a08a74] focus:outline-none focus:border-[#8c5e35] focus:bg-white transition-all shadow-inner"
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#1c1209] hover:bg-[#8c5e35] disabled:opacity-40 disabled:hover:bg-[#1c1209] text-white transition-all shadow-md active:scale-95 shrink-0"
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

        </div>
      )}

      {/* ── FLOATING TRIGGER CIRCULAR BUTTON ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative p-3.5 rounded-full shadow-2xl border-2 border-[#8c5e35] flex items-center justify-center transition-all duration-300 active:scale-90 ${
          isOpen
            ? 'bg-[#1c1209] text-white'
            : 'bg-[#2b1f15] hover:bg-[#8c5e35] text-white hover:scale-110'
        }`}
        title={isOpen ? "Close Chat" : "Chat with Puppetify Assistant"}
      >
        {/* Glow Ring effect when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#8c5e35] opacity-40 blur-sm group-hover:opacity-75 transition-opacity" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#f5e096]" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#2b1f15]"></span>
            </span>
          </div>
        )}
      </button>

    </div>
  );
}
