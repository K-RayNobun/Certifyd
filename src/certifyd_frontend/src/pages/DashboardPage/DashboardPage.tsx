import React, { useEffect, useState } from 'react';
import Spinner from './../../components/Spinner';
import { useNavigate } from "react-router-dom";
import { certifyd_backend } from '../../declarations/certifyd_backend'; 

interface NFT {
  id: bigint;
  metadata: string;
  isRevoked: boolean;
  diplomaInfo: {
    diplomaType: string;
    description: string;
    studentName: string;
    graduationDate: string;
    institution: string;
  }
}

interface DiplomaRequest {
  id: bigint;
  student_id: string;
  studentName: string;
  institution_id: string;
  diplomaType: string;
  graduationDate: string;
  description: string;
  status: string;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [requests, setRequests] = useState<DiplomaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Selection State for Detailed View
  const [selectedItem, setSelectedItem] = useState<{type: 'nft' | 'request', data: any} | null>(null);

  // Form states
  const [institutionEmail, setInstitutionEmail] = useState('');
  const [diplomaType, setDiplomaType] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  const owner = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    fetchData();
  }, [owner]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [nftResult, reqResult] = await Promise.all([
        certifyd_backend.getNFTsByOwner(owner),
        certifyd_backend.getStudentRequests(owner)
      ]);
      setNfts(nftResult);
      setRequests(reqResult);
    } catch(error) {
      console.log('Error fetching data: ', error)
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReqLoading(true);
    try {
      await certifyd_backend.requestDiploma(owner, studentName, institutionEmail, diplomaType, graduationDate, description);
      alert('Verification Request Sent to Protocol Gateway.');
      setInstitutionEmail('');
      setDiplomaType('');
      setGraduationDate('');
      setStudentName('');
      setDescription('');
      fetchData();
    } catch (err) {
      alert('Request Propagation Failed.');
    } finally {
      setReqLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-Outfit selection:bg-[#0066FF] selection:text-white">
      
      {/* 1. SIDEBAR */}
      <aside className="lg:w-80 bg-[#0A2540] text-white p-10 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto">
         <div className="space-y-16">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
               <div className="w-12 h-12 rounded-2xl bg-[#0066FF] flex items-center justify-center font-black text-xl group-hover:shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all">S</div>
               <span className="text-2xl font-black tracking-tighter">Certifyd.</span>
            </div>

            <div className="space-y-8">
               <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                  <p className="text-[10px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-3">Identity Principal</p>
                  <p className="text-sm font-bold truncate text-white mb-4">{owner}</p>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                     <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Protocol Active</span>
                  </div>
               </div>

               <nav className="space-y-2">
                  <button onClick={() => setSelectedItem(null)} className={`w-full text-left px-8 py-5 rounded-2xl flex items-center gap-4 font-black text-[10px] tracking-[4px] uppercase transition-all ${!selectedItem ? 'bg-[#0066FF] shadow-2xl' : 'bg-transparent hover:bg-white/5 text-white/50 hover:text-white'}`}>📜 Vault</button>
                  <button onClick={() => navigate('/faq')} className="w-full text-left px-8 py-5 rounded-2xl bg-transparent flex items-center gap-4 hover:bg-white/5 font-black text-[10px] tracking-[4px] uppercase text-white/50 hover:text-white transition-all">❓ FAQ Hub</button>
               </nav>

               <div className="pt-6 mt-6 border-t border-white/5">
                  <p className="text-[9px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-4">Identity Aggregation</p>
                  <button onClick={() => alert('Linking GitHub Identity Core...')} className="w-full mb-3 text-left px-6 py-4 rounded-xl bg-[#24292e] flex items-center gap-4 font-black text-[10px] tracking-[3px] uppercase hover:bg-black transition-all shadow-md">
                     <span className="text-sm">🐙</span> Link GitHub
                  </button>
                  <button onClick={() => alert('Invoking Web3 Provider Layer...')} className="w-full text-left px-6 py-4 rounded-xl bg-orange-500/20 text-orange-400 flex items-center gap-4 font-black text-[10px] tracking-[3px] uppercase hover:bg-orange-500/30 transition-all border border-orange-500/20">
                     <span className="text-sm">🦊</span> Link Metamask
                  </button>
               </div>
            </div>
         </div>

         <div className="pt-10 border-t border-white/10 mt-10">
            <button onClick={logout} className="text-[10px] font-black uppercase tracking-[4px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
               Logout <span className="text-xl">&rarr;</span>
            </button>
         </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-20 overflow-y-auto bg-gray-50/20">
        
        { loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <Spinner loading={loading} />
             <p className="mt-8 font-black text-[10px] tracking-[6px] uppercase text-gray-400">Decrypting Vault...</p>
          </div>
        ) : (
           <>
             {selectedItem ? (
                // =============== DETAILED VIEW ===============
                <div className="animate-fade-in max-w-7xl mx-auto">
                   <button onClick={() => setSelectedItem(null)} className="mb-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[4px] text-gray-400 hover:text-[#0066FF] transition-all py-3 px-6 bg-white rounded-full border-2 border-transparent hover:border-blue-50 shadow-sm w-max">
                     <span className="text-lg">&larr;</span> Back to Vault
                   </button>
                   
                   <div className="flex flex-col xl:flex-row gap-16 lg:gap-24">
                      
                      {/* Left: Massive Preview Graphic */}
                      <div className="xl:w-1/2 w-full">
                         <div className="w-full aspect-square bg-[#F8FAFF] rounded-[64px] border-8 border-white shadow-[0_40px_80px_rgba(0,0,0,0.05)] relative overflow-hidden flex items-center justify-center group pointer-events-none">
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-100 to-transparent"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                            
                            {selectedItem.type === 'nft' ? (
                               <div className="relative z-10 text-center flex flex-col items-center group-hover:-translate-y-4 transition-transform duration-1000">
                                  {/* Holographic Sphere / Avatar */}
                                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-200 blur-2xl rounded-full opacity-60 mix-blend-multiply"></div>
                                  <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-200 blur-2xl rounded-full opacity-60 mix-blend-multiply"></div>
                                  
                                  <div className="w-56 h-56 bg-white rounded-full shadow-[0_20px_40px_rgba(0,102,255,0.15)] flex items-center justify-center text-8xl mb-10 relative z-20 border-[8px] border-blue-50">
                                     🎓
                                  </div>
                                  <div className="px-6 py-2.5 bg-[#0A2540] text-white font-black text-[10px] tracking-widest uppercase rounded-full shadow-2xl flex items-center gap-3">
                                     <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                     Minted & Available
                                  </div>
                               </div>
                            ) : (
                               <div className="relative z-10 text-center flex flex-col items-center">
                                  <div className="w-56 h-56 bg-white border-8 border-dashed border-gray-100 rounded-full flex items-center justify-center text-7xl mb-10 text-gray-300">
                                     ⏳
                                  </div>
                                  <div className="px-6 py-2.5 bg-gray-200 text-gray-500 font-black text-[10px] tracking-widest uppercase rounded-full shadow-sm flex items-center gap-3">
                                     <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                                     Pre-Mint State
                                  </div>
                               </div>
                            )}
                         </div>
                      </div>

                      {/* Right: Detailed Content */}
                      <div className="xl:w-1/2 w-full pt-4 md:pt-10">
                         {selectedItem.type === 'nft' ? (
                            // ================= NFT STATE =================
                            <div className="animate-fade-in">
                               <h1 className="text-5xl lg:text-7xl font-black text-[#0A2540] tracking-tighter font-Clash mb-4 leading-[0.9]">
                                  {selectedItem.data.diplomaInfo.diplomaType}
                               </h1>
                               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Minted on {selectedItem.data.diplomaInfo.graduationDate}</p>

                               <div className="grid grid-cols-2 gap-6 mb-12">
                                  <div className="bg-white p-6 rounded-[32px] flex items-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.03)] border-2 border-gray-50 hover:border-blue-100 transition-colors">
                                     <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center font-black text-xl flex-shrink-0">🏛️</div>
                                     <div className="overflow-hidden">
                                        <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-black mb-1">Collection Issuer</p>
                                        <p className="font-bold text-[#0A2540] truncate text-sm">{selectedItem.data.diplomaInfo.institution}</p>
                                     </div>
                                  </div>
                                  <div className="bg-white p-6 rounded-[32px] flex items-center gap-4 shadow-[0_15px_30px_rgba(0,0,0,0.03)] border-2 border-gray-50 hover:border-green-100 transition-colors">
                                     <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black text-xl flex-shrink-0">👤</div>
                                     <div className="overflow-hidden">
                                        <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-black mb-1">Creator / Owner</p>
                                        <p className="font-bold text-[#0A2540] truncate text-sm">{selectedItem.data.diplomaInfo.studentName}</p>
                                     </div>
                                  </div>
                               </div>

                               <div className="mb-12">
                                  <p className="text-[10px] uppercase tracking-[4px] text-gray-400 font-black mb-4">Description</p>
                                  <p className="text-lg text-[#0A2540]/60 font-medium leading-relaxed">
                                    This Soulbound Token officially certifies that <strong className="text-[#0A2540]">{selectedItem.data.diplomaInfo.studentName}</strong> has successfully completed all academic requirements for the degree of <strong className="text-[#0A2540]">{selectedItem.data.diplomaInfo.diplomaType}</strong> at {selectedItem.data.diplomaInfo.institution}. This digital collectible utilizes blockchain technology to prove authenticity and scarcity. A permanent, verified achievement.
                                  </p>
                               </div>

                               <div className="grid grid-cols-2 gap-6 mb-8">
                                  <div className="p-8 bg-gray-50 rounded-[32px] border-2 border-gray-100 flex flex-col justify-center">
                                     <p className="text-[10px] uppercase tracking-[3px] text-gray-400 font-black mb-2">Network Fee</p>
                                     <div className="flex items-center gap-3">
                                        <span className="text-xl">♦</span>
                                        <span className="text-3xl font-black text-[#0A2540] font-Clash">0.00 ICP</span>
                                     </div>
                                  </div>
                                  <div className="p-8 bg-green-50 rounded-[32px] border-2 border-green-100 flex flex-col justify-center shadow-inner">
                                     <p className="text-[10px] uppercase tracking-[3px] text-green-600 font-black mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Validation Analytics 
                                     </p>
                                     <p className="text-md font-black text-green-700 font-Clash"><span className="text-3xl lg:text-4xl text-green-600">{Math.floor(Math.random() * 20) + 1}</span> Views</p>
                                  </div>
                               </div>

                               <div className="flex items-center justify-between p-6 bg-white border-2 border-blue-50/50 rounded-[24px] shadow-sm mb-12 group cursor-pointer" onClick={() => (document.getElementById('publicToggle') as any).classList.toggle('justify-end')}>
                                  <div>
                                     <p className="text-sm font-black text-[#0A2540] tracking-tight">Public Verification Vault</p>
                                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Allow recruiters to cryptographically verify</p>
                                  </div>
                                  <div id="publicToggle" className="w-14 h-8 bg-green-400 rounded-full flex items-center p-1 transition-all justify-end shadow-inner">
                                     <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                                  </div>
                               </div>
                               
                               <div className="flex flex-col gap-4">
                                  {selectedItem.data.metadata && selectedItem.data.metadata.startsWith('data:application/pdf') ? (
                                     <a href={selectedItem.data.metadata} download="Verified_Diploma.pdf" className="block text-center w-full py-6 bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[24px] font-black tracking-[4px] uppercase transition-all shadow-2xl shadow-pink-500/30 active:scale-95 text-[11px] cursor-pointer">
                                        Download Secure PDF
                                     </a>
                                  ) : (
                                     <button onClick={() => window.open(selectedItem.data.metadata)} className="w-full py-6 bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[24px] font-black tracking-[4px] uppercase transition-all shadow-2xl shadow-pink-500/30 active:scale-95 text-[11px] cursor-pointer">
                                        View IPFS Document
                                     </button>
                                  )}

                                  <button onClick={() => window.open(`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(selectedItem.data.diplomaInfo.diplomaType)}&organizationName=${encodeURIComponent(selectedItem.data.diplomaInfo.institution)}&issueYear=${new Date().getFullYear()}&certId=${selectedItem.data.id.toString()}&certUrl=${encodeURIComponent(window.location.origin + '/auth/' + selectedItem.data.id.toString())}`, '_blank')} className="w-full py-6 bg-[#0077b5] hover:bg-[#005582] text-white rounded-[24px] font-black tracking-[4px] uppercase transition-all shadow-2xl shadow-blue-900/40 active:scale-95 text-[11px] flex items-center justify-center gap-4 cursor-pointer">
                                     <span className="text-xl bg-white text-[#0077b5] w-6 h-6 flex items-center justify-center rounded-[4px] font-serif font-bold italic leading-none">in</span> 
                                     Add to LinkedIn
                                  </button>
                               </div>
                            </div>
                         ) : (
                            // ================= REQUEST STATE =================
                            <div className="animate-fade-in pl-0 md:pl-10">
                               <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-yellow-50 text-yellow-600 rounded-full mb-8 border border-yellow-100">
                                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
                                  <span className="text-[9px] font-black uppercase tracking-widest">Protocol Status</span>
                               </div>
                               
                               <h1 className="text-5xl lg:text-7xl font-black text-[#0A2540] tracking-tighter font-Clash mb-4 leading-[0.9]">
                                  {selectedItem.data.diplomaType}
                               </h1>
                               <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-16">Request Initiated • {selectedItem.data.graduationDate}</p>

                               {selectedItem.data.status === 'pending' && (
                                  <div className="bg-[#0A2540] p-10 md:p-14 rounded-[40px] text-white relative overflow-hidden shadow-3xl mb-12">
                                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF] blur-[100px] opacity-30"></div>
                                     <div className="text-4xl mb-6">📝</div>
                                     <h3 className="text-3xl font-black mb-6 font-Clash tracking-tight">Registered for the Next Batch</h3>
                                     <p className="text-blue-100/70 font-medium leading-relaxed text-lg">Your application is successfully lodged. <strong className="text-white">{selectedItem.data.institution_id}</strong> is currently verifying your records. Once cleared, you will be queued into the next smart contract mint block.</p>
                                  </div>
                               )}

                               {selectedItem.data.status === 'approved' && (
                                  <div className="bg-gradient-to-br from-[#0066FF] to-blue-700 p-10 md:p-14 rounded-[40px] text-white relative overflow-hidden shadow-[0_30px_60px_rgba(0,102,255,0.3)] mb-12 transform hover:scale-[1.02] transition-transform duration-500">
                                     <div className="absolute top-0 right-0 w-64 h-64 bg-white blur-[100px] opacity-20 animate-pulse"></div>
                                     <div className="flex items-center gap-6 mb-8 relative z-10">
                                        <span className="w-14 h-14 rounded-full bg-white text-[#0066FF] flex items-center justify-center font-black text-2xl shadow-xl">🚀</span>
                                        <h3 className="text-3xl font-black font-Clash tracking-tight">In Process of Issue</h3>
                                     </div>
                                     <p className="text-blue-50 font-medium leading-relaxed text-lg relative z-10">
                                        Your diploma details are approved! The cryptographic protocol is actively minting your Soulbound NFT to the ledger. 
                                        <br/><br/>
                                        <span className="bg-white/20 px-4 py-2 rounded-xl text-white font-bold inline-block border border-white/20">You will receive an email</span> as soon as the file is ready to download.
                                     </p>
                                  </div>
                               )}

                               <div className="grid grid-cols-2 gap-6 opacity-60 mb-12">
                                  <div className="bg-white border-2 border-gray-100 p-6 rounded-3xl">
                                     <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-black mb-1">Target Gateway</p>
                                     <p className="font-bold text-[#0A2540] truncate text-sm">{selectedItem.data.institution_id}</p>
                                  </div>
                                  <div className="bg-white border-2 border-gray-100 p-6 rounded-3xl">
                                     <p className="text-[9px] uppercase tracking-[3px] text-gray-400 font-black mb-1">Student Node</p>
                                     <p className="font-bold text-[#0A2540] truncate text-sm">{selectedItem.data.studentName}</p>
                                  </div>
                               </div>
                               
                               <button disabled className="w-full py-6 bg-gray-100 text-gray-300 rounded-[24px] font-black tracking-[4px] uppercase cursor-not-allowed text-xs border-2 border-dashed border-gray-200">
                                  PDF Vault Locked
                               </button>
                            </div>
                         )}
                      </div>
                   </div>
                </div>
             ) : (
                // =============== DASHBOARD FEED VIEW ===============
                <div className="animate-fade-in max-w-7xl mx-auto">
                   <header className="mb-20">
                      <p className="text-[#0066FF] font-black text-[11px] uppercase tracking-[8px] mb-4">Self-Sovereign Identity Hub</p>
                      <h1 className="text-6xl md:text-8xl font-black text-[#0A2540] tracking-tighter leading-[0.9] font-Clash">Student <br /> <span className="text-[#0066FF]">Dashboard.</span></h1>
                   </header>

                   <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
                      
                      {/* Left Side: Vault Gallery */}
                      <div className="xl:col-span-8 space-y-24">
                         {/* AVAILABLE NFTS */}
                         <section>
                            <div className="flex items-center justify-between mb-12">
                               <h2 className="text-4xl font-black text-[#0A2540] tracking-tight font-Clash">Available Documents</h2>
                               <span className="px-4 py-2 bg-blue-100 text-[#0066FF] font-black text-[10px] tracking-[3px] rounded-full uppercase">{nfts.length} Verified</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              {nfts.map((nft) => (
                                <div onClick={() => setSelectedItem({type: 'nft', data: nft})} key={nft.id.toString()} className={`card-nft p-8 group overflow-hidden border-2 relative transition-all duration-700 cursor-pointer ${nft.isRevoked ? 'bg-red-50 border-red-100 opacity-60' : 'bg-white border-blue-50/50 hover:border-[#0066FF] hover:shadow-[0_30px_60px_rgba(0,102,255,0.08)] hover:-translate-y-2'}`}>
                                  <div className="h-56 mb-10 flex items-center justify-center bg-[#F8FAFF] rounded-[32px] relative overflow-hidden group-hover:bg-[#0066FF]/5 transition-colors">
                                     <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-4xl transform group-hover:scale-110 transition-transform duration-500">🎓</div>
                                  </div>
                                  <h3 className="text-2xl font-black text-[#0A2540] mb-2 tracking-tight line-clamp-1">{nft.diplomaInfo.diplomaType}</h3>
                                  <p className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest line-clamp-1 truncate">{nft.diplomaInfo.institution}</p>
                                  
                                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px]">View Details</p>
                                     <div className="w-10 h-10 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-black group-hover:bg-[#FF5C8A] transition-colors">&rarr;</div>
                                  </div>
                                </div>
                              ))}
                              {nfts.length === 0 && (
                                 <div className="md:col-span-2 py-32 bg-white rounded-[40px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                                    <span className="text-7xl mb-6 opacity-20">📭</span>
                                    <h3 className="text-2xl font-black text-gray-300">Your secure token vault is empty.</h3>
                                 </div>
                              )}
                            </div>
                         </section>

                         {/* PENDING REQUESTS */}
                         <section>
                            <h2 className="text-3xl font-black text-[#0A2540] tracking-tight mb-12 flex items-center gap-4 font-Clash">
                               <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                               Active Processes Status
                            </h2>
                            <div className="space-y-6">
                              {requests.map(r => (
                                <div onClick={() => setSelectedItem({type: 'request', data: r})} key={r.id.toString()} className="card-nft p-8 bg-white border-2 border-gray-100 hover:border-[#0A2540] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between cursor-pointer group hover:shadow-xl transition-all">
                                  <div>
                                    <p className="text-2xl font-black text-[#0A2540] mb-1">{r.diplomaType}</p>
                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Institution: {r.institution_id.split('@')[0]}</p>
                                  </div>
                                  <div className="flex items-center gap-6">
                                     <div className={`px-6 py-3 rounded-full font-black text-[9px] tracking-[4px] uppercase ${r.status === 'pending' ? 'bg-gray-100 text-gray-500' : (r.status === 'approved' ? 'bg-[#0066FF] text-white' : 'bg-red-100 text-red-600')}`}>
                                       {r.status === 'pending' ? 'Registered' : (r.status === 'approved' ? 'In Process' : r.status)}
                                     </div>
                                     <span className="text-gray-300 group-hover:text-[#0A2540] transition-colors">&rarr;</span>
                                  </div>
                                </div>
                              ))}
                              {requests.length === 0 && <p className="text-sm text-gray-400 italic font-medium p-6 bg-white rounded-3xl border border-gray-100 text-center">No active background processes found.</p>}
                            </div>
                         </section>
                      </div>

                      {/* Right Side: Action Form */}
                      <div className="xl:col-span-4">
                         <div className="sticky top-10">
                            <div className="bg-[#0A2540] rounded-[48px] p-8 text-white relative overflow-hidden shadow-3xl group">
                               <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#0066FF] blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                               <h2 className="text-3xl font-black mb-8 leading-tight relative z-10 font-Clash">Request <br /> <span className="text-[#00C6FF]">Credential.</span></h2>
                               
                               <form onSubmit={handleRequestSubmit} className="space-y-5 relative z-10">
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Institution Ledger Code/Email</label>
                                     <input type="email" required value={institutionEmail} onChange={e => setInstitutionEmail(e.target.value)} placeholder="dean@university.edu" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all placeholder:text-gray-500" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Full Academic Name</label>
                                     <input type="text" required value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Student Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all placeholder:text-gray-500" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Degree Type</label>
                                     <input type="text" required value={diplomaType} onChange={e => setDiplomaType(e.target.value)} placeholder="B.Sc. Computer Science" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all placeholder:text-gray-500" />
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Graduation Date</label>
                                     <input type="date" required value={graduationDate} onChange={e => setGraduationDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all text-gray-400 focus:text-[#0A2540]" />
                                  </div>
                                  <button type="submit" disabled={reqLoading} className="w-full mt-4 py-5 bg-[#0066FF] hover:bg-white hover:text-[#0A2540] text-white rounded-[20px] font-black text-[10px] tracking-[4px] uppercase shadow-xl transition-all active:scale-95">
                                     {reqLoading ? 'Propagating...' : 'Submit Request'}
                                  </button>
                               </form>
                            </div>
                         </div>
                      </div>

                   </div>
                </div>
             )}
           </>
        )}
      </main>

    </div>
  );
};
export default DashboardPage;
