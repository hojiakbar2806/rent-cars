import { FC } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const RentCarPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  return <div>{id}</div>;
};

export default RentCarPage;
