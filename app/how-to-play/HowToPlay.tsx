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

const contentStyle =
  "flex-col h-svh overflow-y-scroll no-scrollbar items-end justify-center text-center pb-8";

export default function HowToPlay() {
  return (
    <div className="w-screen h-[100svh] px-4">
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
            <h1 className="text-primary">WELCOME</h1>
            <p>
            {`Welcome to POIPOI! POI stands for "Point of Interest", which is what you will be collecting throughout the game.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
          <Image
            alt="Tutorial 1"
            className="mt-4 rounded-2xl"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
            width={400}
            height={600}
          ></Image>
          <h2 className="text-primary text-2xl">**BEFORE YOU PLAY**</h2>
          <p>{`Please make sure you enable geolocation setting in your brower as well as on your phone!`}
          </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 2"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">HOW TO PLAY</h2>
            <p>
            {`1. Select a question mark to start tracking your first POI.`}<br></br>
            {`2. Walk to where you think the picture is taken.`}<br></br>
            {`3. Submit a guess and get a score! How did you do?`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 3"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Tracking a POI {`(1/3)`}</h2>
            <p>
            {`Each question mark on the map is a POI. The yellow circle around it indicates the "search zone", where hints and guessing will be possible.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 4"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Tracking a POI {`(2/3)`}</h2>
            <p>
            {`Clicking on any of the question marks will open the POI card and give you the option to track that POI, which is then visible at the top of the screen.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 5"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Tracking a POI {`(3/3)`}</h2>
            <p>
            {`If you are currently inside a search zone, the closest POI will be selected and tracked for you, and the photo will also be displayed as a thumbnail in the bottom right corner. Clicking the thumbnail will also open the POI card.`}
            </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 6"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
            <h2 className="text-primary text-2xl">Making a Guess {`(1/2)`}</h2>
            <p>
            {`The goal of the game is to be as close to the location as possible.
           Remember, it's not the thing in the photo, but *WHERE* the photo was
           taken! Once you enter a search zone, it will be possible to
           submit a guess or get hints.`}
           </p>
          </CarouselItem>
          <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 7"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
          <h2 className="text-primary text-2xl">Making a Guess {`(2/2)`}</h2>
          <p>
            {`Submitting a guess will take your current location and compare it to the POI's location, giving you the distance in meters and a score. It will also add the POI card to the Poidex.`}
          </p>
        </CarouselItem>
        <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 8"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
          <h2 className="text-primary text-2xl">Scoring and Leveling Up</h2>
          <p>
            {`Scores are calculated based on the distance between the your guess
           and the exact location of the POI. You can get as many as 1000 per POI! Scores also get added to the overall XP, which raises your level.`}
          </p>
        </CarouselItem>
        <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 9"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
          <h2 className="text-primary text-2xl">Leaving Hints {`(1/2)`}</h2>
          <p>
            {`If your guess is within 20 meters of the POI, you get the
           option to leave a hint! This hint can then be seen by others who haven't
           collected the POI yet.`}
          </p>
        </CarouselItem>
        <CarouselItem className={contentStyle}>
            <Image
              alt="Tutorial 10"
              className="mt-4 rounded-2xl"
              src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
              width={400}
              height={600}
            ></Image>
          <h2 className="text-primary text-2xl">Leaving Hints {`(2/2)`}</h2>
          <p>
            {`Please leave a short comment that will help others find the POI! Try to make it is easy to understand, but doesn't give away too much 😉.`}
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
          <p>
            {`In the Poidex, you can see thumbnail photos of all the POIs. Clicking on a thumbnail will display the POI card and it's current status. Clicking on the "navigate" icon in the top-right corner will take you to the search zone if the POI has not been collected.`}
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
            {`If the POI has been collected, the navigation icon will take you to the exact location of POI if it has been collected. You may revisit your favorite spots!`}
          </p>
          <Link href="/map">
            <Button className="w-full mt-4">Return to Map</Button>
          </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}