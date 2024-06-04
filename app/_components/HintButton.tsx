import React, { useState } from "react";
import { Button } from "./ui/button";

interface poiId {
    poi_id: number | undefined;
  }

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HintButton: React.FC<poiId> = ({ poi_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hints, setHints] = useState<string[]>([]);

  const fetchHints = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/hints/${poi_id}`);
        const data = await response.json();
        let arrayOfContent = [];
        for (let i = 0; i < data.length; i++) {
            arrayOfContent.push(data[i].content);
        }
        setHints(arrayOfContent);
      } catch (error) {
        console.error("Error fetching hints:", error);
      }
    };

  const toggleDisplay = () => {
    fetchHints();
    setIsOpen(!isOpen);
  };

  const closeHints = () => {
    toggleDisplay();
  };

  return (
    <div className="absolute top-0 left-32 z-50">
      <Button onClick={toggleDisplay} variant="default">Hints</Button>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-10">
          {hints.map((hint, index) => (
            <div key={index} className="flex items-center space-x-2">
                <span>{index + 1}</span>
                <p>{hint}</p>
            </div>
          ))}
          <Button onClick={closeHints} variant="default" className="mt-2">Close</Button>
        </div>
      )}
    </div>
  );
};

export default HintButton;
