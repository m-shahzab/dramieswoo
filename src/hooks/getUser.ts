import appwriteAuth from "@/appwrite/auth";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { login, logout } from "@/redux/slice/authSlice";

type useGetCurrentUser = {
  getCurrentUser: () => Promise<void>;
};

function useGetCurrentUser(): useGetCurrentUser {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    const userData = await appwriteAuth.getCurrentUser();
    if (userData) {
      const userj = {
        id: userData.$id,
        name: userData.name,
        registration: userData.registration,
        email: userData.email,
        phone: userData.phone,
        profileUrl: userData.prefs.profileUrl,
      };
      dispatch(login(userj));
    } else {
      dispatch(logout());
      navigate("/login");
    }
  };

  return { getCurrentUser };
}

export { useGetCurrentUser };
