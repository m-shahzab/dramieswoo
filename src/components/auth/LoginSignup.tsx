import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/Typography/TypographyP";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/formSchema";
import * as z from "zod";
import { ClipLoader } from "react-spinners";

type LoginSignupProps = {
  isSignUp?: boolean;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  error: string | null;
  loading: boolean;
};

function LoginSignup({
  error,
  loading,
  onSubmit,
  isSignUp = false,
}: LoginSignupProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {isSignUp && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} required />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="my-5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {error && (
          <TypographyP className="text-red-500 text-center">
            {error}
          </TypographyP>
        )}
        <div>
          <Button className="mt-4 grid place-items-center" type="submit">
            {loading ? <ClipLoader size={20} color="#0c142d" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginSignup;
