import { useGetMediaQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { useState } from "react";

export default function BackdropSlider({ className }: { className?: string }) {
  const { media_type, id } = useParams();
  const { data } = useGetMediaQuery(`${media_type}/${id}/images`);
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const copyBackdrop = [...(data?.backdrops ?? [])].slice(0, 10);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      <Swiper
        effect="fade"
        modules={[EffectFade, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          waitForTransition: true,
          pauseOnMouseEnter: true,
        }}
        onSlideChangeTransitionStart={() => {
          if (imageLoaded) {
            setImageLoaded(false);
          }
        }}
        onSlideChangeTransitionEnd={() => {
          if (copyBackdrop[0]) {
            setImageLoaded(true);
          }
        }}
        loop={true}
        className="mySwiper h-full"
      >
        {copyBackdrop.map((backdrop) => (
          <SwiperSlide>
            <LazyImage
              imgPath={imgUrl + backdrop.file_path}
              alt="backdrop photo"
              className=" aspect-video "
              fullLoaded={() => setImageLoaded(true)}
            />
          </SwiperSlide>
        ))}
        <div className="inset-0 z-10 absolute bg-[linear-gradient(180deg,_rgba(255,0,0,0)_-160%,_hsl(var(--heroOverlay))_80%)]"></div>
      </Swiper>
    </div>
  );
}
