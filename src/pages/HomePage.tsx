
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProjectForm from "@/components/deployment/ProjectForm";

const HomePage = () => {
  const [deployedProjects, setDeployedProjects] = useState<any[]>([]);
  const { toast } = useToast();

  const handleProjectCreated = (project: any) => {
    setDeployedProjects((prev) => [project, ...prev]);
    toast({
      title: "Project deployed successfully",
      description: `Your project is now available at ${project.subdomain}.tecxi.app`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">TecXi</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Deploy your code in seconds</h1>
            <p className="text-lg text-muted-foreground">
              Connect your GitHub repository and deploy your site with a custom subdomain.
            </p>
          </div>

          <div className="space-y-8">
            <ProjectForm onProjectCreated={handleProjectCreated} />
            
            {deployedProjects.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Deployed Projects</h2>
                <div className="space-y-4">
                  {deployedProjects.map((project, index) => (
                    <div 
                      key={index} 
                      className="border rounded-md p-4 flex justify-between items-center bg-card"
                    >
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          <a 
                            href={`https://${project.subdomain}.tecxi.app`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {project.subdomain}.tecxi.app
                          </a>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" onClick={() => window.open(`https://${project.subdomain}.tecxi.app`, '_blank')}>
                          Visit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TecXi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
