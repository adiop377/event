import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090D14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pridepatnamarathon.com"),
  title: "Patna Runs Together | Pride Patna Marathon - 7 Feb 2027",
  description:
    "Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon. Join 50,000+ runners at JP Ganga Path, Vending Zone on 7 Feb 2027. Every mile matters.",
  authors: [{ name: "Pride Patna Marathon" }],
  keywords: [
    "Patna Marathon",
    "Patna Runs Together",
    "Pride Patna Marathon",
    "Bihar Marathon 2027",
    "Half Marathon Patna",
    "Gandhi Maidan Marathon",
    "Running event Patna",
  ],
  openGraph: {
    title: "Patna Runs Together — Pride Patna Marathon",
    description:
      "Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon. Every mile matters.",
    url: "https://pridepatnamarathon.com/marathon",
    siteName: "Patna Runs Together",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/marathon-hero-athlete.jpg",
        width: 1920,
        height: 1080,
        alt: "Patna Runs Together Marathon Runner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patna Runs Together — Pride Patna Marathon",
    description: "Every mile matters.",
    images: ["/images/marathon-hero-athlete.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "Patna Runs Together",
  description:
    "Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.",
  startDate: "2027-02-07T05:00:00+05:30",
  endDate: "2027-02-07T12:00:00+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "JP Ganga Path, Vending Zone, Patna",
    address: {
      "@type": "PostalAddress",
      streetAddress: "JP Ganga Path, Vending Zone",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      postalCode: "800001",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Pride Patna Marathon",
    url: "https://pridepatnamarathon.com",
    email: "info@pridepatnamarathon.com",
    telephone: "+91 94310 88200",
  },
  offers: [
    {
      "@type": "Offer",
      name: "5K Fun Run",
      price: 499,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: "https://pridepatnamarathon.com/marathon#register",
    },
    {
      "@type": "Offer",
      name: "10K Challenge Run",
      price: 799,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: "https://pridepatnamarathon.com/marathon#register",
    },
    {
      "@type": "Offer",
      name: "21K Half Marathon",
      price: 1299,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      url: "https://pridepatnamarathon.com/marathon#register",
    },
  ],
  image: ["https://pridepatnamarathon.com/images/marathon-hero-athlete.jpg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pride-patna-marathon-logo-cropped.png" />
        <link rel="apple-touch-icon" href="/pride-patna-marathon-logo-cropped.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-ivory antialiased selection:bg-volt selection:text-black relative font-body">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
