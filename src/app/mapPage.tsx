'use client'
import React, { useState } from "react";
import Image from "next/image";
import MapComponent from "./components/MapComponent";
import realTimeUpdates from "./realTimeData/events.json"
import closureUpdates from "./realTimeData/closures.json"

//The interface of the events here
interface Event {
  Title: string,
  Date: string,
  Location: string,
}

const rawUpdates = closureUpdates as Closures[];
const rawEvents = realTimeUpdates as Event[];
//Imports for json requests to use within react server for
//both instances

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

  //Same sort of setup for the events closures now
  const eventIcons =
  {
    calender: "📅",
    time: "🕰️",
    location: "📍"
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
  const [activeTab, setActiveTab] = useState<"map" | "events" | "alerts" | "preferences"> ("map")
  //This is speifically for the filtering on the map
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info"> ("all")

  //Now its the filtering for the events to display on the page
  // *** MODIFIED: Added "Social" and "all" to the type for clarity ***
  const [eventFilter, setEventFilter] = useState<"all" | "Academics" | "Sports" | "Arts" | "Career" | "Social" | "General">("all");

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

  //Same sort of key word association for the events
  // *** MODIFIED: Added "Social" category and updated return type ***
  const getEvents = (event: Event): "Academics" | "Sports" | "Arts"
  | "Career" | "Social" | "General" =>
  {
    const eventReading = (event.Title + " " + event.Location).toLowerCase();
    //Now its the same key word association that will sort events
    if (eventReading.includes("academic") || eventReading.includes("tutoring")
      || eventReading.includes("pathways") || eventReading.includes("study"))
    {
      return "Academics";
    }

    if (eventReading.includes("sports") || eventReading.includes("live") ||
      eventReading.includes("classic"))
    {
      return "Sports";
    }

    if (eventReading.includes("art") || eventReading.includes("artists")
       || eventReading.includes("music") || eventReading.includes("performance")
       || eventReading.includes("dance") || eventReading.includes("rhythm"))
    {
      return "Arts";
    }

    // *** NEW: Added "Social" category based on Figma and JSON data ***
    if (eventReading.includes("social") || eventReading.includes("halloween") ||
        eventReading.includes("feast") || eventReading.includes("trivia"))
    {
        return "Social";
    }

    if (eventReading.includes("career") || eventReading.includes("job") || eventReading.includes("fair"))
    {
      return "Career";
    }
    return "General";
  }

  //Now its time to take all the seperation of the data that we have broken from the JSON file
  //and begin to sort it into format that can be passed through the react return
  const filteredClosures = rawUpdates
    .filter((c) => {
      if (filter === "all")
        return true;
      return getUrgency(c.name, c.details.COMMENTS) === filter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.details["Closure Start Date"].replace(" ", "T")).getTime();
      const dateB = new Date(b.details["Closure Start Date"].replace(" ", "T")).getTime();
      return dateB - dateA;
    });

  //Same approach but now we filter it for the seperation of the events into title, date, time, and location
  const filteredEvents = rawEvents
    .filter((d) => {
      // *** MODIFIED: Logic is correct, but relies on our updated `eventFilter` state ***
      if (eventFilter === "all")
        return true;
      return getEvents(d) === eventFilter;
    })
    .sort ((e, f) => {
      //Now we sort by the day, date, and time of the locations
      const parseData = (dataStr: string) => {
        const matching = dataStr.match(/(\w+),\s+(\w+)\s+(\d+)\s+at\s+(\d+):(\d+)(AM|PM)\s+EST/);

        if (!matching)
        {
          return new Date();
        }

        //Otherwise we create a new array that holds the specific info that we can pass through
        //and the format within for all the events to return the proper date format for the event
        const [, day, month, numberOfDays, hour, minute, period] = matching;
        //Dictionary to hold the months
        const months: {[key: string]: number } = {
          January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7,
          September: 8, October: 9, November: 10, December: 11
        };

        //Then we parse the hour
        let x = parseInt(hour);

        if (period == "PM" && x !== 12)
        {
          x += 12;
        }

        if (period == "AM" && x === 12)
        {
          x = 0;
        }

        return new Date(2025, months[month], parseInt(numberOfDays), x, parseInt(minute))
      }
      // Sorts from newest to oldest
      return parseData(f.Date).getTime() - parseData(e.Date).getTime();
    })

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

  //Helper function for Event Filter Buttons
  const getEventButtonStyle = (type: string): string => {
    let buttonFormat = "px-4 py-1.5 rounded-full text-sm font-medium transition-all ";
    if (eventFilter === type) {
        buttonFormat += "bg-[#6B1F3D] text-white shadow-md"; //Active style
    } else {
        buttonFormat += "bg-gray-200 text-gray-700 hover:bg-gray-300"; //Inactive style
    }
    return buttonFormat;
  };

  //Helper function to parse Date string into Date/Time for cards
  const formatEventDate = (dateStr: string): { date: string, time: string } => {
    const match = dateStr.match(/(\w+,\s+\w+\s+\d+)\s+at\s+(.+EST)/);
    if (match) {
        
        return { date: match[1], time: match[2].replace(" EST", "") };
    }
    return { date: dateStr, time: "Time N/A" }; // Fallback
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

        {/* --- MODIFIED: This entire 'events' block is new --- */}
        {activeTab === "events" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">CAMPUS EVENTS</h2>
            <p className="text-sm text-gray-600 mb-6">THIS MONTH</p>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap">
              <button onClick={() => setEventFilter("all")} className={getEventButtonStyle("all")}>All</button>
              <button onClick={() => setEventFilter("Academics")} className={getEventButtonStyle("Academics")}>Academic</button>
              <button onClick={() => setEventFilter("Sports")} className={getEventButtonStyle("Sports")}>Sports</button>
              <button onClick={() => setEventFilter("Arts")} className={getEventButtonStyle("Arts")}>Arts</button>
              <button onClick={() => setEventFilter("Career")} className={getEventButtonStyle("Career")}>Career</button>
              <button onClick={() => setEventFilter("Social")} className={getEventButtonStyle("Social")}>Social</button>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.length === 0 && (
                <p className="text-center text-gray-500 md:col-span-2 py-8">No events match your filter.</p>
              )}
              {filteredEvents.map((event, index) => {
                const { date, time } = formatEventDate(event.Date);
                const tag = getEvents(event);

                return (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    {/* Image Placeholder */}
                    <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 relative">
                      <span className="text-sm">Event Image Placeholder</span>
                      {/* Tag */}
                      <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                        {tag}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{event.Title}</h3>
                      <div className="space-y-2 text-sm text-gray-700">
                      {/* Date */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg w-5 text-center">{eventIcons.calender}</span>
                          <span>{date}</span>
                        </div>
                      {/* Time */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg w-5 text-center">{eventIcons.time}</span>
                          <span>{time}</span>
                        </div>
                      {/* Location */}
                        <div className="flex items-center gap-2">
                          <span className="text-lg w-5 text-center">{eventIcons.location}</span>
                          <span>{event.Location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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