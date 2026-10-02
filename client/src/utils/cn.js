// Joins truthy class names. Callers must avoid passing conflicting Tailwind
// utilities (there is no tailwind-merge), which is why components expose
// variant props instead of relying on className overrides.
export const cn = (...classes) => classes.filter(Boolean).join(' ');
