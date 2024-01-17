import { motion } from "framer-motion";

function AnimateTitle({
  text,
  rotate,
  className,
}: {
  text: string | undefined;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.span
      variants={{
        initial: { x: 0 },
        whileHover: { x: -16 },
      }}
      transition={{
        type: "spring",
        staggerChildren: 0.075,
        delayChildren: 0.25,
      }}
      className={`inline-block ${className}`}
    >
      {text?.split("").map((letter, index) => {
        return (
          <motion.span
            key={index}
            variants={{
              initial: { x: 0 },
              whileHover: {
                x: 16,
                rotate: rotate ? rotate : 0,
              },
            }}
            transition={{ type: "spring" }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export default AnimateTitle;
