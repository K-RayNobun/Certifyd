import React from 'react';

interface DiplomaProps {
  fullName: string;
  institution: string;
  diplomaType: string;
  description: string;
  profilePicture: string;
}

const Diploma: React.FC<DiplomaProps> = ({
  fullName,
  institution,
  diplomaType,
  description,
  profilePicture
}) => {
  return (
    <div className="min-h-screen w-screen bg-white font-inria text-gray-700">
      <section className="bg-blue-100 py-16 text-center px-[15%]">
        <h1 className="text-5xl font-bold text-blue-800 mb-12">Personal Information</h1>
        
        <div className="w-[60%] mt-12 px-8 pb-8 pt-14 bg-white mx-auto rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <img 
              src={profilePicture} 
              alt={fullName} 
              className="size-80 rounded-full border-4 border-blue-600 mb-4 p-4"
            />
            <h2 className="text-3xl font-bold text-blue-700">{fullName}</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 text-left">
            <div>
              <label className="font-bold text-blue-700">Institution:</label>
              <p className="mt-1 text-gray-600">{institution}</p>
            </div>
            <div>
              <label className="font-bold text-blue-700">Diploma Type:</label>
              <p className="mt-1 text-gray-600">{diplomaType}</p>
            </div>
            <div>
              <label className="font-bold text-blue-700">Description:</label>
              <p className="mt-1 text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diploma;
