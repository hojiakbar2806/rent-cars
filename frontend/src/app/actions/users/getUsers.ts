"use server";

import { BASE_URL } from "@/lib/const";
import { UserType } from "@/types/users";

export async function getUsers(): Promise<UserType[]> {
  const response = await fetch(`${BASE_URL}/v1/users`, {
    headers: { "Cache-Control": "max-age=300, stale-while-revalidate=600" },
    next: { revalidate: 300 },
  });
  return response.json();
}
