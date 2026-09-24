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

    // Generous advance detection: if element is within initial screen + 300px, reveal immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300 && rect.bottom >= -150) {
      setIsVisible(true);
      return;
    }

    // 400px advance margin so animations start well before element scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If already inside the visible viewport (e.g. fast swipe landed directly on it)
          // or user is scrolling fast, drop delay to 0 for instant reveal
          if (entry.boundingClientRect.top < window.innerHeight || isFastScrolling) {
            setEnteredAlreadyInView(true);
          }
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0,
        rootMargin: '200px 0px 400px 0px',
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

    // Eliminate artificial delays on mobile or during fast scroll so blocks NEVER hang empty
    const effectiveDelay = (isMobile || enteredAlreadyInView || isFastScrolling)
      ? 0
      : Math.min(delay, 80);

    // Faster, crisper duration when scrolling fast
    const effectiveDuration = enteredAlreadyInView || isFastScrolling
      ? 240
      : (isMobile ? Math.min(duration, 300) : Math.min(duration, 380));

    // Subtle distance (8px on mobile / fast scroll, 14px default) to prevent jarring pops
    const translateYDistance = (isMobile || enteredAlreadyInView || isFastScrolling)
      ? '8px'
      : '14px';

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

