import React, { Fragment, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import Cropper from "react-easy-crop";
import { X, UploadCloud } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFixivaBot } from "@/hooks";
import FixivaHelmet from "@/components";

// Utility to crop image as blob
async function getCroppedImg(imageSrc, crop) {
  // Reusable, production-grade utility for cropping images (uses Canvas)
  const createImage = url =>
    new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.setAttribute("crossOrigin", "anonymous");
      img.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) return reject(new Error("Canvas is empty"));
        resolve(blob);
      },
      "image/jpeg",
      0.96
    );
  });
}

export function AvatarCropperModal({
  isOpen,
  onClose,
  onCropComplete,
}) {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result.toString());
    reader.readAsDataURL(file);
    sendBotEvent("avatar_image_uploaded");
  };

  const onCropCompleteCallback = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const previewUrl = URL.createObjectURL(croppedBlob);
      onCropComplete?.(croppedBlob, previewUrl);
      sendBotEvent("avatar_cropped");
      toast.success(t("avatar_updated", { defaultValue: "Avatar updated successfully!" }));
      onClose?.();
    } catch (err) {
      toast.error(t("crop_failed", { defaultValue: "Failed to crop image." }));
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onClose?.();
  };

  return (
    <>
      <FixivaHelmet
        title={t("avatar_cropper_title", { defaultValue: "Upload & Crop Avatar" })}
        description={t("avatar_cropper_desc", { defaultValue: "Upload, crop, and update your profile avatar." })}
        name="AvatarCropperModal"
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleModalClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[var(--color-bg-dark)]/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="max-w-xl w-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="scale-95 opacity-0"
                enterTo="scale-100 opacity-100"
                leave="ease-in duration-200"
                leaveFrom="scale-100 opacity-100"
                leaveTo="scale-95 opacity-0"
              >
                <Dialog.Panel className="bg-[var(--color-bg)] rounded-lg p-6 shadow-xl text-[var(--color-text)]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <UploadCloud className="text-[var(--color-text)]" />
                      {t("upload_and_crop_avatar", { defaultValue: "Upload & Crop Avatar" })}
                    </h3>
                    <button
                      aria-label={t("close", { defaultValue: "Close" })}
                      onClick={handleModalClose}
                      className="hover:text-[var(--color-text)] text-[var(--color-text)]"
                      type="button"
                    >
                      <X />
                    </button>
                  </div>

                  {/* Upload */}
                  {!imageSrc ? (
                    <div className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-[var(--color-border)] rounded-lg">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="upload-avatar"
                      />
                      <label htmlFor="upload-avatar" className="cursor-pointer text-center">
                        <UploadCloud className="mx-auto mb-2 text-[var(--color-text)]" size={32} />
                        <p className="font-medium">{t("click_to_upload", { defaultValue: "Click to upload image" })}</p>
                        <p className="text-xs text-[var(--color-text)]">JPG, PNG, SVG, Max 2MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="relative h-[300px] w-full bg-[var(--color-bg-dark)] rounded-lg overflow-hidden mb-4">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropCompleteCallback}
                      />
                    </div>
                  )}

                  {/* Controls */}
                  {imageSrc && (
                    <div className="flex items-center justify-between mt-2 gap-3">
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full"
                        aria-label={t("zoom", { defaultValue: "Zoom" })}
                      />
                      <button
                        onClick={handleCropConfirm}
                        disabled={loading}
                        className="bg-[var(--color-primary)] text-[var(--color-text-light)] px-4 py-2 rounded-md font-semibold hover:bg-[var(--color-accent)] transition"
                        aria-label={t("crop_and_save", { defaultValue: "Crop & Save" })}
                        type="button"
                      >
                        {loading ? t("cropping", { defaultValue: "Cropping..." }) : t("crop_and_save", { defaultValue: "Crop & Save" })}
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}


// auto‑added by add-default-exports.js
export default AvatarCropperModal;
