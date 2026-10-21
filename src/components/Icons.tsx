import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, strokeWidth = 2, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Icon>
);

export const ArrowUp = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </Icon>
);

export const Instagram = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

export const Languages = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </Icon>
);

export const Close = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

export function FlagUS() {
  return (
    <svg viewBox="0 0 38 26" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="38" height="26" fill="#B22234" />
      {[1, 3, 5, 7, 9, 11].map((row) => (
        <rect key={row} y={row * 2} width="38" height="2" fill="#fff" />
      ))}
      <rect width="17" height="14" fill="#3C3B6E" />
    </svg>
  );
}

export function FlagBR() {
  return (
    <svg viewBox="0 0 38 26" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="38" height="26" fill="#009B3A" />
      <path d="M19 3 L35 13 L19 23 L3 13 Z" fill="#FEDF00" />
      <circle cx="19" cy="13" r="5.6" fill="#002776" />
    </svg>
  );
}
