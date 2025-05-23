"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/pages/auth/FormInput";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import toast from "react-hot-toast";
import { internalApi } from "@/lib/api";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import nProgress from "nprogress";


export default function SignUp() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const router = useRouter();
  const { setSession } = useSession()


  const onSubmit = async (data: RegisterFormData) => {
    await toast.promise(internalApi.post("/api/auth/register", data), {
      loading: "Loading...",
      success: (res) => {
        setSession(res.data.session)
        nProgress.start();
        router.push("/");
        return "Register Success"
      },
      error: (error) => {
        if (isAxiosError(error)) return error.response?.data.error;
        return "Something went wrong";
      },
    });

  };

  return (
    <div className="m-auto w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Ro'yxatdan o'tish
        </h2>

        <FormInput
          label="E-pochta"
          register={registerForm("email")}
          error={errors.email?.message}
          placeholder="E-pochta"
        />

        <FormInput
          label="Ismingiz"
          register={registerForm("first_name")}
          error={errors.first_name?.message}
          placeholder="Ismingiz"
        />

        <FormInput
          label="Familyangiz"
          register={registerForm("last_name")}
          error={errors.last_name?.message}
          placeholder="Familyangiz"
        />

        <FormInput
          label="Maxfiy parol"
          register={registerForm("password")}
          error={errors.password?.message}
          placeholder="Maxfiy parol"
          type="password"
        />
        <SubmitButton isLoading={isSubmitting} label="Sign Up" />

        <p className="flex gap-2">
          Sizda allaqachon hisobingiz mavjudmi?
          <Link className="text-blue-500" href="/login">
            Kirish
          </Link>
        </p>
      </form>
    </div>
  );
}
