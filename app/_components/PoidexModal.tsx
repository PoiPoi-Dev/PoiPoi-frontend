import * as React from "react";
import { Pin } from "../_utils/global";
import Image from "next/image";
import { Popover, PopoverContent } from "./ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";

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
            <DialogContent onClick={() => setShowPoidex(false)}>
              <dialog
                open
                className="flex-col bg-white rounded-lg overflow-hidden p-4 mx-auto fixed isolate z-[999] items-center justify-center h-fit w-[350px] max-h-[800px]"
              >
                {/* HEADER */}
                <div className="w-full text-center mb-4">
                  <h1 className="text-2xl font-bold mt-0">POIDEX</h1>
                </div>

                {/* FLEX-WRAP */}
                <div
                  className={`${
                    !selectedId && "grid grid-cols-3 grid-flow-row gap-4"
                  } flex-grow h-[520px] overflow-y-scroll no-scrollbar`}
                >
                  {pins.map((pin) => (
                    <div
                      key={pin.poi_id}
                      onClick={
                        pin.is_completed
                          ? () => {
                              setShowBigImage(true);
                              setSelectedId(selectedId ? null : pin.poi_id);
                            }
                          : undefined
                      }
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
                        <div className="flex w-full justify-between mb-4">
                          <MdArrowBackIosNew size={24} />
                          {pin.title}
                        </div>
                      )}
                      <Image
                        src={
                          pin.is_completed ? pin.img_url : "/UnknownIcon.png"
                        }
                        alt={pin.title}
                        width={600}
                        height={600}
                        className="w-full min-h-28 flex-1 object-cover"
                        onClick={() => setSelectedId(null)}
                      />
                      <h2 className="w-full h-12 text-center mt-2 line-clamp-2 overflow-ellipsis">
                        {pin.is_completed ? pin.title : "???"}
                      </h2>
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
