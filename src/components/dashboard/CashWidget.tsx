import { CashState } from "@/data/hotelData";
import { Banknote } from "lucide-react";
import { toast } from "sonner";

interface CashWidgetProps {
  cash: CashState;
}

const CashWidget = ({ cash }: CashWidgetProps) => {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Stan początkowy</span>
          <span className="font-mono font-semibold text-sm">{cash.openingBalance.toLocaleString("pl-PL", { minimumFractionDigits: 2 })} {cash.currency}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">Stan końcowy</span>
          <span className="font-mono font-bold text-lg text-primary">{cash.closingBalance.toLocaleString("pl-PL", { minimumFractionDigits: 2 })} {cash.currency}</span>
        </div>
      </div>

      <button
        onClick={() => toast.info("Otwieranie operacji KP/KW...")}
        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-primary/30 rounded-lg py-2 text-xs font-medium transition-all"
      >
        <Banknote className="w-4 h-4" />
        Operacje KP / KW
      </button>
    </div>
  );
};

export default CashWidget;
