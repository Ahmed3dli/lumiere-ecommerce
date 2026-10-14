import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  isLoading = false,
  className = '',
  ...props
}) => {
  let baseStyles = 'px-6 py-3 font-semibold rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      // Primary button: Richer accent or dark text on light background
      variantStyles = 'bg-text-dark text-brand-bg hover:bg-[#3e3e3e] shadow-soft focus:ring-brand-accent/50';
      break;
    case 'secondary':
      // Secondary button: Outline or subtle accent background
      variantStyles = 'bg-white text-text-dark border border-brand-accent hover:bg-brand-bg hover:text-text-dark shadow-soft focus:ring-brand-accent/50';
      break;
    case 'outline':
      // Outline button for subtle actions
      variantStyles = 'bg-transparent text-text-dark border border-text-light hover:bg-brand-bg hover:text-text-dark shadow-soft focus:ring-brand-accent/50';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;