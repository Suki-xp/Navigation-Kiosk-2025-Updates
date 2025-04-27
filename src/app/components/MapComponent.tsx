"use client";

import { useEffect, useRef, useState } from "react";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Campus center
    const position = { lat: 37.22610350373415, lng: -80.42224010371321 };

    const loadGoogleMapsScript = () => {
      if (window.google?.maps) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js" +
        "?key=AIzaSyAOyO3bhO3WevkiC9suFF0-s14IJoFjgQ0" +
        "&libraries=places,marker";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initMap;
      script.onerror = () =>
        console.error("Error loading Google Maps API script");
    };

    const initMap = () => {
      if (!window.google?.maps || !mapRef.current) return;

      // 1. Create the map
      const map = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 16.75,
        mapTypeId: "roadmap", //satellite, roadmap, hybrid
        mapId: "campus-map-full",
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
        tilt: 0,
      });

      // 2. Add the pulsing marker (pass position in!)
      addPulsingMarker(map, position);

      // 3. Fetch & render both closure layers
      fetchClosuresAndDraw(map)
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="relative flex flex-col h-full bg-gray-200">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <p>Loading map…</p>
        </div>
      )}
      <div ref={mapRef} className="w-full flex-grow" />
    </div>
  );
};

export default MapComponent;

// — Helper functions —

// Now takes `position` as a parameter!
function addPulsingMarker(
  map: google.maps.Map,
  position: google.maps.LatLngLiteral
) {
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "30px";
  container.style.height = "30px";

  const inner = document.createElement("div");
  Object.assign(inner.style, {
    position: "absolute",
    top: "6px",
    left: "6px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#800020",
    border: "2px solid orange",
  });

  const outer = document.createElement("div");
  Object.assign(outer.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(128,0,32,0.6), rgba(128,0,32,0))",
    animation: "pulse 1.5s infinite",
  });

  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.6; }
      50% { transform: scale(2); opacity: 0; }
      100% { transform: scale(1); opacity: 0.6; }
    }`;
  document.head.appendChild(styleTag);

  container.append(inner, outer);

  new window.google.maps.marker.AdvancedMarkerElement({
    position, // now defined
    map,
    content: container,
    title: "Turners Place",
  });
}

// Fetches both layer 0 (current) and layer 1 (future) and draws them:
// • layer 0 → red on map.data
// • layer 1 → yellow on its own Data layer
async function fetchClosuresAndDraw(map: google.maps.Map) {
  const base =
    "https://arcgis-central.gis.vt.edu/arcgis/rest/services/" +
    "facilities/Construction_Closures/FeatureServer";

  const makeUrl = (layerNum: number) =>
    `${base}/${layerNum}/query` +
    `?where=1=1` +
    `&outFields=*` +
    `&returnGeometry=true` +
    `&outSR=4326` +
    `&f=geojson`;

  const [curRes, futRes] = await Promise.all([
    fetch(makeUrl(0)),
    fetch(makeUrl(1)),
  ]);
  if (!curRes.ok) throw new Error(`current closures failed: ${curRes.status}`);
  if (!futRes.ok) throw new Error(`future closures failed: ${futRes.status}`);

  const [curJson, futJson] = await Promise.all([curRes.json(), futRes.json()]);

  // current closures in red
  map.data.addGeoJson(curJson);
  map.data.setStyle({
    fillColor: "rgba(255, 0, 0, 0.3)",
    strokeColor: "red",
    strokeWeight: 2,
  });

  // future closures in orange on a separate Data layer
  const futureLayer = new window.google.maps.Data({ map });
  futureLayer.addGeoJson(futJson);
  futureLayer.setStyle({
    fillColor: "rgba(255, 255, 0, 0.3)",
    strokeColor: "orange",
    strokeWeight: 2,
  });
}
