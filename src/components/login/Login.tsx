import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import authService from "@/appwrite/auth";
import { useAppDispatch } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slice/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data) {
      const acc = await authService.login(data);
      if (acc) {
        dispatch(login({ ...acc, prefs: {} }));
        navigate("/");
      }
    }
  };
  return <LoginSignup onSubmit={onSubmit}></LoginSignup>;
}

export default Login;
