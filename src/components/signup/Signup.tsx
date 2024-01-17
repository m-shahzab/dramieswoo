import * as z from "zod";
import LoginSignup from "@/components/auth/LoginSignup";
import { formSchema } from "@/lib/formSchema";
import appwriteAuth from "@/appwrite/auth";
function Signup() {
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    appwriteAuth.createAccount(data);
  };
  return <LoginSignup onSubmit={onSubmit} isSignUp={true}></LoginSignup>;
}

export default Signup;
