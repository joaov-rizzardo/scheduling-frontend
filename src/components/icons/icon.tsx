import { IconMapper } from "./icon-mapper";

interface IconProps {
  size: number | string;
  color?: string;
  className?: string;
  icon: keyof typeof IconMapper;
}

export function Icon({ color, size, className, icon }: IconProps) {
  const Component = IconMapper[icon];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color ?? undefined}
      className={className}
      viewBox="0 0 512 512"
    >
      <Component />
    </svg>
  );
}
