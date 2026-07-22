import type { ActivityResponse } from "@/types/activity";
import type { FileDataStructure } from "@/types/fish";
import { createContext, useState, type ReactNode } from "react";

interface ContextType{
  activity: { id: string, name: string, description: string, user_id: number },
  fish: {
    id: string,
    name: string,
    note: string,
    behavior: string,
    weight: number,
    length: number,
    activity_id: string,
    file: {
      id: string;
      path: string;
      fullPath: string;
    } | null,
  },
  setActivity: (_: ActivityResponse) => void,
  setFish: (_: any) => void,
  fileData: null | FileDataStructure,
  setFileData: (_:null|FileDataStructure) => void
}

export const dataContext = createContext<ContextType>({
  activity: { id: "", name: "", description: "", user_id: 0 },
  fish: {
    id: "",
    name: "",
    note: "",
    behavior: "",
    weight: 0,
    length: 0,
    activity_id: "",
    file: null
  },
  setActivity: (_: ActivityResponse) => {},
  setFish: (_: any) => {},
  fileData: null,
  setFileData: (_:any) => {}
});

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<ActivityResponse>({
    id: "",
    name: "",
    description: "",
    user_id: 0,
  });

  const [fish, setFish] = useState({
    id: "",
    name: "",
    note: "",
    behavior: "",
    weight: 0,
    length: 0,
    activity_id: "",
    file: null,
  });

  const [fileData, setFileData] = useState<FileDataStructure|null>(null)

  return (
    <dataContext.Provider
      value={{
        activity: active,
        fish,
        setActivity: setActive,
        setFish,
        fileData,
        setFileData
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
