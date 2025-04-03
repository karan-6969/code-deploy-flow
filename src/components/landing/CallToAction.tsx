
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Streamline Your Deployment Process?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Join thousands of developers who are already using TecXi to deploy their applications.
            Get started for free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-white/30 hover:bg-white/10 text-white">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
