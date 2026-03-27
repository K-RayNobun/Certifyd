
const UniversitiesPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700">

      {/* Hero Section */}
      <section className="bg-blue-100 py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-800">Streamline Diploma Management with Certifyd for Universities</h1>
        <p className="mt-4 text-lg text-blue-600">Take full control of your students’ credentials by minting their diplomas as secure, verifiable NFTs on the ICP Blockchain.</p>
        <button className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">
          Get Certifyd for Your Institution
        </button>
        <button className="mt-4 px-6 py-3 rounded-full bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white">
          Start Minting Diplomas Now
        </button>
      </section>

      {/* Subheadline */}
      <section className="py-10 text-center bg-white">
        <p className="text-lg text-gray-700">Certifyd offers universities across Africa a robust platform to mint, manage, and verify student diplomas digitally.</p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-800">Why Choose Certifyd for Universities?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Institution-wide Diploma Minting</h3>
            <p className="mt-4 text-gray-600">Upload and mint NFT diplomas for entire graduating classes with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Secure and Verifiable Credentials</h3>
            <p className="mt-4 text-gray-600">Ensure that your students’ diplomas are authenticated and protected on the blockchain.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Student Progress Monitoring</h3>
            <p className="mt-4 text-gray-600">Track how minted diplomas are being used in real-time as students network with employers and institutions.</p>
          </div>
        </div>
      </section>

      {/* Supporting Image */}
      <section className="text-center py-16 bg-white">
        <img
          src="https://via.placeholder.com/800x400"
          alt="University administrator managing NFT diplomas"
          className="mx-auto rounded-lg shadow-md"
        />
        <p className="text-sm text-gray-600 mt-4">University administrator minting diplomas for students on Certifyd’s platform.</p>
      </section>

      {/* Testimonial Section */}
      <section className="bg-white py-16 text-center">
        <blockquote className="italic text-lg text-gray-700 max-w-2xl mx-auto">
          “Certifyd has allowed us to modernize our diploma management system. We now mint NFTs for thousands of students, ensuring their achievements are protected and easily verifiable by employers.” — Dr. Isaac M., Head of Registrations, University of Lagos
        </blockquote>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-12 bg-blue-600">
        <h3 className="text-3xl font-bold text-white">Discover the Benefits of Blockchain in Education</h3>
        <button className="mt-8 px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-gray-200">
          Request a Demo
        </button>
        <button className="mt-4 px-6 py-3 rounded-full bg-transparent text-white border border-white hover:bg-white hover:text-blue-600">
          Learn More
        </button>
      </section>

      {/* Features Highlight */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-blue-800">Platform Features</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Bulk NFT Minting</h3>
            <p className="mt-4 text-gray-600">Upload and mint diplomas for an entire graduating cohort with minimal effort.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Blockchain Integration</h3>
            <p className="mt-4 text-gray-600">Leverage the security and transparency of the ICP blockchain to ensure the authenticity of all issued credentials.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-blue-600">Real-time Student Progress Tracking</h3>
            <p className="mt-4 text-gray-600">Monitor the professional journey of students as they use their NFT diplomas for career networking.</p>
          </div>
        </div>
      </section>

      {/* Success Indicators Section */}
      <section className="py-16 bg-blue-50">
        <h3 className="text-3xl font-bold text-center text-blue-800">Success Stories</h3>
        <p className="text-lg text-center text-gray-600 mt-4">
          Over 30 leading African universities have adopted Certifyd to streamline diploma issuance.
        </p>
        <p className="text-lg text-center text-gray-600 mt-2">
          Certifyd helps institutions reduce administrative overhead by over 50%.
        </p>
      </section>

      {/* Resources Section */}
      <section className="text-center py-12 bg-white">
        <h4 className="text-2xl font-semibold text-blue-800">Resources</h4>
        <ul className="list-none mt-6 space-y-4 text-blue-600">
          <li><a href="#" className="underline hover:text-blue-800">Case study: How Certifyd reduced diploma fraud and admin costs at the University of Ghana</a></li>
          <li><a href="#" className="underline hover:text-blue-800">Understanding blockchain technology for universities: The future of credentialing</a></li>
        </ul>
      </section>

    </div>
  );
};

export default UniversitiesPage;