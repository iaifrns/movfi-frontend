import {
    ChartBarIcon,
    FolderIcon,
    LayoutDashboardIcon,
    ListIcon,
    UsersIcon
} from "lucide-react";
export const Menu = {
  dashboard: "Dashboard",
  quickStart: "Create Activity",
};

export const navMain = {
  'dashboard':{
    title: Menu.dashboard,
    url: "/",
    icon: LayoutDashboardIcon,
  },
  'visualization':{
    title: "Visualization",
    url: "#",
    icon: ListIcon,
  },
  'analysis':{
    title: "Analytics",
    url: "#",
    icon: ChartBarIcon,
  },
  'project':{
    title: "Projects",
    url: "#",
    icon: FolderIcon,
  },
  'team':{
    title: "Team",
    url: "#",
    icon: UsersIcon,
  },
};
