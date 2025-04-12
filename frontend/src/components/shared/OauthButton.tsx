import Image from "next/image";
import React, { FC } from "react";
import { BASE_URL } from "@/lib/const";
import { Button } from "@/components/ui/button";

type OauthButtonProps = {
  label: string;
  iconPath: string;
  oauth: string;
};

const OauthButton: FC<OauthButtonProps> = ({ label, iconPath, oauth }) => {
  return (
    <Button
      type="button"
      className="w-full"
      variant="outline"
      onClick={() => (window.location.href = `${BASE_URL}/auth/login/${oauth}`)}
    >
      <Image src={iconPath} alt={label} width={30} height={30} />
      {label}
    </Button>
  );
};

export default OauthButton;
