import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "soft";
  type?: "button" | "submit";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  type = "button",
  className = "",
}: ButtonProps) {
  const classes = `ui-button ui-button--${variant} ${className}`;

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type}>
      {children}
    </button>
  );
}
