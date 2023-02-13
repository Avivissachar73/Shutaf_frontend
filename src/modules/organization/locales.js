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
      "confirmLeave": "Are you sure you want to leave this apartment?",
      "confirmRemoveAccount": "Are you sure you want to remove this account from the apartment?"
    }
  },
  "noAuthToRemoveOrganizationError": "Unauthorized, cant remove apartment",
  "noAuthToEditOrganizationError": "Unauthorized, cant edit apartment",
  "noAuthToChangeAccountOrganizationStatusError": "Unauthorized, cant change account status in apartment",
  "userNotAllowdInOrganizationError": "Authorization error: user not allowd",
  "noAuthToChangeAccountOrganizationRolesError": "Unauthorized, cant change account roles in organization",
  "noAuthToRemoveUserFromOrganizationError": "Unauthorized, cant remove account from organization"
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
      "confirmLeave": "האם אתה בטוח שאתה רוצה רוצה לעזוב את הדירה?",
      "confirmRemoveAccount": "האם אתה בטוח שאתה רוצה להסיר את המשתמש מהדירה?"
    }
  },
  "noAuthToRemoveOrganizationError": "לא מורשה, אין אפשרות למחוק דירה",
  "noAuthToEditOrganizationError": "לא מורשה, אין אפשרות לערוך דירה",
  "noAuthToChangeAccountOrganizationStatusError": "לא מורשה, אין אפשרות לעדכן סטטוס של משתמש בתוך דירה",
  "userNotAllowdInOrganizationError": "אין הרשאה",
  "noAuthToChangeAccountOrganizationRolesError": "לא מורשה, אין אפשרות לעדכן תפקיד של משתמש בתוך דירה",
  "noAuthToRemoveUserFromOrganizationError": "לא מורשה, אין אפשרות להסיר משתמש מדירה"
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
      "confirmLeave": "האם את בטוחה שאת רוצה לעזוב את הדירה?",
      "confirmRemoveAccount": "האם בטוחה שאת רוצה להסיר את המשתמש מהדירה?"
    }
  }
}
export const organizationLocales = {
  en,
  he,
  heF
}