import { ReactNode, memo, useEffect, useRef, useState } from "react";

type Fn = () => any;

interface Props {
  dataLength: number;
  next: Fn;
  hasMore: boolean;
  loader: ReactNode;
  endMessage: ReactNode;
  children: ReactNode;
}
const CustomInfiniteScroll = ({
  dataLength,
  next,
  hasMore,
  loader,
  endMessage,
  children,
}: Props) => {
  const actionTriggeredRef = useRef(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleScroll = () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    if (scrollTop + window.innerHeight >= scrollHeight - 100) {
      if (actionTriggeredRef.current) return;
      if (hasMore) {
        actionTriggeredRef.current = true;
        setShowLoader(true);
        next();
      }
    }
  };

  useEffect(() => {
    actionTriggeredRef.current = false;
    setShowLoader(false);
  }, [dataLength]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dataLength, hasMore]);

  return (
    <>
      {children}
      {!hasMore && endMessage}
      {showLoader && hasMore && loader}
    </>
  );
};

export default memo(CustomInfiniteScroll);
