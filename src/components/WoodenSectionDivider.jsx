import React from 'react';

export default function WoodenSectionDivider({ variant = 'default' }) {
  return (
    <div className="relative w-full py-4 overflow-hidden select-none" style={{ backgroundColor: '#FAF6EE' }}>
      {/* Background Subtle Line */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        
        {/* Left Brass Peg & Line */}
        <div className="flex-1 flex items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative shrink-0">
            <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="h-[2px] w-full bg-gradient-to-r from-[#8c5e35] via-[#d8c3a5] to-transparent ml-2" />
        </div>

        {/* Center Wooden Crossbar & String Knot Motif */}
        <div className="mx-6 px-6 py-1.5 rounded-full bg-gradient-to-r from-[#2b1f15] via-[#4a3520] to-[#2b1f15] border border-[#8c5e35] shadow-md flex items-center gap-3 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#e8d7c2] uppercase">
            PUPPETIFY • AUTOMATION STRING
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse" />
        </div>

        {/* Right Brass Peg & Line */}
        <div className="flex-1 flex items-center">
          <div className="h-[2px] w-full bg-gradient-to-l from-[#8c5e35] via-[#d8c3a5] to-transparent mr-2" />
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#f5e096] via-[#c89b3c] to-[#5c3a1e] border border-[#2b190c] shadow-sm relative shrink-0">
            <div className="w-1 h-1 rounded-full bg-[#2b190c] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

      </div>
    </div>
  );
}
