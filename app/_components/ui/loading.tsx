import { FaLocationDot } from "react-icons/fa6";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 w-screen h-[100svh] px-4">
        <FaLocationDot size={80} className="text-primary animate-bounce z-20" />
        <div className="bg-secondary-300 text-white h-10 w-24 rounded-[100%] -translate-y-10 shadow-lg flex justify-center items-center"></div>
      </div>
    </>
  );
};

export default LoadingSkeleton;
