import { levelAndXp } from "../_utils/global";
import { useState, useEffect } from "react";
import { Progress } from "./ui/Progress";
import { calculateTotalExperienceForLevel } from "../_utils/calculateExpInLevel";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(levelAndXp.level);
  const [levelKey, setLevelKey] = useState<number>(levelAndXp.level); //prevent shrinking in progress bar

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const { level, xpToNextLevel } = levelAndXp;
    const XPRequireToNextLevel = calculateTotalExperienceForLevel(level);
    const currentUserXp = XPRequireToNextLevel - xpToNextLevel;
    const progressPercentage = (currentUserXp / XPRequireToNextLevel) * 100;

    const animateMultipleLevelUps = async (
      startLevel: number,
      endLevel: number
    ) => {
      let transitionLevel = startLevel + 1;
      while (transitionLevel <= endLevel) {
        await delay(1000);
        setCurrentLevel(transitionLevel);
        transitionLevel += 1;
      }
    };

    //written in use effect to trigger dependency
    const handleLevelUp = async () => {
      if (currentLevel === 0) {
        setProgress(progressPercentage);
        setCurrentLevel(level);
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
    <div
      className="z-[49] flex justify-center items-center gap-2 fixed bottom-36 left-1/2 -translate-x-1/2 w-1/2"
      key={levelKey}
    >
      {currentLevel === 0 ? null : (
        <div className="flex flex-col relative w-full">
          <div className="flex w-full justify-center items-center gap-2">
            <div className="flex justify-center items-center h-8 aspect-square bg-primary-100 rounded-full">
              <p className="text-white">{currentLevel}</p>
            </div>
            <Progress value={progress} />
          </div>
          <div className="absolute top-6 flex flex-col w-full gap-2">
            <p className="text-right">
              <span className="text-primary font-bold">
                {levelAndXp.xpToNextLevel}
              </span>{" "}
              xp to lv{" "}
              <span className="text-primary font-bold">
                {levelAndXp.level + 1}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelContainer;
