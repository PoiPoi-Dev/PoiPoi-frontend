import { FC, useEffect, useState } from "react";

interface Props {
  strokeWidth?: number;
  sqSize?: number;
  percentage: number;
}

const CircularProgressBar: FC<Props> = (props) => {
  const [percentageAnimate, setPercentageAnimate] = useState(0);

  const { strokeWidth = 16, sqSize = 200, percentage } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * (percentageAnimate || 0)) / 100;

  useEffect(() => {
    setTimeout(() => {
      setPercentageAnimate(percentage);
    }, 600);
  }, [percentage]);

  return (
    <svg
      width={sqSize}
      height={sqSize}
      viewBox={viewBox}
      className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <circle
        className="fill-none stroke-gray-300"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-primary-500 transition-all ease-in-out delay-200 duration-1000"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
  );
};

export default CircularProgressBar;
