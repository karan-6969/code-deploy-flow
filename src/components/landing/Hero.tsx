
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-gradient py-20 md:py-32 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Deploy Your Apps <span className="text-blue-300">Effortlessly</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ship web applications directly from your GitHub repository with zero configuration.
            Focus on your code, let us handle the deployment.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button asChild size="lg" className="rounded-full px-8 font-medium">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/30 hover:bg-white/10">
              <Link to="/signin">
                <Github className="mr-2 h-4 w-4" /> Login with GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
        
        {/* Terminal mockup */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center p-3 bg-gray-800 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="mx-auto text-gray-400 text-sm font-mono">~/TecXi Deployment</div>
            </div>
            <div className="p-4 text-sm font-mono text-green-400 bg-gray-950">
              <p className="pb-2">$ tecxi deploy --repo github.com/username/project</p>
              <p className="text-gray-400">Cloning repository...</p>
              <p className="text-gray-400">Building application...</p>
              <p className="text-gray-400">Running tests...</p>
              <p className="text-gray-400">Optimizing assets...</p>
              <p className="text-white">✓ Deployment successful!</p>
              <p className="pt-1">🚀 Your app is live at: <a href="#" className="text-blue-400 underline">https://project.tecxi.app</a></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
