import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";
import { levelAndXp } from "../_utils/global";

const Progressbar: React.FC<{ levelAndXp: levelAndXp }> = ({ levelAndXp }) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [xpInLevel, setXpInLevel] = useState<number>(
    levelAndXp.totalXp + levelAndXp.xpToNextLevel
  );
  const userXp = levelAndXp.totalXp;
  const [percentage, setPercentage] = useState<number>(
    (userXp / xpInLevel) * 100
  );
  const [levelKey, setLevelKey] = useState<number>(1); //this is used to desotry the component so that it start from zero

  useEffect(() => {
    const newLevel = levelAndXp.level;
    const xpInCurrentLevel = userXp % xpInLevel;
    const newPercentage = (xpInCurrentLevel / xpInLevel) * 100;

    if (newLevel > currentLevel) {
      setPercentage(100);
      setTimeout(() => {
        setLevelKey(newLevel);
        setPercentage(0);
        setTimeout(() => {
          setCurrentLevel(newLevel);
          setXpInLevel(levelAndXp.xpToNextLevel);
          setPercentage(newPercentage);
        }, 500);
      }, 500);
    } else {
      setPercentage(newPercentage);
    }
  }, [levelAndXp, userXp, xpInLevel, currentLevel]);

  return (
    <div className="absolute top-1 left-1 z-100 flex gap-2 w-52" key={levelKey}>
      <p>Level: {currentLevel}</p>
      <Progress value={percentage} />
    </div>
  );
};

export default Progressbar;
