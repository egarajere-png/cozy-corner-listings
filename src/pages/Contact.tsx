import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  User, MessageSquare, Building2 
} from "lucide-react";

import hero3 from "@/assets/hero-3.jpg";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Estate St, Karen City", "Nairobi, Kenya"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+254 123 456 789", "+254 987 654 321"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@lakashehomes.com", "sales@lakashehomes.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hero3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-4 pt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle label-2"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="headline-1 mt-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="body-2 text-muted-foreground mt-4 max-w-lg mx-auto"
          >
            We're here to help you find your dream property
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24 bg-smoky-2">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 border border-white/10 hover:border-primary/30 transition-colors bg-eerie-1"
              >
                <div className="w-14 h-14 mx-auto mb-4 border border-primary/30 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-forum text-xl mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle label-2 lg:after:mx-0 text-left">
                Send a Message
              </p>
              <h2 className="headline-1 mt-4">We'd Love to Hear From You</h2>
              <p className="text-muted-foreground mt-4 mb-8">
                Have a question about a property? Want to schedule a viewing?
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select Subject</option>
                      <option value="buying">Buying a Property</option>
                      <option value="selling">Selling a Property</option>
                      <option value="viewing">Schedule a Viewing</option>
                      <option value="valuation">Property Valuation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-12 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[400px] lg:h-auto"
            >
              <div className="w-full h-full bg-eerie-2 border border-white/10 flex items-center justify-center">
                <div className="text-center text-muted-foreground p-8">
                  <MapPin className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="font-forum text-2xl mb-4">Find Us Here</h3>
                  <p className="mb-2">Kahawa Sukari, Nairobi</p>
                  <p className="text-sm">Kenya</p>
                  <a
                    href="https://www.google.com/maps/place/Felma+Shopping+centre/@-1.195364,36.9435365,17z/data=!3m1!4b1!4m6!3m5!1s0x182f3f8ef1b25b0f:0x8fbe763cbcbdc94d!8m2!3d-1.195364!4d36.9461114!16s%2Fg%2F11fy_9j7yj?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 text-primary hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
