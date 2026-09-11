import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxDegree?: number; // Default: 5 degrees (restrained premium design)
  depth?: number;
  highlightColor?: string;
  disabled?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxDegree = 5,
  depth = 20,
  disabled = false,
}) => {
  const isReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxDegree, -maxDegree]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxDegree, maxDegree]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isReducedMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 transition-all duration-300 ${className}`}
    >
      <div
        style={{
          transform: `translateZ(${depth}px)`,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};
