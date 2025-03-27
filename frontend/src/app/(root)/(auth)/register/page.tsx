"use client";

import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/pages/auth/FormInput";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import register  from "@/app/actions/auth/register";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z
    .string()
    .min(4, "First name must be at least 4 characters long"),
  last_name: z.string().min(4, "First name must be at least 4 characters long"),
  password: z.string().min(4, "Password must be at least 6 characters long"),
});

export type RegisterFormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const onSubmit = (data: RegisterFormData) => {
    toast.promise(
      register(data).then((res) => {
        if (res.ok) {
          router.replace("/");
          toast.success(res.msg);
        } else {
          toast.error(res.msg);
        }
      }),
      { loading: "Signing up..." }
    );
  };

  return (
    <div className="flex-1 my-32 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <FormInput
          label="Email"
          register={registerForm("email")}
          error={errors.email?.message}
          placeholder="Email"
        />

        <FormInput
          label="First Nmame"
          register={registerForm("first_name")}
          error={errors.first_name?.message}
          placeholder="First Nmame"
        />

        <FormInput
          label="Last Nmame"
          register={registerForm("last_name")}
          error={errors.last_name?.message}
          placeholder="Last Name"
        />

        <FormInput
          label="Password"
          register={registerForm("password")}
          error={errors.password?.message}
          placeholder="Password"
          type="password"
        />
        <SubmitButton isLoading={isSubmitting} label="Sign Up" />

        <p className="flex gap-2">
          Already have an account?
          <Link className="text-blue-500" href="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
