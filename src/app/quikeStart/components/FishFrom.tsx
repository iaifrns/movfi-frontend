import { useEffect, useState } from "react";
import type { Fish } from "..";

const FishFrom = ({
  nex,
  prev,
  fish,
  setFish,
}: {
  nex: () => void;
  prev: () => void;
  fish: Fish;
  setFish: (f: Fish) => void;
}) => {

  const [isOk, setIsOk] = useState(false)
  const [err, setErr]= useState('')

  useEffect(()=>{
    if(fish.name.length < 1){
      setErr('please enter the name of the fish')
      setIsOk(false)
    }else{
      setIsOk(true)
    }
  }, [fish.name])

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-xl font-bold mb-2">Fish Informations</p>

      {/* start of the form */}
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityName" className="text-sm font-semibold">
          Species Name
        </label>
        <input
          type="text"
          id="activityName"
          name="activityName"
          placeholder="Enter activity name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={fish.name}
          onChange={e=>setFish({...fish, name: e.target.value})}
        />
        <p className="text-sm text-red-400">{err}</p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Fish Length in cm (optional)
        </label>
        <input
          type="number"
          id="FishSize"
          name="FishSize"
          placeholder="Enter fish size"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={fish.lenght}
          onChange={e => setFish({...fish, lenght: parseInt(e.target.value)})}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Fish Weight in kg (optional)
        </label>
        <input
          type="number"
          id="FishSize"
          name="FishSize"
          placeholder="Enter fish size"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={fish.weight}
          onChange={e => setFish({...fish, weight: parseInt(e.target.value)})}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Fish Behavior (optional)
        </label>
        <textarea
          id="activityBehavior"
          name="activityBehavior"
          placeholder="Enter activity description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={fish.behavior}
          onChange={e=>setFish({...fish, behavior: e.target.value})}
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Notes (optional)
        </label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          placeholder="Enter activity description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={fish.note}
          onChange={e=>setFish({...fish, note: e.target.value})}
        />
      </div>
      {/* end of the form */}
      <div className="w-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-300"
          onClick={prev}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-primary/50"
          onClick={nex}
          disabled={!isOk}
        >
          Save Informations
        </button>
      </div>
    </div>
  );
};

export default FishFrom;
