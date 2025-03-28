"use client";

import { useEffect, useRef, useState } from "react";

type Place = {
  name: string;
  type: string;
};

type PlaceResult = {
  // Example structure from API
  name: string;
  category?: string; // Might be missing in some cases
};

type MapComponentProps = {
  setPlaces: (places: PlaceResult[]) => void;
};

const MapComponent: React.FC<MapComponentProps> = ({ setPlaces }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const position = { lat: 37.231104160984195, lng: -80.4227827428525 };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAOyO3bhO3WevkiC9suFF0-s14IJoFjgQ0&libraries=places,marker`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initMap();
      };

      script.onerror = () => {
        console.error("Error loading Google Maps API script.");
      };
    };

    const initMap = () => {
      if (!window.google || !window.google.maps || !mapRef.current) {
        return;
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 17,
        mapTypeId: "hybrid",
        mapId: "campus-map-full",
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        rotateControl: false,
      });

      // Create the pulsing dot with inner and outer rings
      const pulsingDotContainer = document.createElement("div");
      pulsingDotContainer.style.position = "relative";
      pulsingDotContainer.style.width = "30px";
      pulsingDotContainer.style.height = "30px";
      pulsingDotContainer.style.borderRadius = "50%";

      const innerDot = document.createElement("div");
      innerDot.style.position = "absolute";
      innerDot.style.top = "0";
      innerDot.style.left = "0";
      innerDot.style.width = "18px";
      innerDot.style.height = "18px";
      innerDot.style.borderRadius = "50%";
      innerDot.style.backgroundColor = "#800020"; // Marroon color for the inner dot
      innerDot.style.border = "2px solid orange"; // Border around the inner dot

      const outerRing = document.createElement("div");
      outerRing.style.position = "absolute";
      outerRing.style.top = "-9px";
      outerRing.style.left = "-9px";
      outerRing.style.width = "36px";
      outerRing.style.height = "36px";
      outerRing.style.borderRadius = "50%";
      outerRing.style.background =
        "radial-gradient(circle, rgba(128, 0, 32, 1), rgba(128, 0, 32, 0.4))"; // Gradient fill for the ring
      outerRing.style.animation = "pulse 1.5s infinite"; // Pulsing effect

      pulsingDotContainer.appendChild(innerDot);
      pulsingDotContainer.appendChild(outerRing);

      // Define CSS animation for pulsing
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);

      new window.google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        content: pulsingDotContainer,
        title: "Turners Place",
      });

      const fetchNearbyBuildings = (map: google.maps.Map) => {
        const service = new window.google.maps.places.PlacesService(map);
        const placeTypes = ["academic_department"]; // Define multiple types
        // "transit_station"
        // "restaurant"
        // "school"
        // "academic_department"

        placeTypes.forEach((placeType) => {
          const request: google.maps.places.PlaceSearchRequest = {
            location: position,
            radius: 110,
            type: placeType, // Use a single type in each request
          };

          service.nearbySearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              setPlaces(results);
              results.forEach((place) => {
                console.log(place.name);
                if (!place.geometry?.location) return; // Ensure geometry is defined
                new google.maps.Marker({
                  position: place.geometry.location,
                  map,
                  title: place.name || "Unnamed Place",
                });
              });
            } else {
              console.error(
                `Places Service failed for type "${placeType}":`,
                status
              );
            }
          });
        });
      };

      fetchNearbyBuildings(map);
      setIsLoading(false); // Set loading state to false after map is initialized
    };

    loadGoogleMapsScript();
  }); // Empty dependency array to run the effect only once

  return (
    <div className="flex flex-col h-full bg-gray-200">
      {isLoading && <p className="absolute">Loading Map...</p>}
      <div ref={mapRef} className="w-full flex-grow"></div>
    </div>
  );
};

export default MapComponent;
