
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
// import { Footer } from "@/components/footer";
import { Feature } from "@/components/feature";
import { Speciality } from "@/components/speciality";
import PlatformGrid  from "@/components/platformGrid";
import AboutUs from "@/components/about";
import  Video  from "@/components/video";


export default async function Home() {

  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <Video/>
      {/* <Cover
      /> */}
      
      <Speciality />
        <Feature />
      <PlatformGrid />
  
      <AboutUs/>
      <Faq />
      <Contact />
     <footer className="bg-pink-200 text-black py-4 text-center">
        <p>&copy; 2025 FideFeed. All rights reserved.</p>
      </footer>
      
    </div>
  );
}
