import * as z from "zod";

export const formSchema = z.object({
  name: z.optional(z.string()),
  // name: z.string().min(4).max(15),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
