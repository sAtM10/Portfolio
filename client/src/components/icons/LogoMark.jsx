/** Prompt-style monogram (">_"), matching public/favicon.svg. */
export function LogoMark(props) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <rect width="64" height="64" rx="14" className="fill-raised stroke-line-strong" />
      <path
        d="M18 22l10 10-10 10"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
      <path d="M33 44h13" strokeWidth="5" strokeLinecap="round" className="stroke-fg" />
    </svg>
  );
}
