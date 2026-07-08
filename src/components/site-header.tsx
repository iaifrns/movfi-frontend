import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "./ui/switch";
import MoonIcon from "@/assets/icons/moon";
import { useTheme } from "next-themes";
import SunIcon from "@/assets/icons/sun";

const theme = {
  light: "light",
  dark: "dark",
};

export function SiteHeader() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeChange = () => {
    if (resolvedTheme === theme.light) {
      setTheme(theme.dark);
    } else {
      setTheme(theme.light);
    }
    localStorage.setItem("theme", resolvedTheme === theme.light ? theme.dark : theme.light);
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex justify-between items-center w-full px-4 lg:px-6">
        <div className="flex w-full items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 h-4 data-vertical:self-auto"
          />
          <h1 className="text-base font-medium">Documents</h1>
        </div>
        <div className="flex items-center gap-3">
          {resolvedTheme === theme.dark ? (
            <MoonIcon w="20px" h="20px" />
          ) : (
            <SunIcon w="20px" h="20px" />
          )}
          <Switch
            checked={resolvedTheme == theme.light}
            onCheckedChange={handleThemeChange}
          />
        </div>
      </div>
    </header>
  );
}
