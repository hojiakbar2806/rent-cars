"use server";

import { cache } from "react";

export const fetchCars = cache(async (params: string) => {
  console.log(params);
  const url = `https://fakestoreapi.com/products`;
  const response = await fetch(url);
  return await response.json();
});
