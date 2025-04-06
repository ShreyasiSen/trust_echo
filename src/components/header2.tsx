import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Header2 = () => {
//   const menu = [
//     { title: "Features", url: "#features" },
//     { title: "Testimonial", url: "#testimonial" },
//     { title: "FAQ", url: "#faq" },
//     { title: "Contact", url: "#contact" },
//     { title: "AboutUs", url: "#aboutUs" },
//   ];

  return (
    <section className="py-4 fixed top-0 left-0 px-6 w-full bg-white/80 z-50 shadow-md backdrop-blur-sm">
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
          </div>

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all">
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

              <SheetContent className="overflow-y-auto bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 text-white">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">Menu</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Menu Items */}
                <div className="flex flex-col gap-6 p-4">
                  <SignedOut>
                    <div className="flex flex-col gap-3">
                      <SignInButton>
                        <Button
                          variant="outline"
                          className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition-all"
                        >
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex flex-col gap-3">
                      <UserButton />
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

export { Header2 };