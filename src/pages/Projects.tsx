import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AtlasImitation from "@/assets/AtlasImitation.png";
import SwamiRajMedia from "@/assets/SwamirajMedia.png";
import ParshwaPetroleums from "@/assets/Parshwa_Petroleums.png";
import pushpak from "@/assets/PushpakJewellers.png";
import RMDCS from "@/assets/RMDCS.png";
import ArihantJewellers from "@/assets/Arihant.png";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Atlas Imitation",
      category: "Web Development",
      description: "A luxury e-commerce platform with seamless checkout and personalized recommendations.",
      fullDescription: "Atlas Imitation is a modern e-commerce jewelry store built on Shopify, designed to showcase premium imitation jewelry with a clean, elegant user experience. The platform focuses on smooth navigation, secure payments, and a mobile-first design to deliver a seamless shopping experience for customers.",
      image: AtlasImitation,
      tags: ["Shopify", "Liquid"],
      link: "https://www.atlasimitation.com",
    },
   {
  title: "SwamiRaj Media",
  category: "Web Development",
  description: "A professional agency website designed to showcase digital marketing and political campaign services.",
  fullDescription: "SwamiRaj Media is a modern, responsive agency website built to highlight digital marketing, political campaigning, and business development services. The platform focuses on clean UI, clear service presentation, and strong call-to-actions, providing visitors with an engaging and trustworthy experience across all devices.",
  image: SwamiRajMedia,
  tags: ["React", "Tailwind CSS", "Responsive Design"],
  link: "https://www.swamirajmedia.com",
},
{
  title: "Parshwa Petroleums",
  category: "Business Automation",
  description: "A comprehensive management app built on Zoho Creator to streamline operations and reporting.",
  fullDescription: "Parshwa Petroleums is a custom management application developed on Zoho Creator to simplify and automate key business operations. The app includes features for inventory tracking, sales reporting, task management, and real-time data insights, empowering teams to work efficiently and make informed decisions.",
  image: ParshwaPetroleums,
  tags: ["Zoho Creator", "Deluge", "Business Automation"],
  link: "https://www.zoho.com/creator",
},
{
  title: "Pushpak Jeweller",
  category: "Business Automation",
  description: "Enabled seamless management for hundreds of bespoke orders monthly",
  fullDescription: "Developed a native desktop app for efficient invoice generation and management tailored to custom jewellery orders.",
  image: pushpak,
  tags: ["Desktop App","Invoice Management"],
  //link: "https://www.zoho.com/creator",
},
{
  title: "RMDCS",
  category: "Cybersecurity & Cryptography",
  description: "A patented encryption system designed to defend data against quantum-era threats.",
  fullDescription: "RMDCS is a patented encryption framework engineered using randomized matrix transformations and a double-key logic mechanism. The system is designed to enhance data security and resilience against emerging quantum computing threats, providing a robust and future-ready approach to secure information exchange.",
  image: RMDCS,
  tags: ["Cryptography", "Quantum-Resistant Security", "Encryption Algorithms"],
  link: "", 
},
{
  title: "Arihant Jewellers",
  category: "E-commerce Web Development",
  description: "A responsive jewellery e-commerce website with secure payments and order tracking.",
  fullDescription: "Arihant Jewellers is a modern e-commerce website designed and developed to showcase jewellery collections with a premium and user-friendly experience. The platform features secure payment integration, real-time order tracking, and a fully responsive design, ensuring smooth and reliable shopping across all devices.",
  image: ArihantJewellers,
  tags: ["E-commerce", "Payment Gateway", "Responsive Design"],
  link: "", 
},



   
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Signature <span className="text-gradient-gold">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore our portfolio of successful digital transformations and innovative solutions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="overflow-hidden backdrop-luxury hover-lift cursor-pointer group"
                    onClick={() => setSelectedProject(index)}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary font-medium mb-2">
                        {project.category}
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Detail Dialog */}
        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl backdrop-luxury max-h-[80vh] overflow-y-auto">
            {selectedProject !== null && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl lg:text-3xl font-bold">
                    {projects[selectedProject].title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-lg aspect-video lg:aspect-[16/8]">
                    <img
                      src={projects[selectedProject].image}
                      alt={projects[selectedProject].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-primary font-medium mb-2 text-sm">
                      {projects[selectedProject].category}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {projects[selectedProject].fullDescription}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm lg:text-base">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <a
                      href={projects[selectedProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
