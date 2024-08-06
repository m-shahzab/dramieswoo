import { useFetchDataQuery } from "@/redux/rtk_query/api";
import LazyImage from "@/utils/LazyImage";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";

export default function BackdropSlider({ className }: { className?: string }) {
  const delayNum_Ms = 3000;
  const { media_type, id } = useParams();
  const { data, isFetching } = useFetchDataQuery({
    type: "media",
    query: `${media_type}/${id}/images`,
  }) as { data: Media; isFetching: boolean };

  const imgUrl = "https://image.tmdb.org/t/p/w780";
  const copyBackdrop = [...(data?.backdrops ?? [])].slice(0, 10);

  return (
    <div className={`relative w-full ${className}`}>
      {isFetching ? null : (
        <Swiper
          effect="fade"
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: delayNum_Ms,
            disableOnInteraction: false,
            waitForTransition: true,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="mySwiper h-full"
        >
          {copyBackdrop.map((item) => (
            <SwiperSlide key={item.file_path}>
              <LazyImage
                imgPath={imgUrl + item?.file_path}
                alt="backdrop photo"
                className=" aspect-video "
              />
            </SwiperSlide>
          ))}
          <div className="inset-0 z-10 absolute bg-[linear-gradient(180deg,_rgba(255,0,0,0)_-160%,_hsl(var(--heroOverlay))_80%)]"></div>
        </Swiper>
      )}
    </div>
  );
}
