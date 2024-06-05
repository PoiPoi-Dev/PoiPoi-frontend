import React, { useState } from "react";
import { Poi } from "../_utils/global";
import { Button } from "./ui/button";

const CreateSearchzoneButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSearchzone, setNewSearchzone] = useState<Poi>({});

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button
        className="absolute top-[50px] left-0 z-50"
        onClick={togglePopover}
        variant="default"
      >
        Create Searchzone
      </Button>
      {isOpen && (
        <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 top-[100px] left-0 z-[1000]">
          Form!!
          <form>
            <div>
              <label htmlFor="title">Enter title:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="description">Enter description:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="img">Upload picture:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="creator_id">Enter creator id:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="poi_lat">Enter exact latitude:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="poi_long">Enter exact longitude:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="collection radius">
                Enter collection radius:
              </label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="search_lat">Enter search zone latitude:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="search_long">Enter search zone longitude:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <div>
              <label htmlFor="search_radius">Enter search zone radius:</label>
              <input
                className="border border-black rounded"
                type="text"
                required
              ></input>
            </div>
            <Button onClick={togglePopover}>Submit</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateSearchzoneButton;
