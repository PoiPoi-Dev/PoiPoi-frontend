import { useState } from "react";
import { Button } from "./ui/button";

export default function FilterButton({
  filters,
  setSelectedFilters,
}: {
  filters: string[];
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
                    setSelectedFilters(
                      filters.includes(tag)
                        ? filters.filter((tagInFilter) => tagInFilter !== tag)
                        : [...filters, tag]
                    );
                  }}
                  style={{ borderRadius: "9999px" }}
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
