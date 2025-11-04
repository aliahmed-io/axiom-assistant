import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Axion Assistant — by Ali Ahmed",
  description:
    "Axion Assistant helps you capture, organize, and retrieve your ideas with clarity.",
  authors: [{ name: "Ali Ahmed" }],
  openGraph: {
    title: "Axion Assistant",
    description:
      "Capture, organize, and retrieve your ideas with clarity.",
  },
  twitter: {
    title: "Axion Assistant",
    description:
      "Capture, organize, and retrieve your ideas with clarity.",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
          signInFallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
        >
          <div className="mx-auto max-w-6xl h-screen">
            <Header />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
