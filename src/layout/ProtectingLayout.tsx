import { activityKey } from "@/constant/localStorage";
import { quickStart } from "@/constant/routs";
import { dataContext } from "@/hooks/useContext";
import { getActivity } from "@/service/checkActivity";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const ProtectingLayout = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const navigate = useNavigate();
  const { setActivity } = useContext(dataContext);

  useEffect(() => {
    getActivity(setLoading).then((data) => {
      if (data.length == 0) {
        navigate(quickStart);
      }

      console.log(data)

      setActivities(data);
      const selectedActivity = localStorage.getItem(activityKey);
      if (
        selectedActivity &&
        data.filter((i: any) => i.id == selectedActivity).length > 0
      ) {
        setActivity(data.filter((i: any) => i.id == selectedActivity)[0]);
      } else {
        localStorage.setItem(activityKey, data[0].id)
        setActivity(data[0]);
      }
    });
  }, []);

  if (loading && activities.length == 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="font-bold text-2xl animate-bounce">Loading ...</p>
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectingLayout;
