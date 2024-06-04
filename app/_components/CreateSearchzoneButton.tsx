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
    <Button onClick={togglePopover} variant="default">
      Create Searchzone
    </Button>
  );
};

export default CreateSearchzoneButton;
