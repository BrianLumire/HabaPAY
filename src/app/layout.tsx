import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Ensure this is imported
import { ThemeProvider } from "@/components/theme-provider";

// Import Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSans =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap";

export const metadata: Metadata = {
  title: "Haba App",
  description: "Haba App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href={ibmPlexSans} rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
        {/* Global Toast Container */}
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="custom-toast" /* Custom class for toasts */
          progressClassName="Toastify__progress-bar" /* Custom class for progress bar */
          className="Toastify__toast-icon" /* Custom class for tick icon */
        />
      </body>
    </html>
  );
}