function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-full max-w-7xl mx-auto px-2 ${className}`}>
      {children}
    </section>
  );
}

export default Container;
