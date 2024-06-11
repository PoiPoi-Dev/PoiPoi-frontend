import { Progress } from "./ui/Progress";
import { levelAndXp } from "../_utils/global";

const Proggressbar: React.FC<{ levelAndXp: levelAndXp }> = ({ levelAndXp }) => {
  const level: number = levelAndXp.level;
  const currentUserXp: number = levelAndXp.totalXp;
  const totalExpInLevel: number = currentUserXp + levelAndXp.xpToNextLevel;
  const percentage: number = (currentUserXp / totalExpInLevel) * 100;
  console.log(percentage);

  return (
    <div className="fixed bot-12 left-1 z-100 flex gap-2">
      <p>lvl: {level}</p>
      <Progress className="w-40" value={percentage} />
    </div>
  );
};

export default Proggressbar;
