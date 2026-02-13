import { ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  dragHandleProps?: Record<string, unknown>;
}

const DashboardCard = ({ title, children, className = "", dragHandleProps }: DashboardCardProps) => {
  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
        <div {...dragHandleProps} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default DashboardCard;
