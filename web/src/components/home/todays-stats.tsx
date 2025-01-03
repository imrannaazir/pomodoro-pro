import { Brain, Clock, LucideIcon, Target } from "lucide-react";
import { FC } from "react";
import { Card } from "../ui/card";
import GradientText from "../ui/gradient-text";
type TStat = {
  title: string;
  description: string;
  icon: LucideIcon;
};
const TodaysStats = () => {
  const stats: TStat[] = [
    {
      title: "Focus Time",
      description: "2.5h",
      icon: Clock,
    },
    {
      title: "Sessions",
      description: "4",
      icon: Brain,
    },
    {
      title: "Goal",
      description: "60%",
      icon: Target,
    },
  ];

  return (
    <Card className="p-6">
      <GradientText className="mb-4">{"Today's Progress"}</GradientText>
      <div className="grid grid-cols-3 gap-4">
        {stats?.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </Card>
  );
};

export default TodaysStats;

const StatCard: FC<TStat> = ({ description, icon: Icon, title }) => {
  return (
    <Card className="flex flex-col items-center p-4 bg-muted  ">
      <Icon className="h-6 w-6 mb-2 text-primary" />
      <span className="text-2xl font-bold">{description}</span>
      <span className="text-sm text-muted-foreground">{title}</span>
    </Card>
  );
};
