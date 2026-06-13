// Friendly Khatun companion avatar — used on loading & result screens.
export default function KhatunAvatar({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#EDEAFB" />
      {/* head */}
      <rect x="24" y="30" width="52" height="44" rx="16" fill="#8B7FF0" />
      <rect x="30" y="36" width="40" height="32" rx="11" fill="#fff" />
      <circle cx="41" cy="50" r="5" fill="#6F61E8" />
      <circle cx="59" cy="50" r="5" fill="#6F61E8" />
      <circle cx="43" cy="48" r="1.6" fill="#fff" />
      <circle cx="61" cy="48" r="1.6" fill="#fff" />
      <path d="M44 60 q6 5 12 0" stroke="#6F61E8" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      {/* cheeks */}
      <circle cx="34" cy="58" r="3" fill="#F2A6B0" opacity="0.7" />
      <circle cx="66" cy="58" r="3" fill="#F2A6B0" opacity="0.7" />
      {/* antenna */}
      <line x1="50" y1="30" x2="50" y2="20" stroke="#6F61E8" strokeWidth="3" />
      <circle cx="50" cy="17" r="4" fill="#6F61E8" />
    </svg>
  )
}
