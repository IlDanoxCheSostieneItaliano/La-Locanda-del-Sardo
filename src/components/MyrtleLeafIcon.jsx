export default function MyrtleLeafIcon({ className = "", size = 18, title = "Piatto signature" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      <path
        d="M12 2.5c-3.4 2.9-5 5.9-5 9.2 0 3.9 2 7.4 5 10.3 3-2.9 5-6.4 5-10.3 0-3.3-1.6-6.3-5-9.2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 5v15"
        stroke="#FAF6EF"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="9.2" cy="15.5" r="1.5" fill="#7D2C39" />
      <circle cx="14.8" cy="17.2" r="1.5" fill="#7D2C39" />
    </svg>
  );
}
