import { cn } from "@/lib/utils";

const baseClass = `rounded-full text-white font-semibold focus:outline-none focus:ring-2`;
const sizeClasses = {
  sm: `px-2 py-1 text-sm`,
  md: `px-4 py-2 text-md`,
  lg: `px-6 py-3 text-lg`,
};
const themeClasses = {
  blue: `bg-blue-500 hover:bg-blue-700 focus:ring-blue-300 active:bg-blue-800`,
  red: `bg-red-500 hover:bg-red-700 focus:ring-red-300 active:bg-red-800`,
};

export default function CustomButton({
  children,
  theme = "blue",
  disabled = false,
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={cn(
        baseClass,
        themeClasses[theme],
        sizeClasses[size],
        className
      )}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
