import { supabase } from "@/client/supabase"
import { supabaseBucket } from "@/constant/endpoints"

export const getDataFileFromSupabase = (fullpath: string) => {
    const {data} = supabase.storage.from(supabaseBucket).getPublicUrl(fullpath)

    console.log(data)
}