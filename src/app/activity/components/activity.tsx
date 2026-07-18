import ProjectIcon from "@/assets/icons/project";

const Activity = ({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-full border rounded-md flex flex-col gap-3 p-3 hover:scale-103 cursor-pointer"
      onClick={onClick}
    >
      <ProjectIcon w="20px" h="20px" />
      <p className="font-semibold text-lg">{title}</p>
      <div className="w-full bg-gray-300 h-px"></div>
      <p>{desc}</p>
    </div>
  );
};

export default Activity;
