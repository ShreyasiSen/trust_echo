import { Timer, Zap, ZoomIn } from "lucide-react";

const Feature16 = () => {
  return (
    <section className="py-32" id="features">
      <div className="container mx-auto">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          OUR FEATURES
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Us?</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Customizable Links</h3>
            <p className="leading-7 text-muted-foreground">
              Create personalized testimonial links with tailored questions to gather meaningful feedback from your customers.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomIn className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Video Testimonials</h3>
            <p className="leading-7 text-muted-foreground">
              Collect video testimonials from your customers to add a personal and authentic touch to your feedback.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Insightful Analytics</h3>
            <p className="leading-7 text-muted-foreground">
              Gain actionable insights with detailed graphs and analytics to understand customer sentiment and improve your services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature16 };