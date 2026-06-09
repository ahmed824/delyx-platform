import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Card({ children, className = "", style }: CardProps) {
  return <section className={`dash-card ${className}`} style={style}>{children}</section>;
}
