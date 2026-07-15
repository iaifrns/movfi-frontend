import * as React from "react";

import FishIcon from "@/assets/icons/fish";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { navMain } from "@/constant/menu";
import { dataContext } from "@/hooks/useContext";
import {
  CameraIcon,
  CircleHelpIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  FileTextIcon,
  SearchIcon,
  Settings2Icon,
  type LucideIcon,
} from "lucide-react";
import { useLocation, useMatch } from "react-router";

const routerConfig = {
  "/": {
    sideBarData: {
      ...navMain,
      dashboard: { ...navMain.dashboard, active: true },
    },
  },
  "/quick-start": {
    sideBarData: {
      ...navMain,
      quickStart: { active: true },
    },
  },
};

const data = {
  user: {
    name: "shadcn",
    activity: "",
    avatar: "/avatars/shadcn.jpg",
  },
  navClouds: [
    {
      title: "Capture",
      icon: <CameraIcon />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <FileTextIcon />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <DatabaseIcon />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <FileIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activity } = React.useContext(dataContext);

  const location = useLocation();

  const currentRoute = location.pathname;
  const config =
    routerConfig[currentRoute as keyof typeof routerConfig] ||
    routerConfig["/"];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <FishIcon w="24px" h="24px" />
              <span className="text-base font-semibold">MovFi.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            Object.values(config.sideBarData) as {
              title: string;
              url: string;
              icon?: LucideIcon;
              active?: boolean;
            }[]
          }
        />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...data.user, activity: activity.name }} />
      </SidebarFooter>
    </Sidebar>
  );
}
