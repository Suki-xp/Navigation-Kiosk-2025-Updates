import React from "react";

const MapLegend: React.FC = () => {
  return (
    <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-lg shadow-lg z-10">
      <h3 className="text-sm font-semibold mb-1 text-gray-900">Map Legend</h3>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-red-600/30 rounded-full"></div>
            <div className="absolute inset-0 border border-[#B91C1C] rounded-full"></div>
          </div>
          <span className="text-sm text-gray-900">Current Closures</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-3 h-3">
            <div className="absolute inset-0 bg-orange-400/30 rounded-full"></div>
            <div className="absolute inset-0 border border-[#F59E0B] rounded-full"></div>
          </div>
          <span className="text-sm text-gray-900">Future Closures</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 flex items-center">
            <div className="w-full h-0.5 bg-[#1E40AF]/50"></div>
          </div>
          <span className="text-sm text-gray-900">ADA Routes</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
