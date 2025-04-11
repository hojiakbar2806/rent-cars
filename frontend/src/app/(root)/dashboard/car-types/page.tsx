import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CarTypesPage = () => {
  return <div className="flex-1 p-5 h-full overflow-scroll">
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="w-[100px] text-white">ID</TableHead>
            <TableHead className="text-white">First Name</TableHead>
            <TableHead className="text-white">Last Name</TableHead>
            <TableHead className="text-white">Password</TableHead>
            <TableHead className="text-white">Created At</TableHead>
            <TableHead className="text-white">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold">1</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Paid</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>;
};

export default CarTypesPage;
