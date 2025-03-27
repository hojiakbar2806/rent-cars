import { getCarById } from "@/app/actions/cars/getCarById";
import BillingInfoSection from "@/components/pages/rent/BillingInfoSection";
import ConfirmationSection from "@/components/pages/rent/ConfimrationSection";
import PaymentMethodSection from "@/components/pages/rent/PaymentMethodSection";
import RentalSummary from "@/components/pages/rent/RentalSummary";
import SpecialInfoSection from "@/components/pages/rent/SpecialInfoSection";
import { FC, use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const CheckoutPage: FC<Props> = ({ params }) => {
  const id = use(params).id;
  const data = use(getCarById(+id));
  return (
    <div className="w-full flex flex-col-reverse md:flex-row p-8 gap-8 items-start">
      <div className="w-full md:flex-1 flex flex-col">
        <BillingInfoSection />
        <SpecialInfoSection />
        <PaymentMethodSection />
        <ConfirmationSection />
      </div>
      <RentalSummary data={data} />
    </div>
  );
};

export default CheckoutPage;
