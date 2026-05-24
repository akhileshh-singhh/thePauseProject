import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ece2",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thepauseproject.in"),
  title: {
    default: "The Pause Project | Creative workshops in Mumbai",
    template: "%s | The Pause Project",
  },
  description:
    "The Pause Project hosts painting, pottery, journaling, and mindfulness gatherings in Mumbai—a warm, editorial space for creative community and calm.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "The Pause Project",
    title: "The Pause Project",
    description:
      "Pause. Create. Feel. Creative workshops and community experiences in Mumbai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pause Project",
    description:
      "Creative workshops and community in Mumbai—warm, cinematic, human.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body className="min-h-full bg-tp-cream text-tp-charcoal">{children}</body>
    </html>
  );
}
