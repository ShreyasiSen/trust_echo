
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import {Feature } from "@/components/feature";
export   default  async function Home() {

  return (
    <div >
      <Header/>
      <Hero/>
      <Feature/>
      <Faq/>
      <Contact />
      <Footer />
     
     
    </div>
  );
}
