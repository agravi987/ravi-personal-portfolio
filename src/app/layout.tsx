import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter or keep Geist
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ravi Agrahari | Full-Stack Cloud Developer",
  description:
    "Professional portfolio for Ravi Agrahari, a full-stack developer focused on Next.js, MERN, cloud-ready deployments, APIs, and DevOps-minded product delivery.",
};

/**
 * Root Layout
 * Defines the global structure of the application.
 * Includes fonts, metadata, and the ThemeProvider for dark mode support.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
