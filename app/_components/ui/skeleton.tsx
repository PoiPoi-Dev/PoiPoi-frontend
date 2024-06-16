export default function Skeleton({
  className,
}: {
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`animate-pulse bg-slate-400 rounded-full ${className}`}
    ></div>
  );
}
