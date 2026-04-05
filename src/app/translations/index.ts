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
  // AIGuidePanel
  aiGuideTitle: string;
  aiGuideLoading: string;
  aiGuideUnavailable: string;
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
    kioskLocation: "Kiosk Location: Goodwin Hall",
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
    loadingMap: "Loading map…",
    locationNotFound: "Locations couldn't be mapped or found, try again",
    noRouteFound: "No route found, try different locations",
    mapLegend: "Map Legend",
    currentClosures: "Current Closures",
    futureClosures: "Future Closures",
    adaRoutes: "ADA Routes",
    aiGuideTitle: "AI Campus Guide",
    aiGuideLoading: "Generating campus directions…",
    aiGuideUnavailable: "AI guide unavailable",
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
  es: { //needs revising
    campusMap: "Mapa del Campus",
    menu: "MENÚ",
    maps: "Mapas",
    events: "Eventos",
    alerts: "Alertas",
    preferences: "Preferencias",
    kioskLocation: "Ubicación del Quiosco: Goodwin Hall",
    campusAlerts: "ALERTAS DEL CAMPUS",
    activeNotifications: "NOTIFICACIONES ACTIVAS",
    all: "Todos",
    critical: "Crítico",
    warning: "Advertencia",
    info: "Info",
    noAlertsMatch: "No hay alertas que coincidan con su filtro.",
    campusEvents: "EVENTOS DEL CAMPUS",
    thisMonth: "ESTE MES",
    academic: "Académico",
    sports: "Deportes",
    arts: "Artes",
    career: "Carrera",
    social: "Social",
    noEventsMatch: "No hay eventos que coincidan con su filtro.",
    fromPlaceholder: "Desde:",
    toPlaceholder: "Hasta:",
    route: "Ruta",
    loadingMap: "Cargando mapa…",
    locationNotFound: "No se pudo encontrar la ubicación, intente de nuevo",
    noRouteFound: "No se encontró ruta, intente diferentes ubicaciones",
    mapLegend: "Leyenda del Mapa",
    currentClosures: "Cierres Actuales",
    futureClosures: "Cierres Futuros",
    adaRoutes: "Rutas ADA",
    aiGuideTitle: "Guía IA del Campus",
    aiGuideLoading: "Generando direcciones…",
    aiGuideUnavailable: "Guía IA no disponible",
    nearbyLocations: "Lugares Cercanos",
    noNearbyLocations: "No se encontraron lugares cercanos.",
    language: "Idioma",
    textSize: "Tamaño de Texto",
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    highContrast: "Alto Contraste",
    on: "Activado",
    off: "Desactivado",
    displaySettings: "Configuración de Pantalla",
  },
  zh: {
    campusMap: "校园地图",
    menu: "菜单",
    maps: "地图",
    events: "活动",
    alerts: "警报",
    preferences: "偏好设置",
    kioskLocation: "信息亭位置：Goodwin Hall",
    campusAlerts: "校园警报",
    activeNotifications: "活动通知",
    all: "全部",
    critical: "紧急",
    warning: "警告",
    info: "信息",
    noAlertsMatch: "没有符合过滤条件的警报。",
    campusEvents: "校园活动",
    thisMonth: "本月",
    academic: "学术",
    sports: "体育",
    arts: "艺术",
    career: "职业",
    social: "社交",
    noEventsMatch: "没有符合过滤条件的活动。",
    fromPlaceholder: "出发地：",
    toPlaceholder: "目的地：",
    route: "路线",
    loadingMap: "地图加载中…",
    locationNotFound: "找不到位置，请重试",
    noRouteFound: "未找到路线，请尝试不同位置",
    mapLegend: "地图图例",
    currentClosures: "当前封闭",
    futureClosures: "未来封闭",
    adaRoutes: "无障碍路线",
    aiGuideTitle: "AI 校园导航",
    aiGuideLoading: "正在生成校园方向…",
    aiGuideUnavailable: "AI 导航不可用",
    nearbyLocations: "附近地点",
    noNearbyLocations: "未找到附近地点。",
    language: "语言",
    textSize: "字体大小",
    small: "小",
    medium: "中",
    large: "大",
    highContrast: "高对比度",
    on: "开启",
    off: "关闭",
    displaySettings: "显示设置",
  },
  ko: {
    campusMap: "캠퍼스 지도",
    menu: "메뉴",
    maps: "지도",
    events: "이벤트",
    alerts: "경보",
    preferences: "환경설정",
    kioskLocation: "키오스크 위치: Goodwin Hall",
    campusAlerts: "캠퍼스 경보",
    activeNotifications: "활성 알림",
    all: "전체",
    critical: "긴급",
    warning: "경고",
    info: "정보",
    noAlertsMatch: "필터에 맞는 경보가 없습니다.",
    campusEvents: "캠퍼스 이벤트",
    thisMonth: "이번 달",
    academic: "학술",
    sports: "스포츠",
    arts: "예술",
    career: "커리어",
    social: "소셜",
    noEventsMatch: "필터에 맞는 이벤트가 없습니다.",
    fromPlaceholder: "출발지:",
    toPlaceholder: "목적지:",
    route: "경로",
    loadingMap: "지도 로딩 중…",
    locationNotFound: "위치를 찾을 수 없습니다. 다시 시도해주세요",
    noRouteFound: "경로를 찾을 수 없습니다. 다른 위치를 시도해주세요",
    mapLegend: "지도 범례",
    currentClosures: "현재 폐쇄",
    futureClosures: "예정된 폐쇄",
    adaRoutes: "장애인 경로",
    aiGuideTitle: "AI 캠퍼스 가이드",
    aiGuideLoading: "캠퍼스 길안내 생성 중…",
    aiGuideUnavailable: "AI 가이드 사용 불가",
    nearbyLocations: "주변 장소",
    noNearbyLocations: "주변 장소를 찾을 수 없습니다.",
    language: "언어",
    textSize: "글자 크기",
    small: "소",
    medium: "중",
    large: "대",
    highContrast: "고대비",
    on: "켜기",
    off: "끄기",
    displaySettings: "디스플레이 설정",
  },
  hi: {
    campusMap: "कैंपस मानचित्र",
    menu: "मेनू",
    maps: "मानचित्र",
    events: "कार्यक्रम",
    alerts: "अलर्ट",
    preferences: "प्राथमिकताएं",
    kioskLocation: "कियोस्क स्थान: Goodwin Hall",
    campusAlerts: "कैंपस अलर्ट",
    activeNotifications: "सक्रिय सूचनाएं",
    all: "सभी",
    critical: "गंभीर",
    warning: "चेतावनी",
    info: "जानकारी",
    noAlertsMatch: "आपके फ़िल्टर से मेल खाने वाले कोई अलर्ट नहीं।",
    campusEvents: "कैंपस कार्यक्रम",
    thisMonth: "इस महीने",
    academic: "शैक्षणिक",
    sports: "खेल",
    arts: "कला",
    career: "करियर",
    social: "सामाजिक",
    noEventsMatch: "आपके फ़िल्टर से मेल खाने वाले कोई कार्यक्रम नहीं।",
    fromPlaceholder: "से:",
    toPlaceholder: "तक:",
    route: "मार्ग",
    loadingMap: "मानचित्र लोड हो रहा है…",
    locationNotFound: "स्थान नहीं मिला, पुनः प्रयास करें",
    noRouteFound: "कोई मार्ग नहीं मिला, अलग स्थान आज़माएं",
    mapLegend: "मानचित्र किंवदंती",
    currentClosures: "वर्तमान बंदी",
    futureClosures: "भविष्य की बंदी",
    adaRoutes: "ADA मार्ग",
    aiGuideTitle: "AI कैंपस गाइड",
    aiGuideLoading: "कैंपस दिशाएं तैयार हो रही हैं…",
    aiGuideUnavailable: "AI गाइड उपलब्ध नहीं",
    nearbyLocations: "आस-पास के स्थान",
    noNearbyLocations: "कोई आस-पास के स्थान नहीं मिले।",
    language: "भाषा",
    textSize: "पाठ आकार",
    small: "छोटा",
    medium: "मध्यम",
    large: "बड़ा",
    highContrast: "उच्च कंट्रास्ट",
    on: "चालू",
    off: "बंद",
    displaySettings: "प्रदर्शन सेटिंग",
  },
};
