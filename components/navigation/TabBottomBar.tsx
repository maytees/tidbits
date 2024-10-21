import { Href, usePathname, useRouter } from "expo-router";
import * as React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { Text } from "~/components/ui/text";
import { Home, PlusCircle, Search, User } from "~/lib/icons";
import { cn } from "~/lib/utils";

export default function TabBottomBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const [value, setValue] = React.useState(pathname);

  const handleNavigation = (path: string) => {
    if (path === pathname) return;

    router.push(path as Href<string>);
    setValue(path);
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="z-10 pt-2 bg-white border-t border-accent dark:bg-background"
    >
      <NavigationMenu
        value={value}
        onValueChange={(newValue) => setValue(newValue as string)}
      >
        <NavigationMenuList className="flex items-center justify-between px-6 py-2">
          <NavigationMenuItem value="/">
            <NavigationMenuLink asChild>
              <TouchableOpacity onPress={() => handleNavigation("/")}>
                <BottomBarItem
                  icon={Home}
                  label="Home"
                  value="/"
                  currentPath={pathname}
                  onPress={() => handleNavigation("/")}
                />
              </TouchableOpacity>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="search">
            <NavigationMenuLink asChild>
              <TouchableOpacity onPress={() => handleNavigation("/search")}>
                <BottomBarItem
                  icon={Search}
                  label="Search"
                  value="/search"
                  currentPath={pathname}
                  onPress={() => handleNavigation("/search")}
                />
              </TouchableOpacity>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="create">
            <NavigationMenuLink asChild>
              <TouchableOpacity onPress={() => handleNavigation("/create")}>
                <BottomBarItem
                  icon={PlusCircle}
                  label="Create"
                  value="/create"
                  currentPath={pathname}
                  onPress={() => handleNavigation("/create")}
                />
              </TouchableOpacity>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="profile">
            <NavigationMenuLink asChild>
              <TouchableOpacity onPress={() => handleNavigation("/profile")}>
                <BottomBarItem
                  icon={User}
                  label="Profile"
                  value="/profile"
                  currentPath={pathname}
                  onPress={() => handleNavigation("/profile")}
                />
              </TouchableOpacity>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </View>
  );
}

interface BottomBarItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  currentPath: string;
  onPress: () => void;
}

const BottomBarItem = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  BottomBarItemProps & React.ComponentPropsWithoutRef<typeof Pressable>
>(({ icon: Icon, label, value, currentPath, onPress, ...props }, ref) => {
  const isActive =
    currentPath === value || (value === "/" && currentPath === "");
  return (
    <Pressable
      ref={ref}
      className={cn(
        "flex flex-col items-center",
        "focus:outline-none focus:bg-transparent"
      )}
      onPress={onPress}
      {...props}
    >
      <Icon
        className={`w-5 h-5 ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      />
      <Text
        className={`mt-1 text-xs ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
});
BottomBarItem.displayName = "BottomBarItem";
