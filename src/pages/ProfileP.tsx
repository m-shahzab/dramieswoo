import Container from "@/components/container/Container";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { createPortal } from "react-dom";
import Model from "@/components/users/Model";
import LazyImage from "@/utils/LazyImage";
import appwriteservice from "@/appwrite/services";
import { Button } from "@/components/ui/button";

function ProfileP() {
  console.clear();
  const users = useAppSelector((state) => state.authSlice.users);

  const isDp = users?.profileUrl
    ? appwriteservice.getProfileUrl(users?.profileUrl as string)
    : "/imgs/defaultProfilePic.png";

  const [model, setModel] = useState(false);

  return (
    <Container className="myContainer mt-16">
      <main className="translate-y-20">
        <div className="flex flex-col items-center">
          <div className="w-10/12 bg-accent h-[25rem] py-2 px-8 rounded-lg shadow-[0px_3px_21px_3px_black] flex items-center relative justify-center">
            <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-44 h-44 rounded-full border-4 border-card overflow-hidden ">
              <div className="relative bg-slate-300 w-full h-full">
                <LazyImage
                  imgPath={isDp as string}
                  alt="profile"
                  className="h-full w-full"
                />
              </div>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-slate-50 text-[1.5rem] py-1 px-16 bg-black opacity-70 cursor-pointer hover:opacity-100 transition-all duration-300 ease-in-out "
                title="Change Picture"
                onClick={() => setModel(true)}
              >
                <FaCamera />
              </div>
            </div>
            <div className="w-5/6 bg-slate-50 p-4 text-black">
              <div>
                <strong>Name : {users?.name}</strong>
              </div>
              <div>
                <strong>Email : {users?.email}</strong>
              </div>
              <div>
                <strong>Phone : {users?.phone || "N/A"}</strong>
              </div>
              <div className="mt-4">
                <Button onClick={() => alert("logout")}>Logout</Button>
              </div>
            </div>

            {model &&
              createPortal(
                <Model setModel={setModel} />,
                document.body as HTMLElement
              )}
          </div>
        </div>
      </main>
    </Container>
  );
}
export default ProfileP;
