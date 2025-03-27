import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm mb-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
