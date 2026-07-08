const FishFrom = ({nex, prev}:{nex:()=>void, prev:()=>void}) => {
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
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Fish Size (optional)
        </label>
        <input
          type="number"
          id="FishSize"
          name="FishSize"
          placeholder="Enter fish size"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityDescription" className="text-sm font-semibold">
          Fish Behavior (optional)
        </label>
        <textarea
          id="activityDescription"
          name="activityDescription"
          placeholder="Enter activity description"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
        />
      </div>
      {/* end of the form */}
      <div className="w-full flex justify-between mt-4">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-300" onClick={prev}>
          Previous
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary" onClick={nex}>
          Save Informations
        </button>
      </div>
    </div>
  );
};

export default FishFrom;
