const  en = {
  "bug": {
    "bug": "Bug",
    "bugs": "Bugs",
    "reportABug": "Report a bug",
    "resolve": "resolve",
    "ignore": "Ignore",
    "alerts": {
      "confirmRemove": "Are you sure you want to remove this bug?",
      "removeSuccess": "Bug removed successfully!",
      "savedBugSuccess": "Bug saved successfully!",
      "reportBugSuccess": "Bug reported successfully!"
    }
  }
}
const he = {
  "bug": {
    "bug": "באג",
    "bugs": "באגים",
    "reportABug": "דווח על באג",
    "resolve": "פתור",
    "ignore": "התעלם",
    "alerts": {
      "confirmRemove": "האם אתה בטוח שאתה רוצה למחוק את הבאג?",
      "removeSuccess": "באג נמחק בהצלחה!",
      "savedBugSuccess": "פרטי באג נשמרו בהצלחה!",
      "reportBugSuccess": "באג דווח בהצלחה!"
    }
  }
}
const heF = {
  ...he,
  bug: {
    ...he.bug,
    "reportABug": "דווחי על באג",
    "resolve": "פתרי",
    "ignore": "התעלמי",
    alerts: {
      ...he.bug.alerts,
      "confirmRemove": "האם את בטוחה שאת רוצה למחוק את הבאג?",
    }
  }
}
export const bugLocales = {
  en,
  he,
  heF
}