import { Progress } from "./ui/progress";

const Proggressbar: React.FC = () => {
  return (
    <div className="absolute top-1 left-1 z-1000 flex gap-2">
      {"hello"}
      <Progress />
    </div>
  );
};

export default Proggressbar;
