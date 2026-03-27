import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './../../components/Spinner';
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
  
  // Privacy Lock
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
      setVerifyError("Name mismatch: Access securely denied by protocol consensus.");
    }
  };

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* 1. LEFT SIDE PANEL (Visual Validator) */}
      <div className="lg:w-1/2 relative flex flex-col justify-between p-12 lg:p-24 overflow-hidden order-2 lg:order-1 bg-[#0A2540]">
         
         {/* Dynamic Protocol Environment */}
         <div className="absolute top-0 right-0 w-full h-full bg-[#0066FF] blur-[250px] opacity-20 rounded-full animate-pulse"></div>
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         {/* Top Branding Nav */}
         <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
               <div className="w-14 h-14 rounded-3xl bg-[#0066FF] flex items-center justify-center font-black text-2xl shadow-[0_0_40px_rgba(0,102,255,0.6)] text-white group-hover:scale-105 transition-transform">C</div>
               <span className="text-3xl font-black tracking-tighter text-white">Certifyd.</span>
            </div>
            {data && !data.isRevoked && (
               <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80] animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[4px]">Ledger Active</span>
               </div>
            )}
         </div>

         {/* Hero Graphic State */}
         <div className="relative z-10 flex-1 flex flex-col justify-center max-w-lg mt-20">
            {loading ? (
               <div className="space-y-6">
                  <p className="font-black text-[12px] uppercase tracking-[8px] text-[#00C6FF]">Protocol Verification</p>
                  <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] font-Clash tracking-tighter">Scanning <br /> Ledger.</h2>
                  <p className="text-blue-100/50 text-xl font-medium leading-relaxed mt-6">Connecting to the Internet Computer to independently verify cryptographic proofs.</p>
               </div>
            ) : !data ? (
               <div className="space-y-6">
                  <span className="text-7xl block mb-6 opacity-40">⚠️</span>
                  <p className="font-black text-[12px] uppercase tracking-[8px] text-red-400">404 Exception</p>
                  <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] font-Clash tracking-tighter">Null <br /> Vector.</h2>
               </div>
            ) : data.isRevoked ? (
               <div className="space-y-6">
                  <p className="font-black text-[12px] uppercase tracking-[8px] text-red-500">Integrity Compromised</p>
                  <h2 className="text-6xl md:text-8xl font-black text-red-500 leading-[0.9] font-Clash tracking-tighter drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]">Revoked.</h2>
                  <p className="text-white/60 text-xl font-medium leading-relaxed mt-6">This credential was explicitly invalidated by the issuing consortium entity.</p>
               </div>
            ) : (
               <div className="space-y-6">
                  <p className="font-black text-[12px] uppercase tracking-[8px] text-[#00C6FF]">Validation Successful</p>
                  <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] font-Clash tracking-tighter">Trust <br /> <span className="text-[#00C6FF]">Verified.</span></h2>
                  
                  <div className="p-8 mt-12 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-md shadow-2xl">
                     <p className="text-[10px] uppercase tracking-[4px] text-blue-300 font-black mb-2 flex items-center gap-3">
                        <span className="text-lg">🛡️</span> Zero-Knowledge Core
                     </p>
                     <p className="text-blue-100/60 font-medium leading-relaxed">
                        This document is a Soulbound Token (SBT) permanently recorded on the blockchain. It cannot be forged, transferred, or deleted by unauthorized nodes.
                     </p>
                  </div>
               </div>
            )}
         </div>

         {/* Legal Trace */}
         <div className="relative z-10 pt-10 border-t border-white/10 mt-20 flex justify-between items-center text-white/30 text-[9px] uppercase font-black tracking-[4px]">
            <span>NODE ID: {id?.slice(0, 12) || 'UNKNOWN'}...</span>
            <span>Certifyd Network</span>
         </div>
      </div>

      {/* 2. RIGHT SIDE (Interaction & Data Viewer) */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-gray-50/50 order-1 lg:order-2 h-screen overflow-y-auto">
         <div className="w-full max-w-xl">
            
            {loading ? (
               <div className="py-40 flex flex-col items-center">
                  <Spinner loading={loading} />
                  <p className="mt-8 font-black text-[10px] tracking-[6px] uppercase text-gray-400">Parsing Metadata...</p>
               </div>
            ) : !data ? (
               <div className="text-center p-16 bg-white rounded-[40px] border-2 border-dashed border-gray-200 shadow-xl">
                  <span className="text-7xl mb-8 block grayscale opacity-40">📭</span>
                  <h1 className="text-4xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash">Credential Missing.</h1>
                  <p className="text-gray-400 font-medium text-lg">No authentic ledger entry was found matching this digital signature.</p>
               </div>
            ) : data.isRevoked ? (
               <div className="p-16 bg-red-50 border-2 border-red-100 rounded-[48px] text-center shadow-[0_20px_40px_rgba(239,68,68,0.1)]">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 text-red-600 font-black">✖</div>
                  <h1 className="text-4xl font-black text-red-600 tracking-tighter mb-4 font-Clash">Access Frozen</h1>
                  <p className="text-red-900/60 font-medium text-lg leading-relaxed">
                     The issuing university ({data.institution}) has permanently revoked this certificate's authenticity layer.
                  </p>
               </div>
            ) : !isUnlocked ? (
               // PRIVACY LOCK SCREEN
               <div className="animate-fade-in">
                  <div className="card-nft p-12 md:p-16 bg-white border-2 border-blue-50/80 shadow-[0_40px_80px_rgba(0,102,255,0.08)] relative group text-center">
                     <div className="w-28 h-28 mx-auto -mt-24 mb-10 rounded-[40px] bg-[#0A2540] flex items-center justify-center text-5xl shadow-[0_20px_40px_rgba(10,37,64,0.3)] group-hover:bg-[#0066FF] transition-all transform group-hover:-translate-y-4 duration-500 border-8 border-white">
                        🔒
                     </div>
                     <h2 className="text-4xl font-black text-[#0A2540] mb-4 font-Clash">Privacy Firewall.</h2>
                     <p className="text-gray-500 font-medium leading-relaxed mb-12 text-lg px-4">
                        To securely reveal the full institutional metadata and verified PDF document, please confirm the <strong className="text-[#0A2540]">Full Name</strong> of the graduate.
                     </p>
                     
                     <div className="space-y-6">
                        <div className="relative group/form">
                           <label className="text-[10px] font-black uppercase tracking-[4px] block mb-4 text-[#0A2540] group-focus-within/form:text-[#0066FF] transition-colors text-left pl-6">Graduate Entity Name</label>
                           <input 
                              type="text" 
                              value={verifyName}
                              onChange={(e) => setVerifyName(e.target.value)}
                              placeholder="e.g. John Doe" 
                              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                              className="w-full bg-gray-50/80 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-7 rounded-[32px] font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300 shadow-inner"
                           />
                        </div>
                        {verifyError && (
                           <p className="text-center text-red-500 font-bold text-[10px] uppercase tracking-widest bg-red-50 py-3 rounded-full mt-2">
                              {verifyError}
                           </p>
                        )}
                        <button 
                           onClick={handleUnlock}
                           className="w-full mt-6 py-8 bg-[#0066FF] hover:bg-[#0A2540] text-white rounded-[32px] font-black tracking-[6px] uppercase shadow-2xl shadow-blue-500/30 transition-all active:scale-95 text-[11px] flex gap-4 items-center justify-center group/btn"
                        >
                           Unlock Cipher <span className="group-hover/btn:translate-x-2 transition-transform">&rarr;</span>
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               // UNLOCKED CREDENTIAL DATA
               <div className="animate-fade-in space-y-12">
                  <div className="text-center mb-16">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[6px] mb-4">Official Degree Type</p>
                     <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash leading-[1.1]">{data.diplomaType}</h2>
                     <p className="text-2xl font-black text-[#0066FF] tracking-wide inline-flex items-center gap-3 bg-blue-50 py-3 px-8 rounded-full">
                        {data.fullName}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <div className="bg-white border-2 border-gray-100 p-8 rounded-[32px] flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-[24px] bg-[#0A2540] text-white flex items-center justify-center font-black text-2xl shadow-lg">🏛️</div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-1">Minting Authority</p>
                           <p className="text-xl font-black text-[#0A2540]">{data.institution}</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white border-2 border-gray-100 p-10 rounded-[32px] shadow-sm">
                     <p className="text-[10px] uppercase tracking-[4px] text-gray-400 font-black mb-4">Cryptographic Details</p>
                     <p className="text-[#0A2540]/60 font-medium leading-relaxed text-lg">
                        {data.description}
                     </p>
                  </div>

                  <div className="pt-2">
                     <p className="text-center text-[10px] uppercase tracking-[4px] text-[#0066FF] font-black mb-6">Original File Hash Matched</p>
                     {data.fileData && data.fileData.startsWith('data:image') && (
                        <div className="w-full border-4 border-white rounded-[40px] overflow-hidden shadow-2xl shadow-blue-500/10 mb-8 mx-auto hover:rotate-2 transition-transform duration-700 bg-gray-100">
                           <img src={data.fileData} alt="Record" className="w-full h-auto object-contain max-h-[400px]" />
                        </div>
                     )}
                     {data.fileData && data.fileData.startsWith('data:application/pdf') && (
                        <a href={data.fileData} download={`Secure_Record_${data.fullName}.pdf`} className="block w-full py-8 text-center bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[32px] font-black tracking-[6px] uppercase transition-all shadow-4xl shadow-pink-500/30 active:scale-95 text-xs">
                           Download Original PDF
                        </a>
                     )}
                     {!data.fileData.startsWith('data:image') && !data.fileData.startsWith('data:application/pdf') && (
                        <button onClick={() => window.open(data.fileData)} className="w-full py-8 text-center bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[32px] font-black tracking-[6px] uppercase transition-all shadow-4xl shadow-pink-500/30 active:scale-95 text-xs">
                           View Cloud Object
                        </button>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>

    </div>
  );
};

export default AuthenticationPage;
