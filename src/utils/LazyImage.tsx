import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyImage({
  imgPath,
  autoHeight = false,
  alt = "",
  fullLoaded,
  className = " ",
}: {
  className?: string;
  imgPath: string | undefined;
  autoHeight?: boolean;
  fullLoaded?: () => void; //callback function when image is fully loaded in backdrop slider in movie details page
  alt: string | undefined;
}) {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const onLoad = (event: Event) => {
    if (fullLoaded) fullLoaded();
    (skeletonRef.current as HTMLDivElement).remove();
    const target = event.target as HTMLImageElement;
    const parent = target.parentElement?.parentElement;
    if (autoHeight && parent instanceof HTMLDivElement) {
      parent.style.height = "auto";
    }
    (target.parentNode as HTMLDivElement).style.opacity = "1";
  };

  const onError = (event: Event) => {
    (skeletonRef.current as HTMLDivElement).remove();
    const target = event.target as HTMLImageElement;
    // const parent = target.parentElement?.parentElement;
    //we can show a default image here if img not loaded
    // target.src = "https://via.placeholder.com/300x450";

    // target.src = "https://via.placeholder.com/342x482";

    // if (autoHeight && parent instanceof HTMLDivElement) {
    //   parent.style.height = "auto";
    // }
    (target.parentNode as HTMLDivElement).style.opacity = "1";
  };

  return (
    <>
      <LazyLoadImage
        src={imgPath}
        alt={alt}
        className={cn("object-cover object-center h-full w-full", className)}
        onLoad={onLoad as () => void}
        onError={onError as () => void}
        wrapperProps={{
          style: {
            opacity: "0",
            transition: "opacity 0.5s ease",
          },
        }}
      />

      <Skeleton
        className="animate-shimmerAnimation inset-0 bg-gradient-90 absolute z-1"
        ref={skeletonRef}
      />
    </>
  );
}

export default LazyImage;
