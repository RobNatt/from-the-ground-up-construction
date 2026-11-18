import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

/**
 * Tap-to-call. Real tel: link once site.phone is set; until then it points at
 * a placeholder anchor and is visibly marked.
 */
export function CallLink({
  variant = "full",
  tone = "primary",
  className = "",
}: {
  variant?: "full" | "compact";
  tone?: "primary" | "secondary";
  className?: string;
}) {
  const phone = site.phone;
  const href = phone ? `tel:${phone.e164}` : "#phone-placeholder";
  const number = phone ? phone.display : "(XXX) XXX-XXXX";
  const isPh = !phone;

  if (variant === "compact") {
    return (
      <a
        href={href}
        className={`btn btn-${tone} min-w-12 gap-1.5 px-3 ${isPh ? "outline-2 outline-dashed outline-offset-2 outline-brick" : ""} ${className}`}
        aria-label={phone ? `Call ${phone.display}` : "Call (phone number placeholder)"}
        data-placeholder={isPh || undefined}
      >
        <PhoneIcon className="size-5" />
        <span>Call</span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className={`btn btn-${tone} ${isPh ? "outline-2 outline-dashed outline-offset-2 outline-brick" : ""} ${className}`}
      data-placeholder={isPh || undefined}
      title={isPh ? "Placeholder phone number: confirm before launch" : undefined}
    >
      <PhoneIcon className="size-5" />
      <span className="tabular-nums">{number}</span>
    </a>
  );
}
