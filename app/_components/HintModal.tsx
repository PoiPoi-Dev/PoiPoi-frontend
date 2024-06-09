import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
  distanceToPin: number;
  thresholdDistance: number;
  onSubmitHint: (hint: string) => void;
}

const HintModal = ({ isOpen, onClose, distanceToPin, thresholdDistance, onSubmitHint }: HintModalProps) => {
  const [hint, setHint] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const isCloseEnough = distanceToPin <= thresholdDistance; //Checking if distance is less than the minimum hint requirement

  const handleSubmit = () => {
    onSubmitHint(hint);
    setHint('');
    onClose();
  };

  return (
    <dialog ref={dialogRef} className="rounded-lg shadow-lg p-6 bg-white">
      {isCloseEnough ? (
        <>
          <h2>{`Nice Guessing! How about leaving a hint for someone else?`}</h2>
          <p>{`(Be sure to be helpful! But don't just give it away!)`}</p>
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
            <Button onClick={onClose}>Close</Button>
          </div>
        </>
      ) : (
        <>
          <h2>{`Nice try! We'll still give you some points but try and get closer next time!`}</h2>
          <p>{`(You'll even be able to leave a hint if you're close enough!)`}</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </>
      )}
    </dialog>
  );
};

export default HintModal;
