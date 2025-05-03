"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/pages/auth/FormInput";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import nProgress from "nprogress";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { internalApi } from "@/lib/api";
import { useSession } from "@/hooks/useSession";

export default function SignIn() {
  const form = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const { setSession } = useSession()

  const onSubmit = async (data: LoginFormData) => {
    await toast.promise(internalApi.post("/api/auth/login", data), {
      loading: "Aniqlanmoqda...",
      success: (res) => {
        setSession(res.data.session)
        return "Login Success"
      },
      error: (error) => error.message,
    });
    nProgress.start();
    router.replace("/");
  };

  return (
    <div className="m-auto">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Tizimga kirish</h2>

        <FormInput
          defaultValue="hojiakbarni0628@icloud.com"
          label="E-pochta"
          register={form.register("email")}
          error={form.formState.errors.email?.message}
          placeholder="E-pochta"
        />

        <FormInput
          label="Maxfiy parol"
          defaultValue="qwerty"
          register={form.register("password")}
          error={form.formState.errors.password?.message}
          placeholder="Maxfiy parol"
          type="password"
        />
        <SubmitButton isLoading={form.formState.isLoading} label="Tizimga kirish" />
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
