import { getFishsUrl } from "@/constant/endpoints"

export const getFishByActivity = async (setLoading:(v:boolean)=>void, activityId: string) => {
    try{
        setLoading(true)
        const response = await fetch(getFishsUrl+`/${activityId}`)
        const data = await response.json()

        console.log(data)
    }catch(e){
        console.log(e)
    }finally{
        setLoading(false)
    }
}