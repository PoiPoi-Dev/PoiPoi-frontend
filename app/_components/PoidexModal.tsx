import * as React from "react";
import { Pin } from "../_utils/global";
import Image from "next/image";
import { Popover, PopoverContent } from "./ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { BiSolidNavigation } from "react-icons/bi";

interface PoidexModalProps {
  pins: Pin[];
  setShowPoidex: (arg0: boolean) => void;
}

const PoidexModal: React.FC<PoidexModalProps> = ({ pins, setShowPoidex }) => {
  const [showBigImage, setShowBigImage] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="fixed flex h-screen flex-col items-center justify-between">
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
                    <h1 className="text-2xl font-bold mt-0">POIDEX</h1>
                  </div>
                )}

                {/* FLEX-WRAP */}
                <div
                  className={`${
                    !selectedId && "grid grid-cols-3 pb-10 grid-flow-row gap-4"
                  } flex-grow max-h-full flex-1 overflow-y-scroll no-scrollbar`}
                >
                  {pins.map((pin) => (
                    <div
                      key={pin.poi_id}
                      className={`flex flex-col items-center w-30 h-40  ${
                        pin.is_completed
                          ? "cursor-pointer"
                          : "opacity-50 cursor-not-allowed"
                      } ${
                        selectedId && selectedId !== pin.poi_id
                          ? "hidden"
                          : "w-full h-full"
                      }`}
                    >
                      {showBigImage && (
                        <div className="flex w-full justify-between items-center mb-4">
                          <MdArrowBackIosNew
                            size={24}
                            className="text-primary"
                            onClick={() => {
                              setShowBigImage(false);
                              setSelectedId(null);
                            }}
                          />
                          <h2 className="w-full text-center text-lg font-semibold truncate text-ellipsis">
                            {pin.title}
                          </h2>
                          <BiSolidNavigation
                            size={24}
                            className="text-primary"
                          />
                        </div>
                      )}

                      <Image
                        src={
                          pin.is_completed ? pin.img_url : "/UnknownIcon.png"
                        }
                        alt={pin.title}
                        width={600}
                        height={600}
                        className={`w-full min-h-28 flex-1 object-cover ${
                          showBigImage && "rounded-lg shadow-xl"
                        }`}
                        onClick={() => {
                          setShowBigImage(() => true);
                          setSelectedId(() => pin.poi_id);
                        }}
                      />

                      {!showBigImage && (
                        <h2 className="w-full text-center mt-2 line-clamp-2 overflow-hidden">
                          {pin.is_completed ? pin.title : "???"}
                        </h2>
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
