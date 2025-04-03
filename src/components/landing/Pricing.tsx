
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Hobby",
    description: "For side projects and experiments",
    price: {
      monthly: "Free",
      yearly: "Free"
    },
    features: [
      "3 projects",
      "Basic analytics",
      "GitHub integration",
      "Automated deployments",
      "Community support",
      "tecxi.app subdomain"
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const
  },
  {
    name: "Pro",
    description: "For individual developers and small teams",
    price: {
      monthly: "$19",
      yearly: "$15"
    },
    features: [
      "10 projects",
      "Advanced analytics",
      "Custom domains",
      "SSL certificates",
      "Priority support",
      "Team collaboration",
      "Environment variables",
      "Build caching"
    ],
    popular: true,
    cta: "Try Pro Free",
    ctaVariant: "default" as const
  },
  {
    name: "Business",
    description: "For growing teams and businesses",
    price: {
      monthly: "$49",
      yearly: "$39"
    },
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Custom domains",
      "SSL certificates",
      "Priority support",
      "Team roles & permissions",
      "Environment variables",
      "Build caching",
      "Password protection",
      "SAML SSO",
      "Audit logs"
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const
  }
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-20 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that's right for you and your projects.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${
                billingCycle === "monthly" 
                  ? "bg-primary text-white" 
                  : "bg-secondary text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                billingCycle === "yearly" 
                  ? "bg-primary text-white" 
                  : "bg-secondary text-muted-foreground"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly <span className="text-xs">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className={`rounded-xl overflow-hidden border ${
                plan.popular
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "border-border"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  {plan.price.monthly !== "Free" && (
                    <span className="text-muted-foreground ml-2">
                      /{billingCycle.slice(0, -2)}
                    </span>
                  )}
                </div>
                
                <Button 
                  asChild
                  variant={plan.ctaVariant} 
                  className="w-full mb-6"
                >
                  <Link to="/signup">{plan.cta}</Link>
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
