import React, { useState } from "react";
// import { mintNFTWithDiplomaInfo } from './mintingService';
import mintNFT from "./../../assets/nft_minting.webp";
import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';


import { certifyd_backend } from '../../declarations/certifyd_backend'; 

const ForStudentsPage = () => {
  
  const [diploma, setDiploma] = useState<File | null>(null);
  const [diplomaType, setDiplomaType] = useState('');
  const [institution, setInstitution] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [nftId, setNftId] = useState<string | null>(null);
  const [nftLink, setNftLink] = useState<string | null>(null);
  const [dataSubmit, setDataSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const owner = localStorage.getItem("userEmail") || "";
  
  const handleDataSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDataSubmit(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dataSubmit) {
      if (e.target.files) {
        setDiploma(e.target.files[0]);
      }
    }
  };

  const handleDiplomaSubmit =async (e) => {
    e.preventDefault();
    const diplomaInfo = {
      diplomaType,
      institution,
      graduationDate,
      studentName: fullName,
      description,
      promotion: "",
      classId: "",
    };

    try {
      if (diploma) {
        setLoading(true);
        
        // Convert file to Base64 string to store as metadata
        const reader = new FileReader();
        reader.readAsDataURL(diploma);
        reader.onload = async () => {
          const metadata = reader.result as string;
          try {
            const result = await certifyd_backend.mint(owner, metadata, diplomaInfo);
            setNftId(result.id.toString());
            setNftLink('http://localhost:5173/auth/' + result.id.toString());
            setSuccessMessage('Your NFT has been minted successfully');
          } catch (err) {
            setSuccessMessage('Failed to mint NFT on the blockchain.');
            console.error('Minting failed', err);
          } finally {
            setLoading(false);
          }
        };
        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          setSuccessMessage('Failed to process the uploaded file.');
          setLoading(false);
        };
      } else {
        setSuccessMessage('Please upload a diploma file first.');
      }
    } catch (error) {
      setSuccessMessage('Failed to mint NFT.');
      console.error('Minting failed', error);
    } finally {
      setLoading(false);
    }
    
    // return navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-screen font-Inria bg-white text-gray-700">

      {/* Hero Section */}
      <section className="bg-blue-100 py-16 text-center px-[15%]">
        <h1 className="text-5xl font-bold text-blue-800 mb-12">Own and Secure Your Achievements with Certifyd</h1>
        <p className="mt-4 text-xl text-blue-950">Transform your diploma into a blockchain-backed NFT, ensuring its authenticity forever. </p>
        <p className="mt-4 text-xl text-blue-950"> The procedure of transforming your diploma is easy. Start by filling the form above and then submit the document file. The informations you provided will serve as description of your diploma. <br /> Make sure that your diploma is already certified by the private university or we will reject it after analysis.</p>
        <div className="w-[40%] mt-12 px-8 pb-8 pt-14 bg-white mx-auto rounded-lg">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleDataSubmit}>
              <div className="grid w-full items-center">
                <label htmlFor="email" className="font-bold text-start text-blue-700 px-4">
                  Full Name *
                </label>
                <input
                  type="name"
                  id="fullname"
                  value={fullName}
                  className="bg-transparent rounded-full border-2 border-blue-700 py-1 mb-4"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label htmlFor="email" className="text-start px-4 font-bold text-blue-700">
                  Institution Name *
                </label>
                <input
                  type="text"
                  id="institution"
                  value={institution}
                  className="bg-transparent pl-4 rounded-full border-2 border-blue-700 py-1 mb-4"
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                />
                <label htmlFor="email" className="text-start px-4 font-bold text-blue-700">
                  Description *
                </label>
                <input
                  type="email"
                  id="description"
                  value={description}
                  className="bg-transparent rounded-full border-2 border-blue-700 py-1 "
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <label htmlFor="date" className="text-start px-4 font-bold text-blue-700">Issued Date</label>
                <input 
                type="date" 
                name="date" 
                id="date" 
                value={graduationDate}
                className="bg-transparent rounded-full border-2 border-blue-700 py-1 "
                onChange={(e) => setGraduationDate(e.target.value)}/>
                <label htmlFor="diplomaType" className="mt-4 text-start px-4 font-bold text-blue-700">
                  Diploma Type *
                </label>
                <select
              id="diploma-type"
              value={ diplomaType }
              defaultValue={ "BTS" }
              className="mb-4 bg-transparent rounded-full border-2 border-blue-700 py-1 px-4"
              onChange={(e) => setDiplomaType(e.target.value)}
              required
            >
              <option value="">Select a diploma type</option>
              <option value="BTS">BTS</option>
              <option value="DEUG">DEUG</option>
              <option value="DUT">DUT</option>
              <option value="Licence">Licence</option>
              <option value="DIPET1">DIPET1</option>
              <option value="DIPET2">DIPET2</option>
              <option value="Master">Master</option>
              <option value="Undefined">Undefined</option>
            </select>
              </div>
              <div className="grid w-full items-center">
              </div>
              <div className="grid-col-1 grid gap-4">
                <button
                  className="py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold hover:from-blue-600 hover:to-blue-800 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
        </div>
        {/* <button className="mt-8 px-6 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition duration-300">
          Get Started
        </button> */}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-800">Mint Your Diploma' NFT involves... </h2>
        <div className="container px-[15%] grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 ">
          <img src={ mintNFT } className="rounded-full w-[400px] shadow-3xl  shadow-blue-800" />
          <div className="flex flex-col justify-between border-transparent">
            <div className="border-[8px] border-transparent border-gray-300 rounded-r-2xl border-l-blue-600 bg-gray-50 mx-auto p-6 mb-4  shadow-xl text-center">
              <h3 className="text-xl font-bold text-blue-600">Secure Ownership</h3>
              <p className="mt-4 text-gray-600">Your diploma is uniquely yours and verifiable as an NFT.</p>
            </div>
            <div className="border-[8px] border-transparent border-gray-300 rounded-r-2xl border-l-blue-600 bg-gray-50 mx-auto p-6 mb-4 shadow-lg text-center">
              <h3 className="text-xl font-bold text-blue-600">Global Networking</h3>
              <p className="mt-4 text-gray-600">Share your achievements globally with employers and academic institutions.</p>
            </div>
            <div className=" border-[8px] border-transparent border-gray-300 rounded-r-2xl border-l-blue-600 bg-gray-50 p-6 mb-4 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-bold text-blue-600">Tamper-Proof Verification</h3>
              <p className="mt-4 text-gray-600">Ensure no one can alter or forge your diploma credentials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800">Submit Your Diploma for Authentication</h2>
          <form onSubmit={handleDiplomaSubmit} className="bg-white shadow-lg p-8 rounded-lg mt-8 max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="file"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full rounded-lg bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Minting Your NFT...' : 'Mint Your Diploma NFT'}
            </button>
            {successMessage && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg shadow-lg">
                {successMessage}
              </div>
            )}

            {nftId && nftLink && (
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-lg font-semibold">NFT Minted Successfully!</p>
                <p>Your NFT ID: <span className="text-blue-600">{nftId}</span></p>
                <p>View and Share: <a href={nftLink} className="text-blue-600 underline">{nftLink}</a></p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 text-center">
        <blockquote className="italic text-lg text-gray-700 max-w-2xl mx-auto">
          "Certifyd is a project aiming to simplify the diploma authentification and graduated expansion through NFTs minting. Now professionals can share their verified credentials anywhere, and it's 100% trusted." - K. Rayane, From  Certifyd Project Team.
        </blockquote>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-blue-600">
        <Link to="/about-us">
          <button className="px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-gray-200">
            Learn About NFT Diploma Security
          </button>
        </Link>
      </section>
    </div>
  );
};

export default ForStudentsPage;
