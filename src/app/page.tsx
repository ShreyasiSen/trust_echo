
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Faq } from "@/components/faq";
// import { Contact } from "@/components/contact";
// import { Footer } from "@/components/footer";
import { Feature } from "@/components/feature";
import { Cover } from "@/components/cover";

export default async function Home() {

  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <Cover
      />
        <Feature />
      <Faq />
      {/* <Contact /> */}
     <footer className="bg-pink-200 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
      
    </div>
  );
}
