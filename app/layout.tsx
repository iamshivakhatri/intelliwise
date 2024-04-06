import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";
import { GlobalContextProvider } from "@/context/global-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Intelliwise",
  description: "level up yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <GlobalContextProvider>   */}
      <body className={inter.className}>
      <ToastProvider/>
        {children}
      </body>
      {/* </GlobalContextProvider> */}
    </html>
  );
}
