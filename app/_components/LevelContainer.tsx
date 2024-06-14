import { levelAndXp } from "../_utils/global";

const LevelContainer = ({ levelAndXp }: { levelAndXp: levelAndXp }) => {
  const { level, totalXp, xpToNextLevel } = levelAndXp;
  return (
    <div className="fixed bottom-40 left-4">
      <p>level{level}</p>
      <p>XP have{totalXp}</p>
      <p>XP neeed{xpToNextLevel}</p>
    </div>
  );
};

export default LevelContainer;
