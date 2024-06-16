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
          <h1>HOW TO PLAY</h1>
          <p>
            {`Welcome to POIPOI! POI stands for "Point of Interest", which is what
           players will be collecting throughout the game.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Tracking a POI</h2>
          <p>
            {`Each question mark available on the map is a POI. The yellow circle
           around it indicates the "search zone", where hints and guessing will
           be possible. Clicking on any of the question marks will open the POI
           card and give players the option to track that POI, which is visible
           at the top of the screen. If the player is currently inside a search
           zone, the closest POI will be tracked by default, and the photo will
           also be displayed as a thumbnail in the bottom right corner. Clicking
         the thumbnail photo will also open the POI card.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Making a Guess</h2>
          <p>
            {`The goal of the game is to be as close to the location as possible.
           Remember, it's not the thing in the photo, but /where/ the photo was
           taken! Once the player enters a search zone, it will be possible to
           submit a guess or get hints. Submitting a guess will take the player's
           current location and compare it to the POI's location, giving the
           player the distance in meters and a score. It will also add the POI
           card to the Collection.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Scoring and Leveling Up</h2>
          <p>
            {`Scores are calculated based on the distance between the player's guess
           and the exact location of the POI. The lowest possible score for each
           guess is 250, but players can get as many as 1000! Scores also get
           added to the overall XP, which raises the player's level.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Leaving Hints</h2>
          <p>
            {`If the player's guess is within 20 meters of the POI, they have the
           option to leave a hint. This hint can be seen by others who haven't
           collected the POI yet. Please leave a short comment that will help
           other players find the POI! Be sure to leave a hint that is easy to
           understand, but doesn't give away too much.`}
          </p>
        </CarouselItem>
        <CarouselItem className="flex-col h-dvh items-end justify-center text-center">
          <img
            className=" h-4/6 mt-4 m-auto"
            src="https://firebasestorage.googleapis.com/v0/b/tokyo-quest.appspot.com/o/devPhotos%2FIMG_3593.jpg?alt=media&token=47a552ab-701a-48e2-b1fb-e3dcaeab52a3"
          ></img>
          <h2>Collection</h2>
          <p>
            {`In the collection, players can see all the POIs. Clicking on a
           collected POI will display the photo and description. Clicking on the
           "navigate" button in the top-right corner will show the POI's exact
           location on the map. Players can revisit their favorite spots!`}
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
