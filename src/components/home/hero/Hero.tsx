import Container from "@/components/container/Container";
import { useGetInfoQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import HeroContent from "./HeroContent";
import { Skeleton } from "@/components/ui/skeleton";
import getImageColor from "@/utils/getImagesColor";
import { useEffect, useState } from "react";

import { FastAverageColorResult } from "fast-average-color";

function HeroImage({ imgPath }: { imgPath: string }) {
  const [colorObject, setcolorObject] =
    useState<FastAverageColorResult | null>();
  useEffect(() => {
    getImageColor(imgPath, {
      algorithm: "dominant",
      mode: "speed",
      ignoredColor: [
        [255, 255, 255],
        [0, 0, 0],
      ],
    }).then((color) => {
      setcolorObject(color);
    });
  }, [imgPath]);
  return (
    <>
      <div className="absolute inset-0">
        <LazyImage imgPath={imgPath} alt="heroImage" />
        <div
          className="absolute inset-0"
          id="her0Overlay"
          style={{
            backgroundColor: `${colorObject?.rgb
              .replace("rgb", "rgba")
              .replace(")", ",0.9)")}`,
          }}
        />
        {colorObject && colorObject.isLight && (
          <div className="absolute inset-0 bg-black/50"></div>
        )}
      </div>
    </>
  );
}

function Hero({
  contentInfo,
  backdropImagePath,
}: {
  contentInfo: string | undefined;
  backdropImagePath: string;
}) {
  const { data, isLoading } = useGetInfoQuery(`${contentInfo}`); // its make api call based on contentInfo props if media type is movie then it will call ==> movie/{id} else tv/{id}

  const imgPath = `/heroImage${backdropImagePath}`;
  return (
    <>
      {isLoading ? (
        <div className="h-screen">
          <Skeleton className="h-full animate-pulse" />
        </div>
      ) : (
        data && (
          <>
            <HeroImage imgPath={imgPath} />
            <Container
              className="w-full h-full relative overflow-hidden"
              id="heroSection"
            >
              <HeroContent movieInfo={data} />
            </Container>
          </>
        )
      )}
    </>
  );
}
export default Hero;
