import { Departure, RoomStatus } from "@/data/hotelData";
import { Badge } from "@/components/ui/badge";

interface DeparturesWidgetProps {
  departures: Departure[];
  onSettle: (departure: Departure) => void;
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

const DeparturesWidget = ({ departures, onSettle }: DeparturesWidgetProps) => {
  return (
    <div className="overflow-auto max-h-64">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="text-left py-2 px-2 font-medium">Nr rez.</th>
            <th className="text-left py-2 px-2 font-medium">Pokój</th>
            <th className="text-left py-2 px-2 font-medium">Status</th>
            <th className="text-left py-2 px-2 font-medium">Gość</th>
            <th className="text-left py-2 px-2 font-medium">Przyjazd</th>
            <th className="text-right py-2 px-2 font-medium">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((d) => (
            <tr
              key={d.id}
              className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
              onDoubleClick={() => onSettle(d)}
              title="Kliknij 2x aby rozliczyć"
            >
              <td className="py-2 px-2 font-mono text-muted-foreground">{d.reservationNo}</td>
              <td className="py-2 px-2 font-semibold">{d.room}</td>
              <td className="py-2 px-2">
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roomStatusClass[d.roomStatus]}`}>
                  {roomStatusLabel[d.roomStatus]}
                </Badge>
              </td>
              <td className="py-2 px-2 font-medium">{d.guest}</td>
              <td className="py-2 px-2 text-muted-foreground">{d.arrival}</td>
              <td className={`py-2 px-2 text-right font-semibold ${d.balance > 0 ? 'text-cash-negative' : 'text-cash-positive'}`}>
                {d.balance.toFixed(2)} PLN
              </td>
            </tr>
          ))}
          {departures.length === 0 && (
            <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">Brak wyjazdów na dziś</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeparturesWidget;
