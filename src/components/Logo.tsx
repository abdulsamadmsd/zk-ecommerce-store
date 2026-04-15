export default function Logo() {
  return (
    <svg
      viewBox="0 0 145 35" // keep this
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px] h-auto" // 👈 responsive
    >
      {/* Background */}
      <rect width="145" height="35" rx="8" fill="#0F172A" />

      {/* Z */}
      <text
        x="12"
        y="28"
        fontSize="26"
        fontWeight="800"
        fontFamily="Inter, Arial"
        fill="#FFFFFF"
      >
        Z
      </text>

      {/* K */}
      <text
        x="30"
        y="28"
        fontSize="26"
        fontWeight="800"
        fontFamily="Inter, Arial"
        fill="#FACC15"
      >
        K
      </text>

      {/* Dot */}
      <circle cx="50" cy="20" r="3" fill="#FACC15" />

      {/* STORE */}
      <text
        x="60"
        y="26"
        fontSize="15"
        fontWeight="700"
        fontFamily="Inter, Arial"
        fill="#94A3B8"
        letterSpacing="1.5"
      >
        STORE
      </text>
    </svg>
  );
}
