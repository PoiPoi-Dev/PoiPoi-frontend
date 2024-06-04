import * as React from "react";
import { Pin } from "../_utils/global";
import { PoiCard } from "./PoiCard"; // Importing PoiCard

interface PoidexModalProps {
  pins: Pin[];
  onClose: () => void;
  onPoiClick: (poi: Pin) => void;
  selectedPoi: Pin | null;
  goBack: () => void;
}

const PoidexModal: React.FC<PoidexModalProps> = ({ pins, onClose, onPoiClick, selectedPoi, goBack }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <dialog open className="relative bg-white rounded-lg overflow-hidden p-4" style={{ width: selectedPoi ? '60%' : '80%', maxWidth: '1000px' }}>
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
                  onClick={pin.collect ? () => onPoiClick(pin) : undefined}
                  className={`flex flex-col items-center  ${pin.collect ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                >
                  <img src={pin.collect ? pin.img_url : "/UnknownIcon.png"} alt={pin.title} className="w-full h-auto max-h-32 object-contain" />
                  <h2 className="text-center mt-2">
                    {pin.collect ? pin.title : "???"}
                  </h2>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <button
              onClick={goBack}
              className="absolute top-2 left-2 text-black bg-blue-500 rounded-full p-2 z-50"
            >
              Back
            </button>
            <PoiCard id={selectedPoi.id} payload={{ ...selectedPoi, collected: selectedPoi.collect }} />
          </div>
        )}
      </dialog>
    </div>
  );
};

export default PoidexModal;
