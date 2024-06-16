import * as React from "react";
import { Pin } from "../_utils/global";
import Image from "next/image";
import { Popover, PopoverContent } from "./ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiSolidNavigation } from "react-icons/bi";
import { useMap } from "react-map-gl/maplibre";

interface PoidexModalProps {
  pins: Pin[];
  setShowPoidex: (arg0: boolean) => void;
}

const PoidexModal: React.FC<PoidexModalProps> = ({ pins, setShowPoidex }) => {
  const [showBigImage, setShowBigImage] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { gameMap } = useMap();

  const handlePanMapToPoi = (pin: Pin) => {
    try {
      if (!gameMap) throw "Can't find map";
      gameMap.flyTo({
        center: pin.is_completed
          ? [pin.exact_longitude, pin.exact_latitude]
          : [pin.search_longitude, pin.search_latitude],
        duration: 1000,
        minZoom: 24,
        zoom: 17,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="fixed flex h-[100svh] flex-col items-center justify-between">
      <Popover defaultOpen>
        <PopoverContent>
          <Dialog defaultOpen>
            <DialogTrigger />
            <DialogContent
              onClick={() => {
                setShowPoidex(false);
                setSelectedId(null);
                setShowBigImage(false);
              }}
            >
              <dialog
                open
                className="flex-col bg-white rounded-2xl overflow-hidden p-4 mx-auto fixed isolate z-[999] items-center justify-center h-[600px] w-[350px] max-h-[800px]"
              >
                {/* HEADER */}
                {!showBigImage && (
                  <div className="w-full text-center mb-4">
                    <h1 className="text-2xl text-primary font-extrabold mt-0">
                      POIDEX
                    </h1>
                  </div>
                )}

                {/* FLEX-WRAP */}
                <div
                  className={`${
                    !selectedId &&
                    "grid grid-cols-3 pb-10 grid-flow-row gap-1.5"
                  } flex-grow max-h-full overflow-y-scroll no-scrollbar`}
                >
                  {pins.map((pin) => (
                    <div
                      key={pin.poi_id}
                      className={`flex flex-col items-center w-30 h-40 relative animate-fade ${
                        selectedId && selectedId !== pin.poi_id
                          ? "hidden"
                          : "w-full h-full"
                      }`}
                    >
                      {showBigImage && (
                        <div className="flex w-full justify-between items-center sticky -top-1 z-50 bg-white py-1">
                          {/* BACK BUTTON */}
                          <MdArrowBackIosNew
                            size={24}
                            className="text-primary"
                            onClick={() => {
                              setShowBigImage(false);
                              setSelectedId(null);
                            }}
                          />

                          {/* PIN TITLE */}
                          <h2 className="w-full text-primary text-center text-lg font-semibold truncate text-ellipsis px-4">
                            {pin.is_completed ? pin.title : "???"}
                          </h2>

                          {/* NAVIGATION BUTTON */}
                          <BiSolidNavigation
                            size={24}
                            className="text-primary"
                            onClick={() => {
                              handlePanMapToPoi(pin);
                              setShowBigImage(false);
                              setSelectedId(null);
                              setShowPoidex(false);
                            }}
                          />
                        </div>
                      )}

                      <div
                        className="relative w-full min-h-28 flex-1 rounded-lg"
                        onClick={() => {
                          setShowBigImage(() => true);
                          setSelectedId(() => pin.poi_id);
                        }}
                      >
                        <Image
                          src={pin.img_url}
                          alt={pin.title}
                          width={showBigImage ? 600 : 100}
                          height={showBigImage ? 600 : 200}
                          className={`w-full h-full object-cover rounded-sm transition duration-500 ease-in-out ${
                            !pin.is_completed && "saturate-50"
                          }`}
                        />
                        {!showBigImage && (
                          <div className="absolute bottom-0 bg-gradient-to-b from-white/0 to-black/60 h-1/2 w-full rounded-lg" />
                        )}
                        {!pin.is_completed && (
                          <div className="absolute bottom-0 bg-black/65 h-full w-full rounded-lg" />
                        )}
                      </div>

                      {!showBigImage ? (
                        <h2 className="w-full text-sm text-center m-0 px-1 py-0 line-clamp-2 overflow-hidden text-white absolute bottom-1">
                          {pin.is_completed ? pin.title : "???"}
                        </h2>
                      ) : (
                        <p
                          className={`w-full mt-6 h-auto ${
                            !pin.is_completed && "text-center"
                          }`}
                        >
                          {pin.is_completed
                            ? pin.description
                            : "Unlock to learn more"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </dialog>
            </DialogContent>
          </Dialog>
        </PopoverContent>
      </Popover>
    </main>
  );
};

export default PoidexModal;
