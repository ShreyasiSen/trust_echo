// components/PlatformGrid.tsx

const platforms = [
    { name: "Webflow", logo: "/webflow.png" },
    { name: "WordPress", logo: "/WordPress.png" },
    { name: "Shopify", logo: "/shopify.png" },
    { name: "Carrd", logo: "/Carrd.png" },
    { name: "Bubble", logo: "/Bubble.png" },
    { name: "Kajabi", logo: "/Kajabi.png" },
    { name: "Squarespace", logo: "/Squarespace.png" },
    { name: "Framer", logo: "/Framer.png" },
    { name: "Wix", logo: "/Wix.png" },
//   { name: "Notion", logo: "/Notion.png" },
  { name: "Mailchimp", logo: "/MailChimp.png" },
  { name: "Ghost", logo: "/Ghost.png" },
  { name: "Weebly", logo: "/Weebly.png" },
//   { name: "ClickFunnels", logo: "https://funneloverload.com/wp-content/uploads/2018/10/ClickFunnels-Logo-300x120.png" },
//   { name: "Teachable", logo: "https://assets.teachablecdn.com/images/teachable_logo.png" },
//   { name: "Substack", logo: "https://substack.com/img/substack-logo.png" },
  ];
  
  export default function PlatformGrid() {
    return (
      <section className="bg-gradient-to-b from-pink-50 to-blue-50 text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 animate-fade-in-down">
          Integrate with any <span className="text-pink-600">platform</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14 text-lg md:text-xl">
          With just 3 lines of HTML code, showcase testimonials beautifully across your favorite platforms.
        </p>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center justify-center py-4 px-4 hover:shadow-xl transform hover:scale-105 transition duration-300 group"
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="h-10 w-full object-contain filter transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
  