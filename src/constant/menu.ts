import {
    ChartBarIcon,
    FolderIcon,
    LayoutDashboardIcon,
    ListIcon,
    UsersIcon
} from "lucide-react";
import { activityList, analysis, visualization } from "./routs";
export const Menu = {
  dashboard: "Dashboard",
  quickStart: "Create Activity",
  activeList: "Activities"
};

export const navMain = {
  'dashboard':{
    title: Menu.dashboard,
    url: "/",
    icon: LayoutDashboardIcon,
  },
  'visualization':{
    title: "Visualization",
    url: visualization,
    icon: ListIcon,
  },
  'analysis':{
    title: "Analytics",
    url: analysis,
    icon: ChartBarIcon,
  },
  'activityList':{
    title: Menu.activeList,
    url: activityList,
    icon: FolderIcon,
  },
  'team':{
    title: "Team",
    url: "#",
    icon: UsersIcon,
  },
};
