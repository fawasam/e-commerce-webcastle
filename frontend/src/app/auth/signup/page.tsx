"use client";
import Button from "@/common/Button";
import Input from "@/common/Input";
import Wrapper from "@/components/Wrapper";
import axios from "axios";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { FormData, RegisterSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/user/signup",
        data,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast.success("Succesfully Signup ");
        router.replace("/");
        router.refresh();
        console.log("Signup Success:", response.data);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Signup Error:", error.response);
    }
  };

  return (
    <Wrapper className="mt-10">
      <div className="">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
          <p className="text-lg">Sign up to your account to continue</p>
        </div>
        <div className="w-[80%] md:w-[40%] m-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              name="username"
              register={register}
              error={errors.username}
            />
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
            <Button title="Sign Up" type="submit" />
          </form>
        </div>
        <div className="flex items-center text-center justify-center mt-4">
          <span>
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-[500]">
              Sign In{" "}
            </Link>
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignUp;
