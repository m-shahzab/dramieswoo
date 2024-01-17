import * as z from "zod";

export const formSchema = z.object({
  name: z.optional(z.string()),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
