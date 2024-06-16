import { Badge } from "./ui/badge";
import { useContext } from "react";
import { ImportantPinContext } from "./useContext/ImportantPinContext";
import { trackingPinID } from "../_utils/global";

export default function FilterButton({
  filters,
  selectedFilters,
  setSelectedFilters,
}: {
  filters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}) {

  const importantPinContext = useContext(ImportantPinContext);

  return (
    <div className="flex gap-2 overflow-x-scroll no-scrollbar px-4">
      {filters.map((tag) => (
        <a key={tag} className="list-none">
          <li>
            <Badge
              onClick={() => {
                selectedFilters = selectedFilters.includes(tag)
                  ? selectedFilters.filter((tagInFilter) => tagInFilter !== tag)
                  : [...selectedFilters, tag];
                setSelectedFilters(selectedFilters);
                importantPinContext?.setTrackingPin(null);
                localStorage.setItem("trackingPinID", JSON.stringify({poi_id: -1} as trackingPinID));
              }}
              variant={selectedFilters.includes(tag) ? "default" : "button"}
              className="cursor-pointer"
            >
              {tag}
            </Badge>
          </li>
        </a>
      ))}
    </div>
  );
}
