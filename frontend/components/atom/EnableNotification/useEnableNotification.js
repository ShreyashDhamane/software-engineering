import { useState } from "react";
import { fetchToken } from "@/firebase";

const useEnableNotification = () => {
  const [token, setToken] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const { copyToClipboard } = useClipboard();

  // Get token automatically
  const getToken = async () => {
    const fcmToken = await fetchToken();

    setToken(fcmToken);
  };

  return {
    token,
    lastMessage,
    getToken,
    copyToClipboard,
    setLastMessage,
  };
};

export default useEnableNotification;
