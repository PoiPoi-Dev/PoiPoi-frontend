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

    const animateMultipleLevelUps = async (
      startLevel: number,
      endLevel: number
    ) => {
      let transitionLevel = startLevel + 1;
      while (transitionLevel < endLevel) {
        await delay(1000);
        setCurrentLevel(transitionLevel);
        transitionLevel += 1;
      }
    };

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
        await animateMultipleLevelUps(currentLevel, level);

        //frame 2
        setLevelKey(level);
        setCurrentLevel(level);
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
    <div className="fixed top-28 left-4 w-40" key={levelKey}>
      <p>
        level{currentLevel} {levelAndXp.totalXp}/
        {levelAndXp.totalXp + levelAndXp.xpToNextLevel}
      </p>
      <Progress value={progress} />
    </div>
  );
};

export default LevelContainer;
