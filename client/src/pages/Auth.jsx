import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  Radiation,
  AlertTriangle,
  Terminal,
  Activity,
  Cpu,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Auth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAuthorizing, setIsAuthorizing] = React.useState(false);
  const [authStep, setAuthStep] = React.useState(1);

  const handleGoogleLogin = async () => {
    setIsAuthorizing(true);
    setAuthStep(1);
    
    // Forensic Simulator: Mocking the Google Handshake delay
    setTimeout(() => setAuthStep(2), 1000);
    setTimeout(() => setAuthStep(3), 2000);
    setTimeout(() => {
      localStorage.setItem('sb-guest-session', 'true');
      localStorage.setItem('sb-mock-email', 'authorized.user@google.com');
      window.location.reload();
    }, 3500);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('sb-guest-session', 'true');
      localStorage.setItem('sb-mock-email', email);
      window.location.reload();
    } catch (error) {
      console.error('Email handshake failure:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1D1E] flex items-center justify-center relative overflow-hidden font-sans text-[#B0B8B9]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none bg-[radial-gradient(#12B886_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Abstract Mint Glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#00FFCC]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#12B886]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <AnimatePresence>
        {isAuthorizing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1D1E]/95 backdrop-blur-xl flex items-center justify-center p-8"
          >
            <div className="max-w-md w-full space-y-12 text-center">
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-[#00FFCC]/20 border-t-[#00FFCC] rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <img src="https://www.gstatic.com/lamda/images/google_logo_color_24dp.v6.png" className="w-10 h-10" alt="G" />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white tracking-widest uppercase italic">
                  {authStep === 1 && "Verifying_Provider..."}
                  {authStep === 2 && "Secure_Handshake_Active"}
                  {authStep === 3 && "Synchronizing_Core_Session"}
                </h2>
                <div className="flex justify-center gap-3">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={`h-1.5 w-12 rounded-full transition-all duration-500 ${authStep >= step ? 'bg-[#00FFCC] shadow-[0_0_10px_#00FFCC]' : 'bg-[#12B886]/10'}`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-[#12B886] font-bold uppercase tracking-[4px] opacity-60">
                   Protocol // Google_OAuth_v4.2
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-lg p-6"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-8 p-6 bg-[#00FFCC]/10 border border-[#00FFCC]/30 rounded-3xl shadow-[0_0_30px_rgba(0,255,204,0.1)] relative group"
          >
            <div className="w-20 h-20 bg-black/40 flex items-center justify-center rounded-2xl border border-[#00FFCC]/20 group-hover:border-[#00FFCC]/50 transition-all duration-500">
               <Cpu className="w-12 h-12 text-[#00FFCC]" strokeWidth={1} />
            </div>
            <div className="absolute inset-0 border border-[#00FFCC]/20 rounded-3xl animate-ping opacity-20"></div>
          </motion.div>
          
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tighter text-white">
              CodeAudit<span className="text-[#00FFCC]">AI</span>
            </h1>
            <p className="text-xs font-bold text-[#12B886] uppercase tracking-[4px] opacity-80">
              SECURE_HANDSHAKE_REQUIRED
            </p>
          </div>
        </div>

        <div className="modern-card p-12 bg-[#1A1D1E]/40 backdrop-blur-2xl border border-[#00FFCC]/20 rounded-[32px] relative shadow-2xl">
          <div className="absolute top-6 left-8 flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-[#00FFCC] animate-pulse"></div>
             <div className="w-2 h-2 rounded-full bg-[#12B886]/30"></div>
             <div className="w-2 h-2 rounded-full bg-[#12B886]/30"></div>
          </div>
          
          <div className="mt-8 space-y-8">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#12B886] uppercase tracking-[2px] ml-1">Terminal_Identifier</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_EMAIL_UPLINK"
                    className="w-full bg-black/40 border border-[#12B886]/20 rounded-xl px-5 py-4 text-xs font-mono text-[#00FFCC] placeholder:text-[#12B886]/30 focus:border-[#00FFCC]/50 focus:outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#12B886] uppercase tracking-[2px] ml-1">Access_Certificate</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/40 border border-[#12B886]/20 rounded-xl px-5 py-4 text-xs font-mono text-[#00FFCC] placeholder:text-[#12B886]/30 focus:border-[#00FFCC]/50 focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="btn-modern btn-primary w-full py-5 rounded-2xl flex items-center justify-center gap-4 group transition-all shadow-[0_0_30px_rgba(0,255,204,0.2)] border-none"
              >
                <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-extrabold uppercase tracking-[4px]">Sign In to Terminal</span>
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#12B886]/10"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-[3px] font-bold text-[#12B886]/40 bg-[#1A1D1E] px-4">Secondary_Uplink</div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              className="w-full py-4 rounded-xl border border-[#12B886]/20 bg-[#12B886]/5 text-[#12B886] hover:text-[#00FFCC] hover:border-[#00FFCC]/30 transition-all flex items-center justify-center gap-3 group"
            >
              <img src="https://www.gstatic.com/lamda/images/google_logo_color_24dp.v6.png" className="w-4 h-4 brightness-0 invert opacity-40 group-hover:opacity-100" alt="G" />
              <span className="text-[10px] font-black uppercase tracking-[3px]">Authorize via Google</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
