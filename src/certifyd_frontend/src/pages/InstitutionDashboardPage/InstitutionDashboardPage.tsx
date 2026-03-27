import { useState, useEffect } from "react";
import Spinner from './../../components/Spinner';
import { useNavigate } from "react-router-dom";
import { certifyd_backend } from '../../declarations/certifyd_backend'; 

interface NFT {
  id: bigint;
  metadata: string;
  owner_id: string; 
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

export default function InstitutionDashboardPage() {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [requests, setRequests] = useState<DiplomaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [diplomaFiles, setDiplomaFiles] = useState<{[key: string]: File}>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  const issuer = localStorage.getItem("userEmail") || "";

  useEffect(() => {
    fetchData();
  }, [issuer]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [nftRes, reqRes] = await Promise.all([
        certifyd_backend.getNFTsByIssuer(issuer),
        certifyd_backend.getPendingRequests(issuer)
      ]);
      setNfts(nftRes);
      setRequests(reqRes);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (req: DiplomaRequest) => {
    const file = diplomaFiles[req.id.toString()];
    if (!file) {
      alert("Please upload the verified diploma document first.");
      return;
    }
    setProcessingId(req.id.toString());
    
    const instName = issuer.split('@')[0].toUpperCase() + " University";

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const metadata = reader.result as string;
      try {
        await certifyd_backend.approveRequest(req.id, instName, metadata);
        alert('Record Permanently Secured on Ledger.');
        fetchData();
      } catch (err) {
        console.error(err);
        alert('Verification Failed.');
      } finally {
        setProcessingId(null);
      }
    };
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* 1. SIDE NAVIGATION */}
      <aside className="lg:w-80 bg-[#0A2540] text-white p-10 flex flex-col justify-between sticky top-0 h-screen">
         <div>
            <div className="flex items-center gap-4 mb-20 cursor-pointer" onClick={() => navigate('/')}>
               <div className="w-12 h-12 rounded-2xl bg-[#0066FF] flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(0,102,255,0.4)]">C</div>
               <span className="text-2xl font-black tracking-tighter">Certifyd.</span>
            </div>

            <nav className="space-y-4">
               <button className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-[#0066FF] font-black text-[10px] tracking-[4px] uppercase shadow-2xl">
                  🚀 Overview
               </button>
               <button className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 font-black text-[10px] tracking-[4px] uppercase transition-all">
                  📂 Archives
               </button>
               <button className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 font-black text-[10px] tracking-[4px] uppercase transition-all">
                  ⚙️ Settings
               </button>
            </nav>
         </div>

         <div className="pt-10 border-t border-white/10">
            <div className="mb-8">
               <p className="text-[10px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-2">Authenticated As</p>
               <p className="text-sm font-bold truncate text-blue-100">{issuer}</p>
            </div>
            <button onClick={logout} className="text-[10px] font-black uppercase tracking-[4px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-2">
               Logout &rarr;
            </button>
         </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-20 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
           <div>
              <p className="text-[#0066FF] font-black text-[11px] uppercase tracking-[6px] mb-4">Consortium Member Control</p>
              <h1 className="text-5xl lg:text-7xl font-black text-[#0A2540] tracking-tighter leading-[0.9]">Institution <br /> <span className="text-gradient">Center.</span></h1>
           </div>
           <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-[32px] border-2 border-blue-50/50">
              <div className="text-right">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Network Identity</p>
                 <p className="text-sm font-bold text-[#0A2540] italic">Protocol Layer Active</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 animate-pulse font-black shadow-inner">✔</div>
           </div>
        </header>

        { loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <Spinner loading={loading} />
             <p className="mt-8 font-black text-[10px] tracking-[5px] uppercase text-gray-300">Synchronizing Ledger...</p>
          </div>
        ) : (
          <div className="space-y-32">
            
            {/* PENDING APPROVALS */}
            <section>
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-3xl font-black text-[#0A2540] tracking-tight flex items-center gap-4">
                    <span className="w-3 h-3 rounded-full bg-[#0066FF] shadow-[0_0_15px_#0066FF]"></span>
                    Pending Approvals
                 </h2>
                 <span className="pill-badge bg-blue-50 text-[#0066FF] font-black tracking-widest">{requests.length} Requests</span>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {requests.map(req => (
                  <div key={req.id.toString()} className="card-nft p-4 md:p-8 bg-white border-2 border-blue-50/20 flex flex-col lg:flex-row gap-12 items-center hover:border-[#0066FF]">
                     <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4 mb-2">
                           <span className="px-5 py-2 rounded-full bg-[#0A2540] text-white text-[9px] font-black tracking-[4px] uppercase">Diploma Req</span>
                           <span className="text-xs font-bold text-gray-300 italic">ID: {req.id.toString()}</span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0A2540] tracking-tight">{req.diplomaType}</h3>
                        <div className="flex flex-wrap gap-8 pt-4">
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Student</p>
                              <p className="text-lg font-bold text-[#0A2540]">{req.studentName}</p>
                           </div>
                           <div className="w-[1px] h-10 bg-gray-100 hidden md:block"></div>
                           <div>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Graduation</p>
                              <p className="text-lg font-bold text-[#0A2540]">{req.graduationDate}</p>
                           </div>
                        </div>
                     </div>

                     <div className="lg:w-1/3 w-full space-y-6 bg-blue-50/20 p-8 rounded-[32px] border-2 border-blue-50/50">
                        <div>
                           <label className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px] mb-4 block">Official Record Upload</label>
                           <input type="file" onChange={(e) => {
                             if (e.target.files) setDiplomaFiles({...diplomaFiles, [req.id.toString()]: e.target.files[0]});
                           }} className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[2px] file:bg-[#0066FF] file:text-white hover:file:bg-[#0A2540] transition-all cursor-pointer" />
                        </div>
                        <div className="flex gap-4">
                           <button onClick={() => handleApprove(req)} disabled={processingId === req.id.toString()} className="flex-1 py-5 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-2xl font-black text-[10px] tracking-[4px] uppercase transition-all shadow-xl">
                             {processingId === req.id.toString() ? 'Minting...' : 'Approve & Mint'}
                           </button>
                           <button className="px-6 py-5 bg-white border-2 border-red-50 text-red-500 rounded-2xl font-black hover:bg-red-50 transition-all uppercase text-[10px] tracking-[3px]">✖</button>
                        </div>
                     </div>
                  </div>
                ))}
                {requests.length === 0 && (
                  <div className="py-24 text-center bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100 flex flex-col items-center">
                     <span className="text-6xl mb-6 opacity-20">📫</span>
                     <p className="text-xl font-black text-gray-300">Queue perfectly clear. Zero pending approvals.</p>
                  </div>
                )}
              </div>
            </section>

            {/* ACTIVE GALLERY */}
            <section>
              <div className="flex items-center justify-between mb-12">
                 <h2 className="text-3xl font-black text-[#0A2540] tracking-tight">Active Issued Gallery</h2>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest italic">{nfts.length} Records Documented</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {nfts.map((nft) => (
                  <div key={nft.id.toString()} className={`card-nft p-8 group relative overflow-hidden flex flex-col ${nft.isRevoked ? 'bg-red-50/30 border-red-100' : 'bg-white border-[#0A2540]/5'}`}>
                    {nft.isRevoked && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-20"></div>
                    )}
                    <div className="flex justify-between items-start mb-10">
                       <span className={`pill-badge !py-1.5 !px-4 text-[9px] ${nft.isRevoked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                          {nft.isRevoked ? 'REVOKED' : 'SECURED'}
                       </span>
                       <span className="text-[10px] font-black text-gray-300">ID: {nft.id.slice(0, 8)}...</span>
                    </div>
                    
                    <h3 className="text-2xl font-black text-[#0A2540] mb-2 tracking-tight line-clamp-1">{nft.diplomaInfo.diplomaType}</h3>
                    <p className="text-sm font-bold text-[#0066FF] opacity-60 mb-10">{nft.diplomaInfo.studentName}</p>
                    
                    <div className="space-y-4 mb-12">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[2px]">
                          <span className="text-gray-400">Mint Date</span>
                          <span className="text-[#0A2540]">{nft.diplomaInfo.graduationDate}</span>
                       </div>
                       <div className="h-[1px] w-full bg-gray-50"></div>
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[2px]">
                          <span className="text-gray-400">Network</span>
                          <span className="text-[#0A2540]">ICP-Mainnet</span>
                       </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-50">
                       <button 
                         onClick={() => { if(!nft.isRevoked) alert('Revocation protocol active.') }} 
                         className={`w-full py-4 rounded-xl font-black text-[10px] tracking-[4px] uppercase transition-all ${
                            nft.isRevoked 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-white border-2 border-red-50 text-red-400 hover:bg-red-50"
                         }`}
                       >
                         {nft.isRevoked ? "Lock Final" : "Revoke Access"}
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Floating FAQ Button */}
      <button 
        onClick={() => navigate('/faq')}
        className="fixed bottom-10 right-10 w-24 h-24 bg-[#0A2540] text-white rounded-[32px] shadow-4xl flex flex-col items-center justify-center group hover:bg-[#0066FF] hover:-translate-y-2 transition-all z-50 border-4 border-white"
      >
        <span className="text-3xl mb-1 group-hover:scale-125 transition-transform">ℹ️</span>
        <span className="text-[9px] font-black uppercase tracking-[2px]">FAQ</span>
      </button>

    </div>
  );
}
