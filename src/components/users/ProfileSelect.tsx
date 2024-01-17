import { TypographyH3 } from "../ui/Typography/TypographyH3";
import { TypographyP } from "../ui/Typography/TypographyP";
import { Input } from "../ui/input";

function ProfileSelect({
  img,
  setImg,
}: {
  img: {
    img: File | string;
    url: string;
  };
  setImg: React.Dispatch<
    React.SetStateAction<{
      img: File | string;
      url: string;
    }>
  >;
}) {
  const inputH = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      setImg({
        img: e.currentTarget.files[0],
        url: URL.createObjectURL(e.currentTarget.files[0]),
      });
    }
  };

  return (
    <>
      <TypographyH3 className="text-center">Upload Image</TypographyH3>
      <Input
        type="file"
        onChange={(e) => inputH(e)}
        className="bg-card-foreground text-black"
      />
      <div className="border border-white rounded-md p-2">
        {!img.img && (
          <div className="text-center text-slate-50">
            <TypographyP>Image Preview</TypographyP>
          </div>
        )}
        <img src={img.url} alt="" />
      </div>
    </>
  );
}

export default ProfileSelect;
