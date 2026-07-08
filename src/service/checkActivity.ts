import { getActivitiesUrl } from "@/constant/endpoints"

export const getActivity = async (setLoading: (v:boolean)=>void) => {
    setLoading(true)
    let result = []
    try{
        const response = await fetch(getActivitiesUrl)
        result = await response.json()
    }catch(e){
        console.log(e)
    }finally{
        setLoading(false)
        return result
    }
}