import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import Image from "next/image";
import { Button } from "../_components/ui/button";
import Poipoi from "@/public/Poipoi.png";
import P from "@/public/P.png";
import { IoClose } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";
import HTPstart from "@/public/HTP-Start.jpg";
import HTPtrack1 from "@/public/HTP-TrackingPOI-1.jpg";
import HTPtrack2 from "@/public/HTP-TrackingPOI-2.jpg";
import HTPtrack3 from "@/public/HTP-TrackingPOI-3.jpg";
import guess1 from "@/public/HTP-MakeAGuess-1.jpg";
import guess2 from "@/public/HTP-MakeAGuess-2.jpg";
import score from "@/public/HTP-ScoreAndLevel-1.jpg";
import hint1 from "@/public/HTP-LeavingHint-1.jpg";
import hint2 from "@/public/HTP-LeavingHint-2.jpg";
import poidex1 from "@/public/HTP-POIdex-1.jpg";
import poidex2 from "@/public/HTP-POIdex-2.jpg";

const contentStyle =
  "flex flex-col w-full h-svh overflow-y-scroll no-scrollbar items-center justify-center text-left pb-8";

export default function HowToPlay() {
  return (
    <div className="w-screen h-[100svh] px-4">
      <div className="flex w-full justify-between items-end">
        <Image alt="Poipoi Logo" src={Poipoi} height={75} />
        <Link href="/map">
          <IoClose size={36} className="mb-2 text-primary" />
        </Link>
      </div>
      <Carousel className="w-full h-full">
        <CarouselContent>
          <CarouselItem className={contentStyle}>
            <Image
              alt="welcome screen"
              className="mt-4 rounded-2xl"
              src={P}
              height={420}
            ></Image>
            <h1 className="text-primary text-xl mt-2">WELCOME</h1>
            <p className="mb-20">
              {`Welcome to POIPOI! POI stands for "Point of Interest", which is what you will be collecting throughout the game.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <div className="flex justify-center items-center w-full py-8">
              <IoWarning size={120} className="text-destructive" />
            </div>
            <h2 className="text-primary text-xl mt-2">**BEFORE YOU PLAY**</h2>
            <p className="mb-20">
              {`Please make sure to give permission to location tracking in your browser, as well as your phone!`}
              <br></br>
              {`While you are playing, please be aware of your surroundings, avoid dangerous areas, and follow local laws and regulations.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 2"
              className="mt-4 rounded-xl"
              src={HTPstart}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">HOW TO PLAY</h2>
            <p className="mb-20">
              {`1. Select a question mark to start tracking your first POI.`}
              <br></br>
              {`2. Walk to where you think the picture is taken.`}
              <br></br>
              {`3. Submit a guess, get a score, collect a POI! How did you do?`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 3"
              className="mt-4 rounded-xl"
              src={HTPtrack1}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Tracking a POI {`(1/3)`}
            </h2>
            <p className="mb-20">
              {`Each question mark on the map is a POI. The yellow circle around it indicates the "search zone", where hints and guessing will be activated.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 4"
              className="mt-4 rounded-xl"
              src={HTPtrack2}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Tracking a POI {`(2/3)`}
            </h2>
            <p className="mb-20">
              {`Clicking on any of the question marks will open the POI card and give you the option to track that POI, which is then visible at the top of the screen.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 5"
              className="mt-4 rounded-xl"
              src={HTPtrack3}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Tracking a POI {`(3/3)`}
            </h2>
            <p className="mb-20">
              {`If you are currently inside a search zone, the closest POI will be selected and tracked for you, and the photo will be displayed as a thumbnail in the bottom right corner. Clicking the thumbnail will also open the POI card.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 6"
              className="mt-4 rounded-xl"
              src={guess1}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Making a Guess {`(1/2)`}
            </h2>
            <p className="mb-20">
              {`The goal of the game is to be as close to the location as possible.
           Remember, it is NOT the location of the object, but *WHERE THE PHOTO WAS TAKEN*! Once you enter a search zone, it will be possible to
           submit a guess or get hints.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 7"
              className="mt-4 rounded-xl"
              src={guess2}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Making a Guess {`(2/2)`}
            </h2>
            <p className="mb-20">
              {`Submitting a guess will take your current location and compare it to the POI's location, giving you the distance in meters and a score. It will also add the POI card to the Poidex.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 8"
              className="mt-4 rounded-xl"
              src={score}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Scoring and Leveling Up
            </h2>
            <p className="mb-20">
              {`Scores are calculated based on the distance between your guess and the exact location of the POI. You can get as many as 1000 points per POI! Points also get added to the overall XP, which raises your level.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 9"
              className="mt-4 rounded-xl"
              src={hint1}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Leaving Hints {`(1/2)`}
            </h2>
            <p className="mb-20">
              {`If your guess is within 20 meters of the POI, you get the option to leave a hint! This hint can then be seen by others who have not yet collected the POI.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 10"
              className="mt-4 rounded-xl"
              src={hint2}
              height={420}
            ></Image>
            <h2 className="text-primary text-xl mt-2">
              Leaving Hints {`(2/2)`}
            </h2>
            <p className="mb-20">
              {`Please leave a short comment that will help others find the POI! Try to make it easy to understand, but not giving away too much 😉.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 11"
              className="mt-4 rounded-xl"
              src={poidex1}
              height={420}
            ></Image>
            <h2 className="text-primary text-2xl mt-2">Poidex {`(1/2)`}</h2>
            <p className="mb-20">
              {`In the Poidex, you can see thumbnail photos of all the POIs and their current status. Clicking on a thumbnail will display the POI card. Clicking on the "navigate" icon in the top-right corner will take you to the search zone if the POI has not been collected.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 12"
              className="mt-4 rounded-xl"
              src={poidex2}
              height={420}
            ></Image>
            <h2 className="text-primary text-2xl mt-2">Poidex {`(2/2)`}</h2>
            <p>
              {`If the POI has been collected, the navigation icon will take you to the exact location of POI. You may revisit your favorite POIs anytime!`}
            </p>
            <Link href="/map" className="w-full">
              <Button className="w-full mt-4 mb-20">Return to Map</Button>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
