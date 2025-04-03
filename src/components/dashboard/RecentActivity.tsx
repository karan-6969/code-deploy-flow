
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Github,
  GitBranch,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    id: 1,
    type: "deployment",
    status: "success",
    project: "E-commerce App",
    time: "2 hours ago",
    user: "John Doe",
    commit: "Update product filters",
    branch: "main",
    message: "Successfully deployed to production",
  },
  {
    id: 2,
    type: "deployment",
    status: "failed",
    project: "Blog Platform",
    time: "5 hours ago",
    user: "Jane Smith",
    commit: "Refactor authentication",
    branch: "dev",
    message: "Build failed: Missing dependencies",
  },
  {
    id: 3,
    type: "deployment",
    status: "success",
    project: "Portfolio Website",
    time: "1 day ago",
    user: "John Doe",
    commit: "Add contact form",
    branch: "main",
    message: "Successfully deployed to production",
  },
  {
    id: 4,
    type: "deployment",
    status: "success",
    project: "Analytics Dashboard",
    time: "2 days ago",
    user: "Jane Smith",
    commit: "Fix chart rendering issues",
    branch: "main",
    message: "Successfully deployed to production",
  },
];

const RecentActivity = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="mr-4 flex flex-col items-center">
                  <div
                    className={`rounded-full p-1 ${
                      activity.status === "success"
                        ? "text-green-500 bg-green-100 dark:bg-green-900"
                        : "text-red-500 bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {activity.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="h-full w-px bg-border mt-2"></div>
                </div>
                
                <div className="space-y-2 pb-4">
                  <div className="flex items-center">
                    <span className="font-medium">
                      {activity.project}
                    </span>
                    <span
                      className={`ml-2 text-xs rounded-full px-2 py-0.5 ${
                        activity.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {activity.status === "success" ? "Success" : "Failed"}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">
                    {activity.message}
                  </p>
                  
                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-3.5 w-3.5 mr-1" />
                      {activity.user}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Github className="h-3.5 w-3.5 mr-1" />
                      {activity.commit}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <GitBranch className="h-3.5 w-3.5 mr-1" />
                      {activity.branch}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
