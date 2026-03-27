import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from 'js-sha256';
import { certifyd_backend } from '../../declarations/certifyd_backend';

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "institution">("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const passwordHash = sha256(password).toString();
    try {
      const result = await certifyd_backend.login(email, passwordHash);
      if (result && result.length > 0) {
        const userRole = result[0];
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", userRole);
        
        if (userRole === "institution") {
          navigate('/institution');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert('Credential Mismatch: Access denied by protocol.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Network transmission failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-Outfit transition-colors duration-1000">
      
      {/* 1. BRAND SIDE (Visual Impact) */}
      <div className={`lg:w-1/2 relative flex flex-col justify-between p-12 lg:p-24 overflow-hidden order-2 lg:order-1 transition-all duration-1000 ${role === 'institution' ? 'bg-[#05111D]' : 'bg-[#0A2540]'}`}>
         
         {/* Dynamic Blurs */}
         {role === 'institution' ? (
            <>
               <div className="absolute top-0 right-0 w-full h-1/2 bg-[#0066FF] blur-[150px] opacity-[0.05] rounded-full"></div>
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0066FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </>
         ) : (
            <>
               <div className="absolute top-0 right-0 w-full h-full bg-[#00C6FF] blur-[250px] opacity-10 rounded-full animate-pulse"></div>
               <div className="absolute -bottom-40 -left-40 w-full h-full bg-[#0066FF] blur-[300px] opacity-10 rounded-full"></div>
            </>
         )}
         
         <div className="relative z-10">
            <div className="flex items-center gap-4 mb-32 cursor-pointer group" onClick={() => navigate('/')}>
               <div className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl transition-all duration-1000 text-white ${role === 'institution' ? 'bg-white/10 border border-white/20' : 'bg-[#0066FF] shadow-3xl'}`}>C</div>
               <span className="text-3xl font-black tracking-tighter text-white">Certifyd.</span>
            </div>

            <div className="max-w-md">
               <p className={`font-black text-[12px] uppercase tracking-[8px] mb-8 transition-colors duration-1000 ${role === 'institution' ? 'text-gray-500' : 'text-[#00C6FF]'}`}>
                  {role === 'institution' ? 'Consortium Access' : 'Sovereign ID'}
               </p>
               <h2 className="text-6xl md:text-7xl font-black text-white mb-12 tracking-tighter leading-[0.9] transition-all duration-1000">
                  {role === 'institution' ? (
                     <>Validate <br /> Records.</>
                  ) : (
                     <>Own your <br /> <span className="text-gradient">Legacy.</span></>
                  )}
               </h2>
               
               <div className="space-y-12">
                  <div className={`p-8 rounded-[32px] border transition-all duration-1000 ${role === 'institution' ? 'bg-white/5 border-white/10 shadow-inner' : 'bg-[#0066FF]/10 border-[#0066FF]/20 shadow-2xl'}`}>
                     <h4 className="text-white font-black text-lg mb-2">
                        {role === 'institution' ? 'Institutional Protocol' : 'Achievement Security'}
                     </h4>
                     <p className="text-blue-100/40 text-sm font-medium leading-relaxed">
                        {role === 'institution' 
                           ? 'Authorized entities may proceed strictly under consortium compliance rules.' 
                           : 'Your records are locked in a non-custodial vault, accessible only via your unique identity shard.'}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="relative z-10 pt-20 border-t border-white/10 flex justify-between items-center">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[6px]">Consortium Protocol // AUTH_V4</p>
            <div className="flex items-center gap-4">
               <span className={`w-2 h-2 rounded-full animate-pulse ${role === 'institution' ? 'bg-blue-400' : 'bg-green-400'}`}></span>
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">Layer 1 Active</span>
            </div>
         </div>
      </div>

      {/* 2. FORM SIDE */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white order-1 lg:order-2">
         <div className="w-full max-w-lg">
            
            {/* ROLE SWITCHER - High Fidelity */}
            <div className="mb-20 flex justify-center">
               <div className="bg-gray-50 p-2 rounded-full border-2 border-gray-100 flex gap-2 w-full max-w-xs transition-all hover:shadow-lg">
                  <button 
                     onClick={() => setRole('student')}
                     className={`flex-1 py-3 rounded-full font-black text-[9px] tracking-[4px] uppercase transition-all ${role === 'student' ? 'bg-[#0A2540] text-white shadow-xl' : 'text-gray-400 hover:text-[#0A2540]'}`}
                  >
                     Student
                  </button>
                  <button 
                     onClick={() => setRole('institution')}
                     className={`flex-1 py-3 rounded-full font-black text-[9px] tracking-[4px] uppercase transition-all ${role === 'institution' ? 'bg-[#05111D] text-white shadow-xl' : 'text-gray-400 hover:text-[#05111D]'}`}
                  >
                     Institution
                  </button>
               </div>
            </div>

            <div className="mb-20">
               <h1 className="text-5xl font-black text-[#0A2540] tracking-tighter mb-4 font-Clash">
                  {role === 'institution' ? 'Admin Portal.' : 'Record Access.'}
               </h1>
               <p className="text-xl text-gray-400 font-medium tracking-tight">
                  {role === 'institution' ? 'Authorized personnel login only.' : 'Welcome back to your digital legacy.'}
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
               <div className="space-y-3 group">
                  <label className={`text-[10px] font-black uppercase tracking-[4px] block ml-4 group-focus-within:translate-x-2 transition-transform ${role === 'institution' ? 'text-gray-400' : 'text-[#0066FF]'}`}>
                     {role === 'institution' ? 'Institutional Identity (Email)' : 'Consortium Identity'}
                  </label>
                  <input 
                     type="email" 
                     required 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="identity@principal.com" 
                     className="w-full bg-gray-50/50 border-2 border-transparent rounded-[32px] p-8 text-lg font-bold text-[#0A2540] outline-none focus:bg-white focus:border-[#0066FF] focus:shadow-3xl transition-all placeholder:text-gray-300"
                  />
               </div>

               <div className="space-y-3 group">
                  <div className="flex justify-between px-4">
                     <label className={`text-[10px] font-black uppercase tracking-[4px] block group-focus-within:translate-x-2 transition-transform ${role === 'institution' ? 'text-gray-400' : 'text-[#0066FF]'}`}>Sovereign Key</label>
                     <button type="button" className="text-[9px] font-black text-gray-300 uppercase tracking-[3px] hover:text-[#0066FF] transition-colors">Emergency Recovery</button>
                  </div>
                  <input 
                     type="password" 
                     required 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••" 
                     className="w-full bg-gray-50/50 border-2 border-transparent rounded-[32px] p-8 text-lg font-bold text-[#0A2540] outline-none focus:bg-white focus:border-[#0066FF] focus:shadow-3xl transition-all placeholder:text-gray-300"
                  />
               </div>

               <div className="pt-8">
                  <button 
                    disabled={isLoading}
                    className={`w-full py-8 text-white rounded-[32px] font-black text-[12px] tracking-[6px] uppercase shadow-4xl transition-all active:scale-95 flex items-center justify-center gap-6 group ${role === 'institution' ? 'bg-[#05111D] hover:bg-black' : 'bg-[#0A2540] hover:bg-[#0066FF]'}`}
                  >
                     {isLoading ? "Validating Shard..." : (
                        <>
                           Initialize {role === 'institution' ? 'Gateway' : 'Vault'}
                           <span className="group-hover:translate-x-4 transition-transform">&rarr;</span>
                        </>
                     )}
                  </button>
               </div>
            </form>

            <div className="mt-20 text-center">
               <p className="text-gray-400 font-medium">
                  Missing Identity? 
                  <button onClick={() => navigate('/signup')} className="ml-2 text-[#0066FF] font-black uppercase text-xs tracking-widest hover:underline">Register New Node</button>
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default LoginPage;
