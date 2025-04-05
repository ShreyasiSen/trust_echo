

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
    title: "FideFeed",
  },
}: Footer7Props) => {
  return (
    <footer className="bg-pink-50 border-t border-gray-400 text-gray-700 px-6 py-8 lg:px-12 lg:py-6">
  <div className="max-w-full mx-auto">
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {/* Logo & Description */}
      <div className="space-y-4">
        <a href={logo.url} className="flex items-center space-x-3">
          <span className="text-3xl italic font-semibold tracking-tight">
            {logo.title}
          </span>
        </a>
        <p className="text-sm text-gray-600">
        1,200+ testimonials, capturing video, text & star ratings to help brands build trust and convert faster.
        </p>
        {/* Socials */}
        
      </div>

      {/* Link Sections */}
      {sections.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {section.title}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {section.links.map((link, i) => (
              <li key={i}>
                <a href={link.href} className="hover:text-black transition">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom Bar */}
    <div className="mt-10 py-2 px-8 border-t border-gray-300  text-lg flex flex-col md:flex-row justify-between items-center text-gray-600 space-y-4 md:space-y-0">
      <p>© 2024 {logo.title}. All rights reserved.</p>
      <div className="flex gap-5">
        <a href="#" className="hover:text-black transition">Terms</a>
        <a href="#" className="hover:text-black transition">Privacy</a>
      </div>
    </div>
  </div>
</footer>

  );
};

export { Footer };
