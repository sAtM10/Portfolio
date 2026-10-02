import { useEffect, useState } from 'react';

const MINUTE = 60_000;

/** Wall-clock time in a fixed time zone, re-rendering once per minute on the minute. */
export function LocalTime({ timeZone, label }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId;
    const timeoutId = setTimeout(
      () => {
        setNow(new Date());
        intervalId = setInterval(() => setNow(new Date()), MINUTE);
      },
      MINUTE - (Date.now() % MINUTE),
    );
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(now);

  return (
    <time dateTime={now.toISOString()}>
      {time} {label}
    </time>
  );
}
