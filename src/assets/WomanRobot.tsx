// Onboarding 3 (climax) — a woman beside a friendly little robot companion.
export default function WomanRobot() {
  return (
    <svg viewBox="0 0 260 260" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="130" cy="120" r="100" fill="#fff" opacity="0.6" />
      <circle cx="130" cy="120" r="100" stroke="#A99DF5" strokeWidth="2" strokeDasharray="4 12" opacity="0.6" />

      {/* sparkles */}
      <g fill="#fff">
        <path d="M48 70 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z" />
        <path d="M214 96 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
        <path d="M206 168 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z" />
      </g>

      {/* woman (left) */}
      <g>
        <path d="M40 250 q-4 -70 22 -94 q12 -10 28 -8 q26 4 28 40 l6 62 z" fill="#6F61E8" />
        <circle cx="78" cy="96" r="28" fill="#F4C9A8" />
        <path d="M50 96 q-2 -32 28 -35 q32 -2 31 32 q-10 -19 -27 -17 q-17 2 -21 19 q-6 -8 -11 1z" fill="#3A2E63" />
        <path d="M49 96 q-6 25 4 42 q-16 -21 -10 -44z" fill="#3A2E63" />
        <circle cx="72" cy="96" r="2.6" fill="#2B2350" />
        <circle cx="86" cy="96" r="2.6" fill="#2B2350" />
        <path d="M73 105 q6 5 12 0" stroke="#2B2350" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <circle cx="65" cy="103" r="4" fill="#F2A6B0" opacity="0.6" />
        {/* arm toward robot */}
        <path d="M104 156 q26 4 40 22" stroke="#8B7FF0" strokeWidth="15" strokeLinecap="round" />
      </g>

      {/* friendly little robot (right) */}
      <g transform="translate(168 150)">
        {/* hover shadow */}
        <ellipse cx="0" cy="92" rx="34" ry="8" fill="#6F61E8" opacity="0.25" />
        {/* body */}
        <rect x="-30" y="6" width="60" height="58" rx="18" fill="#6F61E8" />
        <rect x="-22" y="18" width="44" height="30" rx="10" fill="#EDEAFB" />
        {/* tummy heart */}
        <path d="M0 40 c-6 -8 -16 -2 -10 6 l10 10 l10 -10 c6 -8 -4 -14 -10 -6z" fill="#F2A6B0" />
        {/* head */}
        <rect x="-26" y="-34" width="52" height="44" rx="16" fill="#8B7FF0" />
        <rect x="-20" y="-28" width="40" height="32" rx="11" fill="#fff" />
        <circle cx="-9" cy="-12" r="5" fill="#6F61E8" />
        <circle cx="9" cy="-12" r="5" fill="#6F61E8" />
        <circle cx="-7" cy="-14" r="1.6" fill="#fff" />
        <circle cx="11" cy="-14" r="1.6" fill="#fff" />
        <path d="M-6 -2 q6 5 12 0" stroke="#6F61E8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* antenna */}
        <line x1="0" y1="-34" x2="0" y2="-46" stroke="#6F61E8" strokeWidth="3" />
        <circle cx="0" cy="-49" r="4" fill="#fff" />
        {/* waving arm */}
        <path d="M-30 26 q-16 -4 -20 -18" stroke="#8B7FF0" strokeWidth="9" strokeLinecap="round" />
        <circle cx="-52" cy="6" r="6" fill="#6F61E8" />
      </g>
    </svg>
  )
}
