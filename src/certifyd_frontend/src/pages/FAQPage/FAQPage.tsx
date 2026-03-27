import { useState } from "react";

import { GlobalHeader } from "../../components/GlobalHeader";

type FAQItem = {
  question: string;
  answer: string;
  category: "General" | "Institutions" | "Graduates" | "Technical";
};

const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What is Certifyd?",
    answer: "Certifyd is a decentralized platform built on the Internet Computer Protocol (ICP) that transforms traditional academic certificates into programmatically verifiable, non-transferable Soulbound NFTs."
  },
  {
    category: "General",
    question: "What are Soulbound NFTs?",
    answer: "Soulbound NFTs (SBTs) are digital tokens permanently tied to a specific wallet. Unlike regular NFTs, they cannot be sold or transferred, making them perfect for representing personal achievements and credentials."
  },
  {
    category: "Technical",
    question: "Why use ICP instead of Ethereum?",
    answer: "The Internet Computer allows us to host everything—from data to the UI—entirely on-chain at web speed. It offers zero gas costs for users and superior scalability, which is essential for a global education standard."
  },
  {
    category: "Institutions",
    question: "How do we onboard our student records?",
    answer: "Institutions can sync their existing databases with our encrypted gateway in three steps: Ledger Onboarding, Soulbound Minting, and Verification Access. We provide tools for batch-processing thousands of records at once."
  },
  {
    category: "Graduates",
    question: "How do I claim my NFT certificate?",
    answer: "Once your institution issues your degree, you'll receive a notification. You then connect your wallet (like Plug or NFID) and claim your unique Soulbound token at zero cost to you."
  },
  {
    category: "Technical",
    question: "Is Certifyd GDPR and FERPA compliant?",
    answer: "Yes. Certifyd is designed with privacy-first principles. We use zero-knowledge proofs and localized encryption to ensure that personally identifiable information (PII) is only accessible by authorized parties, keeping you compliant with international data laws."
  },
  {
    category: "Graduates",
    question: "Can I share my certificate on LinkedIn?",
    answer: "Absolutely. Certifyd provides one-click 'Verified Badge' integration for LinkedIn, X (Twitter), and personal portfolios, allowing recruiters to verify your skills instantly via our public ledger."
  },
  {
    category: "General",
    question: "What happens if I lose my wallet access?",
    answer: "Certifyd supports decentralized identity recovery. Through our consortium of trusted institutions, you can verify your real-world identity to regain access to your academic vault without compromising security."
  },
  {
    category: "Institutions",
    question: "What are the costs for an institution?",
    answer: "We offer tiered pricing based on the volume of certificates issued. Our goal is to reduce administrative costs for institutions by up to 90% by automating the verification process."
  },
  {
    category: "Technical",
    question: "Can these NFTs be revoked?",
    answer: "Yes. While the record is permanent, the 'Valid' status can be revoked by the issuing institution in cases of academic misconduct or administrative error, ensuring the ledger remains the source of truth."
  }
];

export const FAQPage = () => {

  const [activeTab, setActiveTab] = useState<FAQItem["category"]>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.filter(f => 
    (searchQuery === "" || f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (searchQuery !== "" || f.category === activeTab)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* 1. PREMIUM HEADER */}
      <GlobalHeader />

      {/* 2. HERO SEARCH */}
      <section className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066FF] blur-[220px] opacity-[0.03] rounded-full"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
           <p className="text-[#0066FF] font-black text-[12px] uppercase tracking-[8px] mb-8 reveal">Documentation & Support</p>
           <h1 className="text-6xl md:text-8xl font-black text-[#0A2540] mb-12 tracking-tighter leading-[0.9] reveal" style={{ animationDelay: '0.1s' }}>
             How can we <br />
             <span className="text-gradient">Help?</span>
           </h1>
           
           <div className="relative group max-w-2xl mx-auto reveal" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-x-[-15px] inset-y-[-15px] bg-blue-600/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center bg-white rounded-[32px] border-2 border-blue-50 shadow-3xl p-3 focus-within:border-[#0066FF] transition-all">
                <span className="pl-6 text-2xl">🔍</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a question about the protocol..." 
                  className="w-full py-5 px-6 bg-transparent text-xl font-bold outline-none placeholder:text-gray-300 text-[#0A2540]"
                />
              </div>
           </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-20">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/4 space-y-12">
           <div>
              <h4 className="text-[10px] font-black text-[#0066FF] uppercase tracking-[6px] mb-8">Knowledge Base</h4>
              <nav className="flex flex-col gap-4">
                 {["General", "Institutions", "Graduates", "Technical"].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => {
                        setActiveTab(tab as any);
                        setOpenIndex(0);
                        setSearchQuery("");
                     }}
                     className={`flex items-center justify-between px-8 py-6 rounded-[28px] font-black text-[11px] tracking-[4px] uppercase transition-all ${
                       activeTab === tab && searchQuery === ""
                       ? "bg-[#0A2540] text-white shadow-2xl scale-105" 
                       : "bg-gray-50 text-gray-400 hover:text-[#0A2540] hover:bg-white border border-transparent hover:border-blue-50"
                     }`}
                   >
                     {tab}
                     {activeTab === tab && searchQuery === "" && <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse"></span>}
                   </button>
                 ))}
              </nav>
           </div>

           <div className="card-nft p-10 bg-[#F8FAFF] border-none relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#0066FF] blur-3xl opacity-10"></div>
              <h4 className="text-xl font-black text-[#0A2540] mb-4">Direct Support.</h4>
              <p className="text-gray-500 font-medium text-sm mb-10 leading-relaxed">Our protocol engineers are available for technical integration calls.</p>
              <button className="w-full py-5 bg-white border-2 border-blue-100/50 rounded-2xl font-black text-[10px] tracking-[4px] uppercase text-[#0066FF] hover:bg-[#0066FF] hover:text-white transition-all shadow-sm">Schedule Call</button>
           </div>
        </aside>

        {/* Accordion Content */}
        <div className="lg:w-3/4">
           {searchQuery !== "" && (
             <div className="mb-12">
               <h3 className="text-3xl font-black text-[#0A2540] tracking-tight">Search Results for "{searchQuery}"</h3>
               <p className="text-gray-400 font-medium mt-2">Found {filteredFaqs.length} answers across the repository.</p>
             </div>
           )}

           <div className="space-y-8">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`group border-2 rounded-[40px] overflow-hidden transition-all duration-700 ${
                      openIndex === idx 
                      ? "bg-white border-blue-50 shadow-[0_40px_80px_rgba(0,102,255,0.08)]" 
                      : "bg-gray-50/30 border-transparent hover:bg-white hover:border-blue-50"
                    }`}
                  >
                    <button 
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="w-full text-left px-12 py-10 flex items-center justify-between gap-10"
                    >
                      <span className={`text-2xl font-black tracking-tight transition-colors duration-500 ${openIndex === idx ? "text-[#0066FF]" : "text-[#0A2540]"}`}>
                        {faq.question}
                      </span>
                      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center flex-shrink-0 transition-all duration-700 ${openIndex === idx ? "bg-[#0066FF] text-white rotate-90 shadow-2xl" : "bg-white text-[#0A2540] shadow-sm"}`}>
                        <span className="text-xl font-bold">{openIndex === idx ? "↓" : "→"}</span>
                      </div>
                    </button>
                    <div className={`transition-all duration-700 ease-in-out overflow-hidden ${openIndex === idx ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                       <div className="px-14 pb-14 pt-0">
                          <p className="text-2xl text-gray-500/80 font-medium leading-[1.8] max-w-5xl border-l-[8px] border-blue-50 pl-10 py-4">
                            {faq.answer}
                          </p>
                          <div className="mt-12 flex items-center gap-6">
                             <button className="text-[10px] font-black text-[#0066FF] border-b-2 border-blue-100 pb-1 tracking-[4px] uppercase hover:border-[#0066FF] transition-all">Copy Direct Link</button>
                             <button className="text-[10px] font-black text-gray-400 border-b-2 border-transparent pb-1 tracking-[4px] uppercase hover:text-[#0A2540] transition-all">Report Issue</button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center bg-gray-50 rounded-[60px] border-4 border-dashed border-gray-100">
                   <span className="text-8xl mb-8 block opacity-20">🕳️</span>
                   <h3 className="text-3xl font-black text-gray-300">No matching protocols found.</h3>
                   <button onClick={() => setSearchQuery("")} className="mt-8 text-blue-500 font-bold underline">Clear search and browse categories</button>
                </div>
              )}
           </div>
        </div>
      </main>

      {/* 4. FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-6 py-40">
         <div className="bg-[#0A2540] rounded-[60px] p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF] blur-[150px] opacity-20 rounded-full animate-pulse"></div>
            <div className="relative z-10 text-center md:text-left mb-16 md:mb-0">
               <h2 className="text-5xl font-black text-white mb-6">Didn't find what <br /> you were after?</h2>
               <p className="text-blue-100/50 font-medium text-lg">Our community of over 50,000 members is active on Discord.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-6">
               <button className="btn-primary !bg-[#0066FF] !py-6 !px-16 shadow-4xl hover:!bg-white hover:!text-black">Join Discord</button>
               <button className="btn-primary !bg-white/5 !text-white border border-white/10 !py-6 !px-16 hover:!bg-white/10">Email Protocol Team</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default FAQPage;
