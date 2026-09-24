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
    if (rect.top < window.innerHeight - 80 && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    // Golden balance trigger point:
    // When element is ~50px (mobile) or ~80px (desktop) inside the screen,
    // it triggers right in the user's field of view so the animation is clearly, beautifully visible!
    const isMobileView = window.innerWidth < 768;
    const rootMargin = isMobileView ? '0px 0px -50px 0px' : '0px 0px -80px 0px';

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
        threshold: 0.08,
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
    // Slow / normal scroll: subtle elegant stagger (max 80ms on mobile, 140ms on desktop)
    const effectiveDelay = isFast
      ? 0
      : (isMobile ? Math.min(delay * 0.5, 80) : Math.min(delay, 140));

    // Fast scroll: snappy 200ms.
    // Slow / normal scroll: rich 580ms (mobile) to 660ms (desktop) for clearly visible, silky motion
    const effectiveDuration = isFast
      ? 200
      : (isMobile ? Math.max(duration, 580) : Math.max(duration, 660));

    // Fast scroll: subtle 8px to prevent jitter.
    // Slow / normal scroll: clearly noticeable, graceful lift (32px mobile, 44px desktop)
    const translateYDistance = isFast
      ? '8px'
      : (isMobile ? '32px' : '44px');

    const baseStyle: React.CSSProperties = {
      transitionProperty: 'transform, opacity',
      transitionDuration: `${effectiveDuration}ms`,
      transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
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
            transform: isFast
              ? 'scale(0.98) translateY(8px)'
              : (isMobile ? 'scale(0.94) translateY(28px)' : 'scale(0.92) translateY(36px)'),
          };
        case 'slide-right':
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(-28px)',
          };
        case 'slide-left':
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(28px)',
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

