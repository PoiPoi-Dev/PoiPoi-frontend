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

    const handleLevelUp = async () => {
      if (level > currentLevel) {
        // Player leveled up
        setProgress(100);
        await delay(1000);
        setLevelKey(level);
        setCurrentLevel(level);
        setProgress(0);
      } else {
        setProgress(progressPercentage);
      }
    };
    void handleLevelUp();
  }, [levelAndXp, currentLevel]);

  return (
    <div className="fixed bottom-40 left-4 w-40" key={levelKey}>
      <p>level{currentLevel}</p>
      <Progress value={progress} />
    </div>
  );
};

export default LevelContainer;
