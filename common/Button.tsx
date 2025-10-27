import { twMerge } from "tailwind-merge"; // You already have this installed

function Button({
  variant = "primary",
  size = "medium",
  children,
  disabled = false,
  className = "", // Add className prop
  ...props
}: {
  readonly variant?: "primary" | "secondary" | "ghost";
  readonly size?: "small" | "medium" | "large";
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly className?: string; // Add to type
  [key: string]: any;
}) {
  const baseStyles = `
    relative font-semibold rounded-xl transition-all duration-300 transform 
    hover:cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-500/30
    active:scale-95 select-none overflow-hidden group
    disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-primary-300 via-primary-400 to-primary-600 
      text-white shadow-lg shadow-primary-600/25 
      hover:shadow-xl hover:shadow-primary-600/40 
      border border-primary-300/80
      before:absolute before:inset-0 before:bg-gradient-to-br 
      before:from-primary-400 before:via-primary-500 before:to-primary-600 
      before:opacity-0 before:transition-opacity before:duration-300 
      hover:before:opacity-100 before:rounded-xl
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm border-2 border-primary-500/60 
      text-primary-600 shadow-md shadow-primary-600/10 
      hover:bg-primary-500 hover:text-white hover:shadow-lg 
      hover:shadow-primary-600/30  
      hover:border-primary-400
      before:absolute before:inset-0 before:bg-gradient-to-br 
      before:from-primary-300 before:to-primary-500 
      before:opacity-0 before:transition-opacity before:duration-300 
      hover:before:opacity-100 before:rounded-xl
    `,
    ghost: `
      bg-white/5 backdrop-blur-sm border border-white/20 
      text-white font-medium 
      hover:bg-white hover:text-primary-700 hover:shadow-lg 
      hover:shadow-white/20 
      before:absolute before:inset-0 before:bg-white 
      before:opacity-0 before:transition-opacity before:duration-300 
      hover:before:opacity-100 
    `,
  };

  const sizeStyles = {
    small: "px-6 py-2.5 text-sm min-h-[40px]",
    medium: "px-8 py-3.5 text-base min-h-[48px]",
    large: "px-12 py-4.5 text-lg min-h-[56px]",
  };

  const shimmerStyles = `
    after:absolute after:inset-0 after:bg-gradient-to-r 
    after:from-transparent after:via-white/20 after:to-transparent 
    after:translate-x-[-100%] hover:after:translate-x-[100%] 
    after:transition-transform after:duration-700 after:ease-out
    ${variant === "ghost" ? "after:rounded-full" : "after:rounded-xl"}
  `;

  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        shimmerStyles,
        className // Merge the passed className last
      )}
      disabled={disabled}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-primary-300/30 to-primary-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

      {/* Glow effect for primary button */}
      {variant === "primary" && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-semibold tracking-wide">
        {children}
      </span>

      {/* Ripple effect container */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-white/10 scale-0 group-active:scale-100 transition-transform duration-150 origin-center rounded-xl"></div>
      </div>
    </button>
  );
}

export default Button;
