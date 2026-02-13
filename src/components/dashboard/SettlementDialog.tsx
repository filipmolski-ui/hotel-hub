import { Departure } from "@/data/hotelData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SettlementDialogProps {
  departure: Departure | null;
  open: boolean;
  onClose: () => void;
}

const SettlementDialog = ({ departure, open, onClose }: SettlementDialogProps) => {
  if (!departure) return null;

  const handleCheckOut = () => {
    toast.success(`Wymeldowano: ${departure.guest} z pokoju ${departure.room}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Rozliczenie — pokój {departure.room}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-muted-foreground block">Gość</span>
              <span className="font-medium">{departure.guest}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">Nr rezerwacji</span>
              <span className="font-mono text-muted-foreground">{departure.reservationNo}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">Przyjazd</span>
              <span>{departure.arrival}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">Wyjazd</span>
              <span>{departure.departure}</span>
            </div>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Saldo do zapłaty</span>
              <span className={`text-2xl font-bold font-mono ${departure.balance > 0 ? 'text-cash-negative' : 'text-cash-positive'}`}>
                {departure.balance.toFixed(2)} PLN
              </span>
            </div>
          </div>

          {departure.balance > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive">
              Gość posiada nierozliczone saldo. Proszę pobrać płatność przed wymeldowaniem.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button variant={departure.balance > 0 ? "destructive" : "default"} onClick={handleCheckOut}>
            {departure.balance > 0 ? "Rozlicz i wymelduj" : "Wymelduj"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettlementDialog;
