import { QuickAction } from "@/data/hotelData";
import { CalendarPlus, List, UserPlus, Users, CalendarDays, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarPlus,
  List,
  UserPlus,
  Users,
  CalendarDays,
  FileText,
};

interface QuickActionsWidgetProps {
  actions: QuickAction[];
  onToggleAction: (id: string) => void;
  isConfiguring: boolean;
}

const QuickActionsWidget = ({ actions, onToggleAction, isConfiguring }: QuickActionsWidgetProps) => {
  const visibleActions = isConfiguring ? actions : actions.filter((a) => a.enabled);

  return (
    <div className="grid grid-cols-3 gap-2">
      {visibleActions.map((action) => {
        const Icon = iconMap[action.icon];
        return (
          <button
            key={action.id}
            onClick={() => {
              if (isConfiguring) {
                onToggleAction(action.id);
              } else {
                toast.info(`Otwieranie: ${action.label}`);
              }
            }}
            className={`
              relative flex flex-col items-center gap-1.5 rounded-lg px-3 py-3 text-xs font-medium transition-all
              ${isConfiguring && !action.enabled
                ? "bg-muted/30 text-muted-foreground border border-dashed border-border opacity-50"
                : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-primary/30"
              }
            `}
          >
            {isConfiguring && (
              <span className={`absolute top-1 right-1 w-3 h-3 rounded-full border ${action.enabled ? 'bg-primary border-primary' : 'border-muted-foreground'}`} />
            )}
            {Icon && <Icon className="w-5 h-5" />}
            <span className="text-center leading-tight">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActionsWidget;
