const  en = {
  "settings": {
    "settings": "Settings",
    "darkMode": "Dark mode",
    "locale": "Locale",
    "alerts": {}
  }
}
const he = {
  "settings": {
    "settings": "הגדרות",
    "darkMode": "מצב חשוך",
    "locale": "שפה",
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