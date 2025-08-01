import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { FixivaHelmet } from "@/shared";

export function BookingFormMap({ onLocationSelect, selectedLocation }) {
  const { t } = useTranslation();
  const [location, setLocation] = useState(selectedLocation || null);
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!selectedLocation) fetchUserLocation();
    // eslint-disable-next-line
  }, []);

  const fetchUserLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      setGeoError(t("geo_not_supported", { defaultValue: "Geolocation not supported." }));
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);
        onLocationSelect(coords);
        setLoading(false);
      },
      () => {
        setGeoError(t("geo_denied", { defaultValue: "Location access denied. Please select manually." }));
        setLoading(false);
      }
    );
  };

  const handleMapClick = (e) => {
    // Here, replace with your map implementation (e.g. Google Maps JS API)
    // e.latLng.lat(), e.latLng.lng()
    // For demo:
    const coords = { lat: 28.61, lng: 77.21 }; // Dummy
    setLocation(coords);
    onLocationSelect(coords);
  };

  return (
    <motion.div className="w-full rounded border p-4 shadow">
      <FixivaHelmet
        title={t("select_location", { defaultValue: "Select Location" })}
        description={t("select_location_desc", { defaultValue: "Choose a location for your service." })}
        name="BookingFormMap"
      />
      <div className="mb-2 flex gap-2">
        <MapPin className="text-[--color-primary]" />
        <span>{t("your_location", { defaultValue: "Your Location" })}</span>
      </div>
      {geoError && <div className="text-xs text-red-500">{geoError}</div>}
      <div className="my-2">
        <button
          className="px-3 py-1 bg-[--color-primary] text-[--color-text-light] rounded hover:bg-[--color-hover] text-xs"
          onClick={fetchUserLocation}
          disabled={loading}
        >
          {loading
            ? t("fetching_location", { defaultValue: "Fetching location..." })
            : t("use_my_location", { defaultValue: "Use My Location" })}
        </button>
      </div>
      <div
        className="w-full h-40 bg-[--color-bg-muted] rounded border flex items-center justify-center cursor-pointer"
        onClick={handleMapClick}
        aria-label={t("select_on_map", { defaultValue: "Select on map" })}
      >
        <span className="text-xs">{location ? `${location.lat}, ${location.lng}` : t("click_to_select", { defaultValue: "Click to select location" })}</span>
      </div>
    </motion.div>
  );
}
export default BookingFormMap;
