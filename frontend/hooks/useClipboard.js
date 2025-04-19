import { useState } from "react";

const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setIsCopied(false);
    }
  };

  return {
    isCopied,
    copyToClipboard,
  };
};

export default useClipboard;
