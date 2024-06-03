import { sample } from "../_api/sample";

let tagArray:string[] = []

export const extractTags = () => {
  sample.pin.forEach((pin) => {
    pin.tags.forEach((tag) => {
      if (!tagArray.includes(tag))
        {tagArray.push(tag)}
    });
  });
  return tagArray;
};
