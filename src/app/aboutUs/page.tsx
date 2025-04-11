import Image from 'next/image';
import { FC } from 'react';
import { Header2 } from '@/components/header2';
const teamMembers = [
    {
        name: 'Shreyasi Sen',
        role: 'Frontend Developer',
        bio: ' I’m a web developer who is passionate about learning new technologies and grow.I’m also invested in developing my skills in UI/UX design.',
        image: '/Shreyasi.jpg',
    },
    {
        name: 'Chayan Ghosh',
        role: 'Backend Developer',
        bio: 'Bob specializes in building robust backend systems and API integrations. He loves working with Node.js and PostgreSQL.',
        image: '/Chayan.png',
    },
    {
        name: 'Soham Chatterjee',
        role: 'Product Designer',
        bio: 'Carol focuses on user-centered design with a knack for creating beautiful and functional digital products.',
        image: '/Soham2.png',
    },
];

const AboutUs: FC = () => {
    return (
        <div className="bg-pink-50 text-gray-800">
            <Header2 />
            <main className="px-6 md:px-12 py-10 max-w-6xl mx-auto space-y-24 mt-18">

                {/* Hero Section */}
                <section className="flex flex-col-reverse md:flex-row items-center gap-12">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Empowering Artisans, Connecting Cultures
                        </h1>
                        <section className="space-y-4">
                            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                                At <span className="font-semibold text-fuchsia-600">FideFeed</span>, we make it effortless for
                                <span className="font-medium italic"> small businesses, freelancers, and creators</span> to collect and showcase
                                authentic customer testimonials — <span className="italic">no tech skills or website required</span>.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
                                <span className='text-gray-900 font-bold'>Our mission</span> is simple: <span className="font-medium text-gray-900">help you build trust</span> through real stories that speak for your brand.
                                Whether you&apos;re a <span className="font-medium">local brand</span> or a <span className="font-medium">solo creator</span>,
                                FideFeed turns your happy customers into your most powerful marketing tool.
                            </p>
                        </section>

                    </div>
                    <div className="md:w-1/2">
                        <iframe
                            className="w-full h-64 md:h-80"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="About Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* How It Works */}
                <section className="space-y-6 py-14">
                    <h2 className="text-3xl font-semibold text-gray-800">How Our Website Works</h2>
                    <div className="text-gray-700 text-lg leading-relaxed space-y-6">
                        <p><span className="font-medium italic">Using FideFeed is as simple as it gets:</span></p>

                        <div>
                            <p className="font-semibold text-fuchsia-600">1. Create a Testimonial Page</p>
                            <p>Set up a space where customers can drop their feedback, in their own words and voice.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-fuchsia-600">2. Share the Link</p>
                            <p>Send your unique testimonial link via <span className="italic">WhatsApp</span>, <span className="italic">Instagram DMs</span>, email, or anywhere else you connect with customers.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-fuchsia-600">3. Collect Responses</p>
                            <p>Get honest testimonials — <span className="italic">written, audio, or even video</span> — all stored in one place on your dashboard.</p>
                        </div>

                        <div>
                            <p className="font-semibold text-fuchsia-600">4. Showcase with Confidence</p>
                            <p>Curate the best stories and display them anywhere — on your website, social media, or portfolio — <span className="font-medium">with no coding required</span>.</p>
                        </div>
                    </div>
                </section>



                {/* Team Section */}
                <section className="py-16 bg-gray-50">
                    <h2 className="text-4xl font-bold text-center mb-12 tracking-tight text-gray-800">
                        Meet the Developers
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
                            >
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover border-4 border-fuchsia-200 shadow-sm"
                                />
                                <h3 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h3>
                                <p className="text-fuchsia-600 font-medium">{member.role}</p>
                                <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>


                {/* Mission */}
                <section className="py-8 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl font-bold text-gray-800 tracking-wide">
                            <span>Our</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-purple-600"> Mission</span>
                        </h2>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            To <span className="font-semibold text-gray-900">empower every business</span>, big or small, to build authentic trust through the voices of <span className="italic text-gray-800">real customers</span>.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            We&apos;re here to <span className="font-medium text-gray-900">simplify testimonials</span> — turning them into your brand&apos;s <span className="text-fuchsia-600 font-semibold">most impactful growth engine</span>.
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section className="text-center pt-16 pb-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-4">
                        <span className="text-gray-800">
                            Connect with Us
                        </span>
                    </h2>
                    <p className="text-lg text-gray-700">
                        Interested in partnering or have questions? We&apos;re happy to reply — just drop us a line at
                        <a
                            href="mailto:info@example.com"
                            className="text-indigo-600 font-medium underline hover:text-purple-600 transition-colors duration-200 ml-1"
                        >
                            info@example.com
                        </a>
                    </p>
                </section>

            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>&copy; 2025 FideFeed. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;
