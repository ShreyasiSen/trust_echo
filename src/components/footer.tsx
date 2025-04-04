

const sections = [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Marketplace", href: "#" },
        { name: "Features", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help", href: "#" },
        { name: "Sales", href: "#" },
        { name: "Advertise", href: "#" },
        { name: "Privacy", href: "#" },
      ],
    },
  ];
  
  interface Footer7Props {
    logo?: {
      url: string;
      src: string;
      alt: string;
      title: string;
    };
  }
  const Footer = ({
    logo = {
      url: "https://www.shadcnblocks.com",
      src: "https://shadcnblocks.com/images/block/logos/shadcnblockscom-icon.svg",
      alt: "logo",
      title: "Shadcnblocks.com",
    },
  }: Footer7Props) => {
    return (
      <section className="py-32" id="footer"> 
        <div className="container mx-auto  ">
          <footer className="">
            <div className=" flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
              <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
                {/* Logo */}
                <div className="flex items-center gap-2 lg:justify-start">
  
                  <h2 className="text-xl font-semibold">{logo.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  A collection of 100+ responsive HTML templates for your startup
                  business or side project.
                </p>
  
              </div>
              <div className="grid grid-cols-3 gap-6 lg:gap-20">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3 className="mb-6 font-bold">{section.title}</h3>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      {section.links.map((link, linkIdx) => (
                        <li
                          key={linkIdx}
                          className="font-medium hover:text-primary"
                        >
                          <a href={link.href}>{link.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
              <p>© 2024 Shadcnblocks.com. All rights reserved.</p>
              <ul className="flex justify-center gap-4 lg:justify-start">
                <li className="hover:text-primary">
                  <a href="#"> Terms and Conditions</a>
                </li>
                <li className="hover:text-primary">
                  <a href="#"> Privacy Policy</a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </section>
    );
  };
  
  export { Footer };
  