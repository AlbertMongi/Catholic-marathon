
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  variant = 'light',
  hoverEffect = true
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variant === 'light' ? 'glass' : 'glass-dark',
        hoverEffect && 'hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
