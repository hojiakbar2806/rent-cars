"use client";

import Card from "./Card";
import { Button } from "@/components/ui/button";
import CheckboxField from "@/components/shared/CheckBoxField";

interface ConfirmationData {
  marketingConsent: boolean;
  termsConsent: boolean;
}

interface ConfirmationSectionProps {
  data?: ConfirmationData;
  onChange?: (field: keyof ConfirmationData, value: boolean) => void;
  onSubmit?: () => void;
}

const ConfirmationSection: React.FC<ConfirmationSectionProps> = ({
  data,
  onChange,
  onSubmit,
}) => {
  const handleChange =
    (field: keyof ConfirmationData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(field, e.target.checked);
    };

  return (
    <Card>
      <CheckboxField
        checked={data?.marketingConsent}
        onChange={handleChange("marketingConsent")}
      >
        I agree with sending marketing and newsletter emails. No spam, promised!
      </CheckboxField>
      <div className="mb-6">
        <CheckboxField
          checked={data?.termsConsent}
          onChange={handleChange("termsConsent")}
        >
          I agree with our terms and conditions and privacy policy.
        </CheckboxField>
      </div>
      <Button className="w-full md:w-auto" onClick={onSubmit}>
        Rent Now
      </Button>
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
            clipRule="evenodd"
          />
        </svg>
        All your data is safe
      </div>
    </Card>
  );
};

export default ConfirmationSection;
