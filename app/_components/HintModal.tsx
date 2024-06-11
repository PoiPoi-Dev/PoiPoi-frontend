import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Pin } from '../_utils/global';
import { Coordinates, GetDistanceFromCoordinatesToMeters } from '../_utils/coordinateMath';

interface HintModalProps {
  pin: Pin | null;
  userCoord: Coordinates | null | undefined;
}

const HintModal = ({ pin, userCoord }: HintModalProps) => {
  const [hint, setHint] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thresholdDistance = 50; // Threshold distance for allowing hints

  // Ensure distance is only calculated when userCoord and pin are defined
  const distanceToPin = GetDistanceFromCoordinatesToMeters(
    { latitude: userCoord!.latitude, longitude: userCoord!.longitude },
    { latitude: pin!.exact_latitude, longitude: pin!.exact_longitude }
  );

  const isCloseEnough = distanceToPin <= thresholdDistance;

  useEffect(() => {
    dialogRef.current?.showModal();
  }, [pin?.is_completed]);

  const handleSubmit = () => {
    // Implement your POST request logic here
    console.log('Hint submitted:', hint);
    setHint('');
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className="rounded-lg shadow-lg p-6 bg-white">
      {isCloseEnough ? (
        <>
          <h2>Nice Guessing! How about leaving a hint for someone else?</h2>
          <p>(Be sure to be helpful! But don't just give it away!)</p>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            className="border p-2 mt-2 w-full"
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmit} className="mr-2">
              Submit Hint
            </Button>
            <Button onClick={() => dialogRef.current?.close()}>Close</Button>
          </div>
        </>
      ) : (
        <>
          <h2>Nice try! We'll still give you some points but try and get closer next time!</h2>
          <p>(You'll even be able to leave a hint if you're close enough!)</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => dialogRef.current?.close()}>Close</Button>
          </div>
        </>
      )}
    </dialog>
  );
};

export default HintModal;
