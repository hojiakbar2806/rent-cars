"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/pages/auth/SubmitButton";
import FormInput from "@/components/pages/auth/FormInput";
import toast from "react-hot-toast";
import { NewCarTypeForm, newCarTypeSchema } from "@/lib/validations/dashboard";
import { postCarType } from "@/app/actions/cars/postCarType";


const AddNewUserPage = () => {
    const form = useForm<NewCarTypeForm>({ resolver: zodResolver(newCarTypeSchema) });

    const onSubmit = async (data: NewCarTypeForm) => {
        toast.promise(postCarType(data),
            {
                loading: "Yuklanmoqda...",
                success: "Car type successfully created",
                error: (err) => err.message,
            }
        );
    };
    return (
        <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
            <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
                <h2 className="text-2xl font-bold">Mashina Turlari</h2>
                <Button asChild>
                    <Link href="/dashboard/car-type-list" >Orqaga</Link>
                </Button>
            </div>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Yangi mashina turini yaratish</h2>

                <FormInput
                    defaultValue=""
                    label="Mashina turi"
                    register={form.register("name")}
                    error={form.formState.errors.name?.message}
                    placeholder="Mashina turi"
                />
                <FormInput
                    defaultValue=""
                    label="Description"
                    register={form.register("description")}
                    error={form.formState.errors.description?.message}
                    placeholder="Description"
                />
                <SubmitButton isLoading={form.formState.isSubmitting} label="Yuborish" />
            </form>
        </div>
    )
};

export default AddNewUserPage
