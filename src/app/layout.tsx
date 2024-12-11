import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

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
        <link href={ibmPlexSans} rel="stylesheet" /> {/* Add IBM Plex Sans font */}
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
          </body>
    </html>
  );
}
