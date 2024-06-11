import { DrawerClose } from "./drawer";
import { Button } from "./button";

const DrawerCloseButton = ({ text = "Close" }: { text?: string }) => {
  return (
    <DrawerClose className="w-full">
      <Button className="w-full">{text}</Button>
    </DrawerClose>
  );
};

export default DrawerCloseButton;
