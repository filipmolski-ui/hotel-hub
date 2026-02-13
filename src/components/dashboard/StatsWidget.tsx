import { HotelStats } from "@/data/hotelData";

interface StatsWidgetProps {
  stats: HotelStats;
}

const StatsWidget = ({ stats }: StatsWidgetProps) => {
  const totalRooms = stats.occupiedRooms + stats.freeRooms + stats.blockedRooms;

  return (
    <div className="space-y-4">
      {/* Top row: 3 panels */}
      <div className="grid grid-cols-3 gap-3">
        {/* Aktualne obłożenie */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Aktualne obłożenie</h4>
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 shrink-0">
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
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
                {stats.occupancyPercent}%
              </span>
            </div>
            <div className="text-[11px] space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-status-dirty shrink-0" />
                <span className="text-muted-foreground">Pok. zarez.</span>
                <span className="font-medium ml-auto">{stats.occupiedRooms}</span>
                <span className="text-muted-foreground">{stats.occupancyPercent}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-status-clean shrink-0" />
                <span className="text-muted-foreground">Pok. wolne</span>
                <span className="font-medium ml-auto">{stats.freeRooms}</span>
                <span className="text-muted-foreground">{((stats.freeRooms / totalRooms) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status aktualny */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status aktualny</h4>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left font-medium pb-1"></th>
                <th className="text-right font-medium pb-1 px-1">Pokoje</th>
                <th className="text-right font-medium pb-1 px-1">Miejsca</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr><td className="text-muted-foreground py-0.5">Zarezerwowane</td><td className="text-right px-1 font-medium">{stats.reservedRooms}</td><td className="text-right px-1 font-medium">{stats.reservedBeds}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Zablokowane</td><td className="text-right px-1 font-medium">{stats.blockedRooms}</td><td className="text-right px-1 font-medium">{stats.blockedBeds}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Dostępne</td><td className="text-right px-1 font-medium">{stats.availableRooms}</td><td className="text-right px-1 font-medium">{stats.availableBeds}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Jeszcze przyjedzie</td><td className="text-right px-1 font-medium">{stats.yetToArrive}</td><td className="text-right px-1 font-medium">{stats.arrivalsToday}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Jeszcze wyjedzie</td><td className="text-right px-1 font-medium">{stats.yetToDepart}</td><td className="text-right px-1 font-medium">{stats.departuresToday}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Pokoje */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pokoje</h4>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-muted-foreground">
                <th className="text-left font-medium pb-1"></th>
                <th className="text-right font-medium pb-1 px-1">Do posprzątania</th>
                <th className="text-right font-medium pb-1 px-1">Czyste</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr><td className="text-muted-foreground py-0.5">Wszystkie</td><td className="text-right px-1 font-medium">{stats.rooms.total.toClear}</td><td className="text-right px-1 font-medium">{stats.rooms.total.clean}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Zajęte</td><td className="text-right px-1 font-medium">{stats.rooms.occupied.toClear}</td><td className="text-right px-1 font-medium">{stats.rooms.occupied.clean}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Wolne</td><td className="text-right px-1 font-medium">{stats.rooms.free.toClear}</td><td className="text-right px-1 font-medium">{stats.rooms.free.clean}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Zarezerwowane</td><td className="text-right px-1 font-medium">{stats.rooms.reserved.toClear}</td><td className="text-right px-1 font-medium">{stats.rooms.reserved.clean}</td></tr>
              <tr><td className="text-muted-foreground py-0.5">Zablokowane</td><td className="text-right px-1 font-medium">{stats.rooms.blocked.toClear}</td><td className="text-right px-1 font-medium">{stats.rooms.blocked.clean}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom row: Prognoza + Rezerwacje */}
      <div className="grid grid-cols-3 gap-3">
        {/* Prognoza */}
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Prognoza</h4>
          <div className="text-[11px] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-status-dirty shrink-0" />
              <span className="text-muted-foreground">Pokoje zarez.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-status-clean shrink-0" />
              <span className="text-muted-foreground">Pokoje wolne</span>
            </div>
          </div>
          <div className="flex items-end gap-1 mt-2">
            {["Dzisiaj", "7 dni", "30 dni", "Koniec"].map((label, i) => {
              const val = [stats.forecast.today, stats.forecast.days7, stats.forecast.days30, stats.forecast.end][i];
              return (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <div className="flex gap-px">
                    <div className="w-3 rounded-t-sm bg-status-dirty" style={{ height: `${Math.max(4, val * 1.5)}px` }} />
                    <div className="w-3 rounded-t-sm bg-status-clean" style={{ height: `${Math.max(4, (100 - val) * 0.4)}px` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{label}</span>
                  <span className="text-[9px] text-muted-foreground">{val}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rezerwacje */}
        <div className="col-span-2 space-y-2">
          <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Rezerwacje</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="text-left font-medium pb-1 pr-2"></th>
                  {stats.reservations.dates.map((d) => (
                    <th key={d} className="text-right font-medium pb-1 px-1 min-w-[40px]">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2 whitespace-nowrap">Pokoje zarez.</td>
                  {stats.reservations.reservedRooms.map((v, i) => <td key={i} className="text-right px-1 font-medium">{v}</td>)}
                </tr>
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2">Goście</td>
                  {stats.reservations.guests.map((v, i) => <td key={i} className="text-right px-1 font-medium">{v}</td>)}
                </tr>
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2">Dzieci</td>
                  {stats.reservations.children.map((v, i) => <td key={i} className="text-right px-1 font-medium">{v}</td>)}
                </tr>
                <tr className="border-t border-border/50">
                  <td className="text-muted-foreground py-0.5 pr-2 whitespace-nowrap">Przyjazdy: Pokoje</td>
                  {stats.reservations.arrivals.rooms.map((v, i) => <td key={i} className="text-right px-1 font-medium text-primary">{v}</td>)}
                </tr>
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2 pl-4 whitespace-nowrap">Goście</td>
                  {stats.reservations.arrivals.guests.map((v, i) => <td key={i} className="text-right px-1 font-medium text-primary">{v}</td>)}
                </tr>
                <tr className="border-t border-border/50">
                  <td className="text-muted-foreground py-0.5 pr-2 whitespace-nowrap">Wyjazdy: Pokoje</td>
                  {stats.reservations.departures.rooms.map((v, i) => <td key={i} className="text-right px-1 font-medium text-accent">{v}</td>)}
                </tr>
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2 pl-4 whitespace-nowrap">Goście</td>
                  {stats.reservations.departures.guests.map((v, i) => <td key={i} className="text-right px-1 font-medium text-accent">{v}</td>)}
                </tr>
                <tr className="border-t border-border/50">
                  <td className="text-muted-foreground py-0.5 pr-2 whitespace-nowrap">Pozostają: Pokoje</td>
                  {stats.reservations.staying.rooms.map((v, i) => <td key={i} className="text-right px-1 font-medium">{v}</td>)}
                </tr>
                <tr>
                  <td className="text-muted-foreground py-0.5 pr-2 pl-4 whitespace-nowrap">Goście</td>
                  {stats.reservations.staying.guests.map((v, i) => <td key={i} className="text-right px-1 font-medium">{v}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
