import React from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function BookingFileUpload({ onChange, accept = "image/*", multiple = false }) {
  const { t } = useTranslation();

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      toast.success(t("file_upload_success", { defaultValue: "Files uploaded!" }));
      onChange?.(multiple ? Array.from(files) : files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-[--color-primary] file:text-white hover:file:bg-[--color-hover]"
        aria-label={t("upload_file", { defaultValue: "Upload File" })}
      />
    </div>
  );
}


// auto‑added by add-default-exports.js
export default BookingFileUpload;
