import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FixivaHelmet } from "@/shared";

export function BookingFormModal({ open, setOpen }) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    category_id: "",
    subcategory_id: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      fetch("/categories/tree")
        .then((res) => res.json())
        .then(setCategories)
        .catch(() => toast.error(t("fetch_categories_error", { defaultValue: "Failed to fetch categories." })));
    }
  }, [open, t]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCategory = (e) => {
    const selected = categories.find((cat) => String(cat.id) === String(e.target.value));
    setForm((f) => ({
      ...f,
      category_id: e.target.value,
      subcategory_id: "",
    }));
    setSubcategories(selected?.subcategories || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await fetch("/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMessage(t("booking_success", { defaultValue: "✅ Booking submitted! Our team will contact you soon." }));
      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage(t("booking_error", { defaultValue: "❌ Booking failed. Please try again." }));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <FixivaHelmet
        title={t("book_service", { defaultValue: "Book a Service" })}
        description={t("book_service_desc", { defaultValue: "Book a Fixiva service quickly." })}
        name="BookingFormModal"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded bg-[--color-bg] p-6 shadow-[var(--color-shadow)]">
          <Dialog.Title className="text-2xl font-semibold text-[--color-text] text-center mb-6">
            {t("book_service", { defaultValue: "Book a Service" })}
          </Dialog.Title>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              aria-label={t("full_name", { defaultValue: "Full Name" })}
              type="text"
              name="name"
              required
              placeholder={t("full_name", { defaultValue: "Full Name" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
              value={form.name}
              onChange={handleChange}
            />
            <input
              aria-label={t("mobile_number", { defaultValue: "Mobile Number" })}
              type="tel"
              name="mobile"
              required
              placeholder={t("mobile_number", { defaultValue: "Mobile Number" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
              value={form.mobile}
              onChange={handleChange}
            />
            <input
              aria-label={t("address", { defaultValue: "Your Address" })}
              type="text"
              name="address"
              required
              placeholder={t("address", { defaultValue: "Your Address" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
              value={form.address}
              onChange={handleChange}
            />
            <select
              aria-label={t("category", { defaultValue: "Main Category" })}
              name="category_id"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
              value={form.category_id}
              onChange={handleCategory}
            >
              <option value="">{t("select_category", { defaultValue: "Select Main Category" })}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {subcategories.length > 0 && (
              <select
                aria-label={t("subcategory", { defaultValue: "Service" })}
                name="subcategory_id"
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
                value={form.subcategory_id}
                onChange={handleChange}
              >
                <option value="">{t("select_subcategory", { defaultValue: "Select Service" })}</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
            )}
            <textarea
              aria-label={t("issue_description", { defaultValue: "Issue Description" })}
              name="description"
              rows={3}
              placeholder={t("issue_description_placeholder", { defaultValue: "Describe your issue (optional)" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[--color-focus-ring] outline-none"
              value={form.description}
              onChange={handleChange}
            />
            <button
              aria-label={t("submit_booking", { defaultValue: "Submit Booking" })}
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[--color-primary] hover:bg-[--color-hover] text-[--color-text-light] font-semibold rounded-lg transition"
            >
              {loading
                ? t("booking_in_progress", { defaultValue: "Booking..." })
                : t("submit_booking", { defaultValue: "Submit Booking" })}
            </button>
            {message && (
              <div className="text-center font-medium text-sm mt-2 text-[--color-text]">{message}</div>
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
export default BookingFormModal;
