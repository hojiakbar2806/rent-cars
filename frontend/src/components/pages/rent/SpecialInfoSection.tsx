"use client";

import SectionHeader from "./SectionHeader";
import Card from "./Card";
import InputField from "@/components/shared/InputField";

interface SpecialInfoData {
  idType: string;
  idNumber: string;
  startTime: string;
  endTime: string;
  pickupTime: string;
  returnTime: string;
}

interface SpecialInfoSectionProps {
  data?: SpecialInfoData;
  onChange?: (field: keyof SpecialInfoData, value: string) => void;
}

const SpecialInfoSection: React.FC<SpecialInfoSectionProps> = ({
  data,
  onChange,
}) => {
  const handleChange =
    (field: keyof SpecialInfoData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(field, e.target.value);
    };

  return (
    <Card>
      <SectionHeader title="Special Info" step="2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputField
          label="ID Type"
          defaultValue={data?.idType || ""}
          onChange={handleChange("idType")}
        />
        <InputField
          label="ID #"
          defaultValue={data?.idNumber || ""}
          onChange={handleChange("idNumber")}
        />
      </div>

      <div className="mb-2 text-sm text-gray-600">Time</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputField
          defaultValue={data?.startTime || ""}
          onChange={handleChange("startTime")}
        />
        <InputField
          defaultValue={data?.endTime || ""}
          onChange={handleChange("endTime")}
        />
      </div>

      <div className="mb-2 text-sm text-gray-600">Time</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          defaultValue={data?.pickupTime || ""}
          onChange={handleChange("pickupTime")}
        />
        <InputField
          defaultValue={data?.returnTime || ""}
          onChange={handleChange("returnTime")}
        />
      </div>
    </Card>
  );
};

export default SpecialInfoSection;
