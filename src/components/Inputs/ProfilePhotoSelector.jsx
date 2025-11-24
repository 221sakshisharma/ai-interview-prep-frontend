import { LuUser, LuTrash, LuUpload } from "react-icons/lu";
import { useState, useRef, useEffect } from "react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImage(null);
    setPreviewUrl(null);


//     If the user selects photo.png, the browser stores it there.
// Now suppose the user clicks "Remove Image" and tries to select the same file again.
// Nothing happens — because the input doesn't detect any change.
// (It compares old value vs new value. If they are the same → no event triggers.)

    
    inputRef.current.value = "";
  };

  const onChooseFile = () => {
    inputRef.current.click();

    // console.log(inputRef.current.clic)
    
  };
 
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="flex justify-center mb-6">

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {image ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* ✅ This should remove image */}
          <button
            type="button"
            className="w-8 h-8 flex justify-center items-center bg-linear-to-r from-red-600 to-red-500/90  text-white rounded-full absolute -bottom-0.5 -right-0.5 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 flex items-center justify-center bg-indigo-100/70 rounded-full relative">
          <LuUser className="text-4xl text-indigo-500" />

          <button
            type="button"
            className="w-8 h-8 flex justify-center items-center bg-linear-to-r from-indigo-500/70 to-indigo-600 text-white rounded-full absolute -bottom-0.5 -right-0.5 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
