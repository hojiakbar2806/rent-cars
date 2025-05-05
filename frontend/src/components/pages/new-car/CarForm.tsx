"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { CarType } from '@/types/cars'
import useApi from '@/hooks/useApi'
import FormInput from '@/components/shared/FormInput'
import SubmitButton from '@/components/shared/SubmitButton'
import { NewCarForm, newCarSchema } from '@/lib/validations/dashboard'
import { postCar } from '@/app/actions/cars/postCars'




type Props = {
    carTypes: CarType[]
    fuels: { value: string, label: string }[]
    transmissions: { value: string, label: string }[]
}

const CarForm: React.FC<Props> = ({ carTypes, fuels, transmissions }) => {
    const form = useForm<NewCarForm>({ resolver: zodResolver(newCarSchema) })
    const { post } = useApi(true)

    const onSubmit = async (data: NewCarForm) => {
        if (data.images.length > 4) {
            return toast.error("Mashina rasmi eng ko'pi bilan 4 ta bo'lishi kerak")
        }
        if (data.images.length < 1) {
            return toast.error("Mashina rasmi kiritilmadi")
        }
        const images = new FormData()
        for (let i = 0; i < data.images.length; i++) {
            images.append("files", data.images[i])
        }
        await toast.promise(
            post("/v1/files/upload", images, { headers: { "Content-Type": "multipart/form-data" } }),
            {
                loading: "Rasm yuklanmoqda...",
                success: (res) => {
                    data.images = res.data
                    return "Rasm muvaffaqiyatli yuklandi"
                },
                error: (err) => {
                    console.log(err)
                    return err.message
                },
            }
        )
        await toast.promise(
            postCar(data),
            {
                loading: "Mashina yaratilmoqda...",
                success: "Car successfully created",
                error: (err) => err.message,
            }
        )
    }



    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full"
        >
            <FormInput
                type="text"
                defaultValue=""
                label="Mashina nomi"
                placeholder="Mashina nomi"
                register={form.register("name")}
                error={form.formState.errors.name?.message}
            />

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Mashina turi</label>
                <select className="border rounded-lg p-2" {...form.register("car_type_id")}>
                    <option value="">Mashina turi</option>
                    {carTypes?.map((item) => (
                        <option key={item.id} value={String(item.id)}>{item.name}</option>
                    ))}
                </select>
                {form.formState.errors.car_type_id && <span className="text-red-500 text-sm">{form.formState.errors.car_type_id.message}</span>}
            </div>

            <FormInput
                type="number"
                defaultValue=""
                label="Bir kunlik narxi"
                placeholder="Narxi"
                register={form.register("price_per_day")}
                error={form.formState.errors.price_per_day?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Asl narxi"
                placeholder="Asl narxi"
                register={form.register("original_price")}
                error={form.formState.errors.original_price?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Yo'lovchi sig'imi"
                placeholder="Sig'im"
                register={form.register("capacity")}
                error={form.formState.errors.capacity?.message}
            />

            <FormInput
                type="number"
                defaultValue=""
                label="Yoqilg'i sig'imi"
                placeholder="Sig'im"
                register={form.register("fuel_capacity")}
                error={form.formState.errors.fuel_capacity?.message}
            />

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Yoqilg'i turi</label>
                <select className="border rounded-lg p-2" {...form.register("fuel_type")}>
                    <option value="">Yoqilg'i turi</option>
                    {fuels.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {form.formState.errors.fuel_type && <span className="text-red-500 text-sm">{form.formState.errors.fuel_type.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Boshqarish</label>
                <select className="border rounded-lg p-2" {...form.register("transmission")}>
                    <option value="">Boshqarish</option>
                    {transmissions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                </select>
                {form.formState.errors.transmission && <span className="text-red-500 text-sm">{form.formState.errors.transmission.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label className='mb-1 text-sm'>Mashina tavsifi</label>
                <textarea
                    placeholder='Mashina tavsifi'
                    className='border rounded-lg p-2 focus:outline-none focus:ring-2 ring-blue-400'
                    {...form.register("description")}
                ></textarea>
                {form.formState.errors.description && <span className="text-red-500 text-sm">{form.formState.errors.description.message}</span>}
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
                    {...form.register("images")}
                />
            </div>

            <SubmitButton isLoading={form.formState.isSubmitting} label="Yuborish" />
        </form>
    )
}

export default CarForm
