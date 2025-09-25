"use client";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MapLegend from "./MapLegend";

//Type for Geoapify autocomplete features
//We create this custom interface because when we want the inputs/outputs
//to be filled in like real maps, we can't use any of the UseState and rather 
//need to reference the actually API feature call
interface GeoapifyFeature 
{
  type: "Feature";
  properties: {
    formatted: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}


const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapContainerRef = useRef<maplibregl.Map | null>(null);
  //GeoJSON Data that will store the keys of the direction

  const [isMapLoading, setIsMapLoading] = useState(true);
  const [startInput, setStartInput] = useState(""); //Takes userinput for both
  const [endInput, setEndInput] = useState("");
  const [routeLayerId] = useState("route-line"); //maps the distance between the points
  const [startSuggestions, setStartSuggestions] = useState<GeoapifyFeature[]>([]);
  const [endSuggestions, setEndSuggestions] = useState<GeoapifyFeature[]>([]); 
  //These are the commnads that will outfill the input and outputs of the user for locations

  useEffect(() => {
    //Campus center positiotn (Drillfield)
    const position = { lat: 37.22610350373415, lng: -80.42224010371321 };

    const initMap = () => {
      if (!mapRef.current) return;

      //Creates the map with MapTiler Cloud style
      const apiKey = process.env.NEXT_PUBLIC_GEO_API_KEY;
      if (!apiKey || apiKey === "") {
        console.error(
          "Geo maps API key is not configured. Please set NEXT_PUBLIC_GEO_API_KEY in your environment variables."
        );
        return null;
      }

      const map = new maplibregl.Map({
        container: mapRef.current,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${apiKey}`, //Equivalent to Google 'roadmap'
        center: [position.lng, position.lat],
        zoom: 16.75,
      });

      mapContainerRef.current = map;
      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
      map.dragPan.enable(); //Gives the ability to drag across
      map.touchZoomRotate.enableRotation(); //Allows for tilt and rotation

      //Adds the marker point of map
      addMarker(map, position);

      // Map load complete
      map.on("load", () => {
        setIsMapLoading(false);
        map.dragPan.enable();
        
      });
    };

    //Load MapLibre GL JS asynchronously if needed (but since imported, init directly)
    initMap();

    //Restarts the map process
    return () => {
      if (mapContainerRef.current) 
      {
        mapContainerRef.current.remove();
        mapContainerRef.current = null;
      }
    };
  }, []);

  //This will use the GeoCode import to reference where the coordinate systems are 
  //specifically the address
  async function geocodeAddress(query: string): Promise<{ lat: number; lng: number} | null> 
  {
    const apikey = process.env.NEXT_PUBLIC_GEO_API_KEY;
    //check to make sure it can still access the key
    if (!apikey)
    {
      console.error("NEXT_PUBLIC_GEO_API_KEY couldn't be set")
      return null;
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      query
    )}&apiKey=${apikey}`;

    const res = await fetch(url); //gets the location before calling the json
    const data = await res.json();

    //Returns the position of where its located
    if (data.features && data.features.length > 0)
    {
      const [lng, lat] = data.features[0].geometry.coordinates;
      return {lng, lat};
    }
    return null;
  }

  //Tries to create the route of the locations from the GeoCode API
  async function geocodeRoute(start: {lat: number; lng: number }, end: {lat: number; lng: number}) 
  {
    const apikey = process.env.NEXT_PUBLIC_GEO_API_KEY;
    const url = `https://api.geoapify.com/v1/routing?waypoints=${start.lat},${start.lng}|${end.lat},${end.lng}&mode=drive&apiKey=${apikey}`;

    const res = await fetch(url);
    const data = await res.json();
    
    return data;
  }

  //Handles the route pattern of the locations 
  async function handleRouting()
  {
    if (!mapContainerRef.current)
    {
      return;
    }

    const map = mapContainerRef.current;

    const start = await geocodeAddress(startInput);
    const end = await geocodeAddress(endInput);

    if (!start || !end)
    {
      alert("Locations couldn't be mapped or found, try again")
      return;
    }

    const routeData = await geocodeRoute(start, end);
    if (!routeData || !routeData.features || routeData.features.length == 0)
    {
      alert("No route found, try different locations")
      return;
    }
    //Calls the functions respectively for the addresse and route tied to them

    const routeFeature = routeData.features[0]; //Gets the total distance 
    //to basically map for the user when they locate two points 

    //Remove old route
    if (map.getLayer(routeLayerId))
    {
      map.removeLayer(routeLayerId);
    }
    if (map.getSource(routeLayerId))
    {
      map.removeSource(routeLayerId);
    }

    //Adds the autofill suggestions based on output
    //with the start and end markers in place
    new maplibregl.Marker({ color: "green"})
        .setLngLat([start.lng, start.lat])
        .addTo(map);

    new maplibregl.Marker({color: "red"})
        .setLngLat([end.lng, end.lat])
        .addTo(map);

    //Creates route line
    map.addSource(routeLayerId, {
      type: "geojson",
      data: routeFeature,
    });

    map.addLayer({
      id: routeLayerId, 
      type: "line",
      source: routeLayerId, 
      paint: {
        "line-color": "#00008b",
        "line-width": 6,
      },
    });

    //rerouting
    const totalBounds = new maplibregl.LngLatBounds();
    routeFeature.geometry.coordinates.forEach((coord: number[]) =>
      totalBounds.extend(coord as [number, number])
    );
    map.fitBounds(totalBounds, { padding: 45});
  }

  async function autofillInputs(query: string): Promise<GeoapifyFeature[]>
  {
    const apikey = process.env.NEXT_PUBLIC_GEO_API_KEY;
    if (!apikey)
    {
      return[];
    }
    //Making sure that shortened inputs aren't measured in
    if (query.length < 3)
    {
      return[];
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${apikey}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.features as GeoapifyFeature[] || [];
    
  }

  return (
    <div className="relative flex flex-col h-full bg-text-black-200">
      {isMapLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70"> 
          <p>Loading map…</p>
        </div>
      )}

      <div className="absolute top-2 left-2 z-20 bg-white p-2 rounded shadow-md flex flex-col gap-2 w-64">
        <div className="StartRoutingPath">
          <input
            type="text"
            placeholder="From:"
            value={startInput}
            onChange={async (e) => {
              setStartInput(e.target.value)
              setStartSuggestions(await autofillInputs(e.target.value));
            }}
            className="text-black border p-1 rounded w-full"
          />
          {startSuggestions.length > 0 && (
            <ul className="absolute bg-white border rounded mt-1 max-h-40 overflow-y-auto w-full shadow-md z-30">
              {startSuggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setStartInput(s.properties.formatted);
                    setStartSuggestions([]);
                  }}
                  className="text-black px-2 py-1 hover:bg-black-100 cursor-pointer"
                >
                  {s.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="end path routing">
          <input 
            type="text"
            placeholder="To:"
            value={endInput}
            onChange={async (e) => {
              setEndInput(e.target.value)
              setEndSuggestions(await autofillInputs(e.target.value));
            }}
            className="text-black border p-1 rounded w-full"
          />
          {endSuggestions.length > 0 && (
            <ul className="absolute bg-white border rounded mt-1 max-h-40 overflow-y-auto w-full shadow-md z-30">
              {endSuggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setEndInput(s.properties.formatted);  //Autofill word formatting 
                    setEndSuggestions([]);
                  }}
                  className="text-black px-2 py-1 hover:bg-black-100 cursor-pointer"
                >
                  {s.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button 
          onClick={handleRouting}
          className="bg-blue-600 text-white px-3 py-1 rounded" //Routing button
        >
          Route
        </button>
      </div>

      <div ref={mapRef} className="w-full flex-grow" />
      <MapLegend />
    </div>
  );
};

export default MapComponent;

// — Helper functions —
//Add a simple marker (non-pulsing; add animation later if needed)
function addMarker(map: maplibregl.Map,
  position: { lat: number; lng: number })
{
  const markerElement = document.createElement("div");
  markerElement.style.backgroundColor = "#800020";
  markerElement.style.width = "18px";
  markerElement.style.height = "18px";
  markerElement.style.borderRadius = "50%";
  markerElement.style.border = "2px solid orange";
  markerElement.style.cursor = "pointer";

  new maplibregl.Marker({ element: markerElement })
    .setLngLat([position.lng, position.lat])
    .addTo(map);
}
