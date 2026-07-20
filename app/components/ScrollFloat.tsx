"use client";

import { useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ScrollFloat.module.css";

gsap.registerPlugin(ScrollTrigger);

type ScrollFloatProps = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  as?: "h1" | "h2";
  playOnLoad?: boolean;
};

export default function ScrollFloat({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
  as: Heading = "h2",
  playOnLoad = false,
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const text = typeof children === "string" ? children : "";
  const splitText = useMemo(
    () =>
      text.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) {
          return (
            <span className={styles.space} key={`space-${partIndex}`}>
              {" "}
            </span>
          );
        }

        return (
          <span className={styles.word} key={`word-${partIndex}`}>
            {Array.from(part).map((char, charIndex) => (
              <span className={styles.char} key={`${char}-${partIndex}-${charIndex}`}>
                {char}
              </span>
            ))}
          </span>
        );
      }),
    [text],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !text || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scroller = scrollContainerRef?.current ?? window;
    const context = gsap.context(() => {
      const characters = element.querySelectorAll(`.${styles.char}`);

      const from = {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: "50% 0%",
      };
      const to = {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
      };

      if (playOnLoad) {
        gsap.fromTo(characters, from, to);
        return;
      }

      gsap.fromTo(characters, from, {
        ...to,
        scrollTrigger: {
          trigger: element,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, element);

    return () => context.revert();
  }, [animationDuration, ease, playOnLoad, scrollContainerRef, scrollEnd, scrollStart, stagger, text]);

  if (!text) {
    return (
      <Heading className={`scroll-float ${styles.scrollFloat} ${containerClassName}`.trim()}>
        {children}
      </Heading>
    );
  }

  return (
    <Heading
      ref={containerRef}
      aria-label={text}
      className={`scroll-float ${styles.scrollFloat} ${containerClassName}`.trim()}
    >
      <span className={styles.srOnly}>{text}</span>
      <span
        aria-hidden="true"
        className={`scroll-float-text ${styles.scrollFloatText} ${textClassName}`.trim()}
      >
        {splitText}
      </span>
    </Heading>
  );
}
