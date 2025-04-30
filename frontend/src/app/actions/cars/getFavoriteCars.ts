import { redis } from "@/app/lib/redis";
import { externalApi, internalApi } from "@/lib/api";
import { CarItem } from "@/types/cars";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

const getFavoriteCars = async() => {
    const cookieStore = await cookies();
    const session_id = cookieStore.get('session_id')?.value;
    if (!session_id) return null;
    const sessionData = await redis.get(session_id).then(res => res ? JSON.parse(res) : null);
    if (!sessionData) return null;


    try{
        const res = await externalApi.get('/v1/favorites', {headers: { Authorization: `Bearer ${sessionData.access_token}`}})
        return res.data as CarItem[]
    }
    catch(error){
        if (isAxiosError(error)){
            if (error.response?.status === 401) {
                const newSession = await internalApi.get("/api/auth/refresh", {headers: { cookie: `session_id=${session_id}` }})
                const res = await externalApi.get('/v1/favorites', {headers: { Authorization: `Bearer ${newSession.data.access_token}`}})
                return res.data as CarItem[]
            }   
        }
        return null;
    }
}

export default getFavoriteCars