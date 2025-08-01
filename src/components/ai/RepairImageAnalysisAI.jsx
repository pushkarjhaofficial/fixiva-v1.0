import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FixivaHelmet from "@/components";
import { FaRobot, FaUpload, FaSyncAlt } from "react-icons/fa";

const RepairImageAnalysisAI = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setLoading(true);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/ai/repair-analysis", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      setAnalysis(result);
      if (result.error) {
        toast.error(t("ai_repair_analysis_failed", { defaultValue: "AI analysis failed. Please try again." }));
      } else {
        toast.success(t("ai_repair_analysis_success", { defaultValue: "Analysis complete!" }));
      }
    } catch (err) {
      setAnalysis({ error: t("ai_repair_analysis_failed", { defaultValue: "AI analysis failed. Please try again." }) });
      toast.error(t("ai_repair_analysis_failed", { defaultValue: "AI analysis failed. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  const handleReAnalyze = () => {
    if (image) {
      handleImageChange({ target: { files: [image] } });
    }
  };

  return (
    <>
      <FixivaHelmet
        title={t("ai_repair_image_analyzer_title", { defaultValue: "AI Repair Image Analyzer" })}
        description={t("ai_repair_image_analyzer_desc", {
          defaultValue: "Get instant issue detection and fix suggestion from your uploaded repair image using Fixiva AI.",
        })}
        name="RepairImageAnalysisAI"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-lg bg-[var(--color-bg)] p-6 shadow flex flex-col items-center max-w-lg mx-auto"
        aria-label={t("ai_repair_image_analyzer_aria", { defaultValue: "AI Repair Image Analyzer" })}
      >
        <h2 className="mb-4 text-lg font-bold flex items-center gap-2">
          <FaRobot className="text-[var(--color-primary)]" />
          {t("ai_repair_image_analyzer", { defaultValue: "AI Repair Image Analyzer" })}
        </h2>

        <label
          htmlFor="repair-image-upload"
          className="flex flex-col items-center justify-center w-full mb-4 cursor-pointer border-2 border-dashed border-[var(--color-border)] rounded-lg py-6 bg-[var(--color-bg-muted)] hover:bg-[var(--color-bg)] transition"
        >
          <FaUpload className="text-3xl mb-2 text-[var(--color-primary)]" />
          <span className="font-medium text-[var(--color-text)]">{t("upload_repair_image", { defaultValue: "Upload repair image (JPG, PNG, max 5MB)" })}</span>
          <input
            id="repair-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            aria-label={t("upload_repair_image_aria", { defaultValue: "Upload repair image" })}
          />
        </label>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt={t("uploaded_image_preview", { defaultValue: "Uploaded Image Preview" })}
            className="w-full h-auto max-h-80 object-contain rounded mb-4 border border-[var(--color-border)]"
            style={{ background: "#f8fafc" }}
          />
        )}

        {loading && (
          <p className="text-[var(--color-text)] mb-2 animate-pulse">
            🔍 {t("analyzing_with_ai", { defaultValue: "Analyzing image with AI..." })}
          </p>
        )}

        {analysis && !loading && (
          <div className="bg-[var(--color-bg-muted)] dark:bg-zinc-800 p-4 rounded-md space-y-2 text-sm w-full mb-2">
            {analysis.error ? (
              <p className="text-[var(--color-text)]">{analysis.error}</p>
            ) : (
              <>
                <p className="text-[var(--color-text)]">
                  🛠 <strong>{t("detected_issue", { defaultValue: "Detected Issue:" })}</strong> {analysis.issue}
                </p>
                <p className="text-[var(--color-text)]">
                  💡 <strong>{t("suggested_fix", { defaultValue: "Suggested Fix:" })}</strong> {analysis.fix}
                </p>
                <p className="text-[var(--color-text)]">
                  💰 <strong>{t("estimated_cost", { defaultValue: "Estimated Cost:" })}</strong> ₹{analysis.costMin} – ₹{analysis.costMax}
                </p>
              </>
            )}
          </div>
        )}

        {image && (
          <button
            aria-label={t("reanalyze_image", { defaultValue: "Re-analyze Image" })}
            onClick={handleReAnalyze}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded bg-[--color-primary] text-[--color-text-light] hover:bg-[--color-hover] text-sm"
          >
            <FaSyncAlt /> {t("reanalyze_image", { defaultValue: "Re-analyze Image" })}
          </button>
        )}
      </motion.div>
    </>
  );
};export default RepairImageAnalysisAI;