const ActivityForm = ({ onclick }: { onclick: () => void }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-xl font-bold mb-2">Create Activity</p>

      {/* start of the form */}
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="activityName" className="text-sm font-semibold">
          Activity Name
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
          Activity Description
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
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-300"
          disabled
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onclick}
        >
          Create Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityForm;
