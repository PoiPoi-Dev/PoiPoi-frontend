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
import { IoClose } from "react-icons/io5";

const contentStyle =
  "flex-col h-svh overflow-y-scroll no-scrollbar items-end justify-center text-left pb-8";

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
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h1 className="text-primary text-xl">WELCOME</h1>
            <p className="mb-20">
              {`Welcome to POIPOI! POI stands for "Point of Interest", which is what you will be collecting throughout the game.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 1"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">**BEFORE YOU PLAY**</h2>
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
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">HOW TO PLAY</h2>
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
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Tracking a POI {`(1/3)`}</h2>
            <p className="mb-20">
              {`Each question mark on the map is a POI. The yellow circle around it indicates the "search zone", where hints and guessing will be activated.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 4"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Tracking a POI {`(2/3)`}</h2>
            <p className="mb-20">
              {`Clicking on any of the question marks will open the POI card and give you the option to track that POI, which is then visible at the top of the screen.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 5"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Tracking a POI {`(3/3)`}</h2>
            <p className="mb-20">
              {`If you are currently inside a search zone, the closest POI will be selected and tracked for you, and the photo will be displayed as a thumbnail in the bottom right corner. Clicking the thumbnail will also open the POI card.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 6"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Making a Guess {`(1/2)`}</h2>
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
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Making a Guess {`(2/2)`}</h2>
            <p className="mb-20">
              {`Submitting a guess will take your current location and compare it to the POI's location, giving you the distance in meters and a score. It will also add the POI card to the Poidex.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 8"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Scoring and Leveling Up</h2>
            <p className="mb-20">
              {`Scores are calculated based on the distance between your guess and the exact location of the POI. You can get as many as 1000 points per POI! Points also get added to the overall XP, which raises your level.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 9"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Leaving Hints {`(1/2)`}</h2>
            <p className="mb-20">
              {`If your guess is within 20 meters of the POI, you get the option to leave a hint! This hint can then be seen by others who have not yet collected the POI.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 10"
              className="mt-4 rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-xl">Leaving Hints {`(2/2)`}</h2>
            <p className="mb-20">
              {`Please leave a short comment that will help others find the POI! Try to make it easy to understand, but not giving away too much 😉.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 11"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Poidex {`(1/2)`}</h2>
            <p className="mb-20">
              {`In the Poidex, you can see thumbnail photos of all the POIs and their current status. Clicking on a thumbnail will display the POI card. Clicking on the "navigate" icon in the top-right corner will take you to the search zone if the POI has not been collected.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 12"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Poidex {`(2/2)`}</h2>
            <p>
              {`If the POI has been collected, the navigation icon will take you to the exact location of POI. You may revisit your favorite POIs anytime!`}
            </p>
            <Link href="/map">
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
