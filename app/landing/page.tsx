import Image from "next/image";
import QRcode from "@/public/QRcode.png";

export default function Landing(): JSX.Element {
  return (
    <div className="absolute overflow-scroll no-scrollbar inset-0 bg-mapBg px-8 pt-6 pb-12 gradient-background text-white">
      <h1 className="text-[80px] font-extrabold text-center m-0 mt-4">
        POiPOi
      </h1>

      <h2 className="text-xl text-center mb-8">
        Season 1: Tokyo - Available now!
      </h2>
      <div className="md:flex md:gap-12 md:justify-center">
        <div className="flex justify-center items-center mb-8 md:mb-0">
          <Image
            alt="welcome screen"
            className="mt-4 rounded-2xl shadow-xl ring-[20px] ring-black"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
            width={400}
            height={600}
          />
        </div>
        <div className="flex flex-col md:justify-between md:pt-4">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h3 className="text-3xl p-0 m-0 mb-4">Do you like...</h3>
            <h3 className="pl-4 text-2xl p-0 m-0">Visiting new places?</h3>
            <h3 className="pl-4 text-2xl p-0 m-0">
              Exploring hidden corners of the city?
            </h3>
            <h3 className="pl-4 text-2xl p-0 m-0">Building up a collection?</h3>
            <h3 className="pl-4 text-2xl p-0 m-0">
              Learning about interesting places?
            </h3>
            <h3 className="pl-4 text-2xl p-0 m-0">
              Looking for a new adventure?
            </h3>
          </div>
          <div className="flex flex-col justify-center items-center md:items-start">
            <p className="my-4 md:mt-0 w-fit">
              This app is intended for use only on mobile devices.
            </p>

            <div className="flex flex-col justify-center items-center w-fit">
              <Image
                alt="QR code"
                src={QRcode}
                width={500}
                height={500}
                className="w-full max-w-[400px] md:w-[250px] aspect-square rounded-lg object-cover"
              />
              <p className="text-2xl mt-4 w-fit">Scan now to play!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
