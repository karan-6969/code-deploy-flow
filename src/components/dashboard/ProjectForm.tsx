
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GitHubRepoInput from "./GitHubRepoInput";

const projectSchema = z.object({
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  subdomain: z.string().min(3, {
    message: "Subdomain must be at least 3 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Subdomain can only contain lowercase letters, numbers, and hyphens.",
  }),
});

const ProjectForm = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  const handleGitHubRepo = (url: string) => {
    setRepoUrl(url);
    toast({
      title: "Repository connected",
      description: "Your GitHub repository has been successfully connected.",
    });
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    if (!repoUrl) {
      toast({
        title: "Missing repository",
        description: "Please connect a GitHub repository before creating your project.",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeploying(true);
    
    // Simulate deployment process
    try {
      // This is where you would call your backend API to create the project
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Project created",
        description: `Your project ${values.name} has been created and the first deployment is in progress.`,
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Creation failed",
        description: "There was an error creating your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">1. Connect GitHub Repository</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your GitHub repository to deploy your application.
        </p>
        <GitHubRepoInput onSubmit={handleGitHubRepo} isLoading={isDeploying} />
      </div>
      
      <div>
        <h3 className="text-lg font-medium">2. Configure Project</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set up your project name and subdomain.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} disabled={isDeploying} />
                  </FormControl>
                  <FormDescription>
                    This is the display name for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subdomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subdomain</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input placeholder="my-project" {...field} disabled={isDeploying} />
                      <span className="ml-2 text-muted-foreground">.tecxi.app</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Your project will be available at this subdomain.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={!repoUrl || isDeploying} className="w-full">
              {isDeploying ? "Creating Project..." : "Create Project"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProjectForm;
