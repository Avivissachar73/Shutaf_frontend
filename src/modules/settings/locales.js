const  en = {
  "settings": {
    "settings": "Settings",
    "darkMode": "Dark mode",
    "locale": "Locale",
    "accessability": "Accessability",
    "theme": "Theme",
    "themes": {
      "lemon": "Lemon",
      "red": "Simply Red",
      "purple": "Deep Purple",
      "pink": "la Vie en Rose",
      "dark": "Dark",
    },
    "alerts": {}
  }
}
const he = {
  "settings": {
    "settings": "הגדרות",
    "darkMode": "מצב חשוך",
    "locale": "שפה",
    "accessability": "נגישות",
    "theme": "נושא",
    "themes": {
      "lemon": "לימון",
      "red": "פשוט אדום",
      "purple": "סגול עמוק",
      "pink": "החיים בורוד",
      "dark": "חשוך",
    },
    "alerts": {}
  }
}
const heF = {
  ...he,
  settings: {
    ...he.settings,
    alerts: {
      ...he.settings.alerts,
    }
  }
}
export const settingsLocales = {
  en,
  he,
  heF
}