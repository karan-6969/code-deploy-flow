
import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Loader2 } from "lucide-react";

const projectSchema = z.object({
  repoUrl: z.string().min(1, "GitHub repository URL is required")
    .regex(/^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/, {
    message: "Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo).",
  }),
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  subdomain: z.string().min(3, {
    message: "Subdomain must be at least 3 characters.",
  }).regex(/^[a-z0-9-]+$/, {
    message: "Subdomain can only contain lowercase letters, numbers, and hyphens.",
  }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  onProjectCreated: (project: any) => void;
}

const ProjectForm = ({ onProjectCreated }: ProjectFormProps) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      repoUrl: "",
      name: "",
      subdomain: "",
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    setIsDeploying(true);
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProject = {
        name: values.name,
        subdomain: values.subdomain,
        repoUrl: values.repoUrl,
        deployedAt: new Date(),
        status: "success",
      };
      
      onProjectCreated(newProject);
      form.reset();
    } catch (error) {
      console.error("Error deploying project:", error);
      toast({
        title: "Deployment failed",
        description: "There was an error deploying your project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy a GitHub Repository</CardTitle>
        <CardDescription>
          Enter your GitHub repository details to deploy your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="repoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository URL</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center border rounded-l-md px-3 bg-muted">
                        <Github className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        placeholder="https://github.com/username/repository"
                        className="rounded-l-none"
                        disabled={isDeploying}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the full URL to your GitHub repository.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="My Awesome Project" 
                      disabled={isDeploying}
                      {...field} 
                    />
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
                      <Input 
                        placeholder="my-project" 
                        disabled={isDeploying}
                        {...field} 
                      />
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
            
            <Button 
              type="submit" 
              disabled={isDeploying} 
              className="w-full"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy Project"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
