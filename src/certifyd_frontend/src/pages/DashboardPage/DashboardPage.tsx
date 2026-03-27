import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
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
  const owner = localStorage.getItem("userEmail") || "";

  // Form states
  const [institutionEmail, setInstitutionEmail] = useState('');
  const [diplomaType, setDiplomaType] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      
      {/* 1. SIDEBAR */}
      <aside className="lg:w-80 bg-[#0A2540] text-white p-10 flex flex-col justify-between sticky top-0 h-screen">
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
                  <button className="w-full text-left px-8 py-5 rounded-2xl bg-[#0066FF] font-black text-[10px] tracking-[4px] uppercase">📜 Credentials</button>
                  <button className="w-full text-left px-8 py-5 rounded-2xl bg-transparent hover:bg-white/5 font-black text-[10px] tracking-[4px] uppercase text-white/50 hover:text-white transition-all">⚡ Verification</button>
               </nav>
            </div>
         </div>

         <div className="pt-10 border-t border-white/10">
            <button onClick={logout} className="text-[10px] font-black uppercase tracking-[4px] text-red-400 hover:text-red-300 transition-colors">Logout &rarr;</button>
         </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-20 overflow-y-auto">
        <header className="mb-20">
           <p className="text-[#0066FF] font-black text-[11px] uppercase tracking-[8px] mb-4">Self-Sovereign Identity Hub</p>
           <h1 className="text-6xl md:text-8xl font-black text-[#0A2540] tracking-tighter leading-[0.9]">Student <br /> <span className="text-gradient">Dashboard.</span></h1>
        </header>

        { loading ? (
          <div className="flex items-center justify-center py-40">
             <Spinner loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
            
            {/* INVENTORY GALLERY */}
            <div className="xl:col-span-8 space-y-16">
               <section>
                  <div className="flex items-center justify-between mb-12">
                     <h2 className="text-3xl font-black text-[#0A2540] tracking-tight">Your Soulbound Records</h2>
                     <span className="text-xs font-bold text-gray-300 italic tracking-widest uppercase">{nfts.length} Records Verified</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {nfts.map((nft) => {
                      const nftLink = `${window.location.origin}/auth/${nft.id}`;
                      return (
                        <div key={nft.id.toString()} className={`card-nft p-8 group overflow-hidden border-2 relative transition-all duration-700 ${nft.isRevoked ? 'bg-red-50 border-red-100 opacity-60' : 'bg-[#F8FAFF] border-blue-50/20 hover:border-[#0066FF] hover:bg-white active:scale-95'}`}>
                          {nft.isRevoked && (
                            <div className="absolute top-6 right-6 px-4 py-2 bg-red-600 text-white font-black text-[8px] tracking-[4px] uppercase rounded-full z-10 shadow-2xl">Revoked</div>
                          )}
                          {!nft.isRevoked && (
                            <div className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#0066FF] font-black scale-0 group-hover:scale-100 transition-transform">✓</div>
                          )}
                          
                          <div className="h-48 mb-10 flex items-center justify-center bg-white/40 rounded-[32px] border border-white relative overflow-hidden group-hover:bg-[#0066FF]/5 transition-colors">
                             <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <QRCode value={nftLink} size={120} className="relative z-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-110" />
                          </div>

                          <h3 className="text-2xl font-black text-[#0A2540] mb-2 tracking-tight line-clamp-1">{nft.diplomaInfo.diplomaType}</h3>
                          <p className="text-sm font-bold text-[#0066FF] opacity-50 mb-8 uppercase tracking-widest line-clamp-1">{nft.diplomaInfo.institution}</p>
                          
                          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                             <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] mb-1">Issue Date</p>
                                <p className="text-sm font-black text-[#0A2540]">{nft.diplomaInfo.graduationDate}</p>
                             </div>
                             <a href={nftLink} className="w-12 h-12 rounded-2xl bg-[#0A2540] text-white flex items-center justify-center font-black hover:bg-[#0066FF] transition-all">&rarr;</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {nfts.length === 0 && (
                     <div className="py-32 bg-gray-50 rounded-[40px] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center text-center">
                        <span className="text-7xl mb-8 opacity-20">📜</span>
                        <h3 className="text-2xl font-black text-gray-300">Your digital vault is currently empty.</h3>
                        <p className="text-gray-400 mt-4 max-w-[300px]">Submit a request to your institution to secure your first degree.</p>
                     </div>
                  )}
               </section>

               <section>
                  <h2 className="text-3xl font-black text-[#0A2540] tracking-tight mb-12 flex items-center gap-4">
                     <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                     Pending Protocols
                  </h2>
                  <div className="space-y-4">
                    {requests.map(r => (
                      <div key={r.id.toString()} className="card-nft p-8 border-none bg-gray-50/50 hover:bg-white border-2 border-transparent hover:border-gray-100 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-black text-[#0A2540]">{r.diplomaType}</p>
                          <p className="text-xs font-bold text-gray-400 tracking-wider">Gateway: {r.institution_id}</p>
                        </div>
                        <div className={`px-5 py-2 rounded-full font-black text-[9px] tracking-[4px] uppercase ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : (r.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600')}`}>
                          {r.status}
                        </div>
                      </div>
                    ))}
                    {requests.length === 0 && <p className="text-sm text-gray-400 italic font-medium pl-6">No pending record requests found on ledger.</p>}
                  </div>
               </section>
            </div>

            {/* ACTION SIDEBAR (REQUEST FORM) */}
            <div className="xl:col-span-4">
               <div className="sticky top-20">
                  <div className="bg-[#0A2540] rounded-[48px] p-10 text-white relative overflow-hidden shadow-4xl group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF] blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                     <h2 className="text-3xl font-black mb-10 leading-tight relative z-10">Secure New <br /> <span className="text-[#00C6FF]">Credential.</span></h2>
                     
                     <form onSubmit={handleRequestSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Institution Ledger Email</label>
                           <input type="email" required value={institutionEmail} onChange={e => setInstitutionEmail(e.target.value)} placeholder="dean@university.edu" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all" />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Full Academic Name</label>
                              <input type="text" required value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Student Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Degree Type</label>
                              <input type="text" required value={diplomaType} onChange={e => setDiplomaType(e.target.value)} placeholder="B.Sc. Computer Science" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-blue-300 opacity-60 uppercase tracking-[4px]">Graduation Date</label>
                           <input type="date" required value={graduationDate} onChange={e => setGraduationDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold focus:bg-white focus:text-[#0A2540] outline-none transition-all" />
                        </div>
                        <button type="submit" disabled={reqLoading} className="w-full py-6 bg-[#0066FF] hover:bg-white hover:text-[#0A2540] text-white rounded-[24px] font-black text-[12px] tracking-[5px] uppercase shadow-2xl transition-all active:scale-95">
                           {reqLoading ? 'Propagating...' : 'Submit Request &rarr;'}
                        </button>
                     </form>
                  </div>

                  <div className="mt-12 group cursor-pointer" onClick={() => navigate('/faq')}>
                     <div className="card-nft p-8 border-2 border-blue-50/50 flex items-center justify-between group-hover:border-[#0066FF] transition-all">
                        <div className="flex items-center gap-6">
                           <span className="text-3xl">📘</span>
                           <div>
                              <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-[4px]">Help Center</p>
                              <p className="text-sm font-black text-[#0A2540]">How verification works?</p>
                           </div>
                        </div>
                        <span className="text-gray-300 group-hover:text-[#0066FF] transition-all group-hover:translate-x-3">&rarr;</span>
                     </div>
                  </div>
               </div>
            </div>
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
};
export default DashboardPage;
