import React from 'react';
import user_profile from "./../assets/user-profile-icon-free-vector.jpg"

interface DiplomaProps {
  fullName: string;
  email: string;
}

const Personnal: React.FC<DiplomaProps> = ({
  fullName,
  email,
}) => {
  return (
    <div className=" w-screen bg-white font-inria text-gray-700">
      <section className="bg-blue-100 py-16 text-center px-[15%]">
        <h1 className="text-5xl font-bold text-blue-800 mb-12">Personal Information</h1>
        
        <div className="w-[60%] mt-12 px-8 pb-8 pt-14 bg-white mx-auto rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <img 
              src={ user_profile } 
              alt={ fullName } 
              className="size-40 rounded-full border-4 border-blue-600 mb-4"
            />
            <h2 className="text-3xl font-bold text-blue-700">{ fullName }</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 text-left">
            <div>
              <label className="font-bold text-blue-700">Email address:</label>
              <p className="mt-1 text-gray-600">{email}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Personnal;
