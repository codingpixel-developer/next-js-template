import type { Metadata } from "next";
import { Kodchasan } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_shared/components/providers/ThemeProvider";
import { StoreProvider } from "@/app/_shared/components/providers/StoreProvider";

const kodchasan = Kodchasan({
  variable: "--font-kodchasan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SteelAngel",
    default: "SteelAngel — Ride Freely. They Know You're Safe.",
  },
  description:
    "SteelAngel is a smart motorcycle safety system that helps your loved ones know you're safe, every mile of the way.",
  keywords: ["motorcycle safety", "crash detection", "steelangel", "ride tracking", "family safety"],
  authors: [{ name: "SteelAngel" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "SteelAngel",
    description: "Smart motorcycle safety. Ride freely. They know you're safe.",
    siteName: "SteelAngel",
  },
  twitter: {
    card: "summary_large_image",
    title: "SteelAngel",
    description: "Smart motorcycle safety. Ride freely. They know you're safe.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${kodchasan.variable} antialiased min-h-screen`}>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
