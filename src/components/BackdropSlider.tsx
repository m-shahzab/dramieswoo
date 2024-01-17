import { useGetMediaQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

export default function BackdropSlider({ className }: { className?: string }) {
  console.log("BackdropSlider:::::");
  const { media_type, id } = useParams();
  const { data, isFetching } = useGetMediaQuery(`${media_type}/${id}/images`);
  const imgUrl = "https://image.tmdb.org/t/p/w1280";
  const copyBackdrop = [...(data?.backdrops ?? [])].slice(0, 10);

  return (
    <div className={`relative w-full ${className}`}>
      <Swiper
        effect="fade"
        modules={[EffectFade, Autoplay]}
        autoplay={{ delay: 2000 }}
        loop={true}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <LazyImage
            imgPath={imgUrl + copyBackdrop[0].file_path}
            alt="backdrop photo"
            className=" aspect-video "
          />
        </SwiperSlide>
        {/* {copyBackdrop.map((backdrop, i) => {
          return (
          );
        })} */}
        <div className="inset-0 z-10 absolute bg-[linear-gradient(180deg,_rgba(255,0,0,0)_-160%,_hsl(var(--heroOverlay))_80%)]"></div>
      </Swiper>
    </div>
  );
}

{
  /* <LazyImage
          imgPath={imgUrl + copyBackdrop[0].file_path}
          alt="backdrop photo"
          className=" aspect-video "
        />
        <div className="inset-0 absolute bg-heroOverlay/50"></div> */
}
