"use server";

import axios from "@/lib/axios";

export default async function postLike(id: number, token: string | null) {
    try {
        if (!token) throw new Error("Please login first");
        const res = await axios.post(`/v1/favorites/${id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { message: res.data.message };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail[0].msg);
        }
        throw new Error(String(error));
    }
}
