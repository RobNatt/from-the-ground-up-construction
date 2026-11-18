/** Visible placeholder. Anything rendered with this must be confirmed before launch. */
export function Ph({ children }: { children: React.ReactNode }) {
  return (
    <span className="ph" data-placeholder title="Placeholder: confirm before launch">
      {children}
    </span>
  );
}
