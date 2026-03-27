import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './../../components/Spinner.tsx';
import { certifyd_backend } from "../../declarations/certifyd_backend";

interface DiplomaData {
  fullName: string;
  institution: string;
  diplomaType: string;
  description: string;
  fileData: string;
  isRevoked: boolean;
}

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DiplomaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifyName, setVerifyName] = useState("");
  const [verifyError, setVerifyError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!id) return;
        const nftId = BigInt(id);
        const result = await certifyd_backend.getNFT(nftId);
        if (result && result.length > 0) {
          setData({
            fullName: result[0].diplomaInfo.studentName,
            institution: result[0].diplomaInfo.institution,
            diplomaType: result[0].diplomaInfo.diplomaType,
            description: result[0].diplomaInfo.description,
            fileData: result[0].metadata,
            isRevoked: result[0].isRevoked
          });
        }
      } catch (error) {
        console.log('Error fetching data: ' + error)
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [id]);

  const handleUnlock = () => {
    if (!data) return;
    if (verifyName.trim().toLowerCase() === data.fullName.toLowerCase()) {
      setIsUnlocked(true);
      setVerifyError("");
    } else {
      setVerifyError("Name mismatch: Access denied by protocol consensus.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white">
      
      {/* 1. MINIMAL NAV */}
      <header className="fixed top-0 left-0 w-full h-24 border-b-2 border-blue-50/50 bg-white/80 backdrop-blur-xl z-50 px-8 flex items-center justify-between">
         <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-12 h-12 rounded-2xl bg-[#0A2540] flex items-center justify-center font-black text-xl text-white group-hover:bg-[#0066FF] transition-all">C</div>
            <span className="text-2xl font-black tracking-tighter text-[#0A2540]">Certifyd.</span>
         </div>
         <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px] hidden md:block">Blockchain Verified Record</span>
            <button onClick={() => navigate('/login')} className="pill-badge pill-badge-premium py-2 px-6 !h-auto">Portal Login</button>
         </div>
      </header>

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          
          {loading ? (
             <div className="py-40 flex flex-col items-center">
                <Spinner loading={loading} />
                <p className="mt-8 font-black text-[10px] tracking-[6px] uppercase text-gray-300">Validating Ledger Principal...</p>
             </div>
          ) : !data ? (
             <div className="py-40 text-center">
                <span className="text-8xl mb-12 block">⚠️</span>
                <h1 className="text-5xl font-black text-[#0A2540] tracking-tighter mb-4">Record Not Found.</h1>
                <p className="text-gray-400 text-xl font-medium">This credential principal does not exist on the protocol.</p>
             </div>
          ) : data.isRevoked ? (
             <div className="py-40 text-center max-w-2xl mx-auto dark-section p-20 bg-red-600 rounded-[60px] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-full h-full bg-white blur-[200px] opacity-10 animate-pulse"></div>
                <h1 className="text-7xl font-black text-white mb-8 tracking-tight">REVOKED.</h1>
                <p className="text-white/60 text-xl font-medium leading-relaxed mb-12">This identity has been officially invalidated by <br /> <strong className="text-white underline">{data.institution}</strong>.</p>
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 rounded-full border border-white/20">
                   <span className="w-3 h-3 rounded-full bg-white animate-pulse"></span>
                   <span className="text-white font-black text-[10px] tracking-[4px] uppercase">Protocol Locked</span>
                </div>
             </div>
          ) : (
            <div className="space-y-20">
              
              {/* STATUS HEADER */}
              <div className="text-center">
                 <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-green-50 rounded-full text-green-600 mb-8 border border-green-100">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
                    <span className="text-[10px] font-black uppercase tracking-[4px]">Status: Authenticated</span>
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-[#0A2540] tracking-tighter leading-[0.9] mb-8 font-Clash">Record <br /> <span className="text-gradient">Validated.</span></h1>
                 <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">This credential was officially minted and secured on the Internet Computer blockchain by {data.institution}.</p>
              </div>

              {/* UNLOCK MECHANISM */}
              {!isUnlocked ? (
                <div className="max-w-2xl mx-auto card-nft p-12 md:p-20 bg-white border-2 border-blue-50/50 shadow-4xl relative group">
                   <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-[32px] bg-[#0A2540] flex items-center justify-center text-4xl shadow-3xl group-hover:bg-[#0066FF] transition-all">🔒</div>
                   <div className="text-center mb-12">
                      <h2 className="text-3xl font-black text-[#0A2540] mb-4">Privacy Locked.</h2>
                      <p className="text-gray-400 font-medium leading-relaxed">To view the full certificate details and retrieve the document, provide the exact Full Name documented in this record.</p>
                   </div>
                   <div className="space-y-6">
                      <input 
                        type="text" 
                        value={verifyName}
                        onChange={(e) => setVerifyName(e.target.value)}
                        placeholder="e.g. Student Full Name" 
                        onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-8 rounded-[32px] text-center text-2xl font-black text-[#0A2540] outline-none transition-all placeholder:text-gray-200"
                      />
                      {verifyError && <p className="text-center text-red-500 font-bold text-xs uppercase tracking-widest">{verifyError}</p>}
                      <button 
                        onClick={handleUnlock}
                        className="w-full py-8 bg-[#0A2540] hover:bg-[#0066FF] text-white rounded-[32px] font-black tracking-[6px] uppercase shadow-2xl transition-all active:scale-95 text-xs"
                      >
                        Unlock Record &rarr;
                      </button>
                   </div>
                </div>
              ) : (
                <div className="space-y-20 reveal">
                   <div className="card-nft p-1 outline-none border-none shadow-[0_100px_200px_rgba(0,102,255,0.15)] bg-gradient-to-br from-blue-100 to-white rounded-[60px]">
                      <div className="bg-white rounded-[58px] p-8 md:p-20 text-center relative overflow-hidden border-2 border-white">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF] blur-[120px] opacity-[0.05]"></div>
                         
                         <div className="flex flex-col items-center mb-16">
                            <div className="w-16 h-1 bg-[#0A2540] mb-8"></div>
                            <p className="text-[12px] font-black text-[#0066FF] uppercase tracking-[8px] mb-8">Official Achievement Record</p>
                            <h2 className="text-5xl md:text-6xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash">{data.diplomaType}</h2>
                            <p className="text-xl font-bold text-gray-400 italic mb-12 tracking-wide">Awarded to <span className="text-[#0A2540] not-italic underline decoration-[#0066FF] decoration-4 underline-offset-8 uppercase">{data.fullName}</span></p>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-20 bg-gray-50/50 p-12 rounded-[40px]">
                            <div className="space-y-2 border-l-4 border-blue-100 pl-8">
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">Issuing Institution</p>
                               <p className="text-2xl font-black text-[#0A2540]">{data.institution}</p>
                            </div>
                            <div className="space-y-2 border-l-4 border-green-100 pl-8">
                               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">Verification ID</p>
                               <p className="text-2xl font-black text-[#0A2540]">{id?.slice(0, 16)}...</p>
                            </div>
                         </div>

                         <div className="flex flex-wrap justify-center gap-8">
                            {data.fileData && data.fileData.startsWith('data:image') && (
                              <div className="w-full max-w-3xl border-4 border-[#0A2540] rounded-[40px] overflow-hidden shadow-4xl group">
                                 <img src={data.fileData} alt="Record" className="w-full h-auto group-hover:scale-105 transition-transform duration-1000" />
                              </div>
                            )}
                            {data.fileData && data.fileData.startsWith('data:application/pdf') && (
                              <a href={data.fileData} download="Verified_Legacy_Record.pdf" className="btn-primary !py-8 !px-16 !bg-[#0A2540] hover:!bg-[#0066FF] shadow-4xl group">
                                 ⬇️ Download Secure PDF
                              </a>
                            )}
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col md:flex-row gap-8 justify-center items-center opacity-40 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[4px] text-gray-400">
                         <span className="w-3 h-3 rounded-full bg-[#0066FF]"></span>
                         ICP Protocol Minted
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[4px] text-gray-400">
                         <span className="w-3 h-3 rounded-full bg-[#0066FF]"></span>
                         Zero-Knowledge Validated
                      </div>
                   </div>
                </div>
              )}

            </div>
          )}
        </div>
      </main>

      {/* FOOTER IMPACT */}
      <footer className="py-20 bg-gray-50/50 border-t border-blue-50/20 text-center px-6">
         <div className="max-w-4xl mx-auto space-y-12">
            <h4 className="text-3xl font-black text-[#0A2540] tracking-tight">Trust but Verify.</h4>
            <p className="text-gray-500 font-medium leading-relaxed">Certifyd is the decentralized layer for sovereign credentials. No more manual verification, no more fraud. Just math and code.</p>
            <div className="flex flex-wrap justify-center gap-8">
               <button onClick={() => navigate('/signup')} className="text-[10px] font-black text-[#0066FF] border-b-2 border-blue-100 hover:border-[#0066FF] transition-all uppercase tracking-[4px] pb-1">Start Issuing</button>
               <button onClick={() => navigate('/faq')} className="text-[10px] font-black text-gray-400 border-b-2 border-transparent hover:border-gray-200 transition-all uppercase tracking-[4px] pb-1">Learn About SBTs</button>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default AuthenticationPage;
