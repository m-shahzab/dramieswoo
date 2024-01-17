import { motion } from "framer-motion";
import { useEffect } from "react";
import Filter from "../Filter";

function MobileFilter() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="@4xl:hidden block bg-background/90 backdrop-blur-md  rounded-lg overflow-y-scroll max-h-[30rem]"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
    >
      <Filter />
    </motion.div>
  );
}

export default MobileFilter;
