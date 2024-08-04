interface ContainerProps extends React.ComponentProps<"section"> {}
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container(props: ContainerProps) {
  const { children, className = " " } = props;
  return (
    <section className={`w-full max-w-7xl mx-auto px-2 ${className}`}>
      {children}
    </section>
  );
}

export default Container;
