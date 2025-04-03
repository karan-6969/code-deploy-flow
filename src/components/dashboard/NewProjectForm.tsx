
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Github, Loader2 } from "lucide-react";

const NewProjectForm = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [projectName, setProjectName] = useState("");
  const [framework, setFramework] = useState("");
  const [branch, setBranch] = useState("main");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Project created",
        description: "Your new project has been created and is now building.",
      });
      
      navigate("/dashboard");
    }, 2000);
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Project</CardTitle>
        <CardDescription>
          Deploy a new project from a GitHub repository.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="repo">GitHub Repository</Label>
            <div className="flex">
              <div className="flex items-center border rounded-l-md px-3 bg-muted">
                <Github className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="repo"
                placeholder="username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                required
                className="rounded-l-none"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the username and repository name, e.g., "username/repository"
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="My Awesome Project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be used as your project's subdomain: project-name.tecxi.app
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={framework} onValueChange={setFramework} required>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="svelte">Svelte</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="static">Static HTML/CSS/JS</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || !repoUrl || !projectName || !framework}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewProjectForm;
