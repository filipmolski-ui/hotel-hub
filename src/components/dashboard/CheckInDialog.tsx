import { Arrival } from "@/data/hotelData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CheckInDialogProps {
  arrival: Arrival | null;
  open: boolean;
  onClose: () => void;
}

const CheckInDialog = ({ arrival, open, onClose }: CheckInDialogProps) => {
  if (!arrival) return null;

  const handleCheckIn = () => {
    toast.success(`Zameldowano: ${arrival.guest} w pokoju ${arrival.room}`);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Check-in — pokój {arrival.room}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Gość</Label>
              <Input defaultValue={arrival.guest} className="bg-muted border-border text-sm" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Nr rezerwacji</Label>
              <Input defaultValue={arrival.reservationNo} readOnly className="bg-muted/50 border-border text-sm text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Pokój</Label>
              <Input defaultValue={arrival.room} readOnly className="bg-muted/50 border-border text-sm text-muted-foreground" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Przyjazd</Label>
              <Input defaultValue={arrival.arrival} readOnly className="bg-muted/50 border-border text-sm text-muted-foreground" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Wyjazd</Label>
              <Input defaultValue={arrival.departure} readOnly className="bg-muted/50 border-border text-sm text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Nr dokumentu</Label>
              <Input placeholder="Nr dowodu / paszportu" className="bg-muted border-border text-sm" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Liczba osób</Label>
              <Input type="number" defaultValue={arrival.guests} className="bg-muted border-border text-sm" />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Uwagi</Label>
            <Input placeholder="Uwagi do zameldowania..." className="bg-muted border-border text-sm" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button onClick={handleCheckIn}>Zamelduj</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckInDialog;
