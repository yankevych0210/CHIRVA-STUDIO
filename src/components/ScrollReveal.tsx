import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.08,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile viewport and check reduced motion preference
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // If element is already in the viewport on mount, reveal immediately
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 50 && rect.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    // On mobile, trigger earlier (positive rootMargin) so content reveals smoothly
    // before the user's scroll inertia hits empty space.
    const mobileMargin = '0px 0px 80px 0px';
    const desktopMargin = '0px 0px -30px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: window.innerWidth < 768 ? 0.02 : threshold,
        rootMargin: window.innerWidth < 768 ? mobileMargin : desktopMargin,
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  const getAnimationStyles = (): React.CSSProperties => {
    // On mobile: clamp delays so vertically stacked items don't leave empty blank boxes
    const effectiveDelay = isMobile ? Math.min(delay, 80) : delay;
    // On mobile: faster, crisper duration (450ms max) for responsive touch feel
    const effectiveDuration = isMobile ? Math.min(duration, 480) : duration;
    // On mobile: softer transform distance to prevent judder
    const translateYDistance = isMobile ? '16px' : '32px';

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
            transform: isMobile
              ? 'scale(0.98) translateY(12px)'
              : 'scale(0.96) translateY(20px)',
          };
        case 'slide-right':
          // On mobile, avoid horizontal offsets (prevents horizontal scroll jitter)
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(-32px)',
          };
        case 'slide-left':
          return {
            ...baseStyle,
            opacity: 0,
            transform: isMobile ? `translateY(${translateYDistance})` : 'translateX(32px)',
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

