import {z} from "zod";

export const formFilterSchema = z.object({
  categories: z.array(z.string()),
});

export const formFilterCompanySchema = z.object({
  industry: z.array(z.string()),
});

export const formApplySchema = z.object({
  resume: z.any().refine((file: any) => file?.name, "Please upload Resume!"),
  fullname: z
    .string({required_error: "Fullname is Required"})
    .min(5, {message: "Full name have min 5 characters"}),
  email: z
    .string({required_error: "Email is Required"})
    .email({message: "Email is not valid"}),
  phone: z.string().min(6, {message: "Phone have min 6 characters"}),
  previousJobTitle: z.string(),
  linkedIn: z.string(),
  portfolio: z.string(),
  coverLetter: z.string(),
});

export const formLoginSchema = z.object({
  email: z
    .string({required_error: "Email is required"})
    .email({message: "Email is not valid"}),
  password: z.string({required_error: "Password is required"}),
});

export const formRegisterSchema = z.object({
  email: z
    .string({required_error: "Email is required"})
    .email({message: "Email is not valid"}),
  password: z.string({required_error: "Password is required"}),
  name: z.string({required_error: 'Name is required'}).min(3, {message: 'Name should be at least 3 characters'})
});