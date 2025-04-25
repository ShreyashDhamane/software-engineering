import "./globals.css";
import AuthProvider from "@/components/Auth/AuthProvider";
import { NotificationProvider } from "@/app/custom-components/ToastComponent/NotificationContext";
import ToastNotifications from "./custom-components/ToastComponent/ToastNotification";
import { Toaster } from "@/components/ui/sonner";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import FCMWrapper from "@/contexts/FCMWrapper";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@/components/atom/ErrorBoundary/ErrorBoundary";

export const metadata = {
  title: "Nightwalkers",
  description:
    "Nightwalkers is a community-driven safety app for navigating New York City",
  icons: {
    icon: "/owl-logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className={`antialiased bg-bglinkedin`}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <AuthProvider>
            <WebSocketProvider>
              <NotificationProvider>
                <ToastContainer />
                <ToastNotifications />
                <FCMWrapper />
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    className: "my-toast",
                    duration: 5000,
                  }}
                />
              </NotificationProvider>
            </WebSocketProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
