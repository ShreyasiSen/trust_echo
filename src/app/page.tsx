
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Feature } from "@/components/feature";
import { Cover } from "@/components/cover";


export default async function Home() {

  return (
    <div >
      <Header />
      <Hero />
      <Cover
        heading="Have you ever wondered how to collect testimonials?"
        description="Have a look at our platform, where you can create spaces and custom testimonial links with questions, share them with your customers, and gather valuable feedback."
        image={{
          src: "/cover.png",
          alt: "Cover Image",
        }}
      />
      <Feature />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
