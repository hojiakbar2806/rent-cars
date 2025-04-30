"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import FormInput from "@/components/pages/auth/FormInput";
import toast from "react-hot-toast";
import { Suspense } from "react";
import { externalApi } from "@/lib/api";

const schema = z.object({
    name: z.string().min(1, "Nom kiritilmadi"),
    description: z.string().min(1, "Tavsif kiritilmadi"),
});

export type NewCarTypeForm = z.infer<typeof schema>;

const AddNewUserPage = () => {
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewCarTypeForm>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: NewCarTypeForm) => {
        toast.promise(
            externalApi.post("/v1/car-type", data),
            {
                loading: "Yuklanmoqda...",
                success: "Car type successfully created",
                error: (err) => err.message,
            }
        );
    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
                <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
                    <h2 className="text-2xl font-bold">Mashina Turlari</h2>
                    <Button asChild>
                        <Link href="/dashboard/car-type-list" >Orqaga</Link>
                    </Button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
                >
                    <h2 className="text-2xl font-bold mb-4 text-center">Yangi mashina turini yaratish</h2>

                    <FormInput
                        defaultValue=""
                        label="Mashina turi"
                        register={registerForm("name")}
                        error={errors.name?.message}
                        placeholder="Mashina turi"
                    />
                    <FormInput
                        defaultValue=""
                        label="Familya"
                        register={registerForm("description")}
                        error={errors.description?.message}
                        placeholder="Familya"
                    />
                    <SubmitButton isLoading={isSubmitting} label="Yuborish" />
                </form>
            </div>
        </Suspense>
    )
};

export default AddNewUserPage
