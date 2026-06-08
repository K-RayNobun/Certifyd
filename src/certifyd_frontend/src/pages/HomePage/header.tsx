import { useState } from "react";
import { useNavigate } from "react-router-dom";
import asset from "../../assets/academic_hero.png";
import institutionHero from "../../assets/institution_hero.png";
import { GlobalHeader } from "../../components/GlobalHeader";

export const Header = () => {
  const [certId, setCertId] = useState("");
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      navigate(`/auth/${certId.trim()}`);
    }
  };
  const [view, setView] = useState<'student' | 'institution'>('student');

  return (
    <header className="relative w-full max-w-[1600px] mx-auto pt-10 px-6 lg:px-16 flex flex-col items-center overflow-hidden min-h-[90vh] justify-center">
      {/* Dynamic background glows - more expansive */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#0066FF] blur-[180px] opacity-[0.08] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-[10%] w-[600px] h-[400px] bg-blue-400 blur-[150px] opacity-[0.05] rounded-full -z-10"></div>
      
      {/* Universal Navigation */}
      <GlobalHeader />
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

      {/* 2. EXPLANATORY + CALL TO START: What is Certifyd? */}
      <div className="w-full max-w-[1400px] relative mt-10">
         <div className="p-1 shadow-none border-none bg-transparent">
            <div className="relative bg-[#F8FAFF] rounded-[60px] p-8 md:p-20 overflow-hidden group">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 w-full h-[6px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-20"></div>
               
               <div className="flex flex-col items-center text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-8 tracking-tighter">
                     What is <span className="text-[#0066FF]">Certifyd?</span>
                  </h2>
                  
                  {/* Toggle Switch */}
                  <div className="flex bg-white p-2 rounded-full shadow-lg border border-blue-50/50">
                     <button 
                        onClick={() => setView('student')}
                        className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${view === 'student' ? 'bg-[#0066FF] text-white shadow-lg' : 'text-gray-400 hover:text-[#0A2540]'}`}
                     >
                        For Students
                     </button>
                     <button 
                        onClick={() => setView('institution')}
                        className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${view === 'institution' ? 'bg-[#0066FF] text-white shadow-lg' : 'text-gray-400 hover:text-[#0A2540]'}`}
                     >
                        For Institutions
                     </button>
                  </div>
               </div>

               <div className="transition-all duration-500 min-h-[400px]">
                  {view === 'student' ? (
                     <div className="flex flex-col lg:flex-row items-center gap-20 animate-fade-in">
                        <div className="w-full lg:w-1/2 text-left">
                           <div className="pill-badge bg-blue-50 text-[#0066FF] border-none font-black text-[10px] uppercase tracking-widest mb-6 px-4">Student Perspective</div>
                           <h3 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-8 leading-tight tracking-tighter">Your Career, <br/>Decentralized.</h3>
                           <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                              Certifyd transforms your hard-earned credentials into secure, verifiable digital assets. Built on the Internet Computer, your achievements are globally recognized, tamper-proof, and entirely under your control.
                           </p>
                           <button onClick={() => navigate('/signup')} className="btn-primary !py-5 !px-12">Secure My Legacy &rarr;</button>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                           <div className="relative">
                              <div className="absolute inset-0 bg-[#0066FF] blur-[100px] opacity-10 rounded-full"></div>
                              <img src={asset} alt="Student Cert" className="w-[100%] max-w-sm object-contain filter drop-shadow-2xl animate-slow-float" />
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col lg:flex-row items-center gap-20 animate-fade-in">
                        <div className="w-full lg:w-1/2 text-left">
                           <div className="pill-badge bg-green-50 text-green-600 border-none font-black text-[10px] uppercase tracking-widest mb-6 px-4">Institutional Perspective</div>
                           <h3 className="text-4xl md:text-5xl font-black text-[#0A2540] mb-8 leading-tight tracking-tighter">The Future of <br/>Academic Trust.</h3>
                           <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                              Streamline credentialing and eliminate fraud. Certifyd provides a robust infrastructure for schools and organizations to issue, manage, and verify diplomas with mathematical certainty and zero maintenance.
                           </p>
                           <button onClick={() => navigate('/university')} className="btn-primary !py-5 !px-12 !bg-[#0A2540]">Partner With Us &rarr;</button>
                        </div>
                        <div className="w-full lg:w-1/2 flex justify-center">
                           <div className="relative">
                              <div className="absolute inset-0 bg-[#0A2540] blur-[100px] opacity-10 rounded-full"></div>
                              <img src={institutionHero} alt="Institution Trust" className="w-[100%] max-w-sm object-contain filter drop-shadow-2xl animate-slow-float" />
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </header>
  );
};

export default Header;