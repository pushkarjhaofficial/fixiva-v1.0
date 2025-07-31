import React, { useState, useRef, useCallback, useEffect } from "react"
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api"
import clsx from "clsx"

export interface Location {
  address: string
  lat: number
  lng: number
}

export interface BookingLocationMapProps {
  /** Your Google Maps API key with Places enabled */
  apiKey: string
  /** Current value (address + coords) */
  value: Location | null
  /** Called when user selects a place */
  onChange: (loc: Location) => void
  /** Placeholder for the address input */
  placeholder?: string
  /** Disable the input/map */
  disabled?: boolean
  /** CSS class for the wrapper */
  className?: string
  /** Map dimensions */
  mapContainerStyle?: React.CSSProperties
  /** Initial zoom when no value: defaults to 2 */
  defaultZoom?: number
}

const DEFAULT_CENTER = { lat: 0, lng: 0 }

export const BookingLocationMap: React.FC<BookingLocationMapProps> = ({
  apiKey,
  value,
  onChange,
  placeholder = "Enter your address",
  disabled = false,
  className,
  mapContainerStyle = { width: "100%", height: "300px" },
  defaultZoom = 2
}) => {
  // Load the Google Maps script & Places library
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"]
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onLoadMap = useCallback((m: google.maps.Map) => setMap(m), [])
  const onLoadAuto = useCallback((ac: google.maps.places.Autocomplete) => setAutocomplete(ac), [])

  // When user picks a place from autocomplete
  const onPlaceChanged = () => {
    if (!autocomplete) return
    const place = autocomplete.getPlace()
    if (place.geometry?.location) {
      const loc: Location = {
        address: place.formatted_address || inputRef.current?.value || "",
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      onChange(loc)
      map?.panTo(place.geometry.location)
      map?.setZoom(15)
    }
  }

  // Pan to existing value when map loads or value changes
  useEffect(() => {
    if (map && value) {
      map.panTo({ lat: value.lat, lng: value.lng })
      map.setZoom(15)
    }
  }, [map, value])

  if (loadError) {
    return <div className="text-red-500">Map failed to load.</div>
  }

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {!isLoaded ? (
        <div className="p-4 bg-[--color-bg-secondary] animate-pulse">Loading map…</div>
      ) : (
        <>
          <Autocomplete onLoad={onLoadAuto} onPlaceChanged={onPlaceChanged}>
            <input
              ref={inputRef}
              type="text"
              defaultValue={value?.address || ""}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full px-3 py-2 border rounded shadow-sm bg-[--color-bg] border-[--color-border] focus:outline-none focus:border-[--color-primary]"
              aria-label="Address autocomplete"
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={value ? { lat: value.lat, lng: value.lng } : DEFAULT_CENTER}
            zoom={value ? 15 : defaultZoom}
            onLoad={onLoadMap}
          >
            {value && <Marker position={{ lat: value.lat, lng: value.lng }} />}
          </GoogleMap>
        </>
      )}
    </div>
  )
}

export default BookingLocationMap
