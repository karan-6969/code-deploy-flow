
import { motion } from "framer-motion";
import { 
  Github, 
  Globe, 
  Lock, 
  BarChart, 
  RefreshCw, 
  CreditCard, 
  Zap,
  Server
} from "lucide-react";

const featuresList = [
  {
    icon: <Github className="h-8 w-8 text-brand-600" />,
    title: "GitHub Integration",
    description: "Connect your GitHub repository and deploy with a single click."
  },
  {
    icon: <Globe className="h-8 w-8 text-brand-600" />,
    title: "Custom Domains",
    description: "Use your own domain with automatic HTTPS certificate generation."
  },
  {
    icon: <Lock className="h-8 w-8 text-brand-600" />,
    title: "SSL Certificates",
    description: "Auto-generated Let's Encrypt certificates for secure connections."
  },
  {
    icon: <BarChart className="h-8 w-8 text-brand-600" />,
    title: "Analytics Dashboard",
    description: "Monitor performance, traffic, and errors in real-time."
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-brand-600" />,
    title: "Auto Deployments",
    description: "Trigger deployments automatically with every push to your repo."
  },
  {
    icon: <CreditCard className="h-8 w-8 text-brand-600" />,
    title: "Simple Pricing",
    description: "Transparent pricing with no hidden fees, including a free tier."
  },
  {
    icon: <Zap className="h-8 w-8 text-brand-600" />,
    title: "High Performance",
    description: "Global CDN distribution for lightning-fast load times."
  },
  {
    icon: <Server className="h-8 w-8 text-brand-600" />,
    title: "Scalability",
    description: "Automatically scales with your traffic needs, no manual intervention."
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-secondary/50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need For Modern Deployment
          </h2>
          <p className="text-lg text-muted-foreground">
            TecXi combines all the essential tools needed for seamless deployment
            into one streamlined platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
