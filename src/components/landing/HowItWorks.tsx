
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect GitHub",
    description: "Link your GitHub account to TecXi and select the repository you want to deploy."
  },
  {
    number: "02",
    title: "Configure Settings",
    description: "Customize your build settings, environment variables, and deployment options if needed."
  },
  {
    number: "03",
    title: "Deploy",
    description: "Click deploy and we'll automatically build and publish your application to our global network."
  },
  {
    number: "04",
    title: "Monitor & Scale",
    description: "Track your application's performance and scale resources as needed with our dashboard."
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple Deployment Process
          </h2>
          <p className="text-lg text-muted-foreground">
            From code to production in minutes, not days. Our streamlined workflow
            gets your applications live with minimal effort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-secondary rounded-lg p-8 h-full">
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/signup">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
