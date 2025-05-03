"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import FormInput from "@/components/pages/auth/FormInput";
import toast from "react-hot-toast";
import { NewUserForm, newUserSchema } from "@/lib/validations/dashboard";
import useApi from "@/hooks/useApi";


const AddNewUserPage = () => {
    const form = useForm<NewUserForm>({ resolver: zodResolver(newUserSchema) });
    const { post } = useApi(true)
    const onSubmit = async (data: NewUserForm) => {
        toast.promise(post("/v1/users", data),
            {
                loading: "Yuklanmoqda...",
                success: "User successfully created",
                error: (err) => err.message,
            }
        )
    };

    return (
        <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
            <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
                <h2 className="text-2xl font-bold">Mashina Turlari</h2>
                <Button asChild>
                    <Link href="/dashboard/users-list">Orqaga</Link>
                </Button>
            </div>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Yangi user yaratish</h2>

                <FormInput
                    defaultValue=""
                    label="Ism"
                    register={form.register("first_name")}
                    error={form.formState.errors.first_name?.message}
                    placeholder="Ism"
                />
                <FormInput
                    defaultValue=""
                    label="Familya"
                    register={form.register("last_name")}
                    error={form.formState.errors.last_name?.message}
                    placeholder="Familya"
                />
                <FormInput
                    defaultValue=""
                    label="E-pochta"
                    register={form.register("email")}
                    error={form.formState.errors.email?.message}
                    placeholder="E-pochta"
                />

                <FormInput
                    label="Maxfiy parol"
                    defaultValue=""
                    register={form.register("password")}
                    error={form.formState.errors.password?.message}
                    placeholder="Maxfiy parol"
                    type="password"
                />

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="user" {...form.register("is_active")} />
                    <label htmlFor="user" className="select-none">
                        Faol foydalanuvchi
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="admin" {...form.register("is_admin")} />
                    <label htmlFor="admin" className="select-none">
                        Boshqarish huquqi
                    </label>
                </div>

                <SubmitButton isLoading={form.formState.isSubmitting} label="Yuborish" />
            </form>
        </div>
    );
};

export default AddNewUserPage;