import type { Activity } from "@/app/quikeStart/services/createActivity";
import { createContext, useState, type ReactNode } from "react";

export const dataContext = createContext({
  active: { id: "", name: "", description: "", user_id: 0 },
  fish: {
    id: "",
    name: "",
    note: "",
    behavior: "",
    weight: 0,
    length: 0,
    activity_id: "",
    file: null,
  },
  dataSet: null,
  setDataSet: (_: any) => {},
  setActivity: (_: Activity) => {},
  setFish: (_: any) => {},
});

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<Activity>({
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
        active: active,
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
