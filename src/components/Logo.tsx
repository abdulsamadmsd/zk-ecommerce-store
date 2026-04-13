export default function Logo() {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="40" rx="8" fill="#0F172A" />
      <text x="10" y="28" fontSize="26" fontWeight="800" fontFamily="Inter, Arial" fill="#FFFFFF">
        Z
      </text>
      <text x="28" y="28" fontSize="26" fontWeight="800" fontFamily="Inter, Arial" fill="#FACC15">
        K
      </text>
      <text x="70" y="27" fontSize="16" fontWeight="700" fontFamily="Inter, Arial" fill="#94A3B8" letterSpacing="2">
        STORE
      </text>
      <circle cx="60" cy="20" r="3" fill="#FACC15" />
    </svg>
  );
}