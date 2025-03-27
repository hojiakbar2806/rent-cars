import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
      )}
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={label}
        {...props}
      />
    </div>
  );
};

export default InputField;
