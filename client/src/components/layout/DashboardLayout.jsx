import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#1A1D1E] flex text-[#B0B8B9] font-sans selection:bg-[#00FFCC]/20 selection:text-white">
      {/* Sidebar - Fixed width */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1A1D1E] relative overflow-hidden">
        {/* Subtle grid pattern for protocol depth */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(18,184,134,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,184,134,0.1)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>
        <Header />
        
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Cyber-Mint Status Bar */}
        <footer className="h-10 border-t border-[#12B886]/20 bg-[#1A1D1E]/90 backdrop-blur-xl px-10 flex items-center justify-between text-[9px] text-[#12B886] font-bold uppercase tracking-[2px] relative z-10">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC] animate-pulse shadow-[0_0_10px_#00FFCC]"></span>
              WORKSPACE_STABLE
            </span>
            <div className="w-px h-2.5 bg-[#12B886]/30"></div>
            <span>SECURE_UPLINK_SYNCHRONIZED</span>
          </div>
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            CODEAUDIT <span className="text-[#00FFCC]">MINT_CORE</span> v4.2.0_STABLE
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;


