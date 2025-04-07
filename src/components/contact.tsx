import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-b from-pink-50 via-purple-50 to-purple-100 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 opacity-20 rounded-full blur-[160px] -z-10"></div>

      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left side - Welcome message + contact info */}
          <div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-4 tracking-tight">
              Let’s Talk!
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Have questions, feedback, or collaboration ideas? We’re here to
              listen and ready to help.
            </p>

            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-purple-600 text-xl">📞</span>
                <span>
                  <strong>Phone:</strong> (123) 34567890
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-600 text-xl">✉️</span>
                <span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:your-email@example.com" className="underline text-purple-700">
                    your-email@example.com
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-600 text-xl">📍</span>
                <span>We’re global. Remote-first. Built for everyone.</span>
              </div>
            </div>
          </div>

          {/* Right: Fancy Form */}
          <div className="bg-white/80 backdrop-blur-md border border-purple-200 shadow-sm rounded-3xl p-10">
          <form className="space-y-6">
  {/* Name Fields */}
  <div className="grid md:grid-cols-2 gap-4">
    <div className="relative">
      <Input
        id="firstname"
        placeholder=" "
        className="peer h-12 px-4 pt-5 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none w-full bg-transparent text-gray-800"
      />
      <Label
        htmlFor="firstname"
        className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
      >
        First Name
      </Label>
    </div>
    <div className="relative">
      <Input
        id="lastname"
        placeholder=" "
        className="peer h-12 px-4 pt-5 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none w-full bg-transparent text-gray-800"
      />
      <Label
        htmlFor="lastname"
        className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
      >
        Last Name
      </Label>
    </div>
  </div>

  {/* Email Field */}
  <div className="relative">
    <Input
      type="email"
      id="email"
      placeholder=" "
      className="peer h-12 px-4 pt-5 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none w-full bg-transparent text-gray-800"
    />
    <Label
      htmlFor="email"
      className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
    >
      Email
    </Label>
  </div>

  {/* Subject Field */}
  <div className="relative">
    <Input
      id="subject"
      placeholder=" "
      className="peer h-12 px-4 pt-5 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none w-full bg-transparent text-gray-800"
    />
    <Label
      htmlFor="subject"
      className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
    >
      Subject
    </Label>
  </div>

  {/* Message */}
  <div className="relative">
    <Textarea
      id="message"
      placeholder=" "
      rows={5}
      className="peer w-full px-4 pt-5 border-b-2 border-gray-200 focus:border-indigo-500 focus:outline-none bg-transparent resize-none text-gray-800"
    />
    <Label
      htmlFor="message"
      className="absolute left-4 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
    >
      Message
    </Label>
  </div>

  {/* Submit Button */}
  <div className="flex justify-center">
    <Button className="bg-gradient-to-r from-fuchsia-600 to-rose-400 text-white font-semibold shadow-md hover:shadow-lg rounded-full px-8 py-3 transition-colors duration-300 hover:scale-105">
      Send Message
    </Button>
  </div>
</form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact };
