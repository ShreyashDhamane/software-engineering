const Tooltip = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <span className="z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-4 px-2 py-1 bg-black text-white rounded text-sm transition-all duration-800">
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
