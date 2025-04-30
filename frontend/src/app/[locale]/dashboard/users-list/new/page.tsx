"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import FormInput from "@/components/pages/auth/FormInput";
import toast from "react-hot-toast";
import { externalApi } from "@/lib/api";

const schema = z.object({
    first_name: z.string().min(1, "Ism kiritilmadi"),
    last_name: z.string().min(1, "Familiya kiritilmadi"),
    email: z.string().email("Email formati xato"),
    password: z.string().min(4, "Parol 4 ta belgidan iborat bo'lishi kerak"),
    is_admin: z.boolean(),
    is_active: z.boolean(),
});

export type NewUserForm = z.infer<typeof schema>;

const AddNewUserPage = () => {
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewUserForm>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: NewUserForm) => {
        toast.promise(
            externalApi.post("/v1/users", data),
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
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Yangi user yaratish</h2>

                <FormInput
                    defaultValue=""
                    label="Ism"
                    register={registerForm("first_name")}
                    error={errors.first_name?.message}
                    placeholder="Ism"
                />
                <FormInput
                    defaultValue=""
                    label="Familya"
                    register={registerForm("last_name")}
                    error={errors.last_name?.message}
                    placeholder="Familya"
                />
                <FormInput
                    defaultValue=""
                    label="E-pochta"
                    register={registerForm("email")}
                    error={errors.email?.message}
                    placeholder="E-pochta"
                />

                <FormInput
                    label="Maxfiy parol"
                    defaultValue=""
                    register={registerForm("password")}
                    error={errors.password?.message}
                    placeholder="Maxfiy parol"
                    type="password"
                />

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_admin" {...registerForm("is_active")} />
                    <label htmlFor="is_admin" className="select-none">
                        Faol foydalanuvchi
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="is_admin" {...registerForm("is_admin")} />
                    <label htmlFor="is_admin" className="select-none">
                        Boshqarish huquqi
                    </label>
                </div>

                <SubmitButton isLoading={isSubmitting} label="Yuborish" />
            </form>
        </div>
    );
};

export default AddNewUserPage;