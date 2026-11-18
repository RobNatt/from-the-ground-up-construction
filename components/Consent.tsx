"use client";

import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Consent gate for analytics.
 * Nothing analytics-related is requested until the visitor clicks "Accept":
 * the GA script tag is not rendered at all before that (no consent-mode pings either).
 * Choice is stored in localStorage; "Cookie settings" in the footer reopens the banner.
 *
 * Set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX) to enable Google Analytics after consent.
 */

type Choice = "granted" | "denied" | null;
const KEY = "ftgu-consent-v1";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const Ctx = createContext<{ choice: Choice; reopen: () => void }>({ choice: null, reopen: () => {} });
export const useConsent = () => useContext(Ctx);

function read(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function write(v: Exclude<Choice, null>) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked: choice lasts for this page view only */
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = read();
    setChoice(c);
    setOpen(c === null);
    setReady(true);
  }, []);

  const decide = (v: Exclude<Choice, null>) => {
    const wasGranted = choice === "granted";
    write(v);
    setChoice(v);
    setOpen(false);
    if (v === "denied" && wasGranted) {
      // Withdrawing consent: stop GA, clear its cookies, and reload so the script is gone.
      if (GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          const host = location.hostname.replace(/^www\./, "");
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      });
      location.reload();
    }
  };

  const reopen = useCallback(() => setOpen(true), []);

  return (
    <Ctx.Provider value={{ choice, reopen }}>
      {children}
      {ready && choice === "granted" && GA_ID && <Analytics id={GA_ID} />}
      {ready && open && (
        <section
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-plaster pb-[env(safe-area-inset-bottom)] shadow-[0_-1px_0_var(--color-stone-200)]"
        >
          <div className="wrap flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <p className="text-small text-ink-2 md:max-w-[70ch]">
              <span className="label mr-2 text-walnut">Cookies</span>
              We&apos;d like to use analytics cookies to see which pages help people. Nothing loads unless you accept.
            </p>
            <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
              {/* Equal weight on both choices: declining is as easy as accepting. */}
              <button type="button" onClick={() => decide("denied")} className="btn btn-secondary min-h-11 px-5">
                Decline
              </button>
              <button type="button" onClick={() => decide("granted")} className="btn btn-secondary min-h-11 px-5">
                Accept
              </button>
            </div>
          </div>
        </section>
      )}
    </Ctx.Provider>
  );
}

function Analytics({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)},{anonymize_ip:true});`}
      </Script>
    </>
  );
}

/** Footer link to change the choice later. */
export function ConsentSettingsButton({ className = "" }: { className?: string }) {
  const { reopen } = useConsent();
  return (
    <button type="button" onClick={reopen} className={className}>
      Cookie settings
    </button>
  );
}
