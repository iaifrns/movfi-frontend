import type { ActivityResponse } from "@/types/activity";
import { createContext, useState, type ReactNode } from "react";

export const dataContext = createContext({
  activity: { id: "", name: "", description: "", user_id: 0 },
  fish: {
    id: "",
    name: "",
    note: "",
    behavior: "",
    weight: 0,
    length: 0,
    activity_id: "",
    file: null as {
      id: string;
      path: string;
      fullPath: string;
    } | null,
  },
  dataSet: null,
  setDataSet: (_: any) => {},
  setActivity: (_: ActivityResponse) => {},
  setFish: (_: any) => {},
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

  const [dataSet, setDataSet] = useState(null);

  return (
    <dataContext.Provider
      value={{
        activity: active,
        fish,
        setActivity: setActive,
        setFish,
        dataSet,
        setDataSet,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
