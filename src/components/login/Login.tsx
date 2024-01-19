import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slice/authSlice";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
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
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoginSignup
      loading={loading}
      error={error}
      onSubmit={onSubmit}
    ></LoginSignup>
  );
}

export default Login;
