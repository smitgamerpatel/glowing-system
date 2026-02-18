import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { INSTITUTE_CONFIG } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We will get back to you shortly regarding your inquiry.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/91${INSTITUTE_CONFIG.whatsapp}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-medium opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            "{INSTITUTE_CONFIG.slogan}"
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Information */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Contact Details</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Have questions about our batches or admission process? Reach out to us directly through any of the channels below.
                </p>
              </div>

              <div className="grid gap-8">
                <motion.div variants={fadeInUp} className="flex items-start gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Phone</h3>
                    <p className="text-muted-foreground text-lg">+91 {INSTITUTE_CONFIG.phone}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Email</h3>
                    <p className="text-muted-foreground text-lg">info@geniusclasses.edu</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Location</h3>
                    <a 
                      href={INSTITUTE_CONFIG.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg"
                    >
                      View on Map <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-start gap-6 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Office Hours</h3>
                    <p className="text-muted-foreground text-lg">Mon - Sat: 8:00 AM - 8:00 PM</p>
                    <p className="text-muted-foreground text-lg">Sun: 9:00 AM - 1:00 PM</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="pt-6">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-bold gap-3 rounded-full bg-[#25D366] hover:bg-[#128C7E] border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <SiWhatsapp className="w-6 h-6" />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-2xl shadow-primary/5"
            >
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                    <Input placeholder="John Doe" required className="h-12 bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Mobile Number</label>
                    <Input type="tel" placeholder="9999999999" required className="h-12 bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Subject</label>
                  <Input placeholder="Admission Inquiry / Feedback" required className="h-12 bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Your Message</label>
                  <Textarea 
                    placeholder="How can we help you?"
                    className="min-h-[150px] bg-background border-border/50 focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Inquiry
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-10 p-6 bg-accent/50 rounded-2xl border border-accent flex items-start gap-4">
                <div className="text-primary mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Admission Note:</strong> For direct admissions, you can also fill our official Google Form for faster processing.
                  <a 
                    href={INSTITUTE_CONFIG.admissionFormUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-primary font-bold hover:underline ml-1"
                  >
                    Open Form <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </div>
  );
}
