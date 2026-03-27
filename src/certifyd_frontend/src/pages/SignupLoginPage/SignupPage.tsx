import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from 'js-sha256';
import { certifyd_backend } from '../../declarations/certifyd_backend';

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "institution">("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const hashedPassword = sha256(password).toString();
    try {
      const result = await certifyd_backend.signup(name, email, hashedPassword, role);
      if (result) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", role);
        if (role === 'institution') {
          navigate('/institution');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Registry Conflict: Identity principal already documented.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Registry synchronization failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-Outfit transition-all duration-1000">
      
      {/* 1. BRAND SIDE (Visual Impact) */}
      <div className={`lg:w-2/5 relative flex flex-col justify-between p-12 lg:p-24 overflow-hidden order-2 lg:order-1 transition-all duration-1000 ${role === 'institution' ? 'bg-[#05111D]' : 'bg-[#0A2540]'}`}>
         
         {/* Dynamic Blurs */}
         {role === 'institution' ? (
            <>
               <div className="absolute top-0 right-0 w-full h-[500px] bg-[#0066FF] blur-[180px] opacity-[0.08] rounded-full"></div>
               <div className="absolute inset-x-0 bottom-0 top-auto h-px bg-white/10"></div>
               <div className="absolute inset-y-0 left-0 right-auto w-px bg-white/10"></div>
            </>
         ) : (
            <>
               <div className="absolute top-0 right-0 w-full h-full bg-[#0066FF] blur-[250px] opacity-10 rounded-full animate-pulse"></div>
               <div className="absolute -bottom-40 -left-40 w-full h-full bg-[#0066FF] blur-[300px] opacity-10 rounded-full"></div>
            </>
         )}
         
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-32 cursor-pointer group" onClick={() => navigate('/')}>
               <div className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl transition-all duration-1000 text-white ${role === 'institution' ? 'bg-white/10 border border-white/20' : 'bg-[#0066FF] shadow-3xl'}`}>C</div>
               <span className="text-3xl font-black tracking-tighter text-white">Certifyd.</span>
            </div>

            <div className="max-w-md">
               <p className={`font-black text-[12px] uppercase tracking-[8px] mb-8 transition-colors duration-1000 ${role === 'institution' ? 'text-blue-400' : 'text-[#00C6FF]'}`}>
                  {role === 'institution' ? 'Consortium Node Initialization' : 'Root Identity Registration'}
               </p>
               <h2 className="text-6xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[0.9] transition-all duration-1000">
                  {role === 'institution' ? (
                     <>Join the <br /> Network.</>
                  ) : (
                     <>Secure your <br /> <span className="text-gradient">Heritage.</span></>
                  )}
               </h2>
               <div className="space-y-12">
                  <div className={`flex items-start gap-6 group transition-all duration-1000 p-8 rounded-[40px] border ${role === 'institution' ? 'bg-white/5 border-white/10 shadow-inner' : 'bg-[#0066FF]/10 border-[#0066FF]/20 shadow-2xl'}`}>
                     <div>
                        <h4 className="text-white font-black text-lg mb-2">
                           {role === 'institution' ? 'Issuing Authority' : 'Non-Custodial Storage'}
                        </h4>
                        <p className="text-blue-100/40 text-sm font-medium leading-relaxed">
                           {role === 'institution' 
                              ? 'Direct integration with institutional databases for programmatically verifiable certificates.' 
                              : 'Your digital diplomas are locked to your unique identity, impossible to lose, steal, or forge.'}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative z-10 pt-20 border-t border-white/10 flex justify-between">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[6px]">Regulated Protocol Layer // AUTH7_V2</p>
         </div>
      </div>

      {/* 2. FORM SIDE */}
      <div className="lg:w-3/5 flex items-center justify-center p-8 lg:p-24 bg-white order-1 lg:order-2 overflow-y-auto">
         <div className="w-full max-w-xl">
            
            {/* ROLE SWITCHER - Large & Premium */}
            <div className="mb-20 flex flex-col items-center">
               <p className="text-[10px] font-black text-[#0066FF] uppercase tracking-[6px] mb-8">Define Your Principal Role</p>
               <div className="bg-gray-50 p-2 rounded-[32px] border-2 border-gray-100 flex gap-2 w-full max-w-md transition-all hover:shadow-lg">
                  <button 
                     onClick={() => setRole('student')}
                     className={`flex-1 py-5 rounded-[24px] font-black text-[10px] tracking-[4px] uppercase transition-all flex flex-col items-center gap-1 ${role === 'student' ? 'bg-[#0A2540] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#0A2540]'}`}
                  >
                     🎓 Student Node
                  </button>
                  <button 
                     onClick={() => setRole('institution')}
                     className={`flex-1 py-5 rounded-[24px] font-black text-[10px] tracking-[4px] uppercase transition-all flex flex-col items-center gap-1 ${role === 'institution' ? 'bg-[#05111D] text-white shadow-xl scale-[1.02]' : 'text-gray-400 hover:text-[#05111D]'}`}
                  >
                     🏛️ Institution Node
                  </button>
               </div>
            </div>

            <div className="mb-16">
               <h1 className="text-5xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash">
                  {role === 'institution' ? 'Initial Onboarding.' : 'Legacy Registration.'}
               </h1>
               <p className="text-xl text-gray-400 font-medium tracking-tight">
                  {role === 'institution' ? 'Provision a production node for credential issuance.' : 'Secure your achievement shard in the blockchain ecosystem.'}
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                     <label className={`text-[10px] font-black uppercase tracking-[4px] block ml-4 transition-colors ${role === 'institution' ? 'text-gray-400' : 'text-[#0066FF]'}`}>
                        {role === 'institution' ? 'Institution Name' : 'Full Student Name'}
                     </label>
                     <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={role === 'institution' ? 'e.g. Stanford University' : 'e.g. John Doe'}
                        className="w-full bg-gray-50/50 border-2 border-transparent rounded-[32px] p-6 text-lg font-bold text-[#0A2540] outline-none focus:bg-white focus:border-[#0066FF] focus:shadow-3xl transition-all placeholder:text-gray-200"
                     />
                  </div>
                  <div className="space-y-3 group">
                     <label className={`text-[10px] font-black uppercase tracking-[4px] block ml-4 transition-colors ${role === 'institution' ? 'text-gray-400' : 'text-[#0066FF]'}`}>Authentic Email</label>
                     <input 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="identity@consortium.org" 
                        className="w-full bg-gray-50/50 border-2 border-transparent rounded-[32px] p-6 text-lg font-bold text-[#0A2540] outline-none focus:bg-white focus:border-[#0066FF] focus:shadow-3xl transition-all placeholder:text-gray-200"
                     />
                  </div>
               </div>

               <div className="space-y-3 group">
                  <label className={`text-[10px] font-black uppercase tracking-[4px] block ml-4 group-focus-within:translate-x-2 transition-transform ${role === 'institution' ? 'text-gray-400' : 'text-[#0066FF]'}`}>Root Sovereignty Password</label>
                  <input 
                     type="password" 
                     required 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Minimum 12 characters recommended" 
                     className="w-full bg-gray-50/50 border-2 border-transparent rounded-[32px] p-8 text-lg font-bold text-[#0A2540] outline-none focus:bg-white focus:border-[#0066FF] focus:shadow-3xl transition-all placeholder:text-gray-200"
                  />
               </div>

               <div className="pt-8">
                  <button 
                    disabled={isLoading}
                    className={`w-full py-8 text-white rounded-[48px] font-black text-[12px] tracking-[6px] uppercase shadow-4xl transition-all active:scale-95 flex items-center justify-center gap-6 group ${role === 'institution' ? 'bg-[#05111D] hover:bg-black' : 'bg-[#0A2540] hover:bg-[#0066FF]'}`}
                  >
                     {isLoading ? "Minting Principal..." : (
                        <>
                           Initialize {role === 'institution' ? 'Consortium Profile' : 'Student Vault'}
                           <span className="group-hover:translate-x-4 transition-transform">&rarr;</span>
                        </>
                     )}
                  </button>
                  <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-[2px] mt-6">By initializing, you accept the autonomous ledger governance protocol.</p>
               </div>
            </form>

            <div className="mt-20 text-center">
               <p className="text-gray-400 font-medium">
                  Already Dokumented? 
                  <button onClick={() => navigate('/login')} className="ml-2 text-[#0066FF] font-black uppercase text-xs tracking-widest hover:underline">Access Login</button>
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default SignupPage;
