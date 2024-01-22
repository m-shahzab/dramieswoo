import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import appwriteAuth from "@/appwrite/auth";
import { useState } from "react";
import { useGetCurrentUser } from "@/hooks/getUser";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const session = await appwriteAuth.createAccount(data);
      if (session) {
        await getCurrentUser();
        navigate("/");
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
