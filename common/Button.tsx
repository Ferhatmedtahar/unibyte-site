function Button({
  variant = "primary",
  size = "medium",
  children,
  ...props
}: {
  readonly variant?: "primary" | "secondary" | "ghost";
  readonly size?: "small" | "medium" | "large";
  readonly children?: React.ReactNode;
  [key: string]: any;
}) {
  const baseStyles =
    "font-semibold rounded-lg transition-all duration-300 transform hover:cursor-pointer";

  const variantStyles = {
    primary:
      "border border-primary-700 bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg hover:from-primary-600 hover:to-primary-500 hover:shadow-xl group relative",
    secondary:
      "border-2 border-primary-600 text-primary-600 shadow-md hover:bg-primary-500 hover:text-white hover:shadow-lg",
    ghost:
      "border border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-8 py-3",
    large: "px-10 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <span className={variant === "primary" ? "relative z-10" : ""}>
        {children}
      </span>
    </button>
  );
}

export default Button;
