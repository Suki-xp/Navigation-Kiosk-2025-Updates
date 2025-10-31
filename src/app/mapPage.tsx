'use client'
import React, { useState } from "react";
import Image from "next/image";
import MapComponent from "./components/MapComponent";

import logoVT from "./components/assets/vt-logo.png"
import logoMap from './components/assets/marker icon.webp';
import logoCal from './components/assets/calendar icon.webp';
import logoAlert from './components/assets/alert icon.webp';
import logoGear from './components/assets/gear.png';
import logoPlus from './components/assets/plus.webp';

export default function MapPage() {
  //These are basically store the headers that are meant to represent the interactive button clicking 
  //that user will do on the map, such as bringing up the legned
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* The mapp header and search */}
      <div className="flex-1 flex flex-col">
        {/*Campus logo*/}
        <header className="bg-[#6B1F3D] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={logoVT} width={36} height={36} alt="VT Logo" />
            <span className="text-lg font-bold">Campus Map</span>
          </div>
        </header>

        {/* Search Bar */}
        <div className="p-4 bg-white border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search campus..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B1F3D]"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapComponent />
        </div>
      </div>

      {/* Button clicking */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 right-4 z-50 bg-[#6B1F3D] text-white p-3 rounded-full shadow-lg hover:bg-[#5a1a33] transition"
      >
        <Image src={logoPlus} alt="Add" width={24} height={24} />
      </button>

      {/*Siderbar that opens from the */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="flex-1"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside className="w-80 bg-[#6B1F3D] text-white flex flex-col">
            {/* Header with X */}
            <div className="p-4 flex items-center justify-between border-b border-white/20">
              <span className="text-lg font-bold">MENU</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition">
                <Image src={logoMap} width={20} height={20} alt="" />
                <span>Map</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition">
                <Image src={logoCal} width={20} height={20} alt="" />
                <span>Events</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition">
                <Image src={logoAlert} width={20} height={20} alt="" />
                <span>Alerts</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/20 transition">
                <Image src={logoGear} width={20} height={20} alt="" />
                <span>Preferences</span>
              </button>
            </nav>

            {/* Kiosk Location */}
            <div className="p-4 border-t border-white/20">
              <div className="bg-orange-500 text-white text-sm font-medium py-2 px-4 rounded-full text-center">
                Kiosk Location: Drillfield
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
