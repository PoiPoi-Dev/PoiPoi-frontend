import { levelAndXp } from "../_utils/global";
import { useState, useEffect } from "react";
import { Progress } from "./ui/Progress";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(levelAndXp.level);
  const [levelKey, setLevelKey] = useState<number>(levelAndXp.level); //prevent shrinking in progress bar

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const { totalXp, level, xpToNextLevel } = levelAndXp;
    const totalXpForCurrentLevel = totalXp + xpToNextLevel;
    const progressPercentage = (totalXp / totalXpForCurrentLevel) * 100;
    let transitionLevel: number = currentLevel;

    //written in use effect to trigger dependency
    const handleLevelUp = async () => {
      //handle /refresh to not animate progressbar
      if (currentLevel === 0) {
        setCurrentLevel(level);
        setProgress(progressPercentage);
        return;
      }

      // Player leveled up
      if (level > currentLevel) {
        //frame 1
        setProgress(100);
        //animate multiple level ups
        while (transitionLevel < level) {
          await delay(1000);
          transitionLevel += 1;
          setCurrentLevel(transitionLevel);
        }
        await delay(1000);

        //frame 2
        setLevelKey(level);
        setProgress(0);
        await delay(1000);

        //last frame
        setProgress(progressPercentage);

        //no levelup
      } else {
        setProgress(progressPercentage);
      }
    };
    void handleLevelUp();
  }, [levelAndXp, currentLevel]);

  return (
    <div className="fixed bottom-52 left-4 w-40" key={levelKey}>
      <p>level{currentLevel}</p>
      <Progress value={progress} />
    </div>
  );
};

export default LevelContainer;
