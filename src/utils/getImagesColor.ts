import { FastAverageColor, FastAverageColorOptions } from "fast-average-color";

const fac = new FastAverageColor();

const getImageColor = async (url: string, option: FastAverageColorOptions) => {
  try {
    const color = fac.getColorAsync(url, option);
    return color;
  } catch (error) {
    console.error("Error fetching color:", error);
    return null;
  }
};

export default getImageColor;
