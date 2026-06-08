import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './../../components/Spinner';
import { certifyd_backend } from "../../declarations/certifyd_backend";

const AuthenticationPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Privacy Lock
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifyName, setVerifyName] = useState("");
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const nftId = BigInt(id);
        const result = await (certifyd_backend as any).getNFT(nftId);
        if (result && result.length > 0) {
          setData(result[0]);
        }
      } catch (error) {
        console.log('Error fetching data: ' + error)
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [id]);

  const handleUnlock = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const fullData = await (certifyd_backend as any).verifyDiploma(BigInt(id), verifyName.trim());
      if (fullData && fullData.length > 0) {
        setIsUnlocked(true);
        setData(fullData[0]);
        setVerifyError("");
      } else {
        setVerifyError("Cipher Failed: Access denied by protocol consensus.");
      }
    } catch (err) {
      console.error(err);
      setVerifyError("Network Error: Could not reach verification nodes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-Outfit selection:bg-[#0066FF] selection:text-white flex flex-col lg:flex-row overflow-hidden">
      
      {/* 1. LEFT SIDE PANEL (Visual Validator) */}
      <div className="lg:w-1/2 bg-[#0A2540] p-10 md:p-20 flex flex-col justify-between relative overflow-hidden h-screen order-2 lg:order-1">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0066FF] blur-[150px] opacity-20 rounded-full animate-pulse"></div>
         
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-20 cursor-pointer" onClick={() => window.location.href='/'}>
               <div className="w-12 h-12 rounded-2xl bg-[#0066FF] flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(0,102,255,0.4)] text-white">C</div>
               <span className="text-2xl font-black tracking-tighter text-white">Certifyd.</span>
            </div>

            <div className="space-y-6">
               <span className="px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-black tracking-[4px] uppercase border border-blue-500/30">Protocol Validator</span>
               <h1 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter font-Clash">
                  Authenticity <br /> <span className="text-[#00C6FF]">Check.</span>
               </h1>
               <p className="text-blue-100/40 font-medium text-lg max-w-md leading-relaxed">
                  Real-time cryptographic verification of institutional soulbound credentials. Anchored on the Internet Computer Protocol.
               </p>
            </div>
         </div>

         <div className="relative z-10">
            {data && (
               <div className="p-8 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl shadow-4xl group">
                  <div className="flex justify-between items-start mb-10">
                     <div className="w-16 h-16 rounded-[24px] bg-white text-[#0A2540] flex items-center justify-center text-3xl shadow-xl">🛡️</div>
                     <span className={`pill-badge !py-2 !px-5 text-[9px] ${data.isRevoked ? 'bg-red-500' : 'bg-green-500'}`}>
                        {data.isRevoked ? 'REVOKED' : 'SECURE'}
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-blue-300 opacity-40 uppercase tracking-[4px] mb-2">Internal Global ID</p>
                  <p className="text-sm font-bold text-white truncate mb-8 select-all">{id}</p>
                  <div className="h-[1px] w-full bg-white/10 mb-8"></div>
                  <div className="flex justify-between items-center text-[10px] font-black text-white uppercase tracking-[3px]">
                     <span className="opacity-40">Network Status</span>
                     <span className="text-green-400 animate-pulse">Live Consistency</span>
                  </div>
               </div>
            )}
         </div>

         {/* Legal Trace */}
         <div className="relative z-10 pt-10 border-t border-white/10 mt-20 flex justify-between items-center text-white/30 text-[9px] uppercase font-black tracking-[4px]">
            <span>NODE ID: {id?.slice(0, 12) || 'UNKNOWN'}...</span>
            <span>VALIDATIONS: {data?.views?.toString() || '0'}</span>
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
                     The issuing university ({data.diplomaInfo.institution}) has permanently revoked this certificate's authenticity layer.
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
                     <h2 className="text-4xl md:text-5xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash leading-[1.1]">{data.diplomaInfo.diplomaType}</h2>
                     <p className="text-2xl font-black text-[#0066FF] tracking-wide inline-flex items-center gap-3 bg-blue-50 py-3 px-8 rounded-full">
                        {data.diplomaInfo.studentName}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <div className="bg-white border-2 border-gray-100 p-8 rounded-[32px] flex items-center gap-6 shadow-sm">
                        <div className="w-16 h-16 rounded-[24px] bg-[#0A2540] text-white flex items-center justify-center font-black text-2xl shadow-lg">🏛️</div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-1">Minting Authority</p>
                           <p className="text-xl font-black text-[#0A2540]">{data.diplomaInfo.institution}</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white border-2 border-gray-100 p-10 rounded-[32px] shadow-sm">
                     <p className="text-[10px] uppercase tracking-[4px] text-gray-400 font-black mb-4">Cryptographic Details</p>
                     <p className="text-[#0A2540]/60 font-medium leading-relaxed text-lg">
                        {data.diplomaInfo.description}
                     </p>
                  </div>

                  <div className="pt-2">
                     <p className="text-center text-[10px] uppercase tracking-[4px] text-[#0066FF] font-black mb-6">Original File Hash Matched</p>
                     {data.metadata && data.metadata.startsWith('data:image') && (
                        <div className="w-full border-4 border-white rounded-[40px] overflow-hidden shadow-2xl shadow-blue-500/10 mb-8 mx-auto hover:rotate-2 transition-transform duration-700 bg-gray-100">
                           <img src={data.metadata} alt="Record" className="w-full h-auto object-contain max-h-[400px]" />
                        </div>
                     )}
                     {data.metadata && data.metadata.startsWith('data:application/pdf') && (
                        <a href={data.metadata} download={`Secure_Record_${data.diplomaInfo.studentName}.pdf`} className="block w-full py-8 text-center bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[32px] font-black tracking-[6px] uppercase transition-all shadow-4xl shadow-pink-500/30 active:scale-95 text-xs">
                           Download Original PDF
                        </a>
                      )}
                      {data.metadata && !data.metadata.startsWith('data:image') && !data.metadata.startsWith('data:application/pdf') && (
                         <button 
                           onClick={() => {
                             const url = data.metadata.startsWith('ipfs://') 
                               ? `https://gateway.pinata.cloud/ipfs/${data.metadata.replace('ipfs://', '')}` 
                               : data.metadata;
                             window.open(url);
                           }} 
                           className="w-full py-8 text-center bg-[#FF5C8A] hover:bg-[#E04B76] text-white rounded-[32px] font-black tracking-[6px] uppercase transition-all shadow-4xl shadow-pink-500/30 active:scale-95 text-xs"
                         >
                            {data.metadata.startsWith('ipfs://') ? 'Unlock Gateway Asset' : 'View Cloud Object'}
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
