import { DashboardChart } from "@/components/pages/dashboard/Chart";

const DashboardPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-5 p-5 overflow-scroll">
      {/* <div className="grid md:grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2 p-5 rounded-lg bg-white shadow-md">
          <h1 className="text-2xl font-semibold">Mashinalar</h1>
          <div className="flex items-center justify-between text-xl font-semibold"><h2 className="text-3xl font-semibold text-end">{cars?.length} ta</h2></div>
          <p className="mt-auto">Sport mashinalar soni mashinalari yaxshi natija beryapti</p>
        </div>
        <div className="flex flex-col gap-2 p-5 rounded-lg bg-white shadow-md">
          <h1 className="text-2xl font-semibold">Jami mashina turlari</h1>
          <div className="flex items-center justify-between text-xl font-semibold"><h2 className="text-3xl font-semibold text-end">{carTypes?.length} ta</h2></div>
          <p className="mt-auto">Sport mashinalar soni mashinalari yaxshi natija beryapti</p>
        </div>
        <div className="flex flex-col gap-2 p-5 rounded-lg bg-white shadow-md">
          <h1 className="text-2xl font-semibold">Jami foydalanuvchilar</h1>
          <div className="flex items-center justify-between text-xl font-semibold"><h2 className="text-3xl font-semibold text-end">{users?.length} ta</h2></div>
          <p className="mt-auto">Ushbu oyda foydalanuvchilar 5 taga ortdi</p>
        </div>
        <div className="flex flex-col gap-2 p-5 rounded-lg bg-white shadow-md">
          <h1 className="text-2xl font-semibold">Mashina band qilganlar</h1>
          <div className="flex items-center justify-between text-xl font-semibold"><h2 className="text-3xl font-semibold text-end">{users?.length} ta</h2></div>
          <p className="mt-auto">Ushbu oyda foydalanuvchilar 3 taga ortdi</p>
        </div>
      </div> */}
      <DashboardChart />
    </div>);
};

export default DashboardPage;
