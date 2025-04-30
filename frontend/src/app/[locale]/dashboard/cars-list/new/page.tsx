import Link from "next/link";
import { Button } from "@/components/ui/button";
import { externalApi } from "@/lib/api";
import { CarType } from "@/types/cars";
import CarForm from "@/components/pages/new-car/CarForm";


const AddNewCarPage = async () => {
    const carTypes = await externalApi.get("/v1/car-types").then((res) => res.data as CarType[]);

    return (
        <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
            <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
                <h2 className="text-2xl font-bold">Mashina Yaratish</h2>
                <Button asChild>
                    <Link href="/dashboard/cars-list">Orqaga</Link>
                </Button>
            </div>

            <CarForm carTypes={carTypes} />
        </div>
    );
};

export default AddNewCarPage;