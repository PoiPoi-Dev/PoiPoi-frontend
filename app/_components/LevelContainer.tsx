import { levelAndXp } from "../_utils/global";
import { Progress } from "./ui/Progress";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const { level, totalXp, xpToNextLevel } = levelAndXp;
  const totalXpForCurrentLevel = totalXp + xpToNextLevel;
  const progressPercentage = (totalXp / totalXpForCurrentLevel) * 100;

  return (
    <div className="fixed bottom-40 left-4 w-40">
      <p>level{level}</p>
      <p>
        XP Bar:{totalXp}/{totalXpForCurrentLevel}
      </p>
      <Progress value={progressPercentage} />
    </div>
  );
};

export default LevelContainer;
