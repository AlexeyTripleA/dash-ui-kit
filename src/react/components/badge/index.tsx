import React from 'react';

export interface BadgeProps {
  /**
   * Content of the badge
   */
  children: React.ReactNode;
  
  /**
   * Visual style variant
   */
  variant?: 'default' | 'flat' | 'solid' | 'bordered';
  
  /**
   * Color theme
   */
  color?: 'blue' | 'white' | 'gray' | 'light-gray' | 'turquoise' | 'red' | 'orange';
  
  /**
   * Size of the badge
   */
  size?: 'xxs' | 'sm' | 'xl';
  
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  color = 'blue',
  size = 'sm',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-colors';
  
  // Size classes
  const sizeClasses = {
    xxs: 'px-1 py-1 text-xs gap-2',
    sm: 'px-[35px] py-[10px] text-xs',
    xl: 'px-[35px] py-[15px] text-lg',
  };
  
  // Color and variant combination classes
  const getVariantClasses = () => {
    const colorMap = {
      blue: {
        default: 'text-[#4C7EFF]',
        flat: 'bg-[rgba(76,126,255,0.15)] text-[#4C7EFF]',
        solid: 'bg-[#4C7EFF] text-white',
        bordered: 'outline outline-1 outline-[#4C7EFF] text-[#4C7EFF]',
      },
      white: {
        default: 'text-white',
        flat: 'bg-[rgba(255,255,255,0.15)] text-white',
        solid: 'bg-white text-[#0C1C33]',
        bordered: 'outline outline-1 outline-white text-white',
      },
      gray: {
        default: 'text-[#0C1C33]',
        flat: 'bg-[rgba(12,28,51,0.15)] text-[#0C1C33]',
        solid: 'bg-[#0C1C33] text-white',
        bordered: 'outline outline-1 outline-[#0C1C33] text-[#0C1C33]',
      },
      'light-gray': {
        default: 'text-[#6B7280]',
        flat: 'bg-[#0C1C33]/5 text-[#0C1C33]',
        solid: 'bg-[#0C1C33]/15 text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#6B7280] text-[#6B7280]',
      },
      turquoise: {
        default: 'text-[#60F6D2]',
        flat: 'bg-[rgba(96,246,210,0.15)] text-[#60F6D2]',
        solid: 'bg-[#60F6D2] text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#60F6D2] text-[#60F6D2]',
      },
      red: {
        default: 'text-[#CD2E00]',
        flat: 'bg-[rgba(205,46,0,0.15)] text-[#CD2E00]',
        solid: 'bg-[#CD2E00] text-white',
        bordered: 'outline outline-1 outline-[#CD2E00] text-[#CD2E00]',
      },
      orange: {
        default: 'text-[#F98F12]',
        flat: 'bg-[rgba(249,143,18,0.15)] text-[#F98F12]',
        solid: 'bg-[#F98F12] text-white',
        bordered: 'outline outline-1 outline-[#F98F12] text-[#F98F12]',
      },
    };
    
    return colorMap[color][variant];
  };
  
  const classes = [
    baseClasses,
    sizeClasses[size],
    getVariantClasses(),
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
