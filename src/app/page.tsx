
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <div >
      <Header/>
      <Hero/>
      <Faq/>
      <Contact />
      <Footer />
    </div>
  );
}
