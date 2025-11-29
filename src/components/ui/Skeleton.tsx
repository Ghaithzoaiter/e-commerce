export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-background rounded-md ${className}`}
    ></div>
  );
}
