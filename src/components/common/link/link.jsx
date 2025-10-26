'use client';

import { useLink } from "@/lib/context/link-context";
import ClickSpark from "../animated-comps/click";

export default function TransitionLink({
  href,
  children,
  className = '',
  active = false, // 👈 new prop
}) {
  const { setLinkClicked, canClick } = useLink();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // 👇 if the link is active or clicks are disabled, prevent navigation
    if (active || !canClick) {
      console.log('Click prevented:', active ? 'active link' : 'not allowed');
      return;
    }

    setLinkClicked(href);
  };

  return (
    <a
      href={href}
      className={`${className} ${active
        ? 'opacity-70 cursor-default pointer-events-none' // 👈 disable pointer
        : !canClick
          ? 'opacity-50 cursor-not-allowed pointer-events-none'
          : 'cursor-pointer hover:opacity-80'
        }`}
      onClick={handleClick}
      style={{
        pointerEvents: active || !canClick ? 'none' : 'auto',
      }}
    >
      <ClickSpark
        sparkColor="#1C1C1E50"
        sparkSize={7}
        sparkRadius={14}
        sparkCount={7}
        duration={400}
      >
        {children}
      </ClickSpark>
    </a>
  );
}
