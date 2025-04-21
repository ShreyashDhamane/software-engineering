const buttonStyles = {
  blue: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 active:bg-blue-800",
  red: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 active:bg-red-800",
};

export default function CommentButton({ children, theme = "blue", ...props }) {
  return (
    <button
      className={cn(
        `px-3 py-1 mr-4 rounded-full  text-white font-semibold text-md focus:outline-none focus:ring`,
        buttonStyles[theme]
      )}
      {...props}
    >
      {children}
    </button>
  );
}
