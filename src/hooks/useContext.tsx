import type { ActivityResponse } from "@/types/activity";
import type { FileDataStructure } from "@/types/fish";
import type { User } from "@/types/user";
import { createContext, useState, type ReactNode } from "react";

interface ContextType {
  activity: { id: string; name: string; description: string; user_id: number };
  fish: {
    id: string;
    name: string;
    behavior: string;
    weight: number;
    length: number;
    activity_id: string;
    file: {
      id: string;
      path: string;
      fullPath: string;
    } | null;
    fps?: number;
    duration?: number;
    body_points?: number;
    max_amplitude?: number;
    tail_beat_frequency?: number;
    wave_length?: number;
  };
  setActivity: (_: ActivityResponse) => void;
  setFish: (_: any) => void;
  fileData: null | FileDataStructure;
  setFileData: (_: null | FileDataStructure) => void;
  count: number;
  setCount: (_: number) => void;
  user: User,
  setUser: (_:User) => void,
  joints: [],
  setJoints: (_:[]) => void
}

export const dataContext = createContext<ContextType>({
  activity: { id: "", name: "", description: "", user_id: 0 },
  fish: {
    id: "",
    name: "",
    behavior: "",
    weight: 0,
    length: 0,
    activity_id: "",
    file: null,
  },
  setActivity: (_: ActivityResponse) => {},
  setFish: (_: any) => {},
  fileData: null,
  setFileData: (_: any) => {},
  count: 0,
  setCount: (_: number) => {},
  user: {id: "", name: "", email: ""},
  setUser: (_:User) => {},
  joints: [],
  setJoints: (_:[]) => {}
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

  const [fileData, setFileData] = useState<FileDataStructure | null>(null);

  const [count, setCount] = useState(0);

  const [user, setUser] = useState<User>({id: "", name: "", email: ""})

  const [joints, setJoints] = useState<[]>([])

  return (
    <dataContext.Provider
      value={{
        activity: active,
        fish,
        setActivity: setActive,
        setFish,
        fileData,
        setFileData,
        count,
        setCount,
        user,
        setUser,
        joints,
        setJoints
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default DataProvider;
