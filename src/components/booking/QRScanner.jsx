import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // Use 'react-hot-toast' for consistency

export function QRScanner({ onScanSuccess, onClose }) {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const handleResult = (result, error) => {
    if (!!result) {
      setScanResult(result?.text);
      onScanSuccess?.(result?.text);
      toast.success("✅ QR code scanned!");
    }

    if (!!error && error.name !== "NotFoundError") {
      console.error("QR Scan Error:", error);
      setError("Failed to access camera or scan QR.");
      toast.error("❌ QR scanning failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[--color-bg] p-4 shadow dark:bg-[var(--color-bg)]"
        aria-label="QR Code Scanner"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            📷 Scan Booking QR
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-sm font-bold"
            aria-label="Close QR Scanner"
          >
            ✖ Close
          </button>
        </div>

        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleResult}
          style={{ width: "100%" }}
        />

        {scanResult && (
          <div className="mt-4 text-green-600 font-mono text-sm">
            ✅ Result: {scanResult}
          </div>
        )}

        {error && <div className="mt-2 text-red-500 text-sm">⚠️ {error}</div>}
      </motion.div>
    </div>
  );
}


// auto‑added by add-default-exports.js
export default QRScanner;
