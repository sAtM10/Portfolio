import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

const canCopy = typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText);

/** Copies `value` to the clipboard and confirms via a polite live region. */
export function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeoutId = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeoutId);
  }, [copied]);

  if (!canCopy) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Permission denied or insecure context: the visible value can still be selected manually.
    }
  };

  const Icon = copied ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        <Icon aria-hidden="true" className={copied ? 'size-4 text-success' : 'size-4'} />
        <span className="sr-only">{label}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </>
  );
}
