import { createActivity } from "./createActivity";
import { createFish } from "./createFish";

type Fish = {
  name: string;
  note: string;
  behavior: string;
  weight: number;
  lenght: number;
}

export const quickStart = async (active:{name:string, description:string},fish: Fish, file: File) => {
    let data = {
        activity: undefined,
        fish: undefined,
    }

    await createActivity(active, (v) => {data = {...data, activity: v}})

    if(data.activity){
        await createFish(fish, (v)=> data = {...data, fish: v})
    }else if(data.activity && data.fish){
        
    }
}