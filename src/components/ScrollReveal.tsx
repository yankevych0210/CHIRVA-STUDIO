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
//  • Slow / normal scroll: element animates once it is 50px (mobile) / 80px
//    (desktop) inside the screen, so the motion happens in the user's view.
//  • Fast scroll / flick: elements that will reach the screen within ~200ms
//    at the current speed are revealed instantly while still off-screen, so
//    they arrive ready — no blank gaps, no jumps. The look-ahead shrinks as a
//    momentum flick slows down, so its tail still plays the full animation.
//    Brisk scrolling (between reading pace and a flick): a quick fade in place,
//    no slide, so tall blocks never trail behind a still-moving page.
//    During a flick anything that reaches the view is shown at once — a fade
//    would just smear across the screen at that speed.
//  • Skipped by an anchor jump: anything left above the viewport is shown
//    without animation, so scrolling back up never plays motion backwards.

type RevealMode = 'animate' | 'fast' | 'instant';

const VISIBLE = 'is-visible';
const FAST_CLASS = 'reveal-fast';
const INSTANT_CLASS = 'reveal-instant';
const CALM_SPEED = 0.6; // px per ms — up to ~600px/s the full entrance animation plays
const FAST_SPEED = 1.2; // px per ms — above ~1200px/s (a flick) look-ahead pre-reveals
const LOOKAHEAD_MS = 200; // pre-reveal what will be on screen within this time

const pending = new Set<HTMLElement>();
let viewObserver: IntersectionObserver | null = null;
let velocity = 0; // smoothed scroll speed, px/ms
let direction = 1; // 1 = down, -1 = up

const isFast = () => velocity > FAST_SPEED;
const isCalm = () => velocity <= CALM_SPEED;

function show(el: HTMLElement, mode: RevealMode) {
  if (!pending.delete(el)) return;
  viewObserver?.unobserve(el);
  if (mode === 'fast') el.classList.add(FAST_CLASS);
  if (mode === 'instant') el.classList.add(INSTANT_CLASS);
  el.classList.add(VISIBLE);
}

/** During a flick: pre-reveal off-screen elements the scroll will reach within LOOKAHEAD_MS. */
function revealAhead() {
  const vh = window.innerHeight;
  const reach = velocity * LOOKAHEAD_MS;
  for (const el of pending) {
    const r = el.getBoundingClientRect();
    const distance = direction > 0 ? r.top - vh : -r.bottom; // gap to the viewport edge
    if (distance >= 0 && distance < reach) show(el, 'instant');
  }
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
  let aheadFrame = 0;

  window.addEventListener(
    'scroll',
    () => {
      const now = performance.now();
      const dt = now - lastTime;
      // Scroll events fire once per frame while scrolling, so the first event after
      // a pause covers ~1 frame of movement, not the whole pause: clamp dt, so a
      // flick is recognised on its very first frame.
      const speed = Math.abs(window.scrollY - lastY) / Math.min(Math.max(dt, 1), 34);
      velocity = dt > 150 ? speed : velocity * 0.6 + speed * 0.4;
      if (window.scrollY !== lastY) direction = window.scrollY > lastY ? 1 : -1;
      if (isFast() && !aheadFrame && pending.size) {
        aheadFrame = requestAnimationFrame(() => {
          aheadFrame = 0;
          revealAhead();
        });
      }
      lastY = window.scrollY;
      lastTime = now;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        velocity = 0;
        flushPassed();
      }, 120);
    },
    { passive: true }
  );

  const isMobileView = window.matchMedia('(max-width: 767px)').matches;

  viewObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) show(el, isCalm() ? 'animate' : isFast() ? 'instant' : 'fast');
        else if (entry.boundingClientRect.bottom <= 0) show(el, 'instant');
      }
    },
    { threshold: 0.08, rootMargin: isMobileView ? '0px 0px -50px 0px' : '0px 0px -80px 0px' }
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
  return () => {
    pending.delete(node);
    viewObserver?.unobserve(node);
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
