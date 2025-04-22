"use client";

import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import login from "@/app/actions/auth/login";
import FormInput from "@/components/pages/auth/FormInput";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import nProgress from "nprogress";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import queryClient from "@/lib/queryClient";
import { useSession } from "@/hooks/useSession";

export default function SignIn() {
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const { setSession } = useSession();

  const onSubmit = async (data: LoginFormData) => {
    await toast.promise(login(data), {
      loading: "Aniqlanmoqda...",
      success: (res) => {
        queryClient.invalidateQueries();
        setSession(res.data)
        return res.message
      },
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
        <h2 className="text-2xl font-bold mb-4 text-center">Tizimga kirish</h2>

        <FormInput
          defaultValue="hojiakbarni0628@icloud.com"
          label="E-pochta"
          register={registerForm("email")}
          error={errors.email?.message}
          placeholder="E-pochta"
        />

        <FormInput
          label="Maxfiy parol"
          defaultValue="qwerty"
          register={registerForm("password")}
          error={errors.password?.message}
          placeholder="Maxfiy parol"
          type="password"
        />
        <SubmitButton isLoading={isSubmitting} label="Tizimga kirish" />
        <p className="flex gap-2">
          Sizda hali hisobingiz yo'qmi?
          <Link className="text-blue-500" href="/register">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </form>
    </div>
  );
}
