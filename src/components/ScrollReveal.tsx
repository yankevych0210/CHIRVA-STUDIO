import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  className?: string;
  threshold?: number;
}

// Global scroll velocity tracker so all ScrollReveal instances know if user is scrolling fast
let isFastScrolling = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
let lastScrollTime = Date.now();

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      const now = Date.now();
      const deltaY = Math.abs(window.scrollY - lastScrollY);
      const deltaTime = Math.max(now - lastScrollTime, 1);
      const speed = deltaY / deltaTime; // pixels per ms

      // If scrolling faster than 0.7px/ms (~700px/s), treat as fast scroll
      if (speed > 0.7) {
        isFastScrolling = true;
      }

      lastScrollY = window.scrollY;
      lastScrollTime = now;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isFastScrolling = false;
      }, 120);
    },
    { passive: true }
  );
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 420,
  className = '',
  threshold = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [enteredAlreadyInView, setEnteredAlreadyInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Only reveal elements that are truly visible in the viewport on initial page load
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40 && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    // Trigger right when element enters the bottom of the viewport
    // (-10px mobile, -25px desktop) so the user clearly sees the graceful reveal animation!
    const isMobileView = window.innerWidth < 768;
    const rootMargin = isMobileView ? '0px 0px -10px 0px' : '0px 0px -25px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isFastScrolling) {
            setEnteredAlreadyInView(true);
          }
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.04,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const isFast = enteredAlreadyInView || isFastScrolling;

    // Fast scroll: zero delay so content never lags.
    // Slow / normal scroll: subtle elegant stagger (max 60ms on mobile, 120ms on desktop)
    const effectiveDelay = isFast
      ? 0
      : (isMobile ? Math.min(delay * 0.4, 60) : Math.min(delay, 120));

    // Fast scroll: snappy 180ms.
    // Slow / normal scroll: luxurious 440ms (mobile) to 520ms (desktop) for visible, silky motion
    const effectiveDuration = isFast
      ? 180
      : (isMobile ? Math.min(duration, 440) : Math.min(duration, 520));

    // Fast scroll: minimal 6px to avoid jitter.
    // Slow / normal scroll: distinct, elegant lift (18px mobile, 26px desktop)
    const translateYDistance = isFast
      ? '6px'
      : (isMobile ? '18px' : '26px');

    const baseStyle: React.CSSProperties = {
      transitionProperty: 'transform, opacity',
      transitionDuration: `${effectiveDuration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      transitionDelay: `${effectiveDelay}ms`,
      willChange: isVisible ? 'auto' : 'transform, opacity',
    };

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return {
            ...baseStyle,
            opacity: 0,
            transform: `translateY(${translateYDistance})`,
          };
        case 'scale-up':
          return {
            ...baseStyle,
            opacity: 0,
            transform: `scale(0.98) translateY(${translateYDistance})`,
          };
        case 'slide-right':
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(-16px)',
          };
        case 'slide-left':
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(16px)',
          };
        case 'fade-in':
        default:
          return {
            ...baseStyle,
            opacity: 0,
          };
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: 'none',
    };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
};

