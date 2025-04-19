// components/NotificationTest.jsx
"use client";
import { useEffect } from "react";
import useEnableNotification from "./useEnableNotification";

export default function NotificationTest() {
  const { token, lastMessage, getToken, copyToClipboard, setLastMessage } =
    useEnableNotification();
  useEffect(() => {
    // Set up foreground listener
    const unsubscribe = setupForegroundListener((payload) => {
      setLastMessage(payload);
    });

    getToken();

    return () => {
      // Clean up the foreground listener when component unmounts, if unsubscribe is defined and is a function
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-lg font-bold">Notification Test</h2>

      <div>
        <p className="font-semibold">FCM Token:</p>
        {token ? (
          <div className="bg-gray-100 p-2 rounded break-all text-sm">
            {token}
            <button
              onClick={() => copyToClipboard(token)}
              className="ml-2 text-blue-500"
            >
              Copy
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading token...</p>
        )}
      </div>

      <div>
        <p className="font-semibold">Last Foreground Message:</p>
        {lastMessage ? (
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {JSON.stringify(lastMessage, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500">No messages received yet</p>
        )}
      </div>
    </div>
  );
}
