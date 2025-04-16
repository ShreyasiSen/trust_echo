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
    { title: "Testimonials", url: "#testimonials" },
    { title: "About", url: "#about" },
    { title: "Pricing", url: "#pricing" },
    { title: "FAQ", url: "#faq" },
    { title: "Contact", url: "#contact" },
  ];

  return (
    <section className="py-6 fixed top-0 left-0 px-6 w-full bg-white/80 z-50 shadow-md backdrop-blur-md">
      <div className="container mx-auto">
        <nav className="hidden lg:flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="italic bg-gradient-to-r from-indigo-600 via-violet-700 to-pink-600 bg-clip-text text-transparent font-display text-4xl sm:text-5xl font-bold tracking-tight">
                Fide
              </span>
              <span className="text-blue-900 italic font-light ml-1 text-4xl sm:text-5xl">Feed</span>
            </Link>
          </div>

          {/* Center - Navigation Menu */}
          <div className="flex-grow flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-2">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.url} passHref legacyBehavior>
                      <NavigationMenuLink
                        className="text-gray-700 hover:text-blue-600 font-medium text-lg transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right - Auth Buttons / User */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="text-white bg-blue-500 border-blue-800 hover:bg-blue-700 transition duration-300">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline" className="text-white bg-green-500 border-green-800 hover:bg-green-700 transition duration-300">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>


        {/* Mobile Header */}
        <div className="block lg:hidden w-full">
          <div className="flex items-center justify-between px-4">
            <div className="font-bold tracking-tight text-white text-4xl">
              <Link href="/" className="flex items-center">
                <span className="italic bg-gradient-to-r from-indigo-600 via-violet-700 to-pink-600 bg-clip-text text-transparent font-display">
                  Fide
                </span>
                <span className="text-blue-900 italic font-light ml-1">Feed</span>
              </Link>
            </div>

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
                <DialogTitle className="sr-only">Menu</DialogTitle>

                <div className="flex justify-between items-center w-full px-4 py-4 bg-gradient-to-r from-pink-100 to-rose-200 shadow-sm">
                  <span className="text-4xl font-bold tracking-wider text-blue-800 drop-shadow-sm">
                    Menu
                  </span>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      className="ml-6 text-xl font-medium text-gray-900 hover:text-blue-600 hover:pl-4 rounded-md py-2 px-3 transition-all duration-300 ease-in-out"
                    >
                      {item.title}
                    </a>
                  ))}

                  <SignedOut>
                    <div className="flex flex-col gap-3 mt-8 px-6">
                      <SignInButton>
                        <Button className="text-white bg-blue-500 border-blue-800 hover:bg-blue-700 transition duration-300">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button className="text-white bg-green-500 border-green-800 hover:bg-green-700 transition duration-300">
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
                            userButtonAvatarBox: "w-24 h-24 hover:scale-105 transition-transform duration-300 ring-2 ring-white",
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