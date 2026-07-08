import { useEffect, useState } from "react";
import type { Activiy } from "..";

const ActivityForm = ({
  onclick,
  activity,
  setActivity,
}: {
  onclick: () => void;
  activity: Activiy;
  setActivity: (a: Activiy) => void;
}) => {

  const [errMess, setErrMess] = useState({
    name: " ",
    desc: " "
  })
  const [isOk, setIsOk] = useState(false)

  useEffect(()=>{
    if(activity.name.length < 1){
      setErrMess({...errMess, name: 'Please enter the name'})
      setIsOk(false)
    }else if(activity.description.length < 1){
      setErrMess({name: ' ', desc: 'Please enter the description'})
      setIsOk(false)
    }else{
      setErrMess({name: ' ', desc: ' '})
      setIsOk(true)
    }
  },[activity.description, activity.name])

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-xl font-bold mb-2">Create Activity</p>

      {/* start of the form */}
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityName" className="text-sm font-semibold">
          Activity Name*
        </label>
        <input
          type="text"
          id="activityName"
          name="activityName"
          placeholder="Enter activity name"
          value={activity.name}
          onChange={e => setActivity({...activity, name: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-red-400">{errMess.name}</p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Activity Description*
        </label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          placeholder="Enter activity description"
          value={activity.description}
          onChange={e => setActivity({...activity, description: e.target.value})}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-sm text-red-400">{errMess.name}</p>
      </div>
      {/* end of the form */}
      <div className="w-full flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-300"
          disabled
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-primary/50"
          onClick={onclick}
          disabled={!isOk}
        >
          Create Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityForm;
