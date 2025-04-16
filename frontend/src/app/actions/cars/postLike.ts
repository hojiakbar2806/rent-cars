"use server";

import axios from "@/lib/axios";

export default async function postLike(id: number, token: string | null) {
    try {
        if (!token) throw new Error("Avval ro'yxatdan o'ting");
        const res = await axios.post(`/v1/favorites/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { message: res.data.message };
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : "Something went wrong");
    }
}
