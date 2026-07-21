import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { brandName, companyName, siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = "CBB60 CBB61 CBB65 CD60 Capacitor Manufacturer | Huayouxing";
  const description =
    `${brandName} brand CBB60, CBB61, CBB65 and CD60 capacitor series from ${companyName} for motors, pumps, HVAC, fans and appliance applications.`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    applicationName: "Huayouxing Capacitors",
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    category: "Manufacturing",
    keywords: [
      "CBB60 capacitor manufacturer",
      "CBB61 fan capacitor",
      "CBB65 HVAC capacitor",
      "CD60 motor start capacitor",
      "film capacitor manufacturer",
      "Huayouxing capacitor",
      "Hebei Shengjin Electronic Technology Co Ltd",
    ],
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/factory/favicon.svg",
      shortcut: "/factory/favicon.svg",
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Huayouxing Capacitors",
      locale: "en_US",
      images: [
        {
          url: `${siteUrl}/factory/og.png`,
          width: 1200,
          height: 630,
          alt: "Huayouxing capacitor product series",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/factory/og.png`],
    },
  };
}

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
        {children}
      </body>
    </html>
  );
}
