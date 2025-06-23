import { ASideBar } from "@/components/customUI/ASideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SchemeDashboard from "./SchemeDashboard";

export default function Page() {
  return (
    <SidebarProvider>
        <div>
            
        </div>
      <ASideBar/>
      <SidebarInset>
        <SchemeDashboard/>
      </SidebarInset>
    </SidebarProvider>
  )
}