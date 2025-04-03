
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DeploymentStats from "@/components/dashboard/DeploymentStats";
import DeploymentCard, { DeploymentProps } from "@/components/dashboard/DeploymentCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, PlusCircle } from "lucide-react";

const deployments: DeploymentProps[] = [
  {
    id: "1",
    name: "E-commerce Frontend",
    repo: "username/ecommerce-frontend",
    status: "success",
    url: "https://ecommerce.tecxi.app",
    lastDeployed: "2 hours ago",
    branch: "main",
  },
  {
    id: "2",
    name: "Admin Dashboard",
    repo: "username/admin-dashboard",
    status: "in-progress",
    url: "https://admin.tecxi.app",
    lastDeployed: "Deploying...",
    branch: "develop",
  },
  {
    id: "3",
    name: "Marketing Website",
    repo: "username/marketing-site",
    status: "success",
    url: "https://marketing.tecxi.app",
    lastDeployed: "3 days ago",
    branch: "main",
  },
];

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button asChild>
            <Link to="/dashboard/new-project">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>

        <DeploymentStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Deployments</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/projects">View all</Link>
              </Button>
            </div>
            
            {deployments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deployments.map((deployment) => (
                  <DeploymentCard key={deployment.id} deployment={deployment} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <Rocket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No deployments yet</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by deploying your first project.
                </p>
                <Button asChild>
                  <Link to="/dashboard/new-project">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
