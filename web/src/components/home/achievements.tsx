import { Award, Badge, Flame, LucideIcon } from "lucide-react";
import { FC } from "react";
import { Card } from "../ui/card";
import GradientText from "../ui/gradient-text";
import { Progress } from "../ui/progress";
type TAchievement = {
  title: string;
  description: string;
  progress: number;
  icon: LucideIcon;
};
const Achievements = () => {
  const achievements: TAchievement[] = [
    {
      title: "Current Streak",
      description: "5 Days",
      progress: 60,
      icon: Flame,
    },
    {
      title: "Longest Streak",
      description: "7 Days",
      progress: 70,
      icon: Award,
    },
    {
      title: "Total Badge",
      description: "6 badges",
      progress: 40,
      icon: Badge,
    },
  ];
  return (
    <Card className="p-6">
      <GradientText className="mb-4">Achievements</GradientText>
      <div className="space-y-4">
        {achievements?.map((achievement) => (
          <AchievementCard key={achievement?.title} {...achievement} />
        ))}
      </div>
    </Card>
  );
};

export default Achievements;

const AchievementCard: FC<TAchievement> = ({
  title,
  description,
  progress,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-medium">{title}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
        <Progress value={progress} />
      </div>
    </div>
  );
};
