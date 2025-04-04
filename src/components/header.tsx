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

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
}

const Header = ({
  logo = {
    url: "#hero",
    src: "https://ibb.co/5Wb199DW",
    alt: "logo",
    title: "",
  },
}: Navbar1Props) => {
  const menu = [
    { title: "Features", url: "#features" },
    { title: "Testimonial", url: "#pricing" },
    { title: "FAQ", url: "#faq" },
    { title: "Contact", url: "#contact" },
    { title: "AboutUs", url: "#about" },
  ];

  return (
    <section className="py-3 fixed top-0 left-0 px-10 w-full bg-gradient-to-l from-purple-600 via-pink-400 to-red-200 z-50 shadow-xl">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="https://imgbb.com/">
              <img
                src="https://i.ibb.co/7JsSzzcJ/Screenshot-2025-04-05-001203.png"
                alt="Logo"
                style={{ border: "0", height: "60px", width: "150px" }}
                className="hover:opacity-90 transition-opacity duration-300"
              />
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-6">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.url}
                        className="group inline-flex h-10 w-32 items-center justify-center rounded-md bg-white/60 px-4 py-2 text-lg font-semibold text-blue-900 transition-all hover:scale-110 hover:bg-white/50 hover:text-red-600 shadow-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.5)]"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="text-white text-lg font-semibold font hover:text-blue-800 hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out"
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              className="text-white text-lg font-semibold hover:text-black hover:scale-105 hover:shadow-[0_4px_15px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out"
            >
              Sign Up
            </Button>
          </div>

        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8"
                alt={logo.alt}
                style={{ height: "50px", width: "50px" }}
                className="hover:opacity-90 transition-opacity duration-300"
              />
            </a>
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
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 hover:opacity-90 transition-opacity duration-300"
                        alt={logo.alt}
                      />
                    </a>
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
}

export { Header };