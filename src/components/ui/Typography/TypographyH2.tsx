export function TypographyH2({
  text,
  children,
  className = "",
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  animateTitle?: boolean;
}) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {text} {children}
    </h2>
  );
}
