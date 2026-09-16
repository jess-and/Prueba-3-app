import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 80"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path
        d="M32 2.5c-12.8 0-23 10.4-23 24.2C9 43.6 32 77 32 77s23-33.4 23-50.3C55 12.9 44.8 2.5 32 2.5z"
        fill="#1A6BB0"
      />
      <path
        d="M32 6.2c-10.6 0-19.1 8.7-19.1 20.5 0 14.6 19.1 43.6 19.1 43.6s19.1-29 19.1-43.6C51.1 14.9 42.6 6.2 32 6.2z"
        fill="#0B3A6A"
      />
      <path
        d="M20.8 36.2V21.4h5.1V16h4.2v5.4h3.8V16h4.2v5.4h5.1v14.8H20.8z"
        fill="#F7FBFF"
      />
      <rect x="29.8" y="28.4" width="4.4" height="7.8" rx="0.7" fill="#0B3A6A" />
      <path
        d="M17.5 43.5c6.8-5 12-3.4 15.2.8 3.6 4.4 8 5.6 14.6.4"
        stroke="#E8EEF5"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LogoWordmark({
  light = false,
  stacked = false,
  className,
}: {
  light?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-8" />
      <div className={cn("leading-none", stacked && "flex flex-col")}>
        <p
          className={cn(
            "font-display text-sm font-bold tracking-tight",
            light ? "text-primary-foreground" : "text-navy",
          )}
        >
          TRUJILLO
        </p>
        <p
          className={cn(
            "font-display text-sm font-bold tracking-tight",
            light ? "text-primary-foreground" : "text-brand",
          )}
        >
          CONECTA
        </p>
      </div>
    </div>
  );
}
