import { FaLocationDot } from "react-icons/fa6";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";

const MainQuest = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="z-50 bg-white rounded-full h-12 w-full flex items-center justify-center shadow-2xl gap-4 cursor-pointer">
          <FaLocationDot size={24} className="text-primary" />
          Quest
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>This is your main quest</DrawerTitle>
          <DrawerDescription>Go find it!!</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="w-full">
            <Button className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MainQuest;
