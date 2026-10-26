import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "small" | "medium" | "large";

type CommonProps = {
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
  readonly children?: ReactNode;
};

type LinkButtonProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    readonly href: string;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    readonly href?: undefined;
  };

const baseStyles = `
  relative inline-flex select-none items-center justify-center gap-2
  rounded-xl font-medium tracking-[-0.01em] whitespace-nowrap
  transition-colors duration-300 ease-premium
  hover:cursor-pointer
  disabled:pointer-events-none disabled:opacity-50
`;

const variantStyles: Record<Variant, string> = {
  primary: `
    bg-primary-500 text-white
    shadow-[inset_0_1px_0_0_rgb(255_255_255/0.18)]
    hover:bg-primary-700
  `,
  secondary: `
    bg-primary-100/70 text-primary-600
    hover:bg-primary-200/80 hover:text-primary-700
  `,
  ghost: `
    bg-white/10 text-white
    hover:bg-white/20
  `,
  accent: `
    bg-gold-400 text-primary-900
    shadow-[inset_0_1px_0_0_rgb(255_255_255/0.4)]
    hover:bg-gold-500
  `,
};

const sizeStyles: Record<Size, string> = {
  small: "h-11 px-6 text-[0.9375rem]",
  medium: "h-12 px-7 text-base",
  large: "h-14 px-9 text-lg",
};

function Button(props: LinkButtonProps | NativeButtonProps) {
  const {
    variant = "primary",
    size = "medium",
    className = "",
    children,
    ...rest
  } = props;

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (rest.href !== undefined) {
    return (
      <Link
        className={classes}
        {...(rest as Omit<LinkButtonProps, keyof CommonProps>)}
      >
        <span className="flex items-center justify-center gap-2">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as Omit<NativeButtonProps, keyof CommonProps>)}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}

export default Button;
