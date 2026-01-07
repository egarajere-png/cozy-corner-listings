import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, User, Users, Calendar, MessageSquare, Send } from "lucide-react";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    persons: "1",
    date: "",
    time: "09:00",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your booking request! We will contact you shortly.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-16 lg:py-0">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-smoky-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 lg:p-16"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="headline-1 text-center mb-4">Book a Site Visit</h2>
              <p className="text-center text-muted-foreground mb-8">
                Booking request{" "}
                <a href="tel:+254123456789" className="text-primary hover:underline">
                  +254 123 456 789
                </a>{" "}
                or fill out the form
              </p>

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
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    name="persons"
                    value={formData.persons}
                    onChange={handleChange}
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num} Person{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(
                      (time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                <textarea
                  name="message"
                  placeholder="Your Message (optional)"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-eerie-2 border border-white/10 text-foreground py-4 pl-12 pr-4 focus:border-primary outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-primary text-primary-foreground px-12 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Book Visit
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-eerie-3 p-8 lg:p-16 text-center flex flex-col justify-center"
          >
            <h2 className="headline-1 mb-8">Contact Us</h2>

            <div className="space-y-8">
              <div>
                <p className="font-bold text-sm uppercase tracking-wider mb-2">
                  Booking Request
                </p>
                <a
                  href="tel:+254123456789"
                  className="text-primary text-2xl font-forum hover-underline inline-block"
                >
                  +254 123 456 789
                </a>
              </div>

              <div className="separator mx-auto" />

              <div>
                <p className="font-bold text-sm uppercase tracking-wider mb-2">
                  Location
                </p>
                <address className="not-italic text-muted-foreground">
                  <MapPin className="w-4 h-4 inline mr-2 text-primary" />
                  Karen Swaychester,<br />
                  Nairobi, Kenya
                </address>
              </div>

              <div className="separator mx-auto" />

              <div>
                <p className="font-bold text-sm uppercase tracking-wider mb-2">
                  Working Hours
                </p>
                <p className="text-muted-foreground">
                  Monday to Sunday<br />
                  8:00 am - 6:00 pm
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
