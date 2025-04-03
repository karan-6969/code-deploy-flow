
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  RefreshCw, 
  BarChart3, 
  Settings,
  Clock
} from "lucide-react";

export interface DeploymentProps {
  id: string;
  name: string;
  repo: string;
  status: "success" | "failed" | "in-progress";
  url: string;
  lastDeployed: string;
  branch: string;
}

const DeploymentCard = ({ deployment }: { deployment: DeploymentProps }) => {
  const statusColors = {
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  const statusText = {
    success: "Live",
    failed: "Failed",
    "in-progress": "Deploying",
  };
  
  const statusIcon = {
    success: <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />,
    failed: <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5" />,
    "in-progress": <RefreshCw className="h-3 w-3 mr-1.5 animate-spin" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow duration-300">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{deployment.name}</CardTitle>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Github className="h-4 w-4 mr-1" />
                <span className="truncate max-w-[180px]">{deployment.repo}</span>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`${statusColors[deployment.status]} flex items-center px-2 py-1`}
            >
              {statusIcon[deployment.status]}
              {statusText[deployment.status]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Branch</span>
              <span className="font-medium">{deployment.branch}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last deployed</span>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span>{deployment.lastDeployed}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">URL</span>
              <a
                href={deployment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center"
              >
                {deployment.url.replace("https://", "")}
                <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Redeploy
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/dashboard/projects/${deployment.id}/analytics`}>
                <BarChart3 className="h-4 w-4" />
                <span className="sr-only">Analytics</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/dashboard/projects/${deployment.id}/settings`}>
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DeploymentCard;
