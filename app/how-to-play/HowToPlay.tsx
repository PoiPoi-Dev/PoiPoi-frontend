export default function HowToPlay() {
  return (
    <main className="flex flex-col justify-between p-10 bg-amber-50">
      <section>
        <h1>HOW TO PLAY</h1>
        <p>
          Welcome to POIPOI! POI stands for "Point of Interest", which is what
          players will be collecting throughout the game.
        </p>
      </section>
      <section>
        <h2>Tracking a POI</h2>
        <p>
          Each question mark available on the map is a POI. The yellow circle
          around it indicates the "search zone", where hints and guessing will
          be possible. Clicking on any of the question marks will open the POI
          card and give players the option to track that POI, which is visible
          at the top of the screen. If the player is currently inside a search
          zone, the closest POI will be tracked by default, and the photo will
          also be displayed as a thumbnail in the bottom right corner. Clicking
          the thumbnail photo will also open the POI card.
        </p>
      </section>
      <section>
        <h2>Making a Guess</h2>
        <p>
          The goal of the game is to get as close to the location where the
          photo was taken as possible. Once the player enters a search zone, it
          will be possible to submit a guess or get hints. Submitting a guess
          will take the player's current geolocation and compare it to the POI's
          location, giving the player the distance in meters and a score. It
          will also add the POI card to the Collection.
        </p>
      </section>
      <section>
        <h2>Scoring and Leveling Up</h2>
        <p>
          Scores are calculated based on the distance between the player's guess
          and the exact location of the POI. The lowest possible score for each
          guess is 250, and the highest is 1000! Scores also get added to the
          overall XP, which raises the player's level.
        </p>
      </section>
      <section>
        <h2>Leaving Hints</h2>
        <p>
          If the player's guess is within 20 meters of the POI, it will be
          possible to leave a hint that other players who haven't collected the
          POI yet can see. Please leave a short comment that will help other
          players find the POI!
        </p>
      </section>
      <section>
        <h2>Collection</h2>
        <p>
          In the collection, players can see the total amount of POIs available,
          and the ones that have already been collected. Clicking on a collected
          POI will display the photo and description. Clicking on the "navigate"
          button in the top-left corner will recenter the camera on the map to
          the POI, so players can see the exact location of the POI again.
        </p>
      </section>
    </main>
  );
}
