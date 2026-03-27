// After Header
import { Button, ButtonProps } from "@relume_io/relume-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faDiagramProject, faChartGantt, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[]; 
};

export type Cta25Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Cta = (props: Cta25Props) => {
  const { heading, description, buttons } = {
    ...Cta25Defaults,
    ...props,
  } as Props;
  return (
    <>
      <section className="px-[5%] py-16 md:py-18 lg:py-20">
      <div className="container max-w-[80%] mx-auto text-center">
        <h2 className="mb-5  text-blue-900 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">{heading}</h2>
        <p className="md:text-lg">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Link to="/student">
              <Button className="mt-8 px-6 py-4 rounded-lg bg-gradient-to-r font-bold from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-900 transition duration-300" key={index} {...button}>
                {button.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section className="px-[5%] py-16 md:py-18 lg:py-20">
      <h2 className="mb-5 text-blue-900 text-3xl text-center font-bold md:mb-6 md:text-4xl lg:text-5xl">
        Discover how it works !
      </h2>
      <p className="text-center text-blue-950 text-xl" >Our process is quite simple, so that everyone might be able to achieve this.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-self-center align-middle mt-6 mx-auto">
        {[{ bg: "bg-red-200", icon: faUpload, title: "1. Upload Your Certified Diploma", text: "Begin by uploading your certified diploma from an accredited institution. Our platform only accepts diplomas that have been verified by your educational institution to ensure legitimacy and authenticity." },
        { bg: "bg-yellow-200", icon: faFingerprint, title: "2. Mint Your Diploma as an NFT", text: "Proceed to mint it as a Non-Fungible Token (NFT) which serves as a tamper-proof record of your diploma’s authenticity and ownership on the blockchain, securing a unique digital asset within blockchain technology." },
        { bg: "bg-green-200", icon: faDiagramProject, title: "3. Network and Share Your Certificate", text: "Generate a unique, verifiable link or QR code that interested professionals can access to instantly confirm your credentials. It's the modern way to showcase your qualifications and expand your professional opportunities." },
        { bg: "bg-blue-200", icon: faChartGantt, title: "4. Track and Verify Your Diploma", text: "Once minted, your diploma is trackable and shareable. Whether you’re applying for a job or further studies, share a verifiable link that proves the authenticity of your diploma instantly" }].map((card, index) => (
          <div className="w-full max-w-[600px] bg-transparent shadow-xl border-[4px] border-blue-600 border-opacity-70 p-2 rounded-2xl">
            <div key={index} className={`flex flex-col card pb-0 px-0 ${card.bg} w-full max-w-[600px] shadow-xl border-6 border-blue-800`}>
              <div className="card-body items-center text-center p-6">
                <div className="card-title flex flex-col sm:flex-row items-center mb-4">
                  <div className="opacity-80 p-4 border-[6px] border-black rounded-full mb-4 sm:mb-0">
                    <FontAwesomeIcon className="size-8 sm:size-10 text-black opacity-100" icon={card.icon} />
                  </div>
                  <h2 className="card-title text-xl sm:text-2xl sm:ml-4 text-center sm:text-left">{card.title}</h2>
                </div>
                <p className="text-base sm:text-lg mt-4">
                  {/* Content remains the same for each card */}
                </p>
              </div>
            </div>
          </div>
            
        ))}
      </div>
    </section>    
    </>
  );
};

export const Cta25Defaults: Cta25Props = {
  heading: "A solution for every graduated ",
  description:
    "With Certifyd, every person who owns a certificate can easily get his diploma authentified. We wok with local universities from the private sector to ensure the authenticity of your diploma.\n That's not all ! We produce from your certificate a unique numerical asset, an NFTs to ensure only you has the property right on your diploma.",
  buttons: [{ title: "Start Now" }, { title: "Know more", variant: "secondary" }],
};
