import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const Hero8 = () => {
  return (
    <section className="py-32" id="hero">
      <div className="overflow-hidden border-b border-muted">
        <div className="container mx-auto">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl">
                Collect Testimonials Effortlessly
              </h1>
              <p className="mx-auto max-w-screen-md text-muted-foreground lg:text-xl">
                Create custom testimonial links with questions, share them with your customers, and gather valuable feedback. Unlock features like video testimonials, insight graphs, and more to grow your business.
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Button>
                  Get started now
                  <ChevronRight className="ml-2 h-4" />
                </Button>
                <Button variant="ghost">
                  Learn more
                  <ChevronRight className="ml-2 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero8 };