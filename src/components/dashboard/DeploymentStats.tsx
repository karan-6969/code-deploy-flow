
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users, Zap, Globe, Clock } from "lucide-react";

const stats = [
  {
    name: "Total Deployments",
    value: 12,
    unit: "",
    icon: <Zap className="h-4 w-4 text-blue-500" />,
    change: "+8%",
    trend: "up",
  },
  {
    name: "Unique Visitors",
    value: 2.4,
    unit: "K",
    icon: <Users className="h-4 w-4 text-green-500" />,
    change: "+20%",
    trend: "up",
  },
  {
    name: "Avg. Load Time",
    value: 0.8,
    unit: "s",
    icon: <Clock className="h-4 w-4 text-amber-500" />,
    change: "-5%",
    trend: "down",
  },
  {
    name: "Active Domains",
    value: 3,
    unit: "",
    icon: <Globe className="h-4 w-4 text-purple-500" />,
    change: "+1",
    trend: "up",
  },
];

const DeploymentStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.unit}
            </div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stat.trend === "up" ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DeploymentStats;
