import { HotelStats } from "@/data/hotelData";

interface StatsWidgetProps {
  stats: HotelStats;
}

const StatsWidget = ({ stats }: StatsWidgetProps) => {
  return (
    <div className="space-y-3">
      {/* Occupancy donut */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
            <circle cx="18" cy="18" r="14" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="14"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray={`${stats.occupancyPercent * 0.88} ${88 - stats.occupancyPercent * 0.88}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-foreground">
            {stats.occupancyPercent}%
          </span>
        </div>
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-occupied" />
            <span className="text-muted-foreground">Zajęte:</span>
            <span className="font-medium">{stats.occupiedRooms} pok.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-free" />
            <span className="text-muted-foreground">Wolne:</span>
            <span className="font-medium">{stats.freeRooms} pok.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">Zarezerwowane:</span>
            <span className="font-medium">{stats.reservedRooms} pok.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-blocked" />
            <span className="text-muted-foreground">Zablokowane:</span>
            <span className="font-medium">{stats.blockedRooms} pok.</span>
          </div>
        </div>
      </div>

      {/* Quick numbers */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-muted/50 rounded-md px-3 py-2">
          <span className="text-muted-foreground">Przyjazdy dziś</span>
          <p className="text-lg font-bold text-primary">{stats.arrivalsToday}</p>
        </div>
        <div className="bg-muted/50 rounded-md px-3 py-2">
          <span className="text-muted-foreground">Wyjazdy dziś</span>
          <p className="text-lg font-bold text-accent">{stats.departuresToday}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
