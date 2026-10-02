import { useEffect, useState } from 'react';

import { getHealth } from '@/services/api';

// Temporary Phase 1 screen: proves React, Tailwind and the client → API wiring work.
// Replaced by the real landing page and router in Phase 2.
const API_STATUS = {
  checking: { label: 'Checking API…', dot: 'bg-neutral-500' },
  online: { label: 'API online', dot: 'bg-emerald-400' },
  offline: { label: 'API unreachable — is the server running?', dot: 'bg-red-400' },
};

export default function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const controller = new AbortController();

    getHealth({ signal: controller.signal })
      .then(() => setApiStatus('online'))
      .catch((error) => {
        if (error.name !== 'AbortError') setApiStatus('offline');
      });

    return () => controller.abort();
  }, []);

  const { label, dot } = API_STATUS[apiStatus];

  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="font-mono text-xs tracking-[0.2em] text-amber-300/80 uppercase">
          Phase 1 · Scaffold
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          Satwik Mukherjee — Digital Workspace
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Client is running. This placeholder is replaced in Phase 2.
        </p>
        <p
          role="status"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300"
        >
          <span aria-hidden="true" className={`size-2 rounded-full ${dot}`} />
          {label}
        </p>
      </div>
    </main>
  );
}
