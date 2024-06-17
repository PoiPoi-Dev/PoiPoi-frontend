import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";

export default function HowToPlay() {
  return (
    <Carousel className="m-auto w-10/12">
      <CarouselContent>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h1>WELCOME</h1>
          <p>
            {`Welcome to POIPOI! POI stands for "Point of Interest", which is what
           you will be collecting throughout the game.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>**BEFORE YOU PLAY**</h2>
          <p>{`Please make sure you enable geolocation setting in your brower as well as on your phone!`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h1>HOW TO PLAY</h1>
          <p>
            {`1. Select a question mark to start tracking your first POI.`}<br></br>
            {`2. Walk to where you think the picture is taken.`}<br></br>
            {`3. Submit a guess and get a score! How did you do?`}
            </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Tracking a POI {`(1/3)`}</h2>
          <p>
            {`Each question mark on the map is a POI. The yellow circle
           around it indicates the "search zone", where hints and guessing will
           be possible.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Tracking a POI {`(2/3)`}</h2>
          <p>
            {`Clicking on any of the question marks will open the POI
           card and give you the option to track that POI, which is then visible
           at the top of the screen.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Tracking a POI {`(3/3)`}</h2>
          <p>
            {`If you are currently inside a search zone, the closest POI will be selected and tracked for you, and the photo will also be displayed as a thumbnail in the bottom right corner. Clicking the thumbnail will also open the POI card.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Making a Guess {`(1/2)`}</h2>
          <p>
            {`The goal of the game is to be as close to the location as possible.
           Remember, it's not the thing in the photo, but *WHERE* the photo was
           taken! Once you enter a search zone, it will be possible to
           submit a guess or get hints.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Making a Guess {`(2/2)`}</h2>
          <p>
            {`Submitting a guess will take your current location and compare it to the POI's location, giving you the distance in meters and a score. It will also add the POI card to the Poidex.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Scoring and Leveling Up</h2>
          <p>
            {`Scores are calculated based on the distance between the your guess
           and the exact location of the POI. You can get as many as 1000 per POI! Scores also get added to the overall XP, which raises your level.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Leaving Hints {`(1/2)`}</h2>
          <p>
            {`If your guess is within 20 meters of the POI, you get the
           option to leave a hint! This hint can then be seen by others who haven't
           collected the POI yet.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Leaving Hints {`(2/2)`}</h2>
          <p>
            {`Please leave a short comment that will help others find the POI! Try to make it is easy to understand, but doesn't give away too much 😉.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Poidex {`(1/2)`}</h2>
          <p>
            {`In the Poidex, you can see thumbnail photos of all the POIs. Clicking on a thumbnail will display the POI card and it's current status. Clicking on the "navigate" icon in the top-right corner will take you to the search zone if the POI has not been collected.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Poidex {`(2/2)`}</h2>
          <p>
            {`If the POI has been collected, the navigation icon will take you to the exact location of POI if it has been collected. You may revisit your favorite spots!`}
          </p>

          <Link
            className=" text-purple-500 hover:underline underline-offset-2"
            href="/map"
          >
            Return to Map
          </Link>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
