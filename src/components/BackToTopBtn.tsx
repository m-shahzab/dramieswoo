import { memo, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LuChevronUp } from "react-icons/lu";

function BackToTopBtn() {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleVisibleButton = () => {
      if (window.scrollY >= 400) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };
    window.addEventListener("scroll", handleVisibleButton);
    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, []);

  return (
    <Button
      className={`fixed transition-all duration-300 ${
        showGoTop ? "top-[4.5rem]" : "-top-full"
      }  left-1/2 -translate-x-1/2 z-10 px-2 py-1 h-fit rounded-full`}
      onClick={handleScrollUp}
    >
      <LuChevronUp className="mr-1" /> Back to top
    </Button>
  );
}

export default memo(BackToTopBtn);
