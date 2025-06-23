
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,

} from "@/components/ui/sidebar"
import { Label } from "../ui/label"

import Colse from "./Colse";


export function ASideBar() {
  return (
      <Sidebar>
          <div className="ml-auto  items-center pr-4 md:hidden lg:hidden"> <Colse/></div>
        
  <SidebarContent className="dark:bg-[#24262b] bg-[#f5f6fb] mt-2">
    <SidebarGroup>
      <SidebarGroupLabel className="text-3xl text-orange-900 dark:text-gray-50 font-semibold">
        GovSchemes
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <div className="px-4 py-2 mt-10 ">
            <h3 className="text-2xl font-semibold my-2">Category</h3>
            <hr className="border-b-2 border-b-solid mb-4"/>
            <ul className="space-y-3 ">
              <li className="flex items-center  space-x-2 justify-between">
                <Label htmlFor="Student" className="text-xl font-light text-gray-900 dark:text-gray-200">
              Education and Learning
                </Label>
                <Checkbox id="Student" className={'border-1 border-gray-800 dark:border-white '}/>
              </li>
              <li className="flex items-center space-x-2 justify-between">
                <Label htmlFor="healthcare" className="text-xl font-light text-gray-900 dark:text-gray-200">
                  Healthcare
                </Label>
                <Checkbox id="healthcare" className={'border-1 border-gray-800 dark:border-white'} />
              </li>
              <li className="flex items-center space-x-2 justify-between">
                <Label htmlFor="agriculture" className="text-xl font-light text-gray-900 dark:text-gray-200">
                  Agriculture
                </Label>
                <Checkbox id="agriculture"  className={'border-1 border-gray-800 dark:border-white'}/>
              </li>
            </ul>
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
   
  
  )
}