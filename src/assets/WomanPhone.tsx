// Onboarding 1 — a woman calmly using her phone (private).
export default function WomanPhone() {
  return (
    <svg viewBox="0 0 240 260" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* soft halo */}
      <circle cx="120" cy="120" r="92" fill="#fff" opacity="0.55" />
      <circle cx="120" cy="120" r="92" stroke="#A99DF5" strokeWidth="2" strokeDasharray="6 10" opacity="0.7" />

      {/* privacy lock badge */}
      <g transform="translate(176 60)">
        <circle r="20" fill="#6F61E8" />
        <rect x="-8" y="-3" width="16" height="13" rx="3" fill="#fff" />
        <path d="M-5 -3 v-4 a5 5 0 0 1 10 0 v4" stroke="#fff" strokeWidth="3" fill="none" />
        <circle cy="3" r="2" fill="#6F61E8" />
      </g>

      {/* body */}
      <path d="M70 250 q-6 -78 22 -104 q14 -12 32 -10 q30 4 34 44 l8 70 z" fill="#6F61E8" />
      {/* arm holding phone */}
      <path d="M126 150 q22 -6 30 16 q4 12 -4 22" stroke="#8B7FF0" strokeWidth="16" strokeLinecap="round" />

      {/* phone */}
      <g transform="translate(150 178) rotate(12)">
        <rect x="-15" y="-26" width="30" height="52" rx="7" fill="#2B2350" />
        <rect x="-11" y="-21" width="22" height="40" rx="3" fill="#EDEAFB" />
        <circle cx="0" cy="-3" r="6" fill="#8B7FF0" />
        <rect x="-7" y="7" width="14" height="3" rx="1.5" fill="#A99DF5" />
      </g>

      {/* head */}
      <circle cx="106" cy="92" r="30" fill="#F4C9A8" />
      {/* hair */}
      <path d="M76 92 q-2 -34 30 -38 q34 -4 34 34 q0 8 -4 14 q2 -22 -18 -26 q4 14 -6 18 q-4 -10 -16 -8 q-12 2 -16 18 q-4 -6 -4 -12z" fill="#3A2E63" />
      <path d="M134 86 q8 30 -2 58 q14 -26 8 -56z" fill="#3A2E63" />
      {/* face */}
      <circle cx="98" cy="92" r="2.6" fill="#2B2350" />
      <circle cx="116" cy="92" r="2.6" fill="#2B2350" />
      <path d="M100 102 q6 5 12 0" stroke="#2B2350" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="92" cy="100" r="4" fill="#F2A6B0" opacity="0.6" />
    </svg>
  )
}
