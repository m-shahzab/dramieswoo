import appwriteservice from "@/appwrite/services";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import ProfileSelect from "./ProfileSelect";
import { Button } from "../ui/button";
import { updatePrefs } from "@/redux/slice/authSlice";

function Model({
  setModel,
}: {
  setModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [img, setImg] = useState<{
    img: File | string;
    url: string;
  }>({ img: "", url: "" });

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const uploadImg = async () => {
    const file = await appwriteservice.profileUpload(img.img as File);
    if (file) {
      const updPrefs = await appwriteservice.updatePrefs({
        profileUrl: file.$id,
      });
      if (updPrefs) dispatch(updatePrefs(updPrefs.prefs.profileUrl as string));
      setModel(false);

      // dispatch(updatePrefs(prefs?.prefs.profile.photoUrl as string));
      // setModel(false);
      // console.log(prefs?.prefs.profile.photoUrl);
    }
  };

  return (
    <div className="absolute inset-0 z-10 bg-black/50">
      <div className="grid place-content-center h-full ">
        <div className="bg-accent w-[20rem] rounded-md p-2 space-y-3">
          <ProfileSelect img={img} setImg={setImg} />
          <div className="flex gap-x-2 justify-start">
            <Button onClick={() => setModel(false)}>Cancel</Button>
            <Button variant={"ghost"} onClick={uploadImg} disabled={!img.img}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Model;
