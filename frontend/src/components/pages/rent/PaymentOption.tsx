import { ReactNode } from "react";

type Props = {
  name: string;
  logo: ReactNode;
  selected: boolean;
  onClick: () => void;
};

const PaymentOption: React.FC<Props> = ({ name, logo, selected, onClick }) => {
  return (
    <div
      className="flex items-center justify-between p-3 border rounded-lg mb-4 cursor-pointer"
      onClick={onClick}
      data-selected={selected}
    >
      <div className="flex items-center">
        <div
          className={`w-5 h-5 transition-all duration-300 ${
            selected ? "bg-blue-600" : "border border-gray-300"
          } rounded-full flex items-center justify-center mr-3`}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span>{name}</span>
      </div>
      <div className="ml-auto">{logo}</div>
    </div>
  );
};

export default PaymentOption;
