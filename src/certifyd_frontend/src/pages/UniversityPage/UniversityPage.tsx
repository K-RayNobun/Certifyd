import { useNavigate } from "react-router-dom";
import { GlobalHeader } from "../../components/GlobalHeader";

const UniversitiesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white pb-32">
      <GlobalHeader />

      {/* 1. HERO SECTION */}
      <section className="pt-48 pb-20 px-8 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066FF] blur-[200px] opacity-[0.05] rounded-full -z-10"></div>
         
         <div className="md:w-1/2 relative z-10 text-center md:text-left">
            <p className="text-[#0066FF] font-black text-[10px] uppercase tracking-[6px] mb-6 inline-flex items-center gap-3 justify-center md:justify-start">
               <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
               Institution Network
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[#0A2540] tracking-tighter leading-[0.9] font-Clash mb-8">
               Mint the <br /> <span className="text-gradient">Truth.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg mx-auto md:mx-0 mb-12">
               Take full cryptographic control of your students’ credentials. Mint official diplomas as secure, verifiable Soulbound Tokens on the Internet Computer.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
               <button onClick={() => navigate('/signup')} className="py-5 px-10 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-full font-black text-[12px] tracking-[4px] uppercase transform hover:-translate-y-1 transition-all shadow-[0_20px_40px_rgba(10,37,64,0.3)]">
                  Join Consortium
               </button>
               <button onClick={() => navigate('/login')} className="py-5 px-10 bg-white border-2 border-gray-100 text-[#0A2540] hover:border-[#0A2540] rounded-full font-black text-[12px] tracking-[4px] uppercase transition-all">
                  Access Portal
               </button>
            </div>
         </div>

         <div className="md:w-1/2 relative z-10 w-full flex justify-center mt-16 md:mt-0">
            <div className="relative w-full max-w-md h-[500px] bg-gradient-to-br from-gray-50 to-gray-200 rounded-[64px] shadow-4xl border-4 border-white overflow-hidden group">
               <div className="absolute inset-0 bg-[#0A2540] opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
               {/* Decorative Abstract Server / Ledger Graphic */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 space-y-4">
                  {[1, 2, 3].map((_, idx) => (
                     <div key={idx} className="h-16 bg-white rounded-2xl shadow-lg flex items-center px-6 gap-4 hover:scale-105 transition-transform cursor-default">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                        <div className="h-2 w-24 bg-gray-200 rounded-full"></div>
                        <div className="h-2 w-12 bg-gray-100 rounded-full ml-auto"></div>
                     </div>
                  ))}
               </div>
               <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#0066FF] rounded-[32px] shadow-2xl flex items-center justify-center text-4xl transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  🏛️
               </div>
            </div>
         </div>
      </section>

      {/* 2. SUBHEADLINE METRICS */}
      <section className="py-20 px-8 bg-[#0A2540]">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-8">
               <h3 className="text-5xl font-black text-white font-Clash mb-4">50%</h3>
               <p className="text-[10px] uppercase tracking-[4px] text-blue-400 font-bold">Reduction in Admin Costs</p>
            </div>
            <div className="py-8">
               <h3 className="text-5xl font-black text-white font-Clash mb-4">30+</h3>
               <p className="text-[10px] uppercase tracking-[4px] text-blue-400 font-bold">Leading Universities</p>
            </div>
            <div className="py-8">
               <h3 className="text-5xl font-black text-white font-Clash mb-4">0</h3>
               <p className="text-[10px] uppercase tracking-[4px] text-blue-400 font-bold">Fake Diplomas Minted</p>
            </div>
         </div>
      </section>

      {/* 3. PLATFORM FEATURES */}
      <section className="py-40 px-8 lg:px-24 max-w-7xl mx-auto">
         <div className="text-center mb-32 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-[#0A2540] font-Clash tracking-tight mb-6">Why Choose Certifyd?</h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">Certifyd offers institutions a robust, zero-fee platform to structurally manage and verify student diplomas digitally.</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="card-nft p-1 bg-gradient-to-br from-blue-50 to-white shadow-3xl hover:-translate-y-4 transition-all duration-500">
               <div className="bg-white rounded-[38px] p-12 h-full border-2 border-blue-50/50 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0066FF] blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="text-5xl mb-8">🗄️</div>
                  <h3 className="text-2xl font-black text-[#0A2540] font-Clash mb-4">Bulk Protocol Minting</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                     Upload and mint NFT diplomas for entire graduating classes with a single systemic execution. No manual processing required.
                  </p>
               </div>
            </div>

            <div className="card-nft p-1 bg-gradient-to-br from-green-50 to-white shadow-3xl hover:-translate-y-4 transition-all duration-500 lg:-translate-y-12">
               <div className="bg-white rounded-[38px] p-12 h-full border-2 border-green-50/50 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="text-5xl mb-8">⛓️</div>
                  <h3 className="text-2xl font-black text-[#0A2540] font-Clash mb-4">Blockchain Security</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                     Leverage the security and transparency of the ICP blockchain. Ensure complete immutability and protection of all issued credentials.
                  </p>
               </div>
            </div>

            <div className="card-nft p-1 bg-gradient-to-br from-purple-50 to-white shadow-3xl hover:-translate-y-4 transition-all duration-500">
               <div className="bg-white rounded-[38px] p-12 h-full border-2 border-purple-50/50 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="text-5xl mb-8">📈</div>
                  <h3 className="text-2xl font-black text-[#0A2540] font-Clash mb-4">Alumni Tracking</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                     Monitor how verified diplomas are interacted with in real-time as your alumni network shares credentials with employers globally.
                  </p>
               </div>
            </div>

         </div>
      </section>

      {/* 4. IMPACT / TESTIMONIAL VIEW */}
      <section className="py-32 px-8 bg-gray-50/50">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2 relative group">
               <div className="absolute inset-0 bg-[#0066FF] translate-x-4 translate-y-4 rounded-[40px] opacity-20 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
               <img
                 src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                 alt="University administrator"
                 className="relative z-10 w-full h-[500px] object-cover rounded-[40px] shadow-2xl filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[250px]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0A2540] mb-2">Active Protocol</p>
                  <p className="text-sm font-bold text-gray-500">Registrar terminal executing batch mints secured by ICP.</p>
               </div>
            </div>

            <div className="md:w-1/2">
               <div className="text-6xl text-[#0066FF] mb-8 font-serif opacity-40">"</div>
               <blockquote className="text-3xl font-black text-[#0A2540] leading-snug mb-10 font-Clash">
                 Certifyd allowed us to modernize our diploma ecosystem overnight. We now mint NFTs for thousands of students, ensuring their achievements are protected and instantly verifiable by global employers.
               </blockquote>
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 text-[#0066FF] rounded-full flex items-center justify-center font-black text-xl">Dr</div>
                  <div>
                     <p className="text-lg font-black text-[#0A2540]">Dr. Isaac M.</p>
                     <p className="text-[10px] font-bold uppercase tracking-[3px] text-gray-400">Head of Registrations, Consortium Lead</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. CALL TO ACTION & RESOURCES */}
      <section className="py-40 px-8 text-center bg-white relative overflow-hidden">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-50 blur-[150px] -z-10 rounded-full"></div>
         <div className="max-w-4xl mx-auto z-10 relative">
            <h3 className="text-5xl md:text-6xl font-black text-[#0A2540] font-Clash mb-8 tracking-tighter">
               Discover the Power of <br /> <span className="text-[#0066FF]">Blockchain in Education.</span>
            </h3>
            <p className="text-xl text-gray-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
               Lower your administrative overhead and protect your institution's reputation. Let's build the future of academic verifiable credentials together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
               <button onClick={() => navigate('/signup')} className="py-6 px-16 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-full font-black text-[12px] tracking-[4px] uppercase hover:shadow-3xl transition-all shadow-xl">
                  Request Private Demo
               </button>
               <button onClick={() => navigate('/about-us')} className="py-6 px-16 bg-white border-2 border-gray-100 text-[#0A2540] hover:border-[#0066FF] hover:text-[#0066FF] rounded-full font-black text-[12px] tracking-[4px] uppercase transition-all">
                  Read Documentation
               </button>
            </div>
            
            <div className="pt-20 border-t border-gray-100 flex flex-col items-center">
               <h4 className="text-[10px] font-black uppercase tracking-[6px] text-gray-400 mb-8">Technical Resources</h4>
               <ul className="flex flex-col sm:flex-row gap-8 text-[12px] font-bold text-[#0A2540] underline decoration-blue-100 underline-offset-8">
                 <li className="hover:text-[#0066FF] hover:decoration-[#0066FF] transition-all cursor-pointer">Case study: Reducing admin overhead at scale</li>
                 <li className="hover:text-[#0066FF] hover:decoration-[#0066FF] transition-all cursor-pointer">Whitepaper: Zero-Knowledge Verification</li>
               </ul>
            </div>
         </div>
      </section>

    </div>
  );
};

export default UniversitiesPage;