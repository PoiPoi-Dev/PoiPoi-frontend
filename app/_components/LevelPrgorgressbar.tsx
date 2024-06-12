import { Progress } from "./ui/progress";
import { levelAndXp } from "../_utils/global";

const Proggressbar: React.FC<{ levelAndXp: levelAndXp }> = ({ levelAndXp }) => {
  const level: number = levelAndXp.level;
  const totalXp: number = levelAndXp.totalXp;
  const totalExpInLevel: number = totalXp + levelAndXp.xpToNextLevel;

  const percentage: number = (totalXp / totalExpInLevel) * 100;

  return (
    <div className="absolute top-1 right-1 z-100 flex gap-2">
      <p>Level: {level}</p>
      <Progress value={percentage} />
    </div>
  );
};

export default Proggressbar;
