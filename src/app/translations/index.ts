export type Language = "en" | "es" | "zh" | "ko" | "hi";

export interface Translations {
  // Header
  campusMap: string;
  // Menu / Sidebar
  menu: string;
  maps: string;
  events: string;
  alerts: string;
  preferences: string;
  kioskLocation: string;
  // Alerts tab
  campusAlerts: string;
  activeNotifications: string;
  all: string;
  critical: string;
  warning: string;
  info: string;
  noAlertsMatch: string;
  // Events tab
  campusEvents: string;
  thisMonth: string;
  academic: string;
  sports: string;
  arts: string;
  career: string;
  social: string;
  noEventsMatch: string;
  // MapComponent
  fromPlaceholder: string;
  toPlaceholder: string;
  route: string;
  loadingMap: string;
  locationNotFound: string;
  noRouteFound: string;
  // MapLegend
  mapLegend: string;
  currentClosures: string;
  futureClosures: string;
  adaRoutes: string;
  // NearbyFooter
  nearbyLocations: string;
  noNearbyLocations: string;
  // Preferences tab
  language: string;
  textSize: string;
  small: string;
  medium: string;
  large: string;
  highContrast: string;
  on: string;
  off: string;
  displaySettings: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    campusMap: "Campus Map",
    menu: "MENU",
    maps: "Maps",
    events: "Events",
    alerts: "Alerts",
    preferences: "Preferences",
    kioskLocation: "Kiosk Location: Drillfield",
    campusAlerts: "CAMPUS ALERTS",
    activeNotifications: "ACTIVE NOTIFICATIONS",
    all: "All",
    critical: "Critical",
    warning: "Warning",
    info: "Info",
    noAlertsMatch: "No alerts match your filter.",
    campusEvents: "CAMPUS EVENTS",
    thisMonth: "THIS MONTH",
    academic: "Academic",
    sports: "Sports",
    arts: "Arts",
    career: "Career",
    social: "Social",
    noEventsMatch: "No events match your filter.",
    fromPlaceholder: "From:",
    toPlaceholder: "To:",
    route: "Route",
    loadingMap: "Loading map\u2026",
    locationNotFound: "Locations couldn\u2019t be mapped or found, try again",
    noRouteFound: "No route found, try different locations",
    mapLegend: "Map Legend",
    currentClosures: "Current Closures",
    futureClosures: "Future Closures",
    adaRoutes: "ADA Routes",
    nearbyLocations: "Nearby Locations",
    noNearbyLocations: "No nearby locations found.",
    language: "Language",
    textSize: "Text Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    highContrast: "High Contrast",
    on: "On",
    off: "Off",
    displaySettings: "Display Settings",
  },
  es: {
    campusMap: "Mapa del Campus",
    menu: "MEN\u00DA",
    maps: "Mapas",
    events: "Eventos",
    alerts: "Alertas",
    preferences: "Preferencias",
    kioskLocation: "Ubicaci\u00f3n del Quiosco: Drillfield",
    campusAlerts: "ALERTAS DEL CAMPUS",
    activeNotifications: "NOTIFICACIONES ACTIVAS",
    all: "Todos",
    critical: "Cr\u00edtico",
    warning: "Advertencia",
    info: "Info",
    noAlertsMatch: "No hay alertas que coincidan con su filtro.",
    campusEvents: "EVENTOS DEL CAMPUS",
    thisMonth: "ESTE MES",
    academic: "Acad\u00e9mico",
    sports: "Deportes",
    arts: "Artes",
    career: "Carrera",
    social: "Social",
    noEventsMatch: "No hay eventos que coincidan con su filtro.",
    fromPlaceholder: "Desde:",
    toPlaceholder: "Hasta:",
    route: "Ruta",
    loadingMap: "Cargando mapa\u2026",
    locationNotFound: "No se pudo encontrar la ubicaci\u00f3n, intente de nuevo",
    noRouteFound: "No se encontr\u00f3 ruta, intente diferentes ubicaciones",
    mapLegend: "Leyenda del Mapa",
    currentClosures: "Cierres Actuales",
    futureClosures: "Cierres Futuros",
    adaRoutes: "Rutas ADA",
    nearbyLocations: "Lugares Cercanos",
    noNearbyLocations: "No se encontraron lugares cercanos.",
    language: "Idioma",
    textSize: "Tama\u00f1o de Texto",
    small: "Peque\u00f1o",
    medium: "Mediano",
    large: "Grande",
    highContrast: "Alto Contraste",
    on: "Activado",
    off: "Desactivado",
    displaySettings: "Configuraci\u00f3n de Pantalla",
  },
  zh: {
    campusMap: "\u6821\u56ed\u5730\u56fe",
    menu: "\u83dc\u5355",
    maps: "\u5730\u56fe",
    events: "\u6d3b\u52a8",
    alerts: "\u8b66\u62a5",
    preferences: "\u504f\u597d\u8bbe\u7f6e",
    kioskLocation: "\u4fe1\u606f\u4ead\u4f4d\u7f6e\uff1a\u7ec3\u5175\u573a",
    campusAlerts: "\u6821\u56ed\u8b66\u62a5",
    activeNotifications: "\u6d3b\u52a8\u901a\u77e5",
    all: "\u5168\u90e8",
    critical: "\u7d27\u6025",
    warning: "\u8b66\u544a",
    info: "\u4fe1\u606f",
    noAlertsMatch: "\u6ca1\u6709\u7b26\u5408\u8fc7\u6ee4\u6761\u4ef6\u7684\u8b66\u62a5\u3002",
    campusEvents: "\u6821\u56ed\u6d3b\u52a8",
    thisMonth: "\u672c\u6708",
    academic: "\u5b66\u672f",
    sports: "\u4f53\u80b2",
    arts: "\u827a\u672f",
    career: "\u804c\u4e1a",
    social: "\u793e\u4ea4",
    noEventsMatch: "\u6ca1\u6709\u7b26\u5408\u8fc7\u6ee4\u6761\u4ef6\u7684\u6d3b\u52a8\u3002",
    fromPlaceholder: "\u51fa\u53d1\u5730\uff1a",
    toPlaceholder: "\u76ee\u7684\u5730\uff1a",
    route: "\u8def\u7ebf",
    loadingMap: "\u5730\u56fe\u52a0\u8f7d\u4e2d\u2026",
    locationNotFound: "\u627e\u4e0d\u5230\u4f4d\u7f6e\uff0c\u8bf7\u91cd\u8bd5",
    noRouteFound: "\u672a\u627e\u5230\u8def\u7ebf\uff0c\u8bf7\u5c1d\u8bd5\u4e0d\u540c\u4f4d\u7f6e",
    mapLegend: "\u5730\u56fe\u56fe\u4f8b",
    currentClosures: "\u5f53\u524d\u5c01\u95ed",
    futureClosures: "\u672a\u6765\u5c01\u95ed",
    adaRoutes: "\u65e0\u969c\u788d\u8def\u7ebf",
    nearbyLocations: "\u9644\u8fd1\u5730\u70b9",
    noNearbyLocations: "\u672a\u627e\u5230\u9644\u8fd1\u5730\u70b9\u3002",
    language: "\u8bed\u8a00",
    textSize: "\u5b57\u4f53\u5927\u5c0f",
    small: "\u5c0f",
    medium: "\u4e2d",
    large: "\u5927",
    highContrast: "\u9ad8\u5bf9\u6bd4\u5ea6",
    on: "\u5f00\u542f",
    off: "\u5173\u95ed",
    displaySettings: "\u663e\u793a\u8bbe\u7f6e",
  },
  ko: {
    campusMap: "\ucea0\ud37c\uc2a4\u0020\uc9c0\ub3c4",
    menu: "\uba54\ub274",
    maps: "\uc9c0\ub3c4",
    events: "\uc774\ubca4\ud2b8",
    alerts: "\uacbd\ubcf4",
    preferences: "\ud658\uacbd\uc124\uc815",
    kioskLocation: "\ud0a4\uc624\uc2a4\ud06c \uc704\uce58: \ub4dc\ub9b4\ud544\ub4dc",
    campusAlerts: "\ucea0\ud37c\uc2a4 \uacbd\ubcf4",
    activeNotifications: "\ud65c\uc131 \uc54c\ub9bc",
    all: "\uc804\uccb4",
    critical: "\uae34\uae09",
    warning: "\uacbd\uace0",
    info: "\uc815\ubcf4",
    noAlertsMatch: "\ud544\ud130\uc5d0 \ub9de\ub294 \uacbd\ubcf4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.",
    campusEvents: "\ucea0\ud37c\uc2a4 \uc774\ubca4\ud2b8",
    thisMonth: "\uc774\ubc88 \ub2ec",
    academic: "\ud559\uc220",
    sports: "\uc2a4\ud3ec\uce20",
    arts: "\uc608\uc220",
    career: "\ucee4\ub9ac\uc5b4",
    social: "\uc18c\uc15c",
    noEventsMatch: "\ud544\ud130\uc5d0 \ub9de\ub294 \uc774\ubca4\ud2b8\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.",
    fromPlaceholder: "\ucd9c\ubc1c\uc9c0:",
    toPlaceholder: "\ubaa9\uc801\uc9c0:",
    route: "\uacbd\ub85c",
    loadingMap: "\uc9c0\ub3c4 \ub85c\ub529 \uc911\u2026",
    locationNotFound: "\uc704\uce58\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694",
    noRouteFound: "\uacbd\ub85c\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ub2e4\ub978 \uc704\uce58\ub97c \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694",
    mapLegend: "\uc9c0\ub3c4 \ubc94\ub840",
    currentClosures: "\ud604\uc7ac \ud3d0\uc1c4",
    futureClosures: "\uc608\uc815\ub41c \ud3d0\uc1c4",
    adaRoutes: "\uc7a5\uc560\uc778 \uacbd\ub85c",
    nearbyLocations: "\uc8fc\ubcc0 \uc7a5\uc18c",
    noNearbyLocations: "\uc8fc\ubcc0 \uc7a5\uc18c\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",
    language: "\uc5b8\uc5b4",
    textSize: "\uae00\uc790 \ud06c\uae30",
    small: "\uc18c",
    medium: "\uc911",
    large: "\ub300",
    highContrast: "\uace0\ub300\ube44",
    on: "\ucf1c\uae30",
    off: "\ub044\uae30",
    displaySettings: "\ub514\uc2a4\ud50c\ub808\uc774 \uc124\uc815",
  },
  hi: {
    campusMap: "\u0915\u0948\u0902\u092a\u0938 \u092e\u093e\u0928\u091a\u093f\u0924\u094d\u0930",
    menu: "\u092e\u0947\u0928\u0942",
    maps: "\u092e\u093e\u0928\u091a\u093f\u0924\u094d\u0930",
    events: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    alerts: "\u0905\u0932\u0930\u094d\u091f",
    preferences: "\u092a\u094d\u0930\u093e\u0925\u092e\u093f\u0915\u0924\u093e\u090f\u0902",
    kioskLocation: "\u0915\u093f\u092f\u094b\u0938\u094d\u0915 \u0938\u094d\u0925\u093e\u0928: \u0921\u094d\u0930\u093f\u0932\u092b\u093c\u0940\u0932\u094d\u0921",
    campusAlerts: "\u0915\u0948\u0902\u092a\u0938 \u0905\u0932\u0930\u094d\u091f",
    activeNotifications: "\u0938\u0915\u094d\u0930\u093f\u092f \u0938\u0942\u091a\u0928\u093e\u090f\u0902",
    all: "\u0938\u092d\u0940",
    critical: "\u0917\u0902\u092d\u0940\u0930",
    warning: "\u091a\u0947\u0924\u093e\u0935\u0928\u0940",
    info: "\u091c\u093e\u0928\u0915\u093e\u0930\u0940",
    noAlertsMatch: "\u0906\u092a\u0915\u0947 \u092b\u093c\u093f\u0932\u094d\u091f\u0930 \u0938\u0947 \u092e\u0947\u0932 \u0916\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u0915\u094b\u0908 \u0905\u0932\u0930\u094d\u091f \u0928\u0939\u0940\u0902\u0964",
    campusEvents: "\u0915\u0948\u0902\u092a\u0938 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e",
    thisMonth: "\u0907\u0938 \u092e\u0939\u0940\u0928\u0947",
    academic: "\u0936\u0948\u0915\u094d\u0937\u0923\u093f\u0915",
    sports: "\u0916\u0947\u0932",
    arts: "\u0915\u0932\u093e",
    career: "\u0915\u0930\u093f\u092f\u0930",
    social: "\u0938\u093e\u092e\u093e\u091c\u093f\u0915",
    noEventsMatch: "\u0906\u092a\u0915\u0947 \u092b\u093c\u093f\u0932\u094d\u091f\u0930 \u0938\u0947 \u092e\u0947\u0932 \u0916\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u0915\u094b\u0908 \u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e \u0928\u0939\u0940\u0902\u0964",
    fromPlaceholder: "\u0938\u0947:",
    toPlaceholder: "\u0924\u0915:",
    route: "\u092e\u093e\u0930\u094d\u0917",
    loadingMap: "\u092e\u093e\u0928\u091a\u093f\u0924\u094d\u0930 \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e \u0939\u0948\u2026",
    locationNotFound: "\u0938\u094d\u0925\u093e\u0928 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e, \u092a\u0941\u0928\u0903 \u092a\u094d\u0930\u092f\u093e\u0938 \u0915\u0930\u0947\u0902",
    noRouteFound: "\u0915\u094b\u0908 \u092e\u093e\u0930\u094d\u0917 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e, \u0905\u0932\u0917 \u0938\u094d\u0925\u093e\u0928 \u0906\u091c\u093c\u092e\u093e\u090f\u0902",
    mapLegend: "\u092e\u093e\u0928\u091a\u093f\u0924\u094d\u0930 \u0915\u093f\u0902\u0935\u0926\u0902\u0924\u0940",
    currentClosures: "\u0935\u0930\u094d\u0924\u092e\u093e\u0928 \u092c\u0902\u0926\u0940",
    futureClosures: "\u092d\u0935\u093f\u0937\u094d\u092f \u0915\u0940 \u092c\u0902\u0926\u0940",
    adaRoutes: "ADA \u092e\u093e\u0930\u094d\u0917",
    nearbyLocations: "\u0906\u0938-\u092a\u093e\u0938 \u0915\u0947 \u0938\u094d\u0925\u093e\u0928",
    noNearbyLocations: "\u0915\u094b\u0908 \u0906\u0938-\u092a\u093e\u0938 \u0915\u0947 \u0938\u094d\u0925\u093e\u0928 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u0947\u0964",
    language: "\u092d\u093e\u0937\u093e",
    textSize: "\u092a\u093e\u0920 \u0906\u0915\u093e\u0930",
    small: "\u091b\u094b\u091f\u093e",
    medium: "\u092e\u0927\u094d\u092f\u092e",
    large: "\u092c\u095c\u093e",
    highContrast: "\u0909\u091a\u094d\u091a \u0915\u0902\u091f\u094d\u0930\u093e\u0938\u094d\u091f",
    on: "\u091a\u093e\u0932\u0942",
    off: "\u092c\u0902\u0926",
    displaySettings: "\u092a\u094d\u0930\u0926\u0930\u094d\u0936\u0928 \u0938\u0947\u091f\u093f\u0902\u0917",
  },
};
