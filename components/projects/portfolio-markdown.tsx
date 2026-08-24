"use client";

import React, { useEffect, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { gsap } from "gsap";
import { Highlighter } from "@/components/ui/marker";
import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { cn } from "@/lib/utils";

const REVEAL_DURATION = 1.5;

function OpacityShell({
  children,
  delay,
  duration = REVEAL_DURATION,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  delay: number;
  duration?: number;
  className?: string;
  as?: "span" | "div" | "li";
}) {
  const wrapRef = useRef<HTMLSpanElement & HTMLDivElement & HTMLLIElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, delay, duration, ease: "power3.inOut" },
    );

    return () => {
      tween.kill();
    };
  }, [delay, duration]);

  return (
    <Tag
      ref={wrapRef}
      className={cn(
        "opacity-0",
        className,
        Tag === "span" && "inline-block",
      )}
    >
      {children}
    </Tag>
  );
}

function BlockReveal({
  children,
  delay,
  className,
  textColor = "var(--body)",
  shellClassName,
  as = "span",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  textColor?: string;
  shellClassName?: string;
  as?: "span" | "div";
}) {
  return (
    <OpacityShell as={as} delay={delay} className={shellClassName}>
      <DiaTextReveal
        delay={delay}
        duration={REVEAL_DURATION}
        textColor={textColor}
        className={className}
      >
        {children}
      </DiaTextReveal>
    </OpacityShell>
  );
}

function unwrapListChild(children: React.ReactNode) {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "p") {
      const paragraph = child as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return paragraph.props.children;
    }
    return child;
  });
}

const linkComponent: Components["a"] = ({ href, children }) => {
  const label = String(children);

  if (href?.includes("crates.io")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline text-(--body)"
      >
        <Highlighter
          action="underline"
          color="#cfe8cf"
          strokeWidth={2}
          delay={900}
          padding={4}
        >
          {label}
        </Highlighter>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
    >
      {children}
    </a>
  );
};

const CODE_BLOCK_SHELL =
  "code-block-scroll rounded border border-(--accent)/10 bg-(--body)/5";

function CodeBlock({
  text,
  delay,
}: {
  text: string;
  delay?: number;
}) {
  const content = (
    <pre className="font-mono text-[11px] leading-[1.35] text-(--body)">
      <code>{text}</code>
    </pre>
  );

  if (delay == null) {
    return <div className={CODE_BLOCK_SHELL}>{content}</div>;
  }

  return (
    <OpacityShell as="div" delay={delay} className={`min-w-0 max-w-full ${CODE_BLOCK_SHELL}`}>
      {content}
    </OpacityShell>
  );
}

const staticMarkdownComponents: Components = {
  pre: ({ children }) => <>{children}</>,
  code: ({ className, children, ...props }) => {
    const text = String(children);
    const isInline = !className && !text.includes("\n");

    if (isInline) {
      return (
        <code
          className="rounded bg-(--body)/5 px-1 text-[0.9em] font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    const blockText = text.replace(/\n$/, "");

    return <CodeBlock text={blockText} />;
  },
  a: linkComponent,
};

function createAnimatedMarkdownComponents(
  baseDelay: number,
  stagger: number,
): Components {
  let blockIndex = 0;
  const nextDelay = () => baseDelay + blockIndex++ * stagger;

  return {
    pre: ({ children }) => <>{children}</>,
    a: linkComponent,
    ul: ({ children }) => (
      <ul className="list-none space-y-1 pl-0">{children}</ul>
    ),
    h2: ({ children }) => {
      const delay = nextDelay();
      return (
        <h2 className="text-sm font-medium">
          <BlockReveal delay={delay} textColor="var(--title)">
            {children}
          </BlockReveal>
        </h2>
      );
    },
    h3: ({ children }) => {
      const delay = nextDelay();
      return (
        <h3 className="text-sm font-medium">
          <BlockReveal delay={delay} textColor="var(--title)">
            {children}
          </BlockReveal>
        </h3>
      );
    },
    p: ({ children }) => {
      const delay = nextDelay();
      return (
        <OpacityShell as="div" delay={delay}>
          <p className="text-(--body) leading-relaxed">
            <DiaTextReveal
              delay={delay}
              duration={REVEAL_DURATION}
              textColor="var(--body)"
            >
              {children}
            </DiaTextReveal>
          </p>
        </OpacityShell>
      );
    },
    li: ({ children }) => {
      const delay = nextDelay();
      return (
        <li>
          <OpacityShell
            delay={delay}
            className="flex items-start gap-2 text-(--body)"
          >
            <span className="mt-[0.35em] shrink-0 text-[0.55em] opacity-40">
              ●
            </span>
            <DiaTextReveal
              delay={delay}
              duration={REVEAL_DURATION}
              textColor="var(--body)"
              className="min-w-0 flex-1"
            >
              {unwrapListChild(children)}
            </DiaTextReveal>
          </OpacityShell>
        </li>
      );
    },
    code: ({ className, children }) => {
      const text = String(children);
      const isInline = !className && !text.includes("\n");

      if (isInline) {
        return (
          <code className="rounded bg-(--body)/5 px-1 text-[0.9em] font-mono">
            {children}
          </code>
        );
      }

      const blockText = text.replace(/\n$/, "");
      const delay = nextDelay();

      return <CodeBlock text={blockText} delay={delay} />;
    },
  };
}

interface PortfolioMarkdownProps {
  content: string;
  animate?: boolean;
  baseDelay?: number;
  stagger?: number;
}

export function PortfolioMarkdown({
  content,
  animate = false,
  baseDelay = 0.6,
  stagger = 0.12,
}: PortfolioMarkdownProps) {
  const components = useMemo(
    () =>
      animate
        ? createAnimatedMarkdownComponents(baseDelay, stagger)
        : staticMarkdownComponents,
    [animate, baseDelay, stagger, content],
  );

  return (
    <div className="markdown-content w-full min-w-0 max-w-full space-y-4 text-left [&_h2]:text-sm [&_h2]:font-medium [&_h3]:text-sm [&_h3]:font-medium [&_p]:text-(--body) [&_p]:leading-relaxed [&_li]:text-(--body)">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
