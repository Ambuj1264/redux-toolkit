import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { ThemeProvider } from "../components/ThemeSwither"; // Import ThemeProvider
const inter = Inter({ subsets: ["latin"] });
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  currency: "USD",
  intent: "capture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
