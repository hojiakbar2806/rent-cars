"use client"

import postCar from '@/app/actions/cars/postCar';
import FormInput from '@/components/shared/FormInput'
import SubmitButton from '@/components/shared/SubmitButton';
import { CarType } from '@/types/cars';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, "Ism kiritilmadi"),
    car_type_id: z.string().min(1, "Mashina turi tanlanmadi"), 
    images: z.any(),
    price_per_day: z.coerce.number(),
    original_price: z.coerce.number(),
    fuel_type: z.string().min(1, "Yoqilg'i turi tanlanmadi"),
    transmission: z.string().min(1, "Boshqaruv turi tanlanmadi"),
    capacity: z.coerce.number(),
    fuel_capacity: z.coerce.number(),
    description: z.string().min(1, "Tavsif kiritilmadi"),
});

export type NewCarForm = z.infer<typeof schema>;

type Props = {
    carTypes: CarType[] | null
}

const CarForm: FC<Props> = ({ carTypes }) => {
    const {
        register: registerForm,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<NewCarForm>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: NewCarForm) => {
        if (data.images.length > 4) {
            return toast.error("Mashina rasmi eng ko'pi bilan 4 ta bo'lishi kerak")
        }
        if (data.images.length < 1) {
            return toast.error("Mashina rasmi kiritilmadi")
        }
        await toast.promise(
            postCar(data),
            {
                loading: "Yuklanmoqda...",
                success: (data) => data.message,
                error: (err) => err.message,
            }
        )
    };
    const fuels = [
        { value: "Petrol", label: "Benzin" },
        { value: "Diesel", label: "Dizel" },
        { value: "Electric", label: "Elektr" },
        { value: "Hybrid", label: "Gibrid" },
    ]

    const transmissions = [
        { value: "Automatic", label: "Avtomat" },
        { value: "Manual", label: "Manuel" },
    ]

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
        >
            <h2 className="text-2xl font-bold mb-4 text-center">Yangi mashina yaratish</h2>

            <FormInput
                type="text"
                defaultValue=""
                label="Mashina nomi"
                placeholder="Mashina nomi"
                register={registerForm("name")}
                error={errors.name?.message}
            />

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Mashina turi</label>
                <select className="border rounded-lg p-2" {...registerForm("car_type_id")}>
                    <option value="">Mashina turi</option>
                    {carTypes?.map((item) => (
                        <option key={item.id} value={String(item.id)}>{item.name}</option>
                    ))}
                </select>
                {errors.car_type_id && <span className="text-red-500 text-sm">{errors.car_type_id.message}</span>}
            </div>

            <FormInput
                type="number"
                defaultValue=""
                label="Bir kunlik narxi"
                placeholder="Narxi"
                register={registerForm("price_per_day")}
                error={errors.price_per_day?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Asl narxi"
                placeholder="Asl narxi"
                register={registerForm("original_price")}
                error={errors.original_price?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Yo'lovchi sig'imi"
                placeholder="Sig'im"
                register={registerForm("capacity")}
                error={errors.capacity?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Yoqilg'i sig'imi"
                placeholder="Sig'im"
                register={registerForm("fuel_capacity")}
                error={errors.fuel_capacity?.message}
            />

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Yoqilg'i turi</label>
                <select className="border rounded-lg p-2" {...registerForm("fuel_type")}>
                    <option value="">Yoqilg'i turi</option>
                    {fuels.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {errors.fuel_type && <span className="text-red-500 text-sm">{errors.fuel_type.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Boshqarish</label>
                <select className="border rounded-lg p-2" {...registerForm("transmission")}>
                    <option value="">Boshqarish</option>
                    {transmissions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {errors.transmission && <span className="text-red-500 text-sm">{errors.transmission.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Mashina tavsifi</label>
                <textarea
                    placeholder='Mashina tavsifi'
                    className='border rounded-lg p-2 focus:outline-none focus:ring-2 ring-blue-400'
                    {...registerForm("description")}
                ></textarea>
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Mashina rasmi</label>
                <input
                    maxLength={4}
                    max={4}
                    type="file"
                    accept="image/*"
                    multiple
                    className='border rounded-lg p-2 focus:outline-none focus:ring-2 ring-blue-400'
                    {...registerForm("images")}
                />
            </div>

            <SubmitButton isLoading={isSubmitting} label="Yuborish" />
        </form>
    )
}

export default CarForm;