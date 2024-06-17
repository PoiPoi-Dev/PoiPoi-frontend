import Image from "next/image";
import QRcode from "@/public/QRcode.png";

export default function Landing(): JSX.Element {
  return (
    <div className="absolute overflow-scroll no-scrollbar inset-0 bg-mapBg px-8 pt-6 pb-12 gradient-background text-white">
      <h1 className="text-[80px] font-extrabold text-center m-0 mt-4">
        POiPOi
      </h1>

      <h2 className="text-xl text-center">
        Start your journey more creative and fun way
      </h2>
      <div className="md:flex md:gap-4 md:justify-center">
        <div className="mb-8 md:mb-0">
          <Image
            alt="welcome screen"
            className="mt-4 rounded-2xl shadow-xl"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
            width={400}
            height={600}
          />
        </div>
        <div className="flex md:flex-col md:mt-auto">
          <div className="w-fit">
            <p className="mb-4 w-fit">Scan now and play it on your mobile!</p>
            <p className="mb-4 w-fit">Scan now and play it on your mobile!</p>
            <p className="mb-4 w-fit">Scan now and play it on your mobile!</p>
          </div>
          <Image
            alt="QR code"
            src={QRcode}
            width={500}
            height={500}
            className="w-1/2 md:w-[250px] aspect-square rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
