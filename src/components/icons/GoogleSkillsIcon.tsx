import type { SVGProps } from "react";

export default function GoogleSkillsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2.75a9.25 9.25 0 1 0 0 18.5 9.25 9.25 0 0 0 0-18.5Z"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      <path d="M12 3.6a8.4 8.4 0 0 1 5.94 2.46l-2.26 2.26A5.2 5.2 0 0 0 12 6.8" stroke="#EA4335" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M18.34 6.06A8.4 8.4 0 0 1 20.4 12h-3.2a5.2 5.2 0 0 0-1.52-3.68" stroke="#4285F4" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20.4 12a8.4 8.4 0 0 1-2.46 5.94l-2.26-2.26A5.2 5.2 0 0 0 17.2 12" stroke="#34A853" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17.94 17.94A8.4 8.4 0 0 1 12 20.4v-3.2a5.2 5.2 0 0 0 3.68-1.52" stroke="#FBBC05" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M12 20.4A8.4 8.4 0 0 1 3.6 12h3.2A5.2 5.2 0 0 0 12 17.2"
        stroke="#4285F4"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
    </svg>
  );
}

