const monthYear = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

// Accepts "YYYY-MM" or a full ISO date (as the API will return), so both data
// sources format identically.
const toDate = (value) => new Date(`${String(value).slice(0, 7)}-01T00:00:00Z`);

export const formatMonthYear = (value) => (value ? monthYear.format(toDate(value)) : 'Present');

export const formatDateRange = (start, end) =>
  `${formatMonthYear(start)} – ${formatMonthYear(end)}`;

/** Inclusive month count rendered LinkedIn-style, e.g. "2 yrs 4 mos". */
export function formatDuration(start, end) {
  const from = toDate(start);
  const to = end ? toDate(end) : new Date();
  const months =
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
    (to.getUTCMonth() - from.getUTCMonth()) +
    1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const plural = (n, unit) => `${n} ${unit}${n === 1 ? '' : 's'}`;
  return [years && plural(years, 'yr'), rest && plural(rest, 'mo')].filter(Boolean).join(' ');
}
