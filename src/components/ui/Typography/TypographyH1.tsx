export default function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
    >
      {children}
    </h1>
  );
}
