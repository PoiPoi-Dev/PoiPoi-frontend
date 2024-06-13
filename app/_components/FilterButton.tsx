import { Badge } from "./ui/badge";

export default function FilterButton({
  filters,
  selectedFilters,
  setSelectedFilters,
}: {
  filters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}) {
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
