import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const menu = [
    { title: "Features", url: "#features" },
    { title: "Testimonial", url: "#pricing" },
    { title: "FAQ", url: "#faq" },
    { title: "Contact", url: "#contact" },
    { title: "AboutUs", url: "#about" },
  ];

  return (
    <section className="py-6 fixed top-0 left-0 px-6 w-full bg-white/80 z-50 shadow-md backdrop-blur-sm">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center font-bold tracking-tight text-white text-4xl sm:text-5xl mr-10">
              <span className="italic bg-gradient-to-r from-indigo-600 via-violet-700 to-pink-600 bg-clip-text text-transparent font-display">
                Fide
              </span>
              <span className="text-blue-900 italic font-light ml-1">Feed</span>
            </div>

            <div className="hidden lg:flex ml-8">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.url}
                        className="text-gray-600 hover:text-blue-600 text-lg transition-colors duration-200"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Sign In</Button>
            <Button variant="outline">Sign Up</Button>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 text-white">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">Menu</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="text-md font-semibold hover:underline hover:text-black transition-all duration-300"
                    >
                      {item.title}
                    </a>
                  ))}
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Header };