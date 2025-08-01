import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import DatePicker from "@/components"; // Adjust if your import is different
import Spinner from "@/components"; // Adjust if your import is different

export default function RevenueTrendChart() {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  ); // 30 days ago
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/revenue-trends", {
        params: {
          from: startDate.toISOString(),
          to: endDate.toISOString(),
        },
      });
      setData(response.data);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        t("revenueTrend.loadError", {
          defaultValue: "Unable to load data.",
        });
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Helmet>
        <title>
          {t("revenueTrend.seoTitle", { defaultValue: "Revenue Trend" })}
        </title>
        <meta
          name="description"
          content={t("revenueTrend.seoDescription", {
            defaultValue: "View your application’s revenue trend over time.",
          })}
        />
        <meta
          property="og:title"
          content={t("revenueTrend.seoTitle", { defaultValue: "Revenue Trend" })}
        />
        <meta
          property="og:description"
          content={t("revenueTrend.seoDescription", {
            defaultValue: "View your application’s revenue trend over time.",
          })}
        />
      </Helmet>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
        aria-label={t("revenueTrend.chartAria", {
          defaultValue: "Revenue trend chart over selected period",
        })}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {t("revenueTrend.title", { defaultValue: "Revenue Trend" })}
          </h2>
          <div className="flex gap-2">
            <DatePicker
              label={t("revenueTrend.from", { defaultValue: "From" })}
              selected={startDate}
              onChange={setStartDate}
            />
            <DatePicker
              label={t("revenueTrend.to", { defaultValue: "To" })}
              selected={endDate}
              onChange={setEndDate}
            />
            <button
              onClick={fetchData}
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? t("revenueTrend.loading", { defaultValue: "Loading..." })
                : t("revenueTrend.refresh", { defaultValue: "Refresh" })}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={48} />
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            {error}
            <button
              onClick={fetchData}
              className="ml-4 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            >
              {t("revenueTrend.retry", { defaultValue: "Retry" })}
            </button>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                tickFormatter={(num) =>
                  num.toLocaleString(undefined, {
                    style: "currency",
                    currency: "INR",
                  })
                }
              />
              <Tooltip
                formatter={(value) =>
                  value.toLocaleString(undefined, {
                    style: "currency",
                    currency: "INR",
                  })
                }
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString()
                }
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </motion.section>
    </>
  );
}
