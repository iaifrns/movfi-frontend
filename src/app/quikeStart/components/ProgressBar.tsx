import TickIcon from "@/assets/icons/tick";

const progressInfo = [
  {
    num: 1,
    title: "Create Activity",
  },
  {
    num: 2,
    title: "Add Fish Informations",
  },
  {
    num: 3,
    title: "Upload Movement Data",
  },
];

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full flex justify-between items-center">
      {progressInfo.map((item) => (
        <>
          <div
            className="p-2 flex gap-2 items-center"
            key={"progress bar-" + item.num}
          >
            <div
              className={`rounded-full h-8 w-8 font-semibold text-white flex justify-center items-center ${progress >= item.num ? "bg-primary" : "bg-secondary"}`}
            >
              {progress > item.num ? <TickIcon color="white" w="20px" h="20px" /> : item.num}
            </div>
            <p className="">{item.title}</p>
          </div>
          {/* {item.num < 3 && (
            <div
              className={`h-1 w-20 ${progress >= item.num + 1 ? "bg-primary" : "bg-secondary"}`}
            ></div>
          )} */}
        </>
      ))}
    </div>
  );
};

export default ProgressBar;
