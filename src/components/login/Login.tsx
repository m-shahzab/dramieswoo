import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import authService from "@/appwrite/auth";
import { useState } from "react";
import { useGetCurrentUser } from "@/hooks/getUser";

function Login() {
  const { getCurrentUser } = useGetCurrentUser();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const session = await authService.login(data);
      if (session) {
        getCurrentUser();
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
