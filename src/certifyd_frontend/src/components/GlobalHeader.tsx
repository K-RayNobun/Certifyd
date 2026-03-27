import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const GlobalHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.includes('/auth/');

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-b-[2px] border-blue-50/50 px-6 lg:px-12 flex justify-between items-center transition-all h-24">
      <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
         <div className="w-12 h-12 rounded-2xl bg-[#0A2540] flex items-center justify-center font-black text-xl text-white group-hover:bg-[#0066FF] shadow-3xl transition-transform group-hover:scale-105">C</div>
         <span className="text-2xl font-black tracking-tighter text-[#0A2540] group-hover:text-[#0066FF] transition-colors">Certifyd.</span>
      </div>
      
      {!isAuthPage && (
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[4px] text-gray-500">
           
           <button onClick={() => navigate('/')} className={`hover:text-[#0066FF] transition-all ${location.pathname === '/' ? 'text-[#0066FF]' : ''}`}>
             Home
           </button>

           {/* Dropdown 1: Solutions */}
           <div className="relative group cursor-pointer py-10">
              <span className="hover:text-[#0066FF] transition-all flex items-center gap-2">
                 Solutions
                 <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </span>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] bg-white border-2 border-blue-50/50 shadow-[0_40px_80px_rgba(0,102,255,0.08)] rounded-[24px] overflow-hidden opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                 <div className="p-4 flex flex-col gap-2">
                    <div onClick={() => navigate('/student')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group/item">
                       <span className="text-2xl group-hover/item:scale-110 transition-transform">🎓</span>
                       <div className="text-left">
                          <p className="text-[10px] text-[#0066FF] font-black uppercase tracking-[2px] mb-1">For Students</p>
                          <p className="text-[11px] text-[#0A2540] font-bold tracking-tight normal-case">Own your academic legacy</p>
                       </div>
                    </div>
                    <div onClick={() => navigate('/university')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors group/item">
                       <span className="text-2xl group-hover/item:scale-110 transition-transform">🏛️</span>
                       <div className="text-left">
                          <p className="text-[10px] text-[#0066FF] font-black uppercase tracking-[2px] mb-1">For Institutions</p>
                          <p className="text-[11px] text-[#0A2540] font-bold tracking-tight normal-case">Mint credentials on ICP</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Dropdown 2: Company */}
           <div className="relative group cursor-pointer py-10">
              <span className="hover:text-[#0066FF] transition-all flex items-center gap-2">
                 Company
                 <svg className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
              </span>
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[280px] bg-white border-2 border-blue-50/50 shadow-[0_40px_80px_rgba(0,102,255,0.08)] rounded-[24px] overflow-hidden opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                 <div className="p-4 flex flex-col gap-2">
                    <div onClick={() => navigate('/about-us')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors group/item">
                       <span className="text-2xl group-hover/item:scale-110 transition-transform">🌍</span>
                       <div className="text-left">
                          <p className="text-[10px] text-green-600 font-black uppercase tracking-[2px] mb-1">About Us</p>
                          <p className="text-[11px] text-[#0A2540] font-bold tracking-tight normal-case">The core protocol team</p>
                       </div>
                    </div>
                    <div onClick={() => navigate('/faq')} className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50 transition-colors group/item">
                       <span className="text-2xl group-hover/item:scale-110 transition-transform">💡</span>
                       <div className="text-left">
                          <p className="text-[10px] text-purple-600 font-black uppercase tracking-[2px] mb-1">Help & FAQ</p>
                          <p className="text-[11px] text-[#0A2540] font-bold tracking-tight normal-case">Learn how Certifyd works</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      )}

      <div className="flex items-center gap-6">
         {isAuthPage ? (
            <>
               <span className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px] hidden md:block">Blockchain Verified Record</span>
               <button onClick={() => navigate('/login')} className="pill-badge pill-badge-premium py-3 px-8 !h-auto border-2 border-blue-100/50 hover:bg-[#0066FF] hover:text-white transition-all shadow-xl">Portal Login</button>
            </>
         ) : (
            <>
               <button onClick={() => navigate('/login')} className="text-[10px] font-black uppercase tracking-[4px] text-[#0A2540] hover:text-[#0066FF] transition-all hidden sm:block">Sign In</button>
               <button 
                 onClick={() => navigate('/signup')}
                 className="py-4 px-8 bg-[#0066FF] hover:bg-[#0A2540] text-white rounded-full font-black text-[10px] tracking-[4px] uppercase transition-all shadow-2xl active:scale-95"
               >
                 Launch App
               </button>
            </>
         )}
      </div>
    </nav>
  );
};
