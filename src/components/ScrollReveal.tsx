import React, { useEffect, useRef } from 'react';

type RevealAnimation = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // stagger delay in ms (capped in CSS: 80ms mobile, 140ms desktop)
  className?: string;
}

// ─── Shared state for every ScrollReveal instance ───────────────────────────
// One IntersectionObserver + one scroll listener for the whole page instead of
// one per element. Visibility is toggled with a class directly on the DOM node,
// so revealing never re-renders React. Timings live in index.css (.reveal).

const VISIBLE = 'is-visible';
const INSTANT = 'reveal-instant';
const FAST_SCROLL_SPEED = 0.7; // px per ms (~700px/s)

let observer: IntersectionObserver | null = null;
let isFastScrolling = false;

function trackScrollVelocity() {
  let lastY = window.scrollY;
  let lastTime = performance.now();
  let settleTimer: ReturnType<typeof setTimeout> | undefined;

  window.addEventListener(
    'scroll',
    () => {
      const now = performance.now();
      const speed = Math.abs(window.scrollY - lastY) / Math.max(now - lastTime, 1);
      if (speed > FAST_SCROLL_SPEED) isFastScrolling = true;
      lastY = window.scrollY;
      lastTime = now;

      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        isFastScrolling = false;
      }, 120);
    },
    { passive: true }
  );
}

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  trackScrollVelocity();

  // Trigger when the element is ~50px (mobile) / ~80px (desktop) inside the
  // screen, so the motion happens right in the user's field of view.
  const isMobileView = window.matchMedia('(max-width: 767px)').matches;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        if (isFastScrolling) el.classList.add(INSTANT);
        el.classList.add(VISIBLE);
        io.unobserve(el);
      }
    },
    {
      threshold: 0.08,
      rootMargin: isMobileView ? '0px 0px -50px 0px' : '0px 0px -80px 0px',
    }
  );
  observer = io;
  return io;
}

function reveal(node: HTMLElement): (() => void) | undefined {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    node.classList.add(VISIBLE);
    return;
  }

  // Already on screen at mount (e.g. hero): play the entrance on the next frame
  const rect = node.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80 && rect.bottom >= 0) {
    const frame = requestAnimationFrame(() => node.classList.add(VISIBLE));
    return () => cancelAnimationFrame(frame);
  }

  const io = getObserver();
  io.observe(node);
  return () => io.unobserve(node);
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return reveal(node);
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={animation}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
