import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { ConsentProvider } from "@/components/Consent";
import { EstimateProvider } from "@/components/Estimate";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-barlow", display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-source", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Kitchen and Bath Remodeling NYC | ${site.name}`, template: `%s | ${site.name}` },
  description: "Kitchen and bathroom remodeling in New York City. Free in-home estimates.",
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  // PLACEHOLDER: remove once the real domain is live and content is confirmed.
  robots: process.env.NEXT_PUBLIC_SITE_URL ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f6f2eb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${source.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables the section-header reveal only when JS runs, so content never stays hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div id="top-sentinel" aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20" />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-plaster">
          Skip to content
        </a>
        <ConsentProvider>
          <EstimateProvider>
            <Header />
            <main id="main" style={{ paddingTop: "var(--header-h)" }}>
              {children}
            </main>
            <Footer />
          </EstimateProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
