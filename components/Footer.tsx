import Link from "next/link";
import { nav, site } from "@/lib/site";
import { ConsentSettingsButton } from "./Consent";
import { Logo } from "./Logo";
import { Ph } from "./Ph";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-stone-200">
      <div className="wrap grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo onDark />
          <p className="mt-5 max-w-[36ch]">
            Kitchen and bathroom remodeling in New York City. Owned and run by {site.owner}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="label text-stone-200/80">Pages</p>
          <ul className="mt-4 space-y-2">
            <li><Link href="/" className="hover:text-plaster">Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-plaster">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <dl className="grid gap-4 text-small md:col-span-4">
          <div>
            <dt className="label text-stone-200/80">Phone</dt>
            <dd className="mt-1 text-plaster">
              {site.phone ? <a href={`tel:${site.phone.e164}`} className="link">{site.phone.display}</a> : <Ph>Phone number</Ph>}
            </dd>
          </div>
          <div>
            <dt className="label text-stone-200/80">Hours</dt>
            <dd className="mt-1 text-plaster">{site.hours ?? <Ph>Hours</Ph>}</dd>
          </div>
          <div>
            <dt className="label text-stone-200/80">Service area</dt>
            <dd className="mt-1 text-plaster">{site.serviceAreaLine ?? <Ph>Service area</Ph>}</dd>
          </div>
          <div>
            <dt className="label text-stone-200/80">License</dt>
            <dd className="mt-1 text-plaster">{site.license ? `NYC HIC Lic. #${site.license}` : <Ph>License number: publish only once confirmed</Ph>}</dd>
          </div>
        </dl>
      </div>
      <div className="border-t border-stone-500/40">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5 text-small text-stone-200/80">
          <p>© {year} {site.name}</p>
          <ConsentSettingsButton className="min-h-11 underline underline-offset-4 hover:text-plaster" />
        </div>
      </div>
    </footer>
  );
}
