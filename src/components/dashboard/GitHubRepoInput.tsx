
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Github } from "lucide-react";

interface GitHubRepoInputProps {
  onSubmit: (repoUrl: string) => void;
  isLoading?: boolean;
}

const GitHubRepoInput = ({ onSubmit, isLoading = false }: GitHubRepoInputProps) => {
  const [repoUrl, setRepoUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!repoUrl) {
      toast({
        title: "Invalid input",
        description: "Please enter a GitHub repository URL.",
        variant: "destructive",
      });
      return;
    }
    
    // Simple GitHub URL validation
    const githubUrlPattern = /^https?:\/\/github\.com\/[\w-]+\/[\w.-]+\/?$/;
    if (!githubUrlPattern.test(repoUrl)) {
      toast({
        title: "Invalid GitHub URL",
        description: "Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo).",
        variant: "destructive",
      });
      return;
    }
    
    // Call the onSubmit callback
    onSubmit(repoUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="repo-url">GitHub Repository URL</Label>
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Github className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="repo-url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          TecXi will connect to your GitHub repository and set up automated deployments.
        </p>
      </div>
    </form>
  );
};

export default GitHubRepoInput;
