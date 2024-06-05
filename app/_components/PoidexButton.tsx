import * as React from "react";
import { Button } from "./ui/button";

interface PoidexButtonProps {
  onClick: () => void;
}

const PoidexButton: React.FC<PoidexButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} variant="default">
      Open Poidex
    </Button>
  );
};

export default PoidexButton;
