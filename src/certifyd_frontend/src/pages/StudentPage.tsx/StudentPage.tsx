import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

export const StudentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white pb-32">
      <GlobalHeader />

      {/* 1. HERO SECTION & QUESTIONS */}
      <section className="pt-48 pb-20 px-8 lg:px-24 max-w-7xl mx-auto flex flex-col items-center">
         <div className="text-center mb-24 max-w-4xl">
            <p className="text-[#0066FF] font-black text-[12px] uppercase tracking-[8px] mb-6">Student Gateway</p>
            <h1 className="text-6xl md:text-8xl font-black text-[#0A2540] tracking-tighter leading-[0.9] font-Clash mb-8">
               Own your <br /> Academic Data.
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
               Welcome to the decentralized era of education. Before you join the protocol, consider the security of your current achievements.
            </p>
         </div>

         {/* Floating Question Cards (Replacing the NFT cards from the design) */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-[#0066FF] blur-[150px] opacity-[0.05] rounded-full -z-10"></div>
            
            <div className="card-nft p-1 shadow-2xl hover:-translate-y-4 transition-transform duration-700 bg-gradient-to-br from-white to-gray-50 rotate-[-2deg]">
               <div className="bg-white rounded-[38px] p-10 h-full border-2 border-blue-50/50 flex flex-col justify-center text-center">
                  <div className="text-4xl mb-6">💼</div>
                  <h3 className="text-2xl font-black text-[#0A2540] leading-tight font-Clash">
                     How would you prove to a recruiter your diploma is authentic?
                  </h3>
               </div>
            </div>
            
            <div className="card-nft p-1 shadow-3xl hover:-translate-y-6 transition-transform duration-700 bg-gradient-to-b from-blue-50 to-white z-10 scale-105">
               <div className="bg-white rounded-[38px] p-12 h-full border-2 border-blue-100 flex flex-col justify-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 blur-[80px] opacity-20"></div>
                  <div className="text-5xl mb-6 relative z-10">🌍</div>
                  <h3 className="text-3xl font-black text-[#0A2540] leading-tight font-Clash relative z-10">
                     Can you access your official records instantly from anywhere?
                  </h3>
               </div>
            </div>

            <div className="card-nft p-1 shadow-2xl hover:-translate-y-4 transition-transform duration-700 bg-gradient-to-bl from-white to-gray-50 rotate-[2deg]">
               <div className="bg-white rounded-[38px] p-10 h-full border-2 border-blue-50/50 flex flex-col justify-center text-center">
                  <div className="text-4xl mb-6">🚨</div>
                  <h3 className="text-2xl font-black text-[#0A2540] leading-tight font-Clash">
                     What happens to your proof if your university database is hacked?
                  </h3>
               </div>
            </div>
         </div>
      </section>

      {/* 2. THE SOLUTION: CERTIFYD */}
      <section className="py-24 px-8 lg:px-24 max-w-7xl mx-auto">
         <div className="bg-[#0A2540] rounded-[64px] p-12 md:p-24 relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#0066FF] blur-[150px] opacity-40 rounded-full"></div>
            
            <div className="md:w-1/2 relative z-10">
               <p className="text-[#00C6FF] font-black text-[10px] uppercase tracking-[6px] mb-6 inline-flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#00C6FF] animate-pulse"></span>
                  The Protocol Solution
               </p>
               <h2 className="text-5xl md:text-6xl font-black text-white font-Clash tracking-tight mb-8">
                  Immutable <br /> Souldbound Tokens.
               </h2>
               <p className="text-blue-100/60 font-medium text-lg leading-relaxed mb-10">
                  Certifyd transforms your traditional academic certificates into programmatically verifiable, non-transferable Soulbound NFTs. Once issued by your university, they remain secured on the Internet Computer blockchain forever.
               </p>
            </div>

            <div className="md:w-1/2 relative z-10 w-full flex justify-center">
               <div className="w-[300px] h-[300px] bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-md flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 to-transparent rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <span className="text-8xl transform group-hover:scale-110 transition-transform duration-700">🔒</span>
                  <div className="absolute -bottom-6 -right-6 bg-white py-4 px-8 rounded-full shadow-2xl flex items-center gap-3">
                     <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                     <span className="text-[#0A2540] font-black tracking-widest uppercase text-[10px]">Forever Verified</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. ADVANTAGES TO STUDENTS */}
      <section className="py-32 px-8 lg:px-24 max-w-6xl mx-auto">
         <div className="text-center mb-24">
            <h2 className="text-5xl font-black text-[#0A2540] font-Clash tracking-tight">Advantages for Students</h2>
         </div>

         <div className="space-y-32">
            {/* Advantage 1 */}
            <div className="flex flex-col md:flex-row items-center gap-20">
               <div className="md:w-1/2 flex justify-center order-2 md:order-1">
                  <div className="w-64 h-64 bg-blue-50 rounded-[48px] flex items-center justify-center text-[80px] shadow-2xl shadow-blue-100/50 hover:-translate-y-4 transition-transform duration-500">
                     🛡️
                  </div>
               </div>
               <div className="md:w-1/2 order-1 md:order-2">
                  <h3 className="text-4xl font-black text-[#0A2540] font-Clash mb-6">Absolute Security</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-sm">
                     Your diplomas are uniquely cryptographic. They cannot be altered, forged, or deleted, guaranteeing your hard work is permanently documented.
                  </p>
               </div>
            </div>

            {/* Advantage 2 */}
            <div className="flex flex-col md:flex-row items-center gap-20">
               <div className="md:w-1/2 md:text-right flex flex-col items-end order-1">
                  <h3 className="text-4xl font-black text-[#0A2540] font-Clash mb-6">Global Networking</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-sm">
                     Share your achievements globally with any employer instantly. A single scan proves your authenticity to anyone, anywhere in the world.
                  </p>
               </div>
               <div className="md:w-1/2 flex justify-center order-2">
                  <div className="w-64 h-64 bg-purple-50 rounded-[48px] flex items-center justify-center text-[80px] shadow-2xl shadow-purple-100/50 hover:-translate-y-4 transition-transform duration-500">
                     🌐
                  </div>
               </div>
            </div>

            {/* Advantage 3 */}
            <div className="flex flex-col md:flex-row items-center gap-20">
               <div className="md:w-1/2 flex justify-center order-2 md:order-1">
                  <div className="w-64 h-64 bg-green-50 rounded-[48px] flex items-center justify-center text-[80px] shadow-2xl shadow-green-100/50 hover:-translate-y-4 transition-transform duration-500">
                     ⚡
                  </div>
               </div>
               <div className="md:w-1/2 order-1 md:order-2">
                  <h3 className="text-4xl font-black text-[#0A2540] font-Clash mb-6">Zero-Friction Access</h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-sm">
                     No more waiting weeks for physical copies or paying administrative fees to your university. Your vault is always accessible.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. STEP BY STEP PROCESS (Huge Numbers) */}
      <section className="py-32 px-8 bg-gray-50/50">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-4xl font-black text-[#0A2540] font-Clash mb-32 tracking-tight">How the Protocol Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
               {/* 1 */}
               <div className="relative pt-12">
                  <div className="absolute top-[-80px] left-[-20px] text-[200px] font-black text-gray-100 leading-none select-none z-0">1</div>
                  <div className="relative z-10 pl-8">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="w-4 h-4 rounded-full bg-[#0066FF] shadow-[0_0_20px_#0066FF]"></span>
                        <h3 className="text-4xl font-black text-[#0A2540] font-Clash tracking-tight">Onboard</h3>
                     </div>
                     <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-[280px]">
                        Sync legacy databases with our encrypted gateway securely.
                     </p>
                  </div>
               </div>

               {/* 2 */}
               <div className="relative pt-12 md:mt-24">
                  <div className="absolute top-[-80px] left-[-20px] text-[200px] font-black text-gray-100 leading-none select-none z-0">2</div>
                  <div className="relative z-10 pl-8">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="w-4 h-4 rounded-full bg-[#0066FF] shadow-[0_0_20px_#0066FF]"></span>
                        <h3 className="text-4xl font-black text-[#0A2540] font-Clash tracking-tight">Mint</h3>
                     </div>
                     <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-[280px]">
                        Convert records into permanent Soulbound NFTs instantly.
                     </p>
                  </div>
               </div>

               {/* 3 */}
               <div className="relative pt-12 md:mt-48">
                  <div className="absolute top-[-80px] left-[-20px] text-[200px] font-black text-gray-100 leading-none select-none z-0">3</div>
                  <div className="relative z-10 pl-8">
                     <div className="flex items-center gap-4 mb-6">
                        <span className="w-4 h-4 rounded-full bg-[#0066FF] shadow-[0_0_20px_#0066FF]"></span>
                        <h3 className="text-4xl font-black text-[#0A2540] font-Clash tracking-tight">Verify</h3>
                     </div>
                     <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-[280px]">
                        Grant recruiters power of 1-click cryptographic proof.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-40 px-8 text-center">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-[#0A2540] font-Clash mb-8 tracking-tighter">
               Ready to claim your <br /> <span className="text-gradient">Legacy?</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium mb-12 max-w-xl mx-auto">
               Join thousands of students who have already secured their academic future on the decentralized web.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button onClick={() => navigate('/signup')} className="py-6 px-16 bg-[#0066FF] hover:bg-[#0A2540] text-white rounded-full font-black text-[12px] tracking-[4px] uppercase hover:shadow-2xl transition-all shadow-[0_20px_40px_rgba(0,102,255,0.3)]">
                  Launch Student Vault
               </button>
               <button onClick={() => navigate('/about-us')} className="py-6 px-16 bg-white border-2 border-gray-100 text-[#0A2540] hover:border-[#0A2540] rounded-full font-black text-[12px] tracking-[4px] uppercase transition-all">
                  Read Documentation
               </button>
            </div>
         </div>
      </section>

    </div>
  );
};

export default StudentPage;
