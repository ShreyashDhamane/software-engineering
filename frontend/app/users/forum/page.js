"use client";
import Forums from "@/components/organisms/Forum/Forum";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { useEffect } from "react";

export default function ForumPage() {
  const { initializeConnection, connectionStatus } = useWebSocket();
  const checkAndConnect = () => {
    try {
      const userData = localStorage.getItem("user");

      if (userData) {
        const userId = JSON.parse(userData).id;

        // Only initialize if not already connected
        if (connectionStatus !== "connected") {
          initializeConnection(userId);
        }
      }
    } catch (error) {
      console.error("Connection initialization error:", error);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined") return; // Server-side guard

    checkAndConnect();
  }, []);

  return <Forums />;
}
