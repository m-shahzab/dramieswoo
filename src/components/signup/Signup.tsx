import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import appwriteAuth from "@/appwrite/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slice/authSlice";

function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const session = await appwriteAuth.createAccount(data);
      if (session) {
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
          navigate("/");
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginSignup
      error={error}
      loading={loading}
      onSubmit={onSubmit}
      isSignUp={true}
    ></LoginSignup>
  );
}

export default Signup;
