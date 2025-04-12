import Link from "next/link";
import { Button } from "@/components/ui/button";
import CarForm from "@/components/pages/new-car/CarForm";
import { use } from "react";
import { getCarTypes } from "@/app/actions/cars/getCarTypes";


const AddNewCarPage = () => {
    const carTypes = use(getCarTypes());

    return (
        <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
            <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
                <h2 className="text-2xl font-bold">Mashina Yaratish</h2>
                <Button asChild>
                    <Link href="/dashboard/cars-list">Orqaga</Link>
                </Button>
            </div>

            <CarForm carTypes={carTypes}/>
        </div>
    );
};

export default AddNewCarPage;