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
  const [activeTab, setActiveTab] = useState<'overview' | 'minting' | 'registry'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [requests, setRequests] = useState<DiplomaRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [diplomaFiles, setDiplomaFiles] = useState<{[key: string]: File}>({});
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Batch Mint Form State (matches DiplomaInfo backend schema exactly)
  const [batchPromotion, setBatchPromotion] = useState('');
  const [batchClassId, setBatchClassId] = useState('');
  const [batchDept, setBatchDept] = useState('');
  const [batchOption, setBatchOption] = useState('');
  const [batchDiplomaType, setBatchDiplomaType] = useState('');
  const [batchGradDate, setBatchGradDate] = useState('');
  const [batchDescription, setBatchDescription] = useState('');
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [batchMinting, setBatchMinting] = useState(false);

  const issuer = localStorage.getItem("userEmail") || "";
  const institutionName = issuer.split('@')[0].toUpperCase() + " University";

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

  const handleRevoke = async (nftId: bigint) => {
    if (!confirm('WARNING: Are you sure you want to permanently revoke this credential? This action is immutable and will lock the record globally.')) return;
    try {
      const success = await certifyd_backend.revokeNFT(nftId, issuer);
      if (success) {
        alert('Credential Revocation Successful. The record is now permanently frozen.');
        fetchData();
      } else {
        alert('Revocation failed. You may lack sufficient cryptographic privileges.');
      }
    } catch (err) {
      console.error(err);
      alert('Network transmission error during revocation.');
    }
  };

  const handleReject = async (req: DiplomaRequest) => {
    if (!confirm(`Reject diploma request for ${req.studentName}? This action will notify the student.`)) return;
    try {
      const success = await certifyd_backend.rejectRequest(req.id, issuer);
      if (success) {
        alert('Request has been rejected and removed from the queue.');
        fetchData();
      } else {
        alert('Rejection failed. Insufficient privileges.');
      }
    } catch(err) {
      console.error(err);
      alert('Network error during rejection.');
    }
  };

  const handleBatchMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (batchFiles.length === 0) {
      alert('Please upload at least one student PDF file before minting.');
      return;
    }
    if (!batchClassId || !batchPromotion || !batchDept || !batchDiplomaType) {
      alert('Please fill all required promotion metadata fields.');
      return;
    }
    setBatchMinting(true);
    let successCount = 0;
    for (const file of batchFiles) {
      // Parse student name from filename: [BatchID]_[Student Name].pdf
      const namePart = file.name.replace(/\.pdf$/i, '').split('_').slice(1).join(' ');
      const studentEmail = `${namePart.toLowerCase().replace(/\s+/g, '.')}.student@certifyd.net`;
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const metadata = reader.result as string;
          const diplomaInfo = {
            classId: batchClassId,
            promotion: batchPromotion,
            institution: institutionName,
            diplomaType: batchDiplomaType,
            studentName: namePart || file.name,
            graduationDate: batchGradDate,
            description: batchDescription || `${batchDiplomaType} in ${batchDept}${batchOption ? ' - ' + batchOption : ''} — ${batchPromotion}`,
          };
          try {
            await certifyd_backend.mint(studentEmail, metadata, diplomaInfo);
            successCount++;
          } catch(err) {
            console.error(`Failed to mint for ${namePart}:`, err);
          }
          resolve();
        };
      });
    }
    setBatchMinting(false);
    alert(`Batch minting complete! ${successCount}/${batchFiles.length} credentials successfully secured on the ledger.`);
    fetchData();
    // Reset form
    setBatchFiles([]); setBatchClassId(''); setBatchPromotion('');
    setBatchDept(''); setBatchOption(''); setBatchDiplomaType('');
    setBatchGradDate(''); setBatchDescription('');
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-Outfit">
      
      {/* 1. SIDE NAVIGATION */}
      <aside className="lg:w-80 bg-[#0A2540] text-white p-10 flex flex-col justify-between sticky top-0 h-screen">
         <div>
            <div className="flex items-center gap-4 mb-20 cursor-pointer" onClick={() => navigate('/')}>
               <div className="w-12 h-12 rounded-2xl bg-[#0066FF] flex items-center justify-center font-black text-xl shadow-[0_0_30px_rgba(0,102,255,0.4)]">C</div>
               <span className="text-2xl font-black tracking-tighter">Certifyd.</span>
            </div>

            <nav className="space-y-4">
               <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-[10px] tracking-[4px] uppercase transition-all shadow-2xl ${activeTab === 'overview' ? 'bg-[#0066FF] text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                  🚀 Overview
               </button>
               <button onClick={() => setActiveTab('minting')} className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-[10px] tracking-[4px] uppercase transition-all shadow-2xl ${activeTab === 'minting' ? 'bg-[#0066FF] text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                  🪄 Mint Batch
               </button>
               <button onClick={() => setActiveTab('registry')} className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-[10px] tracking-[4px] uppercase transition-all shadow-2xl ${activeTab === 'registry' ? 'bg-[#0066FF] text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                  🔍 Student Registry
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
              <h1 className="text-5xl lg:text-7xl font-black text-[#0A2540] tracking-tighter leading-[0.9]">
                 {activeTab === 'overview' && 'Institution'}
                 {activeTab === 'minting' && 'Mint Batch'}
                 {activeTab === 'registry' && 'Student Registry'}
                 <br /> <span className="text-gradient">
                   {activeTab === 'registry' ? 'Database.' : 'Center.'}
                 </span>
              </h1>
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
          <>
            {activeTab === 'overview' ? (
              <div className="space-y-32">
                {/* INSTITUTION PROFILE & STATS */}
                <section className="bg-gradient-to-br from-[#0A2540] to-blue-900 rounded-[48px] p-10 md:p-16 relative overflow-hidden shadow-3xl text-white">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF] blur-[150px] opacity-30 rounded-full animate-pulse"></div>
                   <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between items-center">
                      <div className="flex items-center gap-8">
                         <div className="w-32 h-32 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-5xl shadow-inner">🏛️</div>
                         <div>
                            <p className="text-[10px] uppercase font-black tracking-[4px] text-blue-300 mb-2">Registered Consortium Member</p>
                            <h2 className="text-4xl lg:text-5xl font-black font-Clash tracking-tight mb-2">
                               {issuer.split('@')[0].toUpperCase()}
                            </h2>
                            <div className="flex items-center gap-3">
                               <span className="px-4 py-1.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-[9px] uppercase tracking-widest font-black">Verified</span>
                               <span className="text-xs font-bold text-gray-300 italic select-all">
                                  ID: INS-{Math.abs(issuer.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)).toString(16).toUpperCase().padStart(8, '0')}
                               </span>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center min-w-[140px]">
                            <h4 className="text-3xl font-black text-white font-Clash mb-1">{Array.from(new Set(nfts.map(n => n.diplomaInfo.studentName))).length}</h4>
                            <p className="text-[9px] uppercase tracking-[2px] text-blue-200">Affiliated Students</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center min-w-[140px]">
                            <h4 className="text-3xl font-black text-[#00C6FF] font-Clash mb-1">{nfts.length}</h4>
                            <p className="text-[9px] uppercase tracking-[2px] text-blue-200">Total Records</p>
                         </div>
                      </div>
                   </div>
                </section>

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
                               <button type="button" onClick={() => handleReject(req)} className="px-6 py-5 bg-white border-2 border-red-50 text-red-500 rounded-2xl font-black hover:bg-red-50 transition-all uppercase text-[10px] tracking-[3px]">✖</button>
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
                           <span className="text-[10px] font-black text-gray-300">ID: {nft.id.toString().slice(0, 8)}...</span>
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
                             onClick={() => { if (!nft.isRevoked) handleRevoke(nft.id); }} 
                             className={`w-full py-4 rounded-xl font-black text-[10px] tracking-[4px] uppercase transition-all ${
                                nft.isRevoked 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-white border-2 border-red-50 text-red-400 hover:bg-red-50"
                             }`}
                           >
                             {nft.isRevoked ? "Revocation Final" : "Revoke Access"}
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : activeTab === 'minting' ? (
              // MINT BATCH TAB - Fully Wired
              <div className="space-y-16 animate-fade-in">
                 <div className="flex flex-col xl:flex-row gap-16">
                    {/* Left Side: Form */}
                    <div className="flex-1 space-y-12">
                       <div className="p-8 bg-blue-50/50 border-2 border-blue-100 rounded-[32px] flex gap-6 items-start">
                          <span className="text-4xl mt-1">⚠️</span>
                          <div>
                             <h4 className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px] mb-2">Crucial Pre-Minting Requirement</h4>
                             <p className="text-sm font-medium text-gray-600 leading-relaxed">Ensure all academic diplomas provided per class are in <strong className="text-[#0066FF]">.PDF format</strong>. To allow automated smart-contract binding, each file must be named strictly using the pattern <code className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-[#0A2540] font-bold mx-1">[Batch ID]_[Student Name].pdf</code>.</p>
                          </div>
                       </div>

                       <label className="border-4 border-dashed border-gray-200 rounded-[40px] p-16 text-center bg-gray-50/50 hover:bg-white hover:border-[#0066FF] hover:shadow-[0_20px_40px_rgba(0,102,255,0.05)] transition-all group cursor-pointer block">
                          <input type="file" accept=".pdf" multiple className="hidden" onChange={e => setBatchFiles(Array.from(e.target.files || []))} />
                          <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-4xl mx-auto mb-8 group-hover:-translate-y-3 transition-transform duration-500 border border-gray-100">📥</div>
                          <h3 className="text-2xl font-black text-[#0A2540] mb-3">{batchFiles.length > 0 ? `${batchFiles.length} PDFs Selected ✓` : 'Upload Class PDFs'}</h3>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest max-w-sm mx-auto">Naming: [BatchID]_[Student Name].pdf. Max 100 files per transaction.</p>
                       </label>

                       <form onSubmit={handleBatchMint} className="space-y-8 bg-white p-10 rounded-[40px] border-2 border-gray-50 shadow-[0_20px_40px_rgba(0,0,0,0.02)]">
                          <h4 className="text-2xl font-black text-[#0A2540] font-Clash tracking-tight mb-8">Promotion Metadata</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Promotion / Year *</label>
                                <input required type="text" value={batchPromotion} onChange={e => setBatchPromotion(e.target.value)} placeholder="e.g. Class of 2026" className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Global Batch ID *</label>
                                <input required type="text" value={batchClassId} onChange={e => setBatchClassId(e.target.value)} placeholder="e.g. CS2026-A" className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300" />
                             </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Department *</label>
                                <input required type="text" value={batchDept} onChange={e => setBatchDept(e.target.value)} placeholder="e.g. Computer Science" className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Speciality Option</label>
                                <input type="text" value={batchOption} onChange={e => setBatchOption(e.target.value)} placeholder="e.g. Software Engineering" className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300" />
                             </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Degree Type *</label>
                                <input required type="text" value={batchDiplomaType} onChange={e => setBatchDiplomaType(e.target.value)} placeholder="e.g. B.Sc. Engineering" className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300" />
                             </div>
                             <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Graduation Date *</label>
                                <input required type="date" value={batchGradDate} onChange={e => setBatchGradDate(e.target.value)} className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all text-gray-500" />
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mb-3 block">Description (Optional)</label>
                             <textarea value={batchDescription} onChange={e => setBatchDescription(e.target.value)} placeholder="Official description of the degree program..." rows={3} className="w-full bg-gray-50 border-2 border-transparent focus:border-[#0066FF] focus:bg-white p-6 rounded-3xl font-bold text-[#0A2540] outline-none transition-all placeholder:text-gray-300 resize-none" />
                          </div>
                          <div className="pt-6">
                             <button type="submit" disabled={batchMinting} className="w-full py-6 bg-[#0066FF] hover:bg-[#0A2540] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-[28px] font-black tracking-[4px] uppercase transition-all shadow-2xl active:scale-95 text-xs">
                                {batchMinting ? `Minting ${batchFiles.length} Records...` : 'Execute Batch Mint Protocol'}
                             </button>
                          </div>
                       </form>
                    </div>

                    {/* Right Side: Ledger Preview */}
                    <div className="xl:w-1/3 w-full">
                       <div className="card-nft p-10 bg-white border-2 border-blue-50/80 shadow-[0_40px_80px_rgba(0,102,255,0.06)] sticky top-10">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-8">Metadata Preview Map</p>
                          <div className="w-full h-72 bg-gradient-to-br from-blue-50 to-white rounded-[32px] flex items-center justify-center shadow-inner relative overflow-hidden mb-10 border border-gray-100">
                             <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0A2540 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                             <div className="absolute w-[200px] h-[200px] bg-[#0066FF] blur-[80px] opacity-20 animate-pulse rounded-full"></div>
                             <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center text-6xl z-10">🎓</div>
                          </div>
                          <div className="mb-8">
                             <h3 className="text-3xl font-black text-[#0A2540] tracking-tight mb-2">{batchPromotion || 'Class Promotion Node'}</h3>
                             <p className="text-gray-400 font-bold text-sm">{batchDiplomaType || 'Bulk Institutional Issuance'}</p>
                          </div>
                          <div className="space-y-6">
                             <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Est. Network Fee</span>
                                <span className="font-bold text-[#0066FF]">0.00 ICP</span>
                             </div>
                             <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Files Ready</span>
                                <span className={`font-bold ${batchFiles.length > 0 ? 'text-[#0066FF]' : 'text-[#0A2540]'}`}>{batchFiles.length} Detected</span>
                             </div>
                             <div className="flex items-center gap-4 pt-4">
                                <div className="w-12 h-12 bg-[#0A2540] rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg">C</div>
                                <div>
                                   <p className="text-[9px] uppercase font-black tracking-widest text-gray-400">Minting Authority</p>
                                   <p className="font-bold text-[#0A2540] text-sm truncate max-w-[150px]">{institutionName}</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              // STUDENT REGISTRY TAB
              <div className="space-y-12 animate-fade-in">
                 
                 <div className="w-full relative mb-16">
                    <span className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl">🔍</span>
                    <input 
                       type="text"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       placeholder="Search by exact student name..."
                       className="w-full max-w-4xl bg-gray-50/50 border-4 border-gray-100 rounded-[40px] py-10 pl-24 pr-10 text-2xl font-black text-[#0A2540] outline-none focus:border-[#0066FF] focus:bg-white transition-all shadow-sm placeholder:text-gray-300"
                    />
                 </div>

                 {searchQuery.length < 2 && (
                    <div className="py-24 text-center border-4 border-dashed border-gray-100 rounded-[64px] bg-gray-50 flex flex-col items-center">
                       <span className="text-7xl mb-8 grayscale opacity-20 block">📚</span>
                       <h3 className="text-3xl font-black text-gray-300 tracking-tight mb-2">Registry Standby</h3>
                       <p className="text-lg font-bold text-gray-400">Enter a student's name into the terminal to surface their protocol data.</p>
                    </div>
                 )}

                 {searchQuery.length >= 2 && Array.from(new Set([...nfts.map(n => n.diplomaInfo.studentName), ...requests.map(r => r.studentName)])).filter(n => n.toLowerCase().includes(searchQuery.toLowerCase())).map((studentName, idx) => {
                    const s_nfts = nfts.filter(n => n.diplomaInfo.studentName === studentName);
                    const s_reqs = requests.filter(r => r.studentName === studentName);

                    return (
                       <div key={idx} className="bg-white border-2 border-blue-50/80 shadow-[0_20px_40px_rgba(0,102,255,0.06)] rounded-[40px] p-10 md:p-16 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF] blur-[80px] opacity-10"></div>
                          
                          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center justify-between mb-12">
                             <div className="flex items-center gap-8">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-gray-100">👤</div>
                                <div>
                                   <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px] mb-2">Registered Entity</p>
                                   <h3 className="text-4xl md:text-5xl font-black text-[#0A2540] tracking-tighter font-Clash">{studentName}</h3>
                                </div>
                             </div>
                             <div className="flex gap-4">
                                <span className="px-6 py-2 bg-blue-50 border border-blue-100 text-[#0066FF] font-black text-[10px] tracking-[3px] uppercase rounded-full">
                                   {s_nfts.length} Records Verified
                               </span>
                               {s_reqs.length > 0 && <span className="px-6 py-2 bg-yellow-50 border border-yellow-100 text-yellow-600 font-black text-[10px] tracking-[3px] uppercase rounded-full">{s_reqs.length} Active Processes</span>}
                             </div>
                          </div>

                          {s_nfts.length > 0 && (
                             <div className="space-y-6 mb-12 border-t border-gray-50 pt-10">
                                <h4 className="text-[12px] font-black text-[#0A2540] uppercase tracking-[4px] mb-6 flex items-center gap-3">
                                   <span className="text-[#0066FF]">🛡️</span> Immutable Ledger Core
                                </h4>
                                {s_nfts.map(nft => (
                                   <div key={nft.id.toString()} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-3xl border border-gray-100">
                                      <div>
                                         <p className="font-bold text-[#0A2540] text-lg mb-1">{nft.diplomaInfo.diplomaType}</p>
                                         <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">Mint String: {nft.id.toString().slice(0, 16)}...</p>
                                      </div>
                                      <div className={`px-4 py-1.5 font-black text-[9px] uppercase tracking-widest rounded-full ${nft.isRevoked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                         {nft.isRevoked ? 'Invalidated' : 'Secured'}
                                      </div>
                                   </div>
                                ))}
                             </div>
                          )}

                          {s_reqs.length > 0 && (
                             <div className="space-y-6 border-t border-gray-50 pt-10">
                                <h4 className="text-[12px] font-black text-[#0A2540] uppercase tracking-[4px] mb-6 flex items-center gap-3">
                                   <span className="text-yellow-500">⏳</span> Processing Queue
                                </h4>
                                {s_reqs.map(req => (
                                   <div key={req.id.toString()} className="flex items-center justify-between p-6 bg-yellow-50/30 rounded-3xl border border-yellow-50">
                                      <div>
                                         <p className="font-bold text-[#0A2540] text-lg mb-1">{req.diplomaType}</p>
                                         <p className="text-[10px] uppercase font-black tracking-widest text-yellow-600/60">ID Tag: {req.id.toString()}</p>
                                      </div>
                                      <div className="px-4 py-1.5 font-black text-[9px] uppercase tracking-widest rounded-full bg-yellow-100 text-yellow-600">
                                         {req.status} Protocol
                                      </div>
                                   </div>
                                ))}
                             </div>
                          )}

                       </div>
                    );
                 })}
                 
              </div>
            )}
          </>
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
