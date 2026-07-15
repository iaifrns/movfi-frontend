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
      setActivities(data);
      setActivity(data[0]);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      if (activities.length == 0) {
        navigate(quickStart);
      }
    }
  }, [loading, activities]);

  if (loading) {
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
