"use client";
import React, { useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { translations } from "../translations";

interface AIGuidePanelProps {
  directions: string | null;
  isLoading: boolean;
  error: string | null;
  onDismiss: () => void;
}

const AIGuidePanel: React.FC<AIGuidePanelProps> = ({
  directions,
  isLoading,
  error,
  onDismiss,
}) => {
  const { language } = useAppSettings();
  const t = translations[language];
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Don't render if nothing to show
  if (!directions && !isLoading && !error) return null;

  return (
    <div className="absolute bottom-4 left-4 z-10 w-80 bg-white/95 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-[#6B1F3D] text-white cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="text-sm font-semibold">{t.aiGuideTitle}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">{isCollapsed ? "\u25B2" : "\u25BC"}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="ml-1 text-white/80 hover:text-white text-lg leading-none"
            aria-label="Dismiss"
          >
            &times;
          </button>
        </div>
      </div>

      {/* Body */}
      {!isCollapsed && (
        <div className="px-3 py-2 max-h-64 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#6B1F3D] rounded-full animate-spin" />
              <span className="text-sm">{t.aiGuideLoading}</span>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600">{t.aiGuideUnavailable}</p>
          )}

          {directions && (
            <ol className="text-sm text-gray-800 leading-relaxed list-decimal list-inside space-y-1.5">
              {directions
                .split(/(?<=\.)\s+/)
                .filter((s) => s.trim())
                .map((sentence, i) => (
                  <li key={i}>{sentence.trim()}</li>
                ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default AIGuidePanel;
