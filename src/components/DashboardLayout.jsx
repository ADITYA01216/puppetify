import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Bot, Workflow, CreditCard, Settings, Key, User, 
  LogOut, Sparkles, Menu, X, ChevronRight, ShieldCheck 
} from 'lucide-react';

export default function DashboardLayout() {
  const { fullName, userEmail, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Puppets', path: '/puppets', icon: Bot },
    { name: 'Workflow Builder', path: '/workflows', icon: Workflow },
    { name: 'Billing', path: '/billing', icon: CreditCard },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'API Keys', path: '/api-keys', icon: Key },
    { name: 'Account', path: '/account', icon: User },
  ];

  const firstName = fullName ? fullName.split(' ')[0] : 'User';

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: 'var(--bg-deep)' }}>
      
      {/* ── DESKTOP SIDEBAR ── */}
      <aside 
        className="hidden md:flex flex-col w-64 border-r border-amber-500/20 p-5 shrink-0 min-h-screen sticky top-0"
        style={{ backgroundColor: 'var(--bg-dark)' }}
      >
        {/* Brand Header */}
        <Link to="/" className="flex items-center gap-3 px-2 py-3 mb-6">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* User Card */}
        <div className="p-3.5 rounded-2xl glass-card border border-amber-500/20 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F5C842] font-bold text-sm">
            {firstName[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{fullName || 'Puppetify User'}</div>
            <div className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F5C842]" />
              <span>{profile?.credits_remaining ?? 100} Credits</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-[#F5C842] border border-amber-500/30 shadow-md'
                      : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Footer */}
        <div className="pt-4 border-t border-amber-500/20">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold text-xs border border-red-500/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ── MOBILE HEADER BAR ── */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-amber-500/20 sticky top-0 z-40 bg-[#120A04]/95 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/assets/puppet_logo.png" 
            alt="Puppetify Logo" 
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-[#F5C842] font-mono bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-500/30">
            {profile?.credits_remaining ?? 100} CR
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl text-amber-300 hover:bg-amber-500/10 transition-colors"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER MENU ── */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-[#0D0703]/95 backdrop-blur-xl p-5 flex flex-col justify-between animate-fadeIn">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-amber-500/20 text-[#F5C842] border border-amber-500/40'
                        : 'text-slate-200 hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-amber-500/20">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                handleSignOut();
              }}
              className="w-full py-3.5 rounded-xl bg-red-500/10 text-red-300 font-bold text-sm border border-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT VIEWPORT ── */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

    </div>
  );
}
