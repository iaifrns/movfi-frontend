import SearchInput from "@/components/searchInput";
import Activity from "./components/activity";
import { useEffect, useState } from "react";
import { getActivities } from "@/service/getAllActivities";
import LoadingPage from "@/components/LoadingPage";
import type { ActivityResponse } from "@/types/activity";
import { useNavigate } from "react-router";
import EmptyListIcon from "@/assets/icons/emptyList";

const ActivityList = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityResponse[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filteredActivities, setFilteredActivities] = useState<
    ActivityResponse[]
  >([]);

  const navigate = useNavigate();

  const handleSetActivities = (v: ActivityResponse[]) => {
    setActivities(v);
    setFilteredActivities(v);
  };

  useEffect(() => {
    getActivities(setLoading, handleSetActivities);
  }, []);

  useEffect(() => {
    setFilteredActivities(
      activities.filter((activity) =>
        activity.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
      ),
    );
  }, [searchText]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="px-6 flex flex-col gap-3">
        <p className="text-lg font-semibold">List of all Activities</p>
        <SearchInput value={searchText} onchange={setSearchText} />
      </div>
      {filteredActivities.length < 1 ? (
        <div className="w-full h-[40vh] flex flex-col justify-center items-center gap-2">
          <EmptyListIcon w="90px" h="90px" />
          <p className="font-semibold">No Activity Found</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 px-6 lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {filteredActivities.map((activity, ind) => (
            <Activity
              title={activity.name}
              desc={activity.description}
              key={activity.id + ind}
              onClick={() => navigate("/activity/detail/" + activity.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ActivityList;
