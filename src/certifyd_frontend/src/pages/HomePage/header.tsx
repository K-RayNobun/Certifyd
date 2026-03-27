import { useState } from "react";
import { useNavigate } from "react-router-dom";
import asset from "../../assets/academic_hero.png";
import logo from "../../assets/logo.png";

export const Header = () => {
  const [certId, setCertId] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      navigate(`/auth/${certId.trim()}`);
    }
  };

  return (
    <header className="relative w-full max-w-[1600px] mx-auto pt-10 px-6 lg:px-16 flex flex-col items-center overflow-hidden min-h-[90vh] justify-center">
      {/* Dynamic background glows - more expansive */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#0066FF] blur-[180px] opacity-[0.08] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-[10%] w-[600px] h-[400px] bg-blue-400 blur-[150px] opacity-[0.05] rounded-full -z-10"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-blue-50/50 py-5">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="Certifyd Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black tracking-tighter text-[#0A2540] group-hover:text-[#0066FF] transition-colors">Certifyd</span>
          </div>
          
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[4px] text-[#0A2540]/50">
          <a href="#features" className="hover:text-[#0066FF] transition-all hover:tracking-[6px]">Protocol</a>
          <a href="#students" className="hover:text-[#0066FF] transition-all hover:tracking-[6px]">Collections</a>
          <a href="#onboarding" className="hover:text-[#0066FF] transition-all hover:tracking-[6px]">Consortium</a>
        </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/login')} className="text-xs font-black uppercase tracking-widest text-[#0A2540] hover:text-[#0066FF]">Sign In</button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn-primary !py-3 !px-10 !text-[10px] shadow-2xl !bg-[#0066FF] border-none"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Expanded Hero Section */}
      <div className="text-center max-w-6xl relative z-10 pt-20">
        <div className="mb-12 flex justify-center">
           <span className="pill-badge border-blue-100 bg-blue-50/40 text-[#0066FF] px-10 py-4 font-black tracking-[4px] uppercase text-[10px] shadow-sm hover:bg-[#0066FF] hover:text-white transition-all cursor-default">
              <span className="relative flex h-2 w-2 mr-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
              </span>
              Empowering 1Million+ Students globally
           </span>
        </div>

        <h1 className="text-7xl md:text-hero-size font-black mb-12 leading-[0.85] tracking-[-0.05em] text-[#0A2540]">
           Your Success, <br />
           <span className="text-gradient">Immutable.</span>
        </h1>
        
        <p className="text-xl md:text-[28px] text-gray-400 font-medium mb-20 max-w-3xl mx-auto leading-relaxed">
           The gold-standard for sovereign identity. Secure your academic legacy on the blockchain as <span className="text-[#0066FF] font-black">Soulbound Proof</span>.
        </p>

        {/* ARRANGED SEARCH BAR - Thinner and more dynamic */}
        <div className="relative max-w-4xl mx-auto mb-32">
          <form onSubmit={handleVerify} className="relative group/form">
            <div className="absolute inset-x-[-15px] inset-y-[-15px] bg-gradient-to-r from-blue-600/15 to-transparent blur-3xl opacity-0 group-focus-within/form:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            <div className="relative flex items-center bg-white rounded-[32px] border-2 border-blue-50/50 shadow-[0_25px_60px_rgba(0,102,255,0.06)] p-2 focus-within:border-[#0066FF] transition-all overflow-hidden group-hover/form:shadow-[0_25px_60px_rgba(0,102,255,0.12)] group-hover/form:-translate-y-0.5">
               <div className="pl-6 text-[#0066FF]">
                  <span className="text-xl font-black italic tracking-tighter opacity-15 group-focus-within/form:opacity-100 transition-opacity">ID//</span>
               </div>
               <input 
                type="text" 
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Paste Certificate ID to Verify Authenticity..."
                className="w-full py-5 px-5 bg-transparent text-xl font-black outline-none placeholder:text-gray-200 text-[#0A2540]"
              />
              <button 
                type="submit"
                className="group/btn relative bg-[#0066FF] hover:bg-[#005AE0] text-white overflow-hidden rounded-[24px] font-black tracking-[4px] uppercase transition-all duration-500 shadow-xl active:scale-95 flex items-center justify-center gap-3 px-8 py-5 min-w-[70px] hover:min-w-[220px]"
              >
                <span className="flex items-center gap-3 transition-all duration-500">
                  <span className="w-0 overflow-hidden group-hover/btn:w-auto opacity-0 group-hover/btn:opacity-100 group-hover/btn:text-xl transition-all duration-500 whitespace-nowrap">
                    VERIFY
                  </span>
                  <svg className="w-6 h-6 transition-transform duration-500 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center gap-12 mt-8 opacity-40">
             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                No Sign-up required for verification
             </div>
             <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[2px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Public Ledger Access
             </div>
          </div>
        </div>
      </div>

      {/* Ultra-wide Hero Visual Wrapper */}
      <div className="w-full max-w-[1400px] relative mt-10">
         <div className="card-nft p-1 shadow-none border-none bg-transparent hover:scale-[1.01] transition-all duration-1000">
            <div className="relative bg-[#F8FAFF] rounded-[60px] p-2 md:p-16 border-[5px] border-white shadow-3xl overflow-hidden group">
               <div className="absolute top-0 right-0 w-full h-[6px] bg-gradient-to-r from-transparent via-[#0066FF] down-to-transparent opacity-20"></div>
               <div className="flex flex-col lg:flex-row items-center gap-20">
                  <div className="w-full lg:w-1/2 p-4">
                     <div className="flex items-center gap-6 mb-12">
                        <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-4xl transform -rotate-3 group-hover:rotate-0 transition-transform">🎓</div>
                        <div>
                           <div className="pill-badge bg-green-50 text-green-600 border-none font-black text-[10px] uppercase tracking-widest mb-2 px-4 shadow-sm">Verified Legacy</div>
                           <h3 className="text-3xl font-black text-[#0A2540]">Bachelor's in Digital Ethics</h3>
                        </div>
                     </div>
                     <div className="space-y-6 mb-12">
                        <div className="flex justify-between items-center border-b border-blue-100 pb-4">
                           <span className="text-xs font-black uppercase tracking-widest text-gray-400">Issuer</span>
                           <span className="text-sm font-black text-[#0A2540]">University of Oxford</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-blue-100 pb-4">
                           <span className="text-xs font-black uppercase tracking-widest text-gray-400">Verified at</span>
                           <span className="text-sm font-black text-[#0066FF]">2026-03-27T11:35</span>
                        </div>
                     </div>
                     <button className="pill-badge bg-black text-white px-10 py-4 !h-auto border-none shadow-xl group-hover:bg-[#0066FF] transition-all">Download Proof PDF</button>
                  </div>
                  <div className="w-full lg:w-1/2 flex justify-center">
                     <img src={asset} alt="Cert" className="w-[100%] max-w-sm object-contain filter drop-shadow-[0_20px_40px_rgba(0,102,255,0.2)] group-hover:scale-110 transition-transform duration-1000" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </header>
  );
};

export default Header;