import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface poiId {
    poi_id: number | undefined;
  }

// const BASE_URL = import.meta.env.local.NEXT_PUBLIC_BASE_URL;

const HintButton: React.FC<poiId> = ({ poi_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hints, setHints] = useState<string[]>([]);

  const fetchHints = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/hints/${poi_id}`);
        const data = await response.json();
        
        setHints(data[0].content);
        console.log(data[0].content);
        console.log("fetch happened!");
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
    <div className="absolute top-11 left-0 z-50">
      <Button onClick={toggleDisplay} variant="default">Hints</Button>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-10">
          {/* {hints.map((hint, index) => (
            <div key={index} className="flex items-center space-x-2">
                <p>{hint}</p>
            </div>
          ))} */}
          <p>{hints}</p>
          <Button onClick={closeHints} variant="default" className="mt-2">Close</Button>
        </div>
      )}
    </div>
  );
};

export default HintButton;
