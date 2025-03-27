import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxField: React.FC<Props> = ({ children, checked, onChange }) => {
  return (
    <div className="mb-4">
      <label className="flex items-center text-sm">
        <input
          type="checkbox"
          className="w-4 h-4 mr-3"
          checked={checked}
          onChange={onChange}
        />
        {children}
      </label>
    </div>
  );
};

export default CheckboxField;
