import { FaLocationDot } from "react-icons/fa6";

const warnings = [
  "Please respect private property!",
  "Be aware of your surroundings at all times!",
  "Avoid dangerous areas and bodies of water!",
  "Follow local laws and regulations!",
  "Stay safe and avoid risky areas, especially at night!",
  "Check the weather forecast before heading out!",
  "Don't leave any trace behind, respect nature!"
];

const LoadingSkeleton = () => {
  const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-screen h-svh px-4">
        <FaLocationDot size={80} className="text-primary animate-bounce z-20" />
        <div className="bg-secondary-300 text-white h-10 w-24 rounded-[100%] -translate-y-10 shadow-lg flex justify-center items-center"></div>
        <div className="mt-4 text-center">
          <p>{randomWarning}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
