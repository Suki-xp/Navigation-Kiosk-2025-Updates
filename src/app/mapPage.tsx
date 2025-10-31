'use client'
import React, { useState } from "react";
import Image from "next/image";
import MapComponent from "./components/MapComponent";
import closureUpdates from "./components/closures.json"
const rawUpdates = closureUpdates as Closures[];
//Imports for json requests to use within react server

import logoVT from "./components/assets/vt-logo.png"
import logoMap from "./components/assets/marker icon.webp"
import logoCal from './components/assets/calendar icon.webp';
import logoAlert from './components/assets/alert icon.webp';
import logoGear from './components/assets/gear.png';
import logoPlus from './components/assets/plus.webp';

//Since we are going to be importing the closure data from the json file 
  //we need to make consts that can match the format
  const warningIcons = 
  {
    critical: "❗", 
    warning: "⚠️",
    info: "ℹ️"
  };

  //Next we are going to declare an interface that will hold the tags/keys
  //that will be used to parse the json data actively to the screen
  interface Closures 
  {
    id: number;
    name: string;
    type: string;
    details: {
      "Closure Start Date": string,
      "Closure End Date": string,
      COMMENTS: string,
      "More Information": string;
    }
  } 

export default function MapPage() {
  //These are basically store the headers that are meant to represent the interactive button clicking 
  //that user will do on the map, such as bringing up the legned
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //And now they will include the data parsing for closure
  const [activeTab, setActiveTab] = useState<"map" | "events" | "alerts" | "preferences" > ("map")
  //This is speifically for the filtering on the map
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all")

  //Now we need to start importing the functionality of the python script into react
  //First we start with the time parsing of where the closures are happening
  const gettingTime = (dataStr: string): string => 
  {
    const readDate = new Date(dataStr.replace(" ", "T"));
    const nowDate = new Date();
    const totalSeconds = nowDate.getTime() - readDate.getTime();
    const totalMinutes = Math.floor(totalSeconds / 60000);

    let unitTime = "minute";
    let data = totalMinutes;
    let unitEndings = "s";

    //Now we need to create a branch of ifs to properly format the time
    if (totalMinutes < 60)
    {
      if (totalMinutes == 1)
      {
        unitEndings = "";
      }
    }
    else
    {
      const diffHours = Math.floor(totalMinutes / 60);
      if (diffHours < 24)
      {
        data = diffHours;
        unitTime = "hour";

        if (diffHours == 1)
        {
          unitEndings = "";
        }
      }
      else
      {
        const diffDays = Math.floor(diffHours / 24);
        data = diffDays;
        unitTime = "day"

        if (diffDays === 1)
        {
          unitEndings = "";
        }
      }
    }
      return data + " " + unitTime + unitEndings + " ago";
  };

  //Afterwards we need to declare each of the categories that the closurs are classified in
  //this includes stuff like the wether alerts, bus rerouting, construction, etc
  const getTypeOfAlert = (closureReading: string): string => 
  {
     const reading = closureReading.toLowerCase();
     if (reading.includes("weather"))
     {
        return "Weather";
     }

     if (reading.includes("bus") || reading.includes("traffic") 
        || reading.includes("bt"))
     {
        return "Transport";
     }

     if (reading.includes("building") || reading.includes("hall") 
        || reading.includes("sidewalk") || reading.includes("boiler"))
     {
        return "Facilities";
     }

    return "General";
  }

  //Now we need to sort again by the urgency of the alert
  const getUrgency = (urgencyName: string, comments: string): "critical" | "warning" | "info" => 
  {
      const reading2 = (urgencyName + " " + comments).toLowerCase();
      if (reading2.includes("severe") || reading2.includes("emergency") 
          || reading2.includes("closed"))
        {
          return "critical";
        }

      if (reading2.includes("delay") || reading2.includes("maintenance") 
        || reading2.includes("repair") || reading2.includes("demo"))
      {
        return "warning";
      }
      return "info";
  }

  //Now its time to take all the seperation of the data that we have broken from the JSON file
  //and begin to sort it into format that can be passed through the react return
  const filteredClosures = rawUpdates
    .filter((c) => {
      if (filter === "all") return true;
      return getUrgency(c.name, c.details.COMMENTS) === filter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.details["Closure Start Date"].replace(" ", "T")).getTime();
      const dateB = new Date(b.details["Closure Start Date"].replace(" ", "T")).getTime();
      return dateB - dateA;
    });

  //We create another helper methods for buttons and style
  const getButtonStyle = (type: string): string => {
    let buttonFormat = "px-4 py-1.5 rounded-full text-sm font-medium transition-all ";
    if (filter === type) 
    {
        buttonFormat += "bg-[#6B1F3D] text-white shadow-md";
    } 
    else 
    {
        buttonFormat += "bg-gray-200 text-gray-700 hover:bg-gray-300";
    }
    return buttonFormat;
  };

  const getMenuStyle = (tab: string): React.CSSProperties => 
  {
    const menuStyle: React.CSSProperties = {};
    if (activeTab === tab) 
    {
        menuStyle.backgroundColor = "rgba(255,255,255,0.2)";
    }
    return menuStyle;
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* The map header and search */}
      <div className="flex-1 flex flex-col">
        {/*Campus logo*/}
        <header className="bg-[#6B1F3D] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={logoVT} width={36} height={36} alt="VT Logo" />
            <span className="text-lg font-bold">Campus Map</span>
          </div>
        </header>
        
        <div className="flex-1 relative overflow-y-auto">
        {/* Map view */}
        {activeTab === "map" && <MapComponent />}

        {/*Alert tab*/}
        {activeTab === "alerts" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">CAMPUS ALERTS</h2>
            <p className="text-sm text-gray-600 mb-6">ACTIVE NOTIFICATIONS</p>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap">
                <button onClick={() => setFilter("all")} 
                className={getButtonStyle("all")}>All
                </button>

              <button onClick={() => setFilter("critical")} 
              className={getButtonStyle("critical")}>Critical
              </button>

              <button onClick={() => setFilter("warning")} 
              className={getButtonStyle("warning")}>Warning
              </button>

              <button onClick={() => setFilter("info")} 
              className={getButtonStyle("info")}>Info
              </button>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredClosures.length === 0 && (
                <p className="text-center text-gray-500 py-8">No alerts match your filter.</p>
              )}
              {filteredClosures.length > 0 && (
                <>
                  {filteredClosures.map((c) => {
                    const urgency = getUrgency(c.name, c.details.COMMENTS);
                    const category = getTypeOfAlert(c.details.COMMENTS);
                    const timeAgo = gettingTime(c.details["Closure Start Date"]);

                    return (
                      <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{warningIcons[urgency]}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{c.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.details.COMMENTS}</p>
                            <p className="text-xs text-gray-500 mt-2">Posted {timeAgo}</p>
                          </div>
                          <span
                            className="px-2 py-1 text-xs rounded-full font-medium"
                            style={(() => {
                              const displayColor: React.CSSProperties = {};
                                if (category === "Weather") 
                                  {
                                  displayColor.backgroundColor = "#FED7AA";
                                  displayColor.color = "#C2410C";
                                  } else if (category === "Transport") {
                                    displayColor.backgroundColor = "#E9D5FF";
                                    displayColor.color = "#6B21A8";
                                  } 
                                  else if (category === "Facilities") 
                                  {
                                      displayColor.backgroundColor = "#BFDBFE";
                                      displayColor.color = "#1D4ED8";
                                  } 
                                  else 
                                  {
                                     displayColor.backgroundColor = "#BBF7D0";
                                     displayColor.color = "#166534";
                                  }
                                 return displayColor;
                              })()} >
                            {category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}

        {/*Events and Perfernces formats */}
        {activeTab === "events" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Events</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Preferences</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        )}
      </div>
    </div>

    {/* + Button */}
    <button
      onClick={() => setIsMenuOpen(true)}
      className="fixed top-2 right-1 z-60 bg-[#6B1F3D] text-white p-3 rounded-full shadow-lg hover:bg-[#5a1a33] transition-all hover:scale-110 active:scale-95"
    >
      <Image src={logoPlus} alt="Menu" width={26} height={26} />
    </button>

    {/* Sidebar Menu */}
    {isMenuOpen && (
      <div className="fixed inset-0 z-40 flex">
        <div className="flex-1" onClick={() => setIsMenuOpen(false)} />
        <aside className="w-80 bg-[#6B1F3D] text-white flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-white/20">
            <span className="text-lg font-bold">MENU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => { setActiveTab("map"); setIsMenuOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition hover:bg-white/10"
              style={getMenuStyle("map")}
            >
              <Image src={logoMap} width={20} height={20} alt="" />
              <span>Maps</span>
            </button>
            
            <button
              onClick={() => { setActiveTab("events"); setIsMenuOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition hover:bg-white/10"
              style={getMenuStyle("events")}
            >
              <Image src={logoCal} width={20} height={20} alt="" />
              <span>Events</span>
            </button>

            <button
              onClick={() => { setActiveTab("alerts"); setIsMenuOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition hover:bg-white/10"
              style={getMenuStyle("alerts")}
            >
              <Image src={logoAlert} width={20} height={20} alt="" />
              <span>Alerts</span>
            </button>

            <button
              onClick={() => { setActiveTab("preferences"); setIsMenuOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg transition hover:bg-white/10"
              style={getMenuStyle("preferences")}
            >
              <Image src={logoGear} width={20} height={20} alt="" />
              <span>Preferences</span>
            </button>
          </nav>

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