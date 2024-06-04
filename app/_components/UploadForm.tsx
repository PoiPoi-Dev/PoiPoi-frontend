import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
//FIREBASE
import { storage } from "../../config/firebaseconfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

//built in firebase functions.
//ref: create reference to the folder path on the cloud storage
//uploadBytes: uploads the photo, takes care of file type etc. magic.
//listAll: list all items (objects) in the path folder specified
//getDownloadURL: get the actual url that can be added to img src to display the image
export default function UploadForm({}): React.JSX.Element {
  // FILE UPLOAD STATE
  const [fileUpload, setFileUpload] = useState(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  // upload file to Firebase
  const uploadFile = async () => {
    if (!fileUpload) return;
    const userPhotosFolderRef = ref(storage, `userPhotos/${fileUpload.name}`);
    try {
      const snapshot = await uploadBytes(userPhotosFolderRef, fileUpload);
      const firebaseURL = await getDownloadURL(snapshot.ref);
      setImageURL(firebaseURL);
      console.log("firebase url", firebaseURL);
    } catch (err) {
      console.error("image upload error!", err);
    }
  };
  return (
    <div className="top-20 left-0">
      <Button>upload button!</Button>
    </div>
  );
}
