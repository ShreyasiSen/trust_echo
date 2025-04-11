import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { DialogTitle } from "@radix-ui/react-dialog"; // Import DialogTitle from Radix UI

const Header = () => {
  const menu = [
    { title: "Features", url: "#features" },
    { title: "Testimonial", url: "#testimonial" },
    { title: "FAQ", url: "#faq" },
    { title: "Contact", url: "#contact" },
    { title: "AboutUs", url: "/aboutUs" },
  ];

  return (
    <section className="py-6 fixed top-0 left-0 px-6 w-full bg-white/80 z-50 shadow-md backdrop-blur-sm">
      <div className="container mx-auto">
        <nav className="lg:flex justify-between items-center hidden lg:block">
          <div className="flex items-center">
            <div className="flex items-center font-bold tracking-tight text-white text-4xl sm:text-5xl mr-10">
              <Link href="/" className="flex items-center">
                <span className="italic bg-gradient-to-r from-indigo-600 via-violet-700 to-pink-600 bg-clip-text text-transparent font-display">
                  Fide
                </span>
                <span className="text-blue-900 italic font-light ml-1">Feed</span>
              </Link>
            </div>

            <div className="hidden lg:flex ml-8">
              <NavigationMenu>
                <NavigationMenuList className="flex space-x-4">
                  {menu.map((item) =>
                    item.title === "About Us" ? (
                      <NavigationMenuItem key={item.title}>
                        <Button
                          onClick={() => (window.location.href = "/aboutUs")}
                          className="cursor-pointer bg-gradient-to-r from-fuchsia-600 to-rose-400 text-white font-semibold shadow-pink-300 shadow-lg hover:shadow-xl rounded-full px-5 py-2 font-[Quicksand] text-base transition-all duration-300 hover:scale-105"
                        >
                          {item.title}
                        </Button>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={item.title}>
                        <Link href={item.url} passHref legacyBehavior>
                          <NavigationMenuLink
                            className="text-gray-600 hover:text-blue-600 text-lg transition-colors duration-200"
                          >
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )
                  )}

                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="text-white bg-blue-500 border-blue-800 hover:bg-blue-700 hover:text-white cursor-pointer transition-all">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline" className="text-white bg-green-500 border-green-800 hover:bg-green-700 hover:text-white cursor-pointer transition-all">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile Header Only (lg:hidden) */}
        <div className="block lg:hidden w-full">
          <div className="flex items-center justify-between px-4">
            {/* Company Name (Left) */}
            <div className="font-bold tracking-tight text-white text-4xl">
              <Link href="/" className="flex items-center">
                <span className="italic bg-gradient-to-r from-indigo-600 via-violet-700 to-pink-600 bg-clip-text text-transparent font-display">
                  Fide
                </span>
                <span className="text-blue-900 italic font-light ml-1">Feed</span>
              </Link>
            </div>

            {/* Hamburger Menu (Right) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-black border-black hover:bg-white hover:text-black transition-all duration-300"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[280px] backdrop-blur-sm bg-white/50 text-black px-0 pt-0 pb-6 rounded-l-xl shadow-xl border-r border-white/10 transition-all duration-300"
              >
                {/* Add DialogTitle for accessibility */}
                <DialogTitle className="sr-only">Menu</DialogTitle> {/* Use sr-only to hide it visually */}

                <div className="flex justify-between items-center w-full px-4 py-4 bg-pink-100">
                  <span className="text-4xl font-bold tracking-wider text-blue-800 drop-shadow-sm">
                    Menu
                  </span>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-5">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="ml-6 text-xl font-medium text-gray-900 hover:text-white hover:pl-3 rounded-md py-2 px-3 transition-all duration-300"
                    >
                      {item.title}
                    </a>
                  ))}

                  <SignedOut>
                    <div className="flex flex-col gap-3 mt-8">
                      <SignInButton>
                        <Button
                          variant="ghost"
                          className="text-white bg-blue-500 border-blue-800 hover:bg-blue-700 hover:text-white cursor-pointer transition-all"
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button
                          variant="ghost"
                          className="text-white bg-green-500 border-green-800 hover:bg-green-700 hover:text-white cursor-pointer transition-all"
                        >
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                  <SignedIn>
                    <div className="absolute bottom-4 right-4">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "w-28 h-28 hover:scale-110 transition-transform duration-300 ring-2 ring-white",
                          },
                        }}
                      />
                    </div>
                  </SignedIn>
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