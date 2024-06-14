import { levelAndXp } from "../_utils/global";
import { Progress } from "./ui/Progress";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const { level, totalXp, xpToNextLevel } = levelAndXp;
  return (
    <div className="fixed bottom-40 left-4 w-40">
      <p>level{level}</p>
      <p>XP have{totalXp}</p>
      <p>XP neeed{xpToNextLevel}</p>
      <Progress value={level}/>
    </div>
  );
};

export default LevelContainer;
