import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

const IdsInfo = ({ chatIds }: { chatIds: string[] }) => {
  return (
    <div className="flex flex-col gap-6 text-muted-foreground text-sm">
      <div className="grid grid-rows-2 w-full gap-5">
        {chatIds.map((chatId, index) => (
          <div key={chatId ?? index} className="flex-1">
            <Label htmlFor={`firstName-${index}`}>Id {index+1}</Label>
            <div
              id={`id-${index}`}
              className="py-4 px-6 sm:py-6 text-foreground placeholder:text-xs sm:placeholder:text-sm mt-2 bg-input/30 rounded-2xl flex justify-between"
            >
              {chatId}
              <Trash2 className="text-red-600"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdsInfo;
