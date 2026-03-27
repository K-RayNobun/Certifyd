import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

export const AboutUsPage = () => {
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

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white pb-32">
      
      {/* HEADER / NAVBAR */}
      <GlobalHeader />

      {/* 1. HERO SECTION (50-50 Split) */}
      <section className="pt-48 pb-20 px-8 lg:px-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
         <div className="lg:w-1/2 relative z-10">
            <p className="text-[#0066FF] font-black text-[10px] uppercase tracking-[6px] mb-6 inline-flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
               Certifyd Protocol
            </p>
            <h1 className="text-6xl md:text-7xl font-black text-[#0A2540] tracking-tighter leading-[1.05] mb-8 font-Clash">
               About our Protocol <br /> <span className="text-[#0066FF]">SBT Distribution</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-lg leading-relaxed mb-12">
               We are a cutting-edge protocol focused on the secure issuance, storage, and validation of Soulbound Tokens (SBTs) representing institutional achievements. Our decentralized platform accelerates trust.
            </p>
            <button onClick={() => navigate('/signup')} className="py-6 px-12 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-full font-black text-[12px] tracking-[4px] uppercase shadow-2xl transition-all">
               Explore Protocol
            </button>
         </div>
         
         <div className="lg:w-1/2 relative flex justify-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="w-[400px] h-[500px] bg-gradient-to-br from-gray-50 to-gray-200 rounded-[64px] shadow-4xl relative flex items-center justify-center overflow-hidden border-2 border-white">
               <div className="w-[200px] h-[200px] bg-white rounded-[40px] shadow-xl flex items-center justify-center absolute z-10 transform -rotate-6 group hover:rotate-0 transition-transform duration-500">
                  <span className="text-6xl">🎓</span>
               </div>
               <div className="absolute top-[20%] left-[10%] w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <span className="text-[#0066FF] font-bold">🎵</span>
               </div>
               <div className="absolute bottom-[30%] right-[10%] w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
                  <span className="text-pink-500 font-bold">🎨</span>
               </div>
               <div className="absolute top-[40%] right-[5%] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-[#00C6FF]">⚛️</span>
               </div>
            </div>
         </div>
      </section>

      {/* 2. SECOND SECTION (Reverse Split) */}
      <section className="py-32 px-8 lg:px-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 bg-gray-50/50 rounded-[80px] mt-20">
         <div className="lg:w-1/2 relative flex justify-center order-2 lg:order-1">
            <div className="w-[400px] h-[400px] bg-white rounded-[64px] shadow-4xl relative flex items-center justify-center border-2 border-white overflow-hidden group">
               <div className="absolute inset-0 bg-blue-50/30 group-hover:bg-[#0066FF]/5 transition-colors duration-500"></div>
               <span className="text-[120px] transform group-hover:-translate-y-4 group-hover:scale-110 transition-all duration-700 block">👨‍🚀</span>
            </div>
         </div>

         <div className="lg:w-1/2 relative z-10 order-1 lg:order-2">
            <h2 className="text-5xl md:text-6xl font-black text-[#0A2540] tracking-tighter leading-[1.05] mb-8 font-Clash">
               SBTs Represent <br /> <span className="text-gradient">the future.</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
               Welcome to our protocol where the future of digital ownership meets secure institutional credentials. We provide a decentralized, user-friendly gateway for academic records. Start your journey into the Internet Computer ecosystem and document your legacy securely.
            </p>
         </div>
      </section>

      {/* 3. ANALYTICS COUNTERS */}
      <section className="py-32 px-8 lg:px-24 max-w-6xl mx-auto">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 mb-6 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0066FF] text-3xl shadow-xl">🚀</div>
               <h3 className="text-4xl font-black text-[#0A2540] mb-2 font-Clash">33,400</h3>
               <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">SBTs Minted</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 mb-6 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 text-3xl shadow-xl">🎓</div>
               <h3 className="text-4xl font-black text-[#0A2540] mb-2 font-Clash">6,000+</h3>
               <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Graduates</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 mb-6 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-400 text-3xl shadow-xl">🏛️</div>
               <h3 className="text-4xl font-black text-[#0A2540] mb-2 font-Clash">340</h3>
               <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Institutions</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-20 h-20 mb-6 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 text-3xl shadow-xl">🔒</div>
               <h3 className="text-4xl font-black text-[#0A2540] mb-2 font-Clash">120k+</h3>
               <p className="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Verifications</p>
            </div>
         </div>
      </section>

      {/* 4. VIDEO SECTION */}
      <section className="bg-[#0A2540] py-32 px-8">
         <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-black text-white font-Clash tracking-tight">Protocol Overview</h2>
         </div>
         <div className="max-w-6xl mx-auto bg-white rounded-[60px] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,102,255,0.2)] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0066FF] blur-[150px] opacity-[0.05] rounded-full"></div>
            <div className="md:w-1/2 relative z-10 px-6">
               <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-[6px] mb-4">Discover The Future</p>
               <h3 className="text-4xl lg:text-5xl font-black text-[#0A2540] mb-8 font-Clash leading-[1.1]">
                  Unlock Unique <br /> Digital Ownership <br /> with SBTs
               </h3>
               <p className="text-gray-500 font-medium mb-10 max-w-sm">Experience the fastest, most scalable academic credential verification layer running entirely on ICP.</p>
               <button onClick={() => alert('Infrastructure Demo: Running Natively on ICP Environment...')} className="py-5 px-10 bg-[#0066FF] hover:bg-[#0A2540] text-white rounded-full font-black text-[10px] tracking-[4px] uppercase transition-all shadow-2xl">
                  Watch Demo
               </button>
            </div>
            <div onClick={() => alert('Infrastructure Demo: Running Natively on ICP Environment...')} className="md:w-1/2 relative z-10 bg-gray-50 rounded-[40px] h-[400px] w-full flex items-center justify-center border-4 border-white shadow-inner group overflow-hidden cursor-pointer">
               <div className="absolute inset-0 bg-[#0A2540] opacity-0 group-hover:opacity-10 transition-opacity"></div>
               <div className="w-24 h-24 bg-[#0A2540] text-white rounded-full flex items-center justify-center text-3xl shadow-4xl transform group-hover:scale-110 transition-transform absolute z-20">▶</div>
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-gray-200 rounded-[40px] shadow-2xl flex items-center justify-center text-5xl transform group-hover:translate-y-4 transition-all duration-700">🤖</div>
            </div>
         </div>
      </section>

      {/* 5. PARTNERS */}
      <section className="py-32 px-8 text-center max-w-6xl mx-auto">
         <h2 className="text-4xl font-black text-[#0A2540] font-Clash mb-16 tracking-tight">Consortium Partners</h2>
         <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale pt-8">
            {['Inpulsion', 'Logipsum', 'LOGO IPSUM', 'BOGO', 'Logipsum', 'Inpulsion', 'Logipsum', 'LOGO IPSUM', 'Logipsum', 'LOGO IPSUM'].map((partner, idx) => (
               <div key={idx} onClick={() => navigate('/university')} className="text-2xl font-black uppercase tracking-widest text-[#0A2540] hover:text-[#0066FF] hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                  {partner}
               </div>
            ))}
         </div>
      </section>

      {/* 6. TEAM */}
      <section className="py-20 px-8 text-center max-w-6xl mx-auto">
         <h2 className="text-4xl font-black text-[#0A2540] font-Clash mb-20 tracking-tight">Protocol Architects</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[ 
               { name: "Floyd Miles", role: "Founder", icon: "👨‍💻" },
               { name: "Eleanor Pena", role: "UX Designer", icon: "👩‍🎨" },
               { name: "Xun Darko", role: "Lead Dev", icon: "🥷" },
               { name: "Nina Trivedi", role: "Project Manager", icon: "👩‍💼" }
            ].map((member, idx) => (
               <div key={idx} className="flex flex-col items-center group">
                  <div className="w-40 h-40 bg-gray-50 rounded-[40px] shadow-xl border-4 border-white flex items-center justify-center text-5xl mb-8 group-hover:bg-[#0066FF] group-hover:-translate-y-4 transition-all duration-500">
                     {member.icon}
                  </div>
                  <h4 className="text-xl font-black text-[#0A2540] mb-1">{member.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400">{member.role}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 7. CTA / JOIN US */}
      <section className="py-32 px-8 max-w-5xl mx-auto">
         <div className="bg-[#0A2540] rounded-[64px] p-16 text-center relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-blue-900 opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10">
               <h2 className="text-5xl md:text-6xl font-black text-white font-Clash mb-6 tracking-tight">
                  Interested in joining us?
               </h2>
               <p className="text-blue-100/60 font-medium mb-12 max-w-lg mx-auto">
                  We are continuously looking for new institutions to join our academic consortium directly.
               </p>
               <button onClick={() => navigate('/signup')} className="py-6 px-16 bg-[#0066FF] hover:bg-white hover:text-[#0A2540] text-white rounded-full font-black text-[12px] tracking-[4px] uppercase shadow-2xl transition-all">
                  Join Protocol
               </button>
            </div>
         </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="pt-20 px-8 lg:px-24 border-t border-gray-100 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
         <div className="max-w-sm">
            <div onClick={() => navigate('/')} className="flex items-center gap-4 mb-4 cursor-pointer group">
               <div className="w-10 h-10 rounded-xl bg-[#0A2540] group-hover:bg-[#0066FF] flex items-center justify-center text-white font-black transition-all">C</div>
               <h3 className="text-3xl font-black text-[#0A2540] tracking-tighter">Certifyd.</h3>
            </div>
            <p className="text-gray-400 font-medium text-sm mb-8 leading-relaxed">Supreme academic records. Anchored natively on the ICP Network. Distributed securely.</p>
         </div>
         
         <div className="flex gap-20">
            <div>
               <h5 className="text-[10px] font-black uppercase tracking-[4px] text-[#0A2540] mb-6">Company</h5>
               <ul className="space-y-4 text-xs font-bold text-gray-400">
                  <li onClick={() => navigate('/student')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Students</li>
                  <li onClick={() => navigate('/university')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Institutions</li>
               </ul>
            </div>
            <div>
               <h5 className="text-[10px] font-black uppercase tracking-[4px] text-[#0A2540] mb-6">Protocol</h5>
               <ul className="space-y-4 text-xs font-bold text-gray-400">
                  <li onClick={() => navigate('/faq')} className="hover:text-[#0066FF] cursor-pointer transition-colors">FAQ</li>
                  <li onClick={() => navigate('/faq')} className="hover:text-[#0066FF] cursor-pointer transition-colors">Smart Contract</li>
               </ul>
            </div>
         </div>

         <div>
            <h5 className="text-[10px] font-black uppercase tracking-[4px] text-[#0A2540] mb-6">Join Consortium</h5>
            {newsletterSent ? (
               <div className="bg-green-50 border border-green-100 px-6 py-4 rounded-full text-green-600 font-black text-[10px] tracking-widest uppercase animate-fade-in flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  Identity Locked
               </div>
            ) : (
               <form onSubmit={handleNewsletter} className="flex bg-gray-50 rounded-full p-2 border border-gray-200 focus-within:border-[#0066FF] transition-colors shadow-inner">
                  <input type="email" required value={newsletterEmail} onChange={e => setNewsletterEmail(e.target.value)} placeholder="your-id@certifyd.xyz" className="bg-transparent pl-4 text-xs font-bold w-full outline-none text-[#0A2540]" />
                  <button type="submit" className="w-10 h-10 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-full flex items-center justify-center transition-colors font-black shadow-lg">
                     &rarr;
                  </button>
               </form>
            )}
         </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
