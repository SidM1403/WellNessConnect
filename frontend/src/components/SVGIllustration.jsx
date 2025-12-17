const SVGIllustration = ({ variant = 'wave' }) => {
  if (variant === 'lotus') {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-emerald-200" aria-hidden="true">
        <path
          d="M60 20C52 32 48 46 47 58c4-3 9-6 13-8 4 2 9 5 13 8-1-12-5-26-13-38Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M60 15C50 30 46 45 45 58c3-2 7-5 10-7 3 2 7 5 10 7-1-13-5-28-15-43Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.7"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 120" className="w-full h-16 text-emerald-200" aria-hidden="true">
      <path
        d="M0 60 Q50 20 100 60 T200 60 T300 60 T400 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="10 14"
        opacity="0.5"
      />
    </svg>
  );
};

export default SVGIllustration;

