import BackIcon from "@/assets/icons/back";
import LoadingPage from "@/components/LoadingPage";
import { getOneActivityById } from "@/service/getAllActivities";
import { getFishByActivity } from "@/service/getFishsByActivity";
import type { ActivityResponse } from "@/types/activity";
import type { Fish, FishInput } from "@/types/fish";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DropDown, { Popup } from "./components/dropDown";
import { updateFishData } from "@/service/updateFishData";
import LoadingIcon from "@/assets/icons/loading";

const DetailActivity = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [fishsInfo, setFishsInfo] = useState<Fish[]>([]);
  const [activity, setActivity] = useState<ActivityResponse>();
  const [modifyFish, setModifyFish] = useState(false);
  const [fishLoading, setFishLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [fishInputs, setFishInputs] = useState<FishInput>({
    name: "",
    behavior: "",
    length: 0,
    species: "",
    weight: 0,
    body_points: 0,
    duration: 0,
    fps: 0,
    max_amplitude: 0,
    tail_beat_frequency: 0,
    wave_length: 0,
    file: null
  });

  const handleSetFishInfo = (v: Fish[]) => {
    setFishsInfo(v);
    setFishInputs(v[0] as FishInput);
  };

  const handleUpdateFish = () => {
    if (fishInputs.name.length < 1) {
      alert("please fish name is required");
      return;
    } else if (fishInputs.species.length < 1) {
      alert("please the fish specie is required");
      return;
    }
    setFishLoading(true);
    updateFishData(fishsInfo[0].id, fishInputs, setFishInputs).then(() => {
      setFishLoading(false);
      setModifyFish(false);
      alert("Updated successfully");
    });
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getFishByActivity(activityId || ""),
      getOneActivityById(activityId || "", setActivity),
    ]).then((data) => {
      console.log(data[0])
      handleSetFishInfo(data[0]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {openModal && (
        <Popup
          activity={
            activity || { name: "", description: "", id: "", user_id: 0 }
          }
          setOpen={setOpenModal}
          setActivity={setActivity}
        />
      )}
      <div className="flex w-full justify-between items-center px-6">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer"
        >
          <BackIcon w="24px" h="24px" />
        </div>
        <DropDown
          setChangeFishInfo={setModifyFish}
          setOpenModal={setOpenModal}
        />
      </div>
      <div className="mx-6 p-3 rounded-md border border-gray-300 shadow-lg flex flex-col gap-2">
        <p className="font-semibold text-lg">{activity?.name}</p>
        <div className="w-full h-px bg-gray-300"></div>
        <p>{activity?.description}</p>
      </div>
      {fishsInfo.map((fish, ind) => (
        <div
          className="flex mx-6 p-3 rounded-md border border-gray-300 shadow-lg flex-col gap-2"
          key={fish.id + ind}
        >
          <div className="flex flex-col" key={fish.id + fish.name}>
            <p className="font-semibold">Name:</p>
            <input
              type="text"
              name="fishName"
              id="fishName"
              value={fishInputs.name}
              onChange={(e) =>
                setFishInputs({ ...fishInputs, name: e.target.value })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.species}>
            <p className="font-semibold">Specie:</p>
            <input
              type="text"
              name="fishSpecie"
              id="fishSpecie"
              value={fishInputs.species}
              onChange={(e) =>
                setFishInputs({ ...fishInputs, species: e.target.value })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.length}>
            <p className="font-semibold">Lenght:</p>
            <input
              type="number"
              name="fishLenght"
              id="fishLenght"
              value={fishInputs.length}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  length: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">weight:</p>
            <input
              type="number"
              name="fishWeight"
              id="fishWeight"
              value={fishInputs.weight}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  weight: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>

          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">Number of points along the body:</p>
            <input
              type="number"
              name="bodyPoints"
              id="bodyPoints"
              value={fishInputs.body_points}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  body_points: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">Duration:</p>
            <input
              type="number"
              name="duration"
              id="duration"
              value={fishInputs.duration}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  duration: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">Frame per second (FPS):</p>
            <input
              type="number"
              name="fsp"
              id="fsp"
              value={fishInputs.fps}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  fps: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">weight:</p>
            <input
              type="number"
              name="fishWeight"
              id="fishWeight"
              value={fishInputs.max_amplitude}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  max_amplitude: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">weight:</p>
            <input
              type="number"
              name="fishWeight"
              id="fishWeight"
              value={fishInputs.weight}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  weight: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.weight}>
            <p className="font-semibold">weight:</p>
            <input
              type="number"
              name="fishWeight"
              id="fishWeight"
              value={fishInputs.weight}
              onChange={(e) =>
                setFishInputs({
                  ...fishInputs,
                  weight: parseFloat(e.target.value),
                })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
          <div className="flex flex-col" key={fish.id + fish.behavior}>
            <p className="font-semibold">Behavior:</p>
            <input
              type="text"
              name="fishBehavoir"
              id="fishBehavoir"
              value={fishInputs.behavior}
              onChange={(e) =>
                setFishInputs({ ...fishInputs, behavior: e.target.value })
              }
              placeholder="No Information"
              className={`w-full focus:outline-0 ${modifyFish ? "border rounded-md" : "border-b"} rounded-md p-2`}
              disabled={!modifyFish}
            />
          </div>
        </div>
      ))}
      {modifyFish && (
        <div className="flex mx-6 justify-between items-center">
          <button
            className="p-2 bg-gray-400 rounded-md w-40 text-white"
            onClick={() => setModifyFish(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary hover:bg-primary/90 cursor-pointer p-2 rounded-md shadow text-white"
            onClick={handleUpdateFish}
            disabled={fishLoading}
          >
            {fishLoading ? <LoadingIcon /> : <p>Update Fish Information</p>}
          </button>
        </div>
      )}
    </>
  );
};

export default DetailActivity;
