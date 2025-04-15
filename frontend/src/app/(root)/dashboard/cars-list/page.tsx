import { use } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCars } from "@/app/actions/cars/getCars";

const CarsListPage = () => {
  const cars = use(getCars("all"));

  return <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
    <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
      <h2 className="text-2xl font-bold">Mashinalar</h2>
      <Button asChild>
        <Link href="/dashboard/cars-list/new" >Yangi Mashina</Link>
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
                <TableHead className="text-white">Turi</TableHead>
                <TableHead className="text-white">Tavsif</TableHead>
                <TableHead className="text-white">Hozirgi narx</TableHead>
                <TableHead className="text-white">Oldingi narx</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                cars.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.car_type.name}</TableCell>
                      <TableCell>{item.price_per_day}</TableCell>
                      <TableCell>{item.original_price}</TableCell>
                      <TableCell className="max-w-[300px] overflow-auto scrollbar-none">{item.description}</TableCell>
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

export default CarsListPage
