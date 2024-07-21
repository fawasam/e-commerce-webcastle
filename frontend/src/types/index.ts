import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export const RegisterSchema: ZodType<FormData> = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});
export const LoginSchema: ZodType<FormData> = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});

export type FormData = {
  email: string;
  username?: string;
  password: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "email" | "username" | "password";

export interface WrapperType {
  children?: React.ReactNode;
  className?: string;
}

export interface Data {
  id?: number;
  name?: string;
  url: string;
  subMenu?: boolean | undefined;
}
