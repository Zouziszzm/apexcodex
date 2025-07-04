"use client";
import { useTransition } from "./Transition";
export default function FLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { triggerRouteChange } = useTransition();
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        triggerRouteChange(href);
      }}
      className="cursor-pointer"
    >
      {children}
    </a>
  );
}
