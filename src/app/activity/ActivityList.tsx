import SearchInput from "@/components/searchInput";
import Activity from "./components/activity";
import { useEffect, useState } from "react";
import { getActivities } from "@/service/getAllActivities";
import LoadingPage from "@/components/LoadingPage";
import type { ActivityResponse } from "@/types/activity";
import { useNavigate } from "react-router";

const ActivityList = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    getActivities(setLoading, setActivities);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="px-6 flex flex-col gap-3">
        <p className="text-lg font-semibold">List of all Activities</p>
        <SearchInput />
      </div>
      <div className="flex flex-wrap gap-2 px-6 lg:grid lg:grid-cols-2 xl:grid-cols-3">
        {activities.map((activity, ind) => (
          <Activity
            title={activity.name}
            desc={activity.description}
            key={activity.id + ind}
            onClick={()=>navigate('/activity/detail/'+activity.id)}
          />
        ))}
      </div>
    </>
  );
};

export default ActivityList;
