"use client";
import Button from "@/common/Button";
import Input from "@/common/Input";
import Wrapper from "@/components/Wrapper";
import axios from "axios";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { FormData, LoginSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/user/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Succesfully LoggedIn ");
        router.replace("/");
        router.refresh();
        console.log("Signin Success:", response.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Signup Error:", error.response.data.message);
    }
  };

  return (
    <Wrapper className="mt-24">
      <div className="">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-4xl font-bold mb-4">Sign In</h1>
          <p className="text-lg">Sign in to your account to continue</p>
        </div>
        <div className="w-[80%] md:w-[40%] m-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              register={register}
              error={errors.email}
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />
            <Button title="Sign In" type="submit" />
          </form>
        </div>
        <div className="flex items-center text-center justify-center mt-4">
          <span>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="font-[500]">
              Sign Up{" "}
            </Link>
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignIn;
