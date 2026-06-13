// Onboarding 2 — a woman stepping forward, small growth/coins motif.
export default function WomanStep() {
  return (
    <svg viewBox="0 0 240 260" width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="120" cy="120" r="92" fill="#fff" opacity="0.55" />

      {/* upward steps the woman climbs */}
      <g opacity="0.9">
        <rect x="150" y="196" width="56" height="40" rx="6" fill="#A99DF5" />
        <rect x="150" y="160" width="40" height="36" rx="6" fill="#8B7FF0" />
        <rect x="150" y="128" width="26" height="32" rx="6" fill="#6F61E8" />
      </g>

      {/* growth arrow */}
      <path d="M150 150 L172 122 L196 152" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M172 122 v-10 m0 0 l-7 7 m7 -7 l7 7" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* coins */}
      <g transform="translate(56 196)">
        <ellipse cx="0" cy="22" rx="22" ry="7" fill="#6F61E8" />
        <ellipse cx="0" cy="14" rx="22" ry="7" fill="#A99DF5" />
        <ellipse cx="0" cy="6" rx="22" ry="7" fill="#fff" />
        <text x="0" y="10" textAnchor="middle" fontSize="9" fontWeight="700" fill="#6F61E8">₮</text>
      </g>

      {/* body — striding forward */}
      <path d="M96 250 l-6 -52 l-14 30 l-16 -8 l24 -52 q6 -16 24 -14 q24 2 26 28 l6 68 z" fill="#6F61E8" />
      {/* forward arm reaching up */}
      <path d="M124 158 q22 -16 40 -8" stroke="#8B7FF0" strokeWidth="15" strokeLinecap="round" />

      {/* head */}
      <circle cx="118" cy="98" r="29" fill="#F4C9A8" />
      <path d="M89 98 q-2 -33 29 -36 q33 -2 32 33 q-10 -20 -28 -18 q-18 2 -22 20 q-6 -8 -11 1z" fill="#2B2350" />
      <path d="M88 98 q-6 26 4 44 q-16 -22 -10 -46z" fill="#2B2350" />
      <circle cx="124" cy="98" r="2.6" fill="#2B2350" />
      <circle cx="138" cy="98" r="2.6" fill="#2B2350" />
      <path d="M124 108 q7 5 13 -1" stroke="#2B2350" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="146" cy="104" r="4" fill="#F2A6B0" opacity="0.6" />
    </svg>
  )
}
