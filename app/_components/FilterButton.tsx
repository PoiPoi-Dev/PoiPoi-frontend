import { useState } from "react";
import { Button } from "./ui/button";

export default function FilterButton({
  filters,
  selectedFilters,
  setSelectedFilters,
}: {
  filters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}) {
  // USE STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsOpen((prev: boolean): boolean => !prev)}>
        Filter
      </Button>
      {isOpen && (
        <div className="flex gap-2">
          {filters.map((tag) => (
            <a key={tag} className="list-none">
              <li>
                <Button
                  onClick={() => {
                    selectedFilters = selectedFilters.includes(tag)
                      ? selectedFilters.filter(
                          (tagInFilter) => tagInFilter !== tag
                        )
                      : [...selectedFilters, tag];
                    setSelectedFilters(selectedFilters);
                  }}
                  style={{ borderRadius: "9999px" }}
                  variant={selectedFilters.includes(tag) ? "default" : "ghost"}
                >
                  {tag}
                </Button>
              </li>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
