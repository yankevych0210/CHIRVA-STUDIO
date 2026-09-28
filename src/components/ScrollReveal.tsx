import React, { useEffect, useRef } from 'react';

type RevealAnimation = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  /** Stagger delay in ms (all widths). Use the column index of a grid, not the item index. */
  delay?: number;
  /** Stagger delay from 1024px up, when the grid has a different number of columns. */
  delayLg?: number;
  /**
   * Play the entrance with a pure CSS animation on first paint instead of on scroll.
   * For above-the-fold content (hero): no dependency on JS, so the first screen
   * is never blank while the bundle loads.
   */
  onLoad?: boolean;
  className?: string;
}

// ─── Shared engine for every ScrollReveal on the page ───────────────────────
// Two IntersectionObservers + one scroll listener for the whole page. Visibility
// is toggled with classes directly on the DOM node, so revealing never
// re-renders React. Timings live in index.css (.reveal).
//
// Every block animates when it scrolls into view — speed only changes *when*
// the animation starts and how long it takes:
//
//  • Calm scroll: starts once the block is 50px (mobile) / 80px (desktop)
//    inside the screen — the full, slow rise plays right in the user's view.
//  • Swipe / fast scroll: starts earlier, as the block reaches the screen
//    edge, with a shorter rise — the block enters already moving, so the
//    motion is still visible but it never leaves an empty gap behind the finger.
//  • Skipped by an anchor jump (the only case without motion): blocks left
//    above the viewport are shown as-is, so scrolling back up never plays
//    an animation backwards.

type RevealMode = 'animate' | 'quick' | 'instant';

const VISIBLE = 'is-visible';
const QUICK_CLASS = 'reveal-quick';
const INSTANT_CLASS = 'reveal-instant';
const CALM_SPEED = 0.8; // px per ms — up to ~800px/s counts as calm, unhurried scrolling

const pending = new Set<HTMLElement>();
let viewObserver: IntersectionObserver | null = null;
let edgeObserver: IntersectionObserver | null = null;
let velocity = 0; // smoothed scroll speed, px/ms

const isCalm = () => velocity <= CALM_SPEED;
const speedMode = (): RevealMode => (isCalm() ? 'animate' : 'quick');

function show(el: HTMLElement, mode: RevealMode) {
  if (!pending.delete(el)) return;
  viewObserver?.unobserve(el);
  edgeObserver?.unobserve(el);
  if (mode === 'quick') el.classList.add(QUICK_CLASS);
  if (mode === 'instant') el.classList.add(INSTANT_CLASS);
  el.classList.add(VISIBLE);
}

/** Reveal (without motion) everything the user has already scrolled past. */
function flushPassed() {
  for (const el of pending) {
    if (el.getBoundingClientRect().bottom <= 0) show(el, 'instant');
  }
}

function init() {
  let lastY = window.scrollY;
  let lastTime = performance.now();
  let idleTimer: ReturnType<typeof setTimeout> | undefined;

  window.addEventListener(
    'scroll',
    () => {
      const now = performance.now();
      const dt = now - lastTime;
      // Scroll events fire once per frame while scrolling, so the first event after
      // a pause covers ~1 frame of movement, not the whole pause: clamp dt, so a
      // swipe is recognised on its very first frame.
      const speed = Math.abs(window.scrollY - lastY) / Math.min(Math.max(dt, 1), 34);
      velocity = dt > 150 ? speed : velocity * 0.6 + speed * 0.4;
      lastY = window.scrollY;
      lastTime = now;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        velocity = 0;
        flushPassed();
      }, 150);
    },
    { passive: true }
  );

  const isMobileView = window.matchMedia('(max-width: 767px)').matches;

  // Calm trigger — a little inside the screen
  viewObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) show(el, speedMode());
        else if (entry.boundingClientRect.bottom <= 0) show(el, 'instant');
      }
    },
    { threshold: 0.08, rootMargin: isMobileView ? '0px 0px -50px 0px' : '0px 0px -80px 0px' }
  );

  // Fast trigger — right at the screen edge, only while scrolling briskly
  edgeObserver = new IntersectionObserver(
    (entries) => {
      if (isCalm()) return;
      for (const entry of entries) {
        if (entry.isIntersecting) show(entry.target as HTMLElement, speedMode());
      }
    },
    { threshold: 0, rootMargin: '12% 0px 12% 0px' }
  );
}

function register(node: HTMLElement): () => void {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    node.classList.add(VISIBLE);
    return () => {};
  }
  if (!viewObserver) init();

  pending.add(node);
  const rect = node.getBoundingClientRect();

  // Page opened / restored mid-way: what's above is shown as-is
  if (rect.bottom <= 0) {
    show(node, 'instant');
    return () => {};
  }

  // Already on screen at mount (e.g. a freshly filtered portfolio card):
  // play the entrance on the next frame so the transition actually runs
  if (rect.top < window.innerHeight - 80) {
    const frame = requestAnimationFrame(() => show(node, 'animate'));
    return () => {
      cancelAnimationFrame(frame);
      pending.delete(node);
    };
  }

  viewObserver!.observe(node);
  edgeObserver!.observe(node);
  return () => {
    pending.delete(node);
    viewObserver?.unobserve(node);
    edgeObserver?.unobserve(node);
  };
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  delayLg,
  onLoad = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || onLoad) return;
    return register(node);
  }, [onLoad]);

  const style = {
    '--reveal-delay': `${delay}ms`,
    ...(delayLg !== undefined && { '--reveal-delay-lg': `${delayLg}ms` }),
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal={animation}
      className={`${onLoad ? 'reveal-onload' : 'reveal'} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
