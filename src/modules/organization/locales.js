const  en = {
  "organization": {
    "organization": "Apartment",
    "organizations": "Apartments",
    "newOrganization": "New Apartment",
    "editOrganization": "Edit apartment",
    "createOrganization": "Create new apartment",
    "yourRoles": "Your roles",
    "members": "Members",
    "inviteMembers": "Invite members",
    "alerts": {
      "confirmRemoveOrg": "Are you sure you want to remove this apartment?",
      "removedSuccess": "Apartment removed successfully",
      "savedSuccess": "Apartment saved successfully",
      "invetationSentSuccess": "Invetation sent successfully",
      "confirmLeave": "Are you sure you want to leave this apartment?"
    }
  },
  "noAuthToRemoveOrganizationError": "Unauthorized, cant remove apartment",
  "noAuthToEditOrganizationError": "Unauthorized, cant edit apartment",
  "noAuthToChangeAccountOrganizationStatusError": "Unauthorized, cant change account status in apartment",
  "userNotAllowdInOrganizationError": "Authorization error: user not allowd"
}
const he = {
  "organization": {
    "organization": "דירה",
    "organizations": "דירות",
    "newOrganization": "דירה חדשה",
    "editOrganization": "ערוך דירה",
    "createOrganization": "צור דירה חדשה",
    "yourRoles": "התפקידים שלך",
    "members": "חברים",
    "inviteMembers": "הזמן משתמשים",
    "alerts": {
      "confirmRemoveOrg": "האם אתה בטוח שאתה רוצה למחוק את הדירה?",
      "removedSuccess": "דירה נמחקה בהצלחה",
      "savedSuccess": "דירה נשמרה בהצלחה",
      "invetationSentSuccess": "הזמנה נשלחה בהצלחה",
      "confirmLeave": "האם אצה בטוח שאתה רוצה רוצה לעזוב את הדירה?"
    }
  },
  "noAuthToRemoveOrganizationError": "לא מורשה, אין אפשרות למחוק דירה",
  "noAuthToEditOrganizationError": "לא מורשה, אין אפשרות לערוך דירה",
  "noAuthToChangeAccountOrganizationStatusError": "לא מורשה, אין אפשרות לעדכן סטטוס של משתמש בתוך דירה",
  "userNotAllowdInOrganizationError": "אין הרשאה"
}
const heF = {
  ...he,
  organization: {
    ...he.organization,
    "editOrganization": "ערכי דירה",
    "createOrganization": "צרי דירה חדשה",
    "inviteMembers": "הזמיני משתמשים",
    alerts: {
      ...he.organization.alerts,
      "confirmRemoveOrg": "האם את בטוחה שאת רוצה למחוק את הדירה?",
      "confirmLeave": "האם את בטוחה שאת רוצה לעזוב את הדירה?"
    }
  }
}
export const organizationLocales = {
  en,
  he,
  heF
}