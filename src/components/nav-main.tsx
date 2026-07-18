import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Menu } from "@/constant/menu";
import { quickStart } from "@/constant/routs";
import { CirclePlusIcon, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    active?: boolean;
  }[];
}) {
  const navigate = useNavigate();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 border border-primary duration-200 ease-linear hover:bg-secondary/70 hover:border-0"
              onClick={() => {
                navigate(quickStart);
              }}
            >
              <CirclePlusIcon />
              <span>{Menu.quickStart}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-1">
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className={`${item.active && "min-w-8 rounded-md bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"}`}
            >
              <SidebarMenuButton tooltip={item.title} onClick={()=>navigate(item.url)}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
