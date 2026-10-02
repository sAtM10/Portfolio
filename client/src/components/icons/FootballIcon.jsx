/** Football in Lucide's 24px stroke style (Lucide has no soccer ball); echoes the landing schematic. */
export function FootballIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8.4l3.42 2.49-1.3 4.02H9.88l-1.3-4.02z" />
      <path d="M12 8.4V2M15.42 10.89l6.09-1.98M14.12 14.91l3.76 5.18M9.88 14.91l-3.76 5.18M8.58 10.89 2.49 8.91" />
    </svg>
  );
}
