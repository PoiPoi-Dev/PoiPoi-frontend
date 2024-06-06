import * as React from "react";
import { Pin } from "../_utils/global";
import { PoiCard } from "./PoiCard"; // Importing PoiCard
import Image from "next/image";

interface PoidexModalProps {
  pins: Pin[];
  onClose: () => void;
  onPoiClick: (poi: Pin) => void;
  selectedPoi: Pin | null;
  goBack: () => void;
}

const PoidexModal: React.FC<PoidexModalProps> = ({
  pins,
  onClose,
  onPoiClick,
  selectedPoi,
  goBack,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <dialog
        open
        className="relative bg-white rounded-lg overflow-hidden p-4"
        style={{ width: selectedPoi ? "60%" : "80%", maxWidth: "1000px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black bg-red-500 rounded-full p-2 z-50"
        >
          Close
        </button>
        {!selectedPoi ? (
          <>
            <div className="w-full text-center mb-4">
              <h1 className="text-2xl font-bold">POIDEX</h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  onClick={pin.is_completed ? () => onPoiClick(pin) : undefined}
                  className={`flex flex-col items-center  ${
                    pin.is_completed
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <Image
                    src={pin.is_completed ? pin.img_url : "/UnknownIcon.png"}
                    alt={pin.title}
                    width={100}
                    height={100}
                    className="w-full h-auto max-h-32 object-contain"
                  />
                  <h2 className="text-center mt-2">
                    {pin.is_completed ? pin.title : "???"}
                  </h2>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={goBack}
              className="fixed top-2 right-2 text-black bg-blue-500 rounded-full p-2 z-50"
            >
              Back
            </button>
            <div className="z-[9999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <PoiCard
                id={selectedPoi.id}
                payload={{
                  ...selectedPoi,
                  is_completed: selectedPoi.is_completed,
                }}
              />
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default PoidexModal;
