// import Container from "@/components/container/Container";
// import { useGetInfoQuery } from "@/redux/rtk_query/api";
// import LazyImage from "@/utils/LazyImage";
// import HeroContent from "./HeroContent";

// function Hero({ contentInfo }: { contentInfo: string | undefined }) {
//   console.log("hero");
//   const { data } = useGetInfoQuery(`${contentInfo}`); // its make api call based on contentInfo props if media type is movie then it will call ==> movie/{id} else tv/{id}
//   // @md:h-[40rem] h-[20rem]
//   return (
//     <>
//       {data && (
//         <div className={`hidden relative rightBd`}>
//           <div className="absolute inset-0">
//             <LazyImage alt="" className="" imgPath={""} />
//             <div className="absolute inset-0 bg-heroOverlay/50"></div>
//           </div>
//           <Container className="w-full h-full relative">
//             <HeroContent movieInfo={data} />
//           </Container>
//         </div>
//       )}
//     </>
//   );
// }
// export default Hero;
