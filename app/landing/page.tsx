import Image from "next/image";
import QRcode from "@/public/QRcode.png";
import Ter from "@/public/Ter.jpg";
import Dominik from "@/public/Dominik.jpg";
import Ning from "@/public/Ning.jpg";
import Jarrod from "@/public/Jarrod.jpg";
import Jacob from "@/public/Jacob.jpg";
import Deana from "@/public/Deana.jpg";
import Poipoi from "@/public/Poipoi.png";

export default function Landing(): JSX.Element {
  return (
    <div className="absolute overflow-scroll no-scrollbar inset-0 bg-mapBg pt-6 pb-0 h-full gradient-background text-white">
      <div className="bg-white/40 min-w-fit px-12 w-3/5 mx-auto rounded-full">
        <Image
          src={Poipoi}
          alt="Poipoi"
          width={200}
          height={200}
          className="block mx-auto mb-4 h-24 object-cover"
        />
      </div>

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

      <footer className="m-0 mt-12 bg-black w-screen p-8 flex flex-col items-center">
        <h3 className="text-3xl mb-8">Meet the creators</h3>
        <div className="flex flex-wrap w-full justify-center gap-2">
          <div className="flex flex-wrap gap-2">
            <a
              id="Nattawat"
              href="https://github.com/departurelv"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Ter}
                alt={"Nattawat"}
                width={200}
                height={200}
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Nattawat
              </div>
            </a>
            <a
              id="Jarrod"
              href="https://github.com/J-Ariola"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Jarrod}
                alt={"Jarrod"}
                width={200}
                height={200}
                title="Jarrod"
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Jarrod
              </div>
            </a>
            <a
              id="Dominik"
              href="https://github.com/dominiksakic"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Dominik}
                alt={"Dominik"}
                width={200}
                height={200}
                title="Dominik"
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Dominik
              </div>
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              id="Ning"
              href="https://github.com/NChang55"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Ning}
                alt={"Ning"}
                width={200}
                height={200}
                title="Ning"
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Ning
              </div>
            </a>
            <a
              id="Deana"
              href="https://github.com/deanachou"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Deana}
                alt={"Deana"}
                width={200}
                height={200}
                title="Deana"
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Deana
              </div>
            </a>
            <a
              id="Jacob"
              href="https://github.com/Flumanuck"
              className="flex justify-center items-center relative group w-20 h-20"
            >
              <Image
                src={Jacob}
                alt={"Jacob"}
                width={200}
                height={200}
                title="Jacob"
                className="absolute w-full h-full rounded-full object-cover z-0 group-hover:brightness-50"
              />
              <div className="text-sm h-fit z-10 opacity-0 group-hover:opacity-100 duration-300 flex text-center text-white font-semibold">
                Jacob
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
