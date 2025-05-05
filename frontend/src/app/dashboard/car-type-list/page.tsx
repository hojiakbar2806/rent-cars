import Link from "next/link";
import { CarType } from "@/types/cars";
import { externalApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteButton from "@/components/pages/new-car-type/DeleteButton";


const CarsTypeListPage = async () => {
  const cars = await externalApi.get("/v1/car-types").then((res) => res.data as CarType[]);


  return <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
    <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
      <h2 className="text-2xl font-bold">Mashina Turlari</h2>
      <Button asChild>
        <Link href="/dashboard/car-type-list/new" >Yangi mashina tur qo'shish</Link>
      </Button>
    </div>
    <div className="w-full bg-white rounded-lg overflow-hidden">
      {
        cars === null ?
          <div className="w-full h-full flex justify-center items-center p-8">
            <h2 className="text-2xl">Nimadur xato ketti yoki mashinalar topilmadi</h2>
          </div> :
          <Table className="w-full">
            <TableHeader className="bg-primary">
              <TableRow>
                <TableHead className="w-[100px] text-white">ID</TableHead>
                <TableHead className="text-white">Nom</TableHead>
                <TableHead className="text-white">Yaratilgan vaqt</TableHead>
                <TableHead className="text-white">Yanglilangan vaqt</TableHead>
                <TableHead className="text-white">Tavsif</TableHead>
                <TableHead className="text-white text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                cars.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                      <TableCell>{new Date(item.updated_at).toLocaleString()}</TableCell>
                      <TableCell className="max-w-[300px] overflow-auto scrollbar-none">{item.description}</TableCell>
                      <TableCell className="flex justify-center">
                        <DeleteButton id={item.id} />
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>

          </Table>
      }

    </div>
  </div>;
};

export default CarsTypeListPage

export const revalidate = 3600