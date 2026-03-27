import { useState } from "react";
import { useNavigate } from "react-router-dom";
import asset from "../../assets/academic_hero.png";

export const Layout = () => {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSent(false), 4000);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-40 pb-40">
      
      {/* 1. SECTIONS: Primary Value Props */}
      <section id="features" className="pt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black mb-4 tracking-tighter text-[#0A2540]">The Logic of <span className="text-[#0066FF]">Trust.</span></h2>
            <p className="text-xl text-gray-500 font-medium">We replaced manual, expensive background checks with cryptographic math.</p>
          </div>
          <button onClick={() => scrollTo('onboarding')} className="pill-badge pill-badge-premium border-blue-100 bg-blue-50/50 hover:bg-[#0066FF] hover:text-white transition-all py-4 px-10 !h-auto">Explore Protocol &rarr;</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="card-nft bg-white border-2 border-blue-50/50 group overflow-hidden shadow-2xl p-8 hover:border-[#0066FF] transition-all">
            <div className="flex items-center gap-3 mb-10">
               <span className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-sm">✖</span>
               <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Legacy Method</span>
            </div>
            <div className="space-y-6 mb-12 opacity-40">
               <div className="h-3 w-full bg-gray-100 rounded-full"></div>
               <div className="h-3 w-3/4 bg-gray-100 rounded-full"></div>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-[2px]">30 Days Wait Time</p>
            </div>
            <div className="flex items-center gap-3 mb-6">
               <span className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-[#0066FF] text-sm">✔</span>
               <span className="text-xs font-black text-[#0066FF] uppercase tracking-widest">Certifyd Logic</span>
            </div>
            <div className="h-3 w-full bg-[#0066FF] rounded-full mb-6 shadow-[0_0_20px_rgba(0,102,255,0.4)]"></div>
            <h3 className="text-2xl font-black mb-4 text-[#0A2540]">0.5s Verification</h3>
            <p className="text-gray-500 font-medium">Direct source validation with no human intermediaries.</p>
          </div>

          <div className="card-nft bg-[#0A2540] border-none text-white group relative overflow-hidden p-8 shadow-4xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF] blur-[100px] opacity-30"></div>
             <div className="h-64 mb-8 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-center relative overflow-hidden">
                <span className="text-8xl relative z-10 filter drop-shadow-[0_0_30px_rgba(0,102,255,0.5)]">🏛️</span>
             </div>
             <h3 className="text-2xl font-black mb-4">Eternal Library</h3>
             <p className="text-blue-100/60 font-medium leading-relaxed mb-8">Built on the Internet Computer. Records are distributed across an unstoppable global network.</p>
             <div className="flex items-center gap-8">
                <div>
                   <p className="text-[10px] font-black text-blue-300 opacity-40 uppercase tracking-[3px] mb-1">Status</p>
                   <p className="text-xl font-black text-[#00C6FF]">100% Uptime</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10"></div>
                <div>
                   <p className="text-[10px] font-black text-blue-300 opacity-40 uppercase tracking-[3px] mb-1">Network</p>
                   <p className="text-xl font-black text-white italic">Trustless</p>
                </div>
             </div>
          </div>

          <div onClick={() => navigate('/student')} className="card-nft p-8 bg-white border-2 border-blue-50/50 hover:border-[#0066FF] transition-all shadow-2xl cursor-pointer group">
            <div className="h-64 mb-8 relative bg-blue-50/40 rounded-[32px] flex items-center justify-center gap-6">
               <div className="w-20 h-20 rounded-[32px] bg-[#0066FF] flex items-center justify-center text-white font-black text-4xl shadow-3xl">in</div>
               <div className="w-20 h-20 rounded-[32px] bg-black flex items-center justify-center text-white font-black text-4xl shadow-3xl">𝕏</div>
            </div>
            <h3 className="text-2xl font-black mb-4 text-[#0A2540]">Social Sovereignty</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Attach soulbound credentials directly to your global talent profiles.</p>
            <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-widest mt-6 group-hover:underline">Learn More →</p>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section id="onboarding" className="py-32 relative px-8 md:px-24 bg-blue-50/20 rounded-[80px] border-2 border-blue-50/50 overflow-hidden">
         <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#0066FF] blur-[200px] opacity-[0.03] rounded-full"></div>
         <div className="flex flex-col lg:flex-row gap-24 items-center relative z-10">
            <div className="lg:w-1/3">
               <h2 className="text-6xl font-black mb-8 leading-[0.9] tracking-tighter text-[#0A2540]">Join the <br /><span className="text-[#0066FF]">Consortium.</span></h2>
               <p className="text-xl text-gray-500 font-medium mb-12">Empowering institutions to bridge the trust gap with effortless onboarding.</p>
               <button onClick={() => navigate('/university')} className="btn-primary !py-5 !px-16 shadow-[0_20px_40px_rgba(0,102,255,0.25)] !bg-[#0066FF]">Partner &rarr;</button>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-16">
               <div className="relative group">
                  <span className="text-[160px] font-black text-[#0066FF] opacity-5 absolute -top-24 -left-8 group-hover:opacity-10 transition-opacity pointer-events-none">1</span>
                  <div className="relative z-10">
                     <h4 className="text-2xl font-black mb-6 text-[#0A2540] flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_10px_#0066FF]"></span>
                        Onboard
                     </h4>
                     <p className="text-gray-500 font-medium leading-relaxed">Sync legacy databases with our encrypted gateway securely.</p>
                  </div>
               </div>
               <div className="relative group">
                  <span className="text-[160px] font-black text-[#0066FF] opacity-5 absolute -top-24 -left-8 group-hover:opacity-10 transition-opacity pointer-events-none">2</span>
                  <div className="relative z-10">
                     <h4 className="text-2xl font-black mb-6 text-[#0A2540] flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_10px_#0066FF]"></span>
                        Mint
                     </h4>
                     <p className="text-gray-500 font-medium leading-relaxed">Convert records into permanent Soulbound NFTs instantly.</p>
                  </div>
               </div>
               <div className="relative group">
                  <span className="text-[160px] font-black text-[#0066FF] opacity-5 absolute -top-24 -left-8 group-hover:opacity-10 transition-opacity pointer-events-none">3</span>
                  <div className="relative z-10">
                     <h4 className="text-2xl font-black mb-6 text-[#0A2540] flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_10px_#0066FF]"></span>
                        Verify
                     </h4>
                     <p className="text-gray-500 font-medium leading-relaxed">Grant recruiters power of 1-click cryptographic proof.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. COLLECTIONS */}
      <section id="students">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl font-black mb-6 tracking-tighter text-[#0A2540]">Academic <span className="text-[#0066FF]">Collections</span></h2>
            <div className="flex items-center gap-4 uppercase font-black text-[10px] tracking-[4px] text-blue-500 bg-blue-50 px-6 py-2.5 rounded-full w-fit animate-pulse">
               <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_#0066FF]"></span>
               Network Activity Hub
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Certificate 1 */}
          <div onClick={() => navigate('/login')} className="card-nft p-4 bg-white border-2 border-blue-50/50 hover:border-[#0066FF] transition-all shadow-3xl cursor-pointer group">
            <div className="h-72 bg-blue-50/40 rounded-[32px] mb-8 relative flex items-center justify-center overflow-hidden">
               <div className="absolute top-6 left-6 pill-badge bg-white shadow-xl text-[#0066FF] z-10 font-black text-[10px] !py-2 !px-5">🏛️ UNIVERSITY</div>
               <img src={asset} alt="Cert" className="h-[80%] object-contain relative z-10 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="px-4 pb-4">
               <h3 className="text-2xl font-black mb-2 text-[#0A2540]">Computer Science</h3>
               <p className="text-sm font-bold text-gray-400 mb-8 tracking-wider">Stanford University • Honors Graduate</p>
               <hr className="mb-8 border-blue-50" />
               <div className="flex justify-between items-center bg-gray-50 p-6 rounded-2xl">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[3px] mb-1">Impact</p>
                    <p className="text-lg font-black text-[#0A2540]">2.4K Verifications</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-[3px] mb-1">Status</p>
                    <p className="text-lg font-black text-green-600 italic">Live</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="card-nft p-4 bg-[#0A2540] border-none text-white relative shadow-4xl overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent"></div>
             <div className="h-72 bg-white/5 rounded-[32px] mb-8 relative flex items-center justify-center overflow-hidden border border-white/5">
                <div className="absolute top-6 left-6 pill-badge bg-[#0066FF] text-white border-none shadow-xl z-10 font-black text-[10px] !py-2 !px-5">⚡ MICRO-CERT</div>
                <img src={asset} alt="Cert" className="h-[75%] object-contain relative z-10 filter brightness-110 group-hover:scale-110 transition-transform duration-700" />
             </div>
             <div className="px-4 pb-4">
                <h3 className="text-2xl font-black mb-2 tracking-tight">Applied Cryptography</h3>
                <p className="text-sm font-bold text-blue-300 opacity-50 mb-8 tracking-wider italic">Certifyd Labs • Platinum Badge</p>
                <button onClick={() => navigate('/student')} className="w-full py-5 bg-[#0066FF] rounded-2xl font-black text-xs tracking-[5px] uppercase shadow-2xl hover:bg-white hover:text-black transition-all">Learn More</button>
             </div>
          </div>

          {/* Empty State / CTA */}
          <div onClick={() => navigate('/signup')} className="card-nft p-12 bg-white border-4 border-dashed border-blue-100 flex flex-col items-center justify-center text-center hover:bg-blue-50/50 transition-colors cursor-pointer group">
             <div className="w-24 h-24 rounded-[40px] bg-white shadow-3xl text-[#0066FF] text-4xl font-black flex items-center justify-center mb-10 group-hover:rotate-12 group-hover:bg-[#0066FF] group-hover:text-white transition-all">+</div>
             <h3 className="text-3xl font-black mb-4 text-[#0A2540]">Partner Registry.</h3>
             <p className="text-gray-400 font-medium mb-10 max-w-[240px]">Be the next to secure your student's future.</p>
             <button className="pill-badge bg-black text-white px-12 py-4 !h-auto border-none font-black text-[10px] tracking-[4px] group-hover:bg-[#0066FF] transition-all">Apply &rarr;</button>
          </div>
        </div>
      </section>

      {/* 5. CONSORTIUM DISPLAY */}
      <section className="dark-section p-16 md:p-32 mx-auto max-w-[1500px] shadow-4xl relative overflow-hidden bg-[#0A2540] rounded-[80px]">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066FF] blur-[220px] opacity-20 rounded-full animate-pulse"></div>
         <div className="flex flex-col md:flex-row justify-between items-center mb-32 gap-16 relative z-10">
            <div className="text-center md:text-left">
               <h2 className="text-6xl font-black text-white mb-6 leading-tight tracking-tighter font-display">The Global Trust <br /> <span className="text-[#00C6FF]">Consortium.</span></h2>
               <p className="text-blue-100/30 font-black uppercase tracking-[8px] text-xs">Standardizing Human Potential</p>
            </div>
            <div className="flex items-center gap-16 bg-white/5 border border-white/5 px-16 py-12 rounded-[60px] backdrop-blur-3xl shadow-4xl">
               <div>
                  <p className="text-[11px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-4 text-center md:text-left">Entities Registered</p>
                  <p className="text-6xl font-black text-[#00C6FF] tracking-tighter">1,200+</p>
               </div>
               <div className="w-[1px] h-20 bg-white/10 hidden md:block"></div>
               <div className="hidden md:block">
                  <p className="text-[11px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-4">Total Minted</p>
                  <p className="text-6xl font-black text-white tracking-tighter">1.8M</p>
               </div>
            </div>
         </div>
         <div className="flex flex-wrap items-center justify-center gap-16 md:gap-28 relative z-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} onClick={() => navigate('/university')} className="flex flex-col items-center group cursor-pointer group">
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-[48px] border border-white/5 shadow-2xl flex items-center justify-center mb-8 transition-all duration-700 group-hover:bg-[#0066FF]/20 group-hover:border-[#0066FF]/50 group-hover:-translate-y-6 group-hover:shadow-[0_40px_80px_rgba(0,102,255,0.3)]">
                    <span className="text-5xl text-white group-hover:scale-125 transition-transform">🏛️</span>
                 </div>
                 <p className="font-black text-white text-[10px] tracking-[4px] uppercase opacity-0 group-hover:opacity-40 transition-all">Consort-00{i}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 6. FINAL CTA & FOOTER */}
      <section className="max-w-[1400px] mx-auto rounded-[80px] bg-[#121212] flex flex-col lg:flex-row items-center justify-between p-16 lg:p-32 tracking-tight relative overflow-hidden shadow-4xl mt-12 border border-white/5 group">
         <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#0066FF] blur-[250px] opacity-[0.15] rounded-full group-hover:opacity-20 transition-opacity duration-1000"></div>
         <div className="lg:w-1/2 relative z-10 text-center lg:text-left mb-24 lg:mb-0">
            <p className="text-[#00C6FF] font-black text-xs uppercase tracking-[8px] mb-8">Ready to evolve?</p>
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-16 leading-[0.85] tracking-[-0.05em]">
               Own your <br />
               <span className="text-gradient">Legacy.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
               <button onClick={() => navigate('/signup')} className="btn-primary !py-7 !px-20 !text-xl !h-auto shadow-4xl !bg-[#0066FF] hover:scale-110 active:scale-95 transition-all">Enter App</button>
               <button onClick={() => navigate('/faq')} className="text-white font-black flex items-center gap-6 text-sm group tracking-[5px] uppercase">
                  Documentation 
                  <span className="group-hover:translate-x-6 transition-transform">&rarr;</span>
               </button>
            </div>
         </div>
         <div className="lg:w-1/2 relative z-10 flex justify-center lg:justify-end pr-0 lg:pr-20">
            <div className="bg-gradient-to-br from-[#1C1C1C] to-[#0A2540] rounded-[64px] p-12 shadow-[0_100px_200px_rgba(0,0,0,0.8)] border-2 border-white/5 w-[400px] transform rotate-3 hover:rotate-0 transition-all duration-1000 group hover:scale-[1.05]">
               <div className="absolute top-[-30px] -right-8 bg-[#0066FF] text-white px-8 py-4 rounded-[28px] font-black text-sm shadow-[0_20px_40px_rgba(0,102,255,0.4)] z-20 border-8 border-[#121212] tracking-widest animate-bounce">VERIFIED</div>
               <div className="w-28 h-28 bg-white/5 rounded-[40px] mb-12 flex items-center justify-center text-6xl border border-white/10 shadow-inner">👤</div>
               <div className="h-4 w-full bg-white/10 rounded-full mb-6"></div>
               <div className="h-4 w-2/3 bg-white/5 rounded-full mb-16"></div>
               <div className="grid grid-cols-2 gap-6 mb-12">
                  <div className="h-20 bg-white/5 rounded-[32px] border border-white/5"></div>
                  <div className="h-20 bg-[#0066FF]/10 rounded-[32px] border border-[#0066FF]/20 shadow-inner"></div>
               </div>
               <div className="w-full py-6 bg-white/5 rounded-full border border-white/10 flex items-center justify-center gap-4">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-[11px] font-black text-white tracking-[6px] uppercase opacity-40">Identity Locked</span>
               </div>
            </div>
         </div>
      </section>

      <footer className="pt-40 border-t border-blue-50/20 flex flex-col lg:flex-row justify-between items-start gap-24">
         <div className="lg:w-1/3">
            <div onClick={() => navigate('/')} className="flex items-center gap-6 mb-12 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-[#0A2540] flex items-center justify-center font-black text-2xl text-white group-hover:bg-[#0066FF] transition-all">C</div>
              <span className="text-4xl font-black text-[#0A2540] tracking-tighter">Certifyd.</span>
            </div>
            <p className="text-lg text-gray-500 leading-relaxed max-sm font-medium">
              We are defining the global gold-standard for academic and professional sovereignty through decentralized cryptographic consensus.
            </p>
         </div>
         <div className="flex flex-wrap gap-32">
            <div>
               <h4 className="font-black text-[12px] mb-12 uppercase tracking-[6px] text-[#0066FF]">Infrastructure</h4>
               <ul className="space-y-6 text-lg text-[#0A2540] font-black">
                  <li onClick={() => navigate('/university')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Mainnet Node Status</li>
                  <li onClick={() => navigate('/institution')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Consortium Ledger</li>
                  <li onClick={() => navigate('/faq')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Developer Portal</li>
                  <li onClick={() => navigate('/about-us')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Governance DAO</li>
               </ul>
            </div>
            <div>
               <h4 className="font-black text-[12px] mb-12 uppercase tracking-[6px] text-[#0066FF]">Sovereignty</h4>
               <ul className="space-y-6 text-lg text-[#0A2540] font-black">
                  <li onClick={() => navigate('/student')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Soulbound Privacy</li>
                  <li onClick={() => navigate('/student')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Identity Rights</li>
                  <li onClick={() => navigate('/university')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Minting Protocol</li>
                  <li onClick={() => navigate('/faq')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Whitepaper v2.0</li>
               </ul>
            </div>
         </div>
         <div className="w-full lg:w-auto">
            <h4 className="font-black text-[12px] mb-12 uppercase tracking-[6px] text-[#0066FF]">Pulse Registry</h4>
            {newsletterSent ? (
              <div className="flex items-center gap-4 bg-green-50 border-2 border-green-100 rounded-[32px] p-6 mb-8 animate-fade-in">
                <span className="text-2xl">✅</span>
                <p className="font-black text-green-700 text-sm">You're on the list! Protocol upgrades incoming.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center bg-[#0A2540]/5 border-2 border-transparent rounded-[32px] p-3 focus-within:border-[#0066FF] focus-within:bg-white transition-all w-full lg:w-[450px] shadow-inner mb-8">
                 <input type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="principal-id@certified.xyz" className="bg-transparent border-none outline-none text-lg px-6 w-full font-black text-[#0A2540] placeholder:text-gray-200" />
                 <button type="submit" className="w-16 h-16 rounded-[24px] bg-[#0066FF] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#0A2540] transition-all shadow-4xl font-black tracking-widest italic">GO</button>
              </form>
            )}
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[4px] pl-6">No spam. Only essential protocol upgrades.</p>
         </div>
      </footer>
    </div>
  );
};

export default Layout;
