"use client";

import SectionHeader from "./SectionHeader";
import Card from "./Card";
import InputField from "@/components/shared/InputField";

interface BillingData {
  name: string;
  phone: string;
  address: string;
  city: string;
}

interface BillingInfoSectionProps {
  data?: BillingData;
  onChange?: (field: keyof BillingData, value: string) => void;
}

const BillingInfoSection: React.FC<BillingInfoSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange =
    (field: keyof BillingData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(field, e.target.value);
    };

  return (
    <Card>
      <SectionHeader title="Hisob-kitob ma'lumotlari" step="1" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Ism"
          defaultValue={data?.name || ""}
          onChange={handleChange("name")}
        />
        <InputField
          label="Telefon raqam"
          defaultValue={data?.phone || ""}
          onChange={handleChange("phone")}
        />
        <InputField
          label="Manzil"
          defaultValue={data?.address || ""}
          onChange={handleChange("address")}
        />
        <InputField
          label="Shahar"
          defaultValue={data?.city || ""}
          onChange={handleChange("city")}
        />
      </div>
    </Card>
  );
};

export default BillingInfoSection;
