"use client";

import { cloneElement, createContext, useCallback, useContext, useId, useRef, useState } from "react";
import { contactTimes, projectTypes, site } from "@/lib/site";
import { AlertIcon, CheckIcon, CloseIcon, PhoneIcon } from "./icons";

type Ctx = { open: () => void };
const EstimateCtx = createContext<Ctx>({ open: () => {} });

export function useEstimate() {
  return useContext(EstimateCtx);
}

/** The one main button, used on every page. */
export function EstimateButton({
  className = "",
  variant = "primary",
  children = "Get a free estimate",
}: {
  className?: string;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}) {
  const { open } = useEstimate();
  return (
    <button type="button" onClick={open} className={`btn btn-${variant} ${className}`} aria-haspopup="dialog">
      {children}
    </button>
  );
}

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "phone" | "location" | "projectType", string>>;

export function EstimateProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formId = useId();

  const open = useCallback(() => {
    if (status === "sent") setStatus("idle");
    ref.current?.showModal();
  }, [status]);
  const close = () => ref.current?.close();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if ((data.phone ?? "").replace(/\D/g, "").length < 10) next.phone = "Please enter a 10-digit phone number.";
    if (!data.location?.trim()) next.location = "Please enter your address or ZIP code.";
    if (!data.projectType) next.projectType = "Please choose a project type.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const phoneText = site.phone?.display ?? "(XXX) XXX-XXXX";

  return (
    <EstimateCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby={`${formId}-title`}
        className="estimate m-0 h-dvh max-h-dvh w-full max-w-full overflow-y-auto overscroll-contain bg-plaster p-0 text-ink-2 sm:m-auto sm:h-auto sm:max-h-[calc(100dvh-48px)] sm:max-w-xl"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-8">
          <div>
            <p className="label text-walnut">Free · No obligation</p>
            <h2 id={`${formId}-title`} className="mt-1 text-h3 font-semibold text-ink">
              Get a free estimate
            </h2>
          </div>
          <button type="button" onClick={close} className="-mr-2 grid size-12 place-items-center text-ink hover:text-brick" aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-5 py-8 sm:px-8" role="status">
            <p className="flex items-center gap-2 font-display text-h3 font-semibold text-ink">
              <CheckIcon className="size-6 text-brick" /> Got it. Thank you.
            </p>
            <p className="mt-3">We&apos;ll call you back to set up your free in-home estimate. If it&apos;s urgent, call us now.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.phone ? `tel:${site.phone.e164}` : "#phone-placeholder"} className="btn btn-primary">
                <PhoneIcon /> {site.phone ? phoneText : <span className="tabular-nums">{phoneText}</span>}
              </a>
              <button type="button" onClick={close} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="space-y-5 px-5 py-6 sm:px-8">
            <Field id={`${formId}-name`} label="Name" error={errors.name}>
              <input name="name" type="text" autoComplete="name" required className={inputCls(errors.name)} />
            </Field>
            <Field id={`${formId}-phone`} label="Phone" error={errors.phone}>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={inputCls(errors.phone)} />
            </Field>
            <Field id={`${formId}-location`} label="Address or ZIP code" error={errors.location}>
              <input name="location" type="text" autoComplete="street-address" required className={inputCls(errors.location)} />
            </Field>

            <Chips name="projectType" legend="Project type" options={projectTypes} error={errors.projectType} required />
            <Chips name="bestTime" legend="Best time to reach you" options={contactTimes} hint="Optional" />

            {/* Honeypot for bots. Hidden from people and assistive tech. */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Company <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {status === "error" && (
              <p role="alert" className="flex items-start gap-2 border border-brick bg-brick-tint p-3 text-small text-brick-dark">
                <AlertIcon className="mt-0.5 size-5 shrink-0" />
                <span>
                  That didn&apos;t send. Please try again, or call us at <span className="tabular-nums">{phoneText}</span>.
                </span>
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-small text-stone-600">We&apos;ll only use this to contact you about your project.</p>
              <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </EstimateCtx.Provider>
  );
}

function inputCls(error?: string) {
  return `block h-12 w-full rounded-tile border bg-plaster px-3 text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-brick focus:shadow-[0_0_0_3px_var(--color-brick-tint)] ${
    error ? "border-brick-dark" : "border-stone-500"
  }`;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>> }) {
  const child = children;
  const errId = `${id}-err`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-small font-semibold text-ink">
        {label}
      </label>
      {cloneElement(child, { id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errId : undefined })}
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-small text-brick-dark">
          <AlertIcon className="size-4 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options, error, hint, required }: { name: string; legend: string; options: readonly string[]; error?: string; hint?: string; required?: boolean }) {
  const errId = `${name}-err`;
  return (
    <fieldset aria-describedby={error ? errId : undefined}>
      <legend className="mb-1.5 text-small font-semibold text-ink">
        {legend} {hint && <span className="font-normal text-stone-600">({hint})</span>}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((opt) => (
          <label key={opt} className="relative cursor-pointer">
            <input type="radio" name={name} value={opt} required={required} className="peer sr-only" />
            <span className="flex h-12 items-center justify-center rounded-tile border border-stone-500 bg-plaster px-2 font-display text-[15px] font-semibold uppercase tracking-wide text-ink-2 transition-colors duration-150 peer-checked:border-brick peer-checked:bg-brick-tint peer-checked:text-brick-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brick hover:border-walnut">
              {opt}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={errId} className="mt-1.5 flex items-center gap-1.5 text-small text-brick-dark">
          <AlertIcon className="size-4 shrink-0" /> {error}
        </p>
      )}
    </fieldset>
  );
}
