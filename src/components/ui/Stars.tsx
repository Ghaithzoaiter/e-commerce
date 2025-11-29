
type StarsProps = {
  rating: number;
  size?: number;
};

export default function Stars({ rating, size = 26 }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`full-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] animate-scale-in"
        >
          <defs>
            <linearGradient id="starFull" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#fff7c2" />
              <stop offset="60%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#d4a100" />
            </linearGradient>
          </defs>
          <path
            fill="url(#starFull)"
            stroke="#b8860b"
            strokeWidth="0.6"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21
             12 17.77 5.82 21 7 14.14l-5-4.87
             6.91-1.01L12 2z"
          />
        </svg>
      ))}

      {half && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] animate-scale-in"
        >
          <defs>
            <linearGradient id="starHalf">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#00000000" />
            </linearGradient>
          </defs>

          <path
            fill="url(#starHalf)"
            stroke="#b8860b"
            strokeWidth="0.6"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21
             12 17.77 5.82 21 7 14.14l-5-4.87
             6.91-1.01L12 2z"
          />
        </svg>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className="opacity-40"
        >
          <path
            fill="#E5E7EB"
            stroke="#d4d4d8"
            strokeWidth="0.6"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21
             12 17.77 5.82 21 7 14.14l-5-4.87
             6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </div>
  );
}
