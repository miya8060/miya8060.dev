import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-3xl px-4 sm:px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
