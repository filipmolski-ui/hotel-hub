import { Arrival, RoomStatus } from "@/data/hotelData";
import { Badge } from "@/components/ui/badge";

interface ArrivalsWidgetProps {
  arrivals: Arrival[];
  onCheckIn: (arrival: Arrival) => void;
}

const roomStatusLabel: Record<RoomStatus, string> = {
  clean: "Czysty",
  dirty: "Brudny",
  occupied: "Zajęty",
  free: "Wolny",
  blocked: "Zablokowany",
};

const roomStatusClass: Record<RoomStatus, string> = {
  clean: "bg-status-clean/20 text-status-clean border-status-clean/30",
  dirty: "bg-status-dirty/20 text-status-dirty border-status-dirty/30",
  occupied: "bg-status-occupied/20 text-status-occupied border-status-occupied/30",
  free: "bg-status-free/20 text-status-free border-status-free/30",
  blocked: "bg-status-blocked/20 text-status-blocked border-status-blocked/30",
};

const ArrivalsWidget = ({ arrivals, onCheckIn }: ArrivalsWidgetProps) => {
  return (
    <div className="overflow-auto max-h-64">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left py-2 px-2 font-medium">Nr rez.</th>
            <th className="text-left py-2 px-2 font-medium">Pokój</th>
            <th className="text-left py-2 px-2 font-medium">Status</th>
            <th className="text-left py-2 px-2 font-medium">Gość</th>
            <th className="text-left py-2 px-2 font-medium">Wyjazd</th>
            <th className="text-center py-2 px-2 font-medium">Os.</th>
            <th className="text-left py-2 px-2 font-medium">Źródło</th>
          </tr>
        </thead>
        <tbody>
          {arrivals.map((a) => (
            <tr
              key={a.id}
              className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
              onDoubleClick={() => onCheckIn(a)}
              title="Kliknij 2x aby zameldować"
            >
              <td className="py-2 px-2 font-mono text-muted-foreground">{a.reservationNo}</td>
              <td className="py-2 px-2 font-semibold">{a.room}</td>
              <td className="py-2 px-2">
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roomStatusClass[a.roomStatus]}`}>
                  {roomStatusLabel[a.roomStatus]}
                </Badge>
              </td>
              <td className="py-2 px-2 font-medium">{a.guest}</td>
              <td className="py-2 px-2 text-muted-foreground">{a.departure}</td>
              <td className="py-2 px-2 text-center">{a.guests}</td>
              <td className="py-2 px-2 text-muted-foreground">{a.source}</td>
            </tr>
          ))}
          {arrivals.length === 0 && (
            <tr><td colSpan={7} className="py-8 text-center text-muted-foreground">Brak przyjazdów na dziś</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ArrivalsWidget;
