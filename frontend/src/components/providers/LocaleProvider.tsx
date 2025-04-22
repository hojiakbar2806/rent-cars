"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { Dictionary } from "@/localization/getDictionary";
import { FC, Fragment, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  dictionary: Dictionary;
};

const LocaleProvider: FC<Props> = ({ children, dictionary }) => {
  useEffect(
    () => useDictionary.getState().setDictionary(dictionary),
    [dictionary]
  );
  return <Fragment>{children}</Fragment>;
};

export default LocaleProvider;
