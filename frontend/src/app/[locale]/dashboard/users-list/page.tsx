import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { externalApi } from "@/lib/api";


type User = {
  id: number;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};

const UsersListPage = async () => {
  const users = await externalApi.get("/v1/users").then((res) => res.data as User[]);

  return (
    <div className="flex-1 p-5 h-full overflow-scroll flex flex-col gap-5">
      <div className="flex justify-between items-center w-full p-5 rounded-lg bg-white">
        <h2 className="text-2xl font-bold">Foydalanuvchilar</h2>
        <Button asChild>
          <Link href="/dashboard/users-list/new" >Yangi foydalanuvchi</Link>
        </Button>
      </div>
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="w-[100px] text-white">ID</TableHead>
              <TableHead className="text-white">First Name</TableHead>
              <TableHead className="text-white">Last Name</TableHead>
              <TableHead className="text-white">Foydalanuvchi mansabi</TableHead>
              <TableHead className="text-white">Created At</TableHead>
              <TableHead className="text-white">Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.is_admin ? "Boshqaruvchi" : "Foydalanuvchi"}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
};

export default UsersListPage

export const revalidate = 5
