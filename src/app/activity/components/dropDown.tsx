import LoadingIcon from "@/assets/icons/loading";
import MenuIcon from "@/assets/icons/menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateActivity } from "@/service/updateActivity";
import type { ActivityInput, ActivityResponse } from "@/types/activity";
import { XIcon } from "lucide-react";
import { useState } from "react";

export const Popup = ({
  activity,
  setOpen,
  setActivity,
}: {
  activity: ActivityResponse;
  setOpen: (v: boolean) => void;
  setActivity: (v: ActivityResponse) => void;
}) => {
  const [activityInfo, setActivityInfo] = useState<ActivityInput>(activity);
  const [loading, setLoading] = useState(false);

  const handleSetActivity = (v: ActivityResponse) => {
    setActivity(v);
    setActivityInfo(v);
  };

  const handleUpdateActivity = () => {
    if (activityInfo.name.length < 1) {
      alert("Please the name of the activity is required");
      return;
    } else if (activityInfo.description.length < 1) {
      alert("Please the description of the activity is required");
      return;
    }
    setLoading(true);
    updateActivity(activity.id, activityInfo, handleSetActivity).then(() => {
      setLoading(false);
      setOpen(false);
      alert("Updated successfully");
    });
  };

  return (
    <>
      <div className="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen isolate bg-black/10 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 flex justify-center items-center">
        <div className="w-150 bg-white rounded-md px-4 py-6">
          <div>
            <div className="flex justify-between items-center">
              <p>Activity Infomations</p>
              <div className="cursor-pointer" onClick={() => setOpen(false)}>
                <XIcon />
              </div>
            </div>
            <div className={"gap-3 flex flex-col my-2"}>
              <div className="flex flex-col gap-1">
                <p>Name:</p>
                <input
                  type="text"
                  name="activityName"
                  id="activityName"
                  value={activityInfo.name}
                  onChange={(e) =>
                    setActivityInfo({ ...activityInfo, name: e.target.value })
                  }
                  className="border rounded-md w-full p-2 focus:outline-0"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>description:</p>
                <textarea
                  name="activityDescription"
                  id="activityDescription"
                  value={activityInfo.description}
                  onChange={(e) =>
                    setActivityInfo({
                      ...activityInfo,
                      description: e.target.value,
                    })
                  }
                  className="border rounded-md w-full p-2 focus:outline-0 min-h-14 field-sizing-content max-h-32"
                />
              </div>
              <button
                className="p-2 bg-primary rounded-md text-white"
                onClick={handleUpdateActivity}
                disabled={loading}
              >
                {loading ? <LoadingIcon /> : <>Update Data</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DropDown = ({
  setChangeFishInfo,
  setOpenModal,
}: {
  setChangeFishInfo: (v: boolean) => void;
  setOpenModal: (v: boolean) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <MenuIcon w="24px" h="24px" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-fit"}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            Modify Activity
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setChangeFishInfo(true)}>
            Modify Fish Informations
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
