"use client";

import SectionHeader from "./SectionHeader";
import Card from "./Card";
import PaymentOption from "./PaymentOption";
import InputField from "@/components/shared/InputField";
import { ChangeEvent, FC, useState } from "react";
import { cn } from "@/lib/utils";

type PaymentMethod = "creditCard" | "paypal" | "bitcoin";

interface CardData {
  cardNumber: string;
  expirationDate: string;
  cardHolder: string;
  cvc: string;
}

const PaymentMethodSection: FC = () => {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("creditCard");
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    expirationDate: "",
    cardHolder: "",
    cvc: "",
  });

  const handleCardDataChange =
    (f: keyof CardData) => (e: ChangeEvent<HTMLInputElement>) => {
      setCardData((prev) => ({ ...prev, [f]: e.target.value }));
    };

  const onMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  return (
    <Card>
      <SectionHeader title="Payment Method" step="3" />

      <div className="mb-4">
        <PaymentOption
          name="Plastik karta"
          selected={selectedMethod === "creditCard"}
          onClick={() => onMethodChange("creditCard")}
          logo={
            <div
              className={cn(
                "w-10 h-6  rounded-full bg-slate-400 relative flex items-center px-1 ml-2 transition-all duration-300",
                selectedMethod === "creditCard" && "bg-blue-600"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 bg-white rounded-full absolute right-1  transition-all duration-300",
                  selectedMethod !== "creditCard" && "right-5"
                )}
              ></div>
            </div>
          }
        />

        {selectedMethod === "creditCard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Plastik karta raqami"
              defaultValue={cardData?.cardNumber || ""}
              onChange={handleCardDataChange("cardNumber")}
            />
            <InputField
              label="Muddati"
              defaultValue={cardData?.expirationDate || ""}
              onChange={handleCardDataChange("expirationDate")}
            />
            <InputField
              label="Karta sahibi"
              defaultValue={cardData?.cardHolder || ""}
              onChange={handleCardDataChange("cardHolder")}
            />
            <InputField
              label="CVC"
              defaultValue={cardData?.cvc || ""}
              onChange={handleCardDataChange("cvc")}
            />
          </div>
        )}
      </div>

      <PaymentOption
        name="PayPal"
        selected={selectedMethod === "paypal"}
        onClick={() => onMethodChange?.("paypal")}
        logo={<div className="text-blue-600 font-bold">PayPal</div>}
      />

      <PaymentOption
        name="Bitcoin"
        selected={selectedMethod === "bitcoin"}
        onClick={() => onMethodChange?.("bitcoin")}
        logo={<div className="text-yellow-500 font-bold">Bitcoin</div>}
      />
    </Card>
  );
};

export default PaymentMethodSection;
