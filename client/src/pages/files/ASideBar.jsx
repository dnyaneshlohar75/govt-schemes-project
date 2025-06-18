// components/Sidebar.jsx
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const ASidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white shadow-md p-4 fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex flex-col gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="text-left w-full">
                <Button variant="ghost" className="w-full justify-start">
                  Home
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/otp-login" className="text-left w-full">
                <Button variant="ghost" className="w-full justify-start">
                  OTP Login
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/users" className="text-left w-full">
                <Button variant="ghost" className="w-full justify-start">
                  Users
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </aside>
  );
};

export default ASidebar;
