import { motion } from "framer-motion";
import BackdropSlider from "../BackdropSlider";
import Left_MS_Details from "./Left_MS_Details";
import Right_MS_Details from "./Right_MS_Details";
function TopSection({
  imgUrl,
  title,
}: {
  imgUrl: string;
  title: string | undefined;
}) {
  return (
    <motion.div
      className="relative topp"
      initial="initial"
      whileHover="whileHover"
    >
      <BackdropSlider className="@xl:h-[95vh] h-[45vh] relative z-0" />
      <div className="absolute left-0 right-0 bottom-0 flex p-1 gap-1 items-center">
        <Left_MS_Details
          imgUrl={imgUrl}
          className="@xl:w-40 w-32 h-max"
          movieTitle={title}
        />
        <Right_MS_Details className="w-4/5" />
      </div>
    </motion.div>
  );
}
export default TopSection;
