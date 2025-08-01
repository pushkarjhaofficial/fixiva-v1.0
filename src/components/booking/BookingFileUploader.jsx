import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function BookingFileUploader({ onUpload, accept = "image/*", maxFiles = 5 }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > maxFiles) {
      toast.error(t("max_files_exceeded", { defaultValue: `Maximum ${maxFiles} files allowed.` }));
      return;
    }
    onUpload?.(files);
    toast.success(t("file_upload_success", { defaultValue: "Files uploaded!" }));
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFiles}
        className="hidden"
        id="booking-file-uploader"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-[--color-hover]"
      >
        {t("upload_files", { defaultValue: "Upload Files" })}
      </button>
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingFileUploader;
