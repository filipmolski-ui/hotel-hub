import { useState, useCallback } from "react";
import { Settings, Hotel } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StatsWidget from "@/components/dashboard/StatsWidget";
import ArrivalsWidget from "@/components/dashboard/ArrivalsWidget";
import DeparturesWidget from "@/components/dashboard/DeparturesWidget";
import QuickActionsWidget from "@/components/dashboard/QuickActionsWidget";
import CashWidget from "@/components/dashboard/CashWidget";
import CheckInDialog from "@/components/dashboard/CheckInDialog";
import SettlementDialog from "@/components/dashboard/SettlementDialog";
import {
  MOCK_STATS,
  MOCK_ARRIVALS,
  MOCK_DEPARTURES,
  MOCK_CASH,
  DEFAULT_QUICK_ACTIONS,
  Arrival,
  Departure,
  QuickAction,
} from "@/data/hotelData";

type WidgetId = "stats" | "arrivals" | "departures" | "actions" | "cash";

const DEFAULT_ORDER: WidgetId[] = ["stats", "arrivals", "departures", "actions", "cash"];

const Index = () => {
  const [widgetOrder, setWidgetOrder] = useState<WidgetId[]>(DEFAULT_ORDER);
  const [quickActions, setQuickActions] = useState<QuickAction[]>(DEFAULT_QUICK_ACTIONS);
  const [isConfiguringActions, setIsConfiguringActions] = useState(false);
  const [checkInArrival, setCheckInArrival] = useState<Arrival | null>(null);
  const [settleDeparture, setSettleDeparture] = useState<Departure | null>(null);
  const [draggedWidget, setDraggedWidget] = useState<WidgetId | null>(null);

  const toggleAction = useCallback((id: string) => {
    setQuickActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }, []);

  const handleDragStart = (widgetId: WidgetId) => {
    setDraggedWidget(widgetId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: WidgetId) => {
    e.preventDefault();
    if (!draggedWidget || draggedWidget === targetId) return;
    setWidgetOrder((prev) => {
      const newOrder = [...prev];
      const dragIdx = newOrder.indexOf(draggedWidget);
      const targetIdx = newOrder.indexOf(targetId);
      newOrder.splice(dragIdx, 1);
      newOrder.splice(targetIdx, 0, draggedWidget);
      return newOrder;
    });
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
  };

  const today = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const widgetMap: Record<WidgetId, { title: string; content: React.ReactNode; colSpan: string }> = {
    stats: {
      title: "Statystyki",
      content: <StatsWidget stats={MOCK_STATS} />,
      colSpan: "col-span-1",
    },
    arrivals: {
      title: `Przyjazdy (${MOCK_ARRIVALS.length})`,
      content: <ArrivalsWidget arrivals={MOCK_ARRIVALS} onCheckIn={setCheckInArrival} />,
      colSpan: "col-span-2",
    },
    departures: {
      title: `Wyjazdy (${MOCK_DEPARTURES.length})`,
      content: <DeparturesWidget departures={MOCK_DEPARTURES} onSettle={setSettleDeparture} />,
      colSpan: "col-span-2",
    },
    actions: {
      title: "Szybkie akcje",
      content: (
        <QuickActionsWidget
          actions={quickActions}
          onToggleAction={toggleAction}
          isConfiguring={isConfiguringActions}
        />
      ),
      colSpan: "col-span-1",
    },
    cash: {
      title: "Kasa główna",
      content: <CashWidget cash={MOCK_CASH} />,
      colSpan: "col-span-1",
    },
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Hotel className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">Recepcja</h1>
            <p className="text-xs text-muted-foreground capitalize">{today}</p>
          </div>
        </div>
        <button
          onClick={() => setIsConfiguringActions((v) => !v)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition-all ${
            isConfiguringActions
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground border-border hover:border-primary/30"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          {isConfiguringActions ? "Zapisz" : "Konfiguruj"}
        </button>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 auto-rows-auto">
        {widgetOrder.map((widgetId) => {
          const widget = widgetMap[widgetId];
          return (
            <div
              key={widgetId}
              className={`${widget.colSpan} ${draggedWidget === widgetId ? "opacity-50" : ""}`}
              draggable
              onDragStart={() => handleDragStart(widgetId)}
              onDragOver={(e) => handleDragOver(e, widgetId)}
              onDragEnd={handleDragEnd}
            >
              <DashboardCard title={widget.title}>
                {widget.content}
              </DashboardCard>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-[10px] text-muted-foreground text-center mt-4">
        Przeciągnij kafelki aby zmienić kolejność • Kliknij 2x na gościa w przyjazdach/wyjazdach
      </p>

      {/* Dialogs */}
      <CheckInDialog
        arrival={checkInArrival}
        open={!!checkInArrival}
        onClose={() => setCheckInArrival(null)}
      />
      <SettlementDialog
        departure={settleDeparture}
        open={!!settleDeparture}
        onClose={() => setSettleDeparture(null)}
      />
    </div>
  );
};

export default Index;
