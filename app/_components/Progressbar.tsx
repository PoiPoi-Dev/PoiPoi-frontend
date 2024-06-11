import { Progress } from "./ui/progress";
import { levelAndXp } from "../_utils/global";

const Proggressbar: React.FC<{ levelAndXp: levelAndXp }> = ({ levelAndXp }) => {
  const level: number = levelAndXp.level;
  const totalXp: number = levelAndXp.totalXp;
  const totalExpInLevel: number = totalXp + levelAndXp.xpToNextLevel;

  return (
    <div className="absolute top-1 right-1 z-100 flex gap-2">
      {level}
      <Progress
        data-state="complete"
        data-value={totalXp}
        data-max={totalExpInLevel}
      />
    </div>
  );
};

export default Proggressbar;
