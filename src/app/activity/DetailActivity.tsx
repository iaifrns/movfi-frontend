import BackIcon from "@/assets/icons/back";
import MenuIcon from "@/assets/icons/menu";
import LoadingPage from "@/components/LoadingPage";
import { getFishByActivity } from "@/service/getFishsByActivity";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const DetailActivity = () => {

    const {activityId} = useParams<{activityId: string}>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getFishByActivity(setLoading, activityId || '')
    },[])

    if(loading) {
        return <LoadingPage />
    }

  return (
    <>
      <div className="flex w-full justify-between items-center px-6">
        <div onClick={()=>{navigate(-1)}}><BackIcon w="24px" h="24px" /></div>
        <MenuIcon w="24px" h="24px" />
      </div>
      <div className="mx-6 p-3 rounded-md border border-gray-300 shadow-lg flex flex-col gap-2">
        <p className="font-semibold text-lg">a;lksfal;skdfjalksdjflka</p>
        <div className="w-full h-px bg-gray-300"></div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,
          laboriosam quos totam ipsam sint nihil tempora suscipit dolorum
          voluptatum dolorem in officiis vero voluptates, ratione non nisi
          reprehenderit commodi! Quae?
        </p>
      </div>
    </>
  );
};

export default DetailActivity;
