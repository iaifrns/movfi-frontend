/* Home
Docs
Components
Blocks
Charts
Directory
Create
118k
Components for Chat Interfaces
Building Blocks for the Web

Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks. Open Source. Free forever.
Browse Blocks
View Components
Featured
Sidebar
Login
Signup
Browse all blocks
A dashboard with sidebar, charts and data table
Open in New Tab
Open in
Files

app/dashboard/page.tsx */

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import data from "./data.json"

export default function Dashaboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
/* 
A sidebar that collapses to icons
Open in New Tab
Open in
A sidebar with submenus
Open in New Tab
Open in
A login page with a muted background color
Open in New Tab
Open in
A login page with form and image
Open in New Tab
Open in
Browse more blocks
Built by shadcn at Vercel. The source code is available on GitHub.
Building Blocks for the Web - shadcn/ui */