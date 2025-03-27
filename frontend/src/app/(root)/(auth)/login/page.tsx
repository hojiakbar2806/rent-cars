"use client";

import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import nProgress from "nprogress";
import login from "@/app/actions/auth/login";
import FormInput from "@/components/pages/auth/FormInput";
import SubmitButton from "@/components/pages/auth/SubmitButton";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof schema>;

export default function SignIn() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    await toast.promise(login(data), {
      loading: "Signing in...",
      success: (res) => res.message,
      error: (error) => error.message,
    });

    nProgress.start();
    router.replace("/");
  };

  return (
    <div className="flex-1 my-32 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <FormInput
          defaultValue="hojiakbarni0628@icloud.com"
          label="Email"
          register={registerForm("email")}
          error={errors.email?.message}
          placeholder="Email"
        />

        <FormInput
          label="Password"
          defaultValue="qwerty"
          register={registerForm("password")}
          error={errors.password?.message}
          placeholder="Password"
          type="password"
        />
        <SubmitButton isLoading={isSubmitting} label="Sign In" />
        <p className="flex gap-2">
          Don&apos;t have an account?
          <Link className="text-blue-500" href="/register">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
