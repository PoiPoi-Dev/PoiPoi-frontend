// import React, { useState } from "react";
// import { extractTags } from "../_utils/extractTags";
// import { Button } from "./ui/button";

// const TagFilterDropdown: React.FC<{
//   onFilter: (selectedTags: string[]) => void;
// }> = ({ onFilter }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const tags = extractTags();

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleTagToggle = (tag: string) => {
//     setSelectedTags((prevSelected) =>
//       prevSelected.includes(tag)
//         ? prevSelected.filter((t) => t !== tag)
//         : [...prevSelected, tag]
//     );
//   };

//   const applyFilter = () => {
//     onFilter(selectedTags);
//     toggleDropdown();
//   };

//   return (
//     <div className="absolute top-0 left-0 z-50">
//       <Button onClick={toggleDropdown} variant="default">
//         Filter by Tags
//       </Button>
//       {isOpen && (
//         <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-10">
//           {tags.map((tag) => (
//             <div key={tag} className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={selectedTags.includes(tag)}
//                 onChange={() => handleTagToggle(tag)}
//               />
//               <label>{tag}</label>
//             </div>
//           ))}
//           <Button onClick={applyFilter} variant="default" className="mt-2">
//             Apply Filter
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TagFilterDropdown;
