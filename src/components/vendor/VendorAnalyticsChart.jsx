// src/components/charts/VendorAnalyticsChart.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useFixivaBot } from "@/hooks";
import { FixivaHelmet } from '@components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

export function VendorAnalyticsChart() {
  const { sendBotEvent } = useFixivaBot();
  const { t } = useTranslation();

  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch analytics data
  useEffect(() => {
    sendBotEvent('vendor_analytics_chart_viewed');
    fetch('/api/vendor/analytics', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => {
        // Expect json = [{ date: '2025-07-25', value: 42 }, ...]
        setLabels(json.map(item => new Date(item.date).toLocaleDateString()));
        setDataPoints(json.map(item => item.value));
      })
      .catch(err => {
        console.error(err);
        toast.error(
          t('analytics_fetch_error', {
            defaultValue: 'Failed to load analytics data.',
          })
        );
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [sendBotEvent, t]);

  const helmetProps = {
    title: t('analytics_chart_title', { defaultValue: 'Analytics Overview' }),
    description: t('analytics_chart_description', {
      defaultValue: 'Visual overview of your vendor metrics.',
    }),
    name: 'VendorAnalyticsChart',
  };

  if (loading) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded-lg border border-dashed p-6 animate-pulse h-64" />
      </FixivaHelmet>
    );
  }

  if (error) {
    return (
      <FixivaHelmet {...helmetProps}>
        <div className="rounded-lg border border-red-500 bg-red-50 p-6 text-red-700">
          {t('analytics_chart_error', {
            defaultValue: 'Unable to load analytics data.',
          })}
        </div>
      </FixivaHelmet>
    );
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: t('analytics_dataset_label', { defaultValue: 'Bookings' }),
        data: dataPoints,
        fill: false,
        tension: 0.4,
        borderColor: 'var(--color-primary)',
        backgroundColor: 'var(--color-primary)',
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: t('analytics_chart_title', { defaultValue: 'Analytics Overview' }),
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: t('analytics_x_axis', { defaultValue: 'Date' }),
        },
      },
      y: {
        title: {
          display: true,
          text: t('analytics_y_axis', { defaultValue: 'Count' }),
        },
      },
    },
  };

  return (
    <FixivaHelmet {...helmetProps}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[--color-bg] border border-[--color-border] rounded-lg p-4"
        style={{ height: '400px' }}
      >
        <Line data={chartData} options={chartOptions} />
      </motion.div>
    </FixivaHelmet>
  );
}

export default React.memo(VendorAnalyticsChart);
