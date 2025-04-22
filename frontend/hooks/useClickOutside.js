import { useEffect } from "react";

const useClickOutside = (ref, handler, dependencies = []) => {
  const handleClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler(event);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler, ...dependencies]);
};

export default useClickOutside;
