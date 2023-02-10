const  en = {
  "shoppingList": {
    "shoppingList": "Shopping list",
    "shoppingLists": "Shopping lists",
    "products": "Products",
    "addProduct": "Add product",
    "prices": "Prices",
    "addPrice": "Add price",
    "count": "Count",
    "category": "Category",
    "minCount": "Min",
    "maxCount": "Max",
    "healthRate": "Health rate",
    "settleUp": "Settle up",
    "createNewShoppingList": "Create new Shopping list",
    "allSettledUp": "All settled up",
    "noProducts": "No products",
    "shopName": "Shop name",
    "tooltip": {
      "count": "How many items of this product you already have?",
      "minCount": "What is the minimum capacety of this product in your apartment to add it to the shopping list?",
      "maxCount": "What is the max capacity of this product you want to have in your apartment?",
      "healthRate": "How health is the product from 1 to 10? (while 10 is the best score)",
      "prices": "You can define prices for different stores for this specific product, the system will let you know where it will be best to shop!"
    },
    "alerts": {
      "confirmRemove": "Are you sure you want to remove this Shopping list?",
      "removeSuccess": "Shopping ךist removed successfully",
      "savedSuccess": "Shopping ךist saved successfully",
      "confirmRemoveProduct": "Are you sure you want to remove this product?",
      "eatAlerts": {
        "safeAlert1": "Sweet!",
        "safeAlert2": "Kaboom!",
        "safeAlert3": "Getting health!",
        "safeAlert4": "Nice shape!",
        "safeAlert5": "Looking good!",
        "safeAlert6": "Warthy!",
        "midAlert1": "Bon apatite!",
        "midAlert2": "Nice!",
        "dangerAlert1": "The summer body wont shape itself..",
        "dangerAlert2": "NOT worthy!",
        "dangerAlert3": "WoopyDoo!",
        "dangerAlert4": "Getting Fatty!"
      }
    }
  }
}
const he = {
  "shoppingList": {
    "shoppingList": "רשימת קניות",
    "shoppingLists": "רשימות קניות",
    "products": "מוצרים",
    "addProduct": "הוסף מוצר",
    "prices": "מחירים",
    "addPrice": "הוסף מחיר",
    "count": "כמות",
    "category": "קטגוריה",
    "minCount": "מינימום",
    "maxCount": "מקסימום",
    "healthRate": "מדד בריאות",
    "settleUp": "בצע רכישה",
    "createNewShoppingList": "צור רשימת קניות חדשה",
    "allSettledUp": "הרשימה נקייה",
    "noProducts": "אין מוצרים",
    "shopName": "שם החנות",
    "tooltip": {
      "count": "כמה יחידות מהמוצר הזה כבר יש לך בבית?",
      "minCount": "מה היא הכמות המינימלמית של המוצר הזה כדי להוסיף אותו לרשימת הקניות? ",
      "maxCount": "מה הכמות המקסימלית של המוצר הזה שתרצו להחזיק בבית?",
      "healthRate": "כמה בריא המוצר מ1 עד 10? (כאשר 10 הוא הבריא ביותר)",
      "prices": "אפשר להגדיר מחירים שונים למוצר לפי חנויות שונות, המערכת תדע להגיד לך איפה הכי משתלם לעשות קניות!"
    },
    "alerts": {
      "confirmRemove": "האם אתה בטוח שאתה רוצה למחוק את רשימת הקניות?",
      "removeSuccess": "רשימה נמחקה בהצלחה",
      "savedSuccess": "רשימה עודכנה בהצלחה",
      "confirmRemoveProduct": "האם אתה בטוח שאתה רוצה למחוק את המוצר?",
      "eatAlerts": {
        "safeAlert1": "יאמי!",
        "safeAlert2": "קאפיש!",
        "safeAlert3": "כמה בריא!",
        "safeAlert4": "אחלה גזרה!",
        "safeAlert5": "נראה טוב!",
        "safeAlert6": "ראוי!",
        "midAlert1": "בתאבון!",
        "midAlert2": "נחמד!",
        "dangerAlert1": "גוף הקיץ לא יחטב את עצמו..",
        "dangerAlert2": "לא ראוי!",
        "dangerAlert3": "וופי-דו!",
        "dangerAlert4": "משמין!"
      }
    }
  }
}
const heF = {
  ...he,
  shoppingList: {
    ...he.shoppingList,
    "addProduct": "הוסיפי מוצר",
    "addPrice": "הוסיפי מחיר",
    "settleUp": "בצעי רכישה",
    "createNewShoppingList": "צרי רשימת קניות חדשה",
    alerts: {
      ...he.shoppingList.alerts,
      "confirmRemove": "האם את בטוחה שאת רוצה למחוק את רשימת הקניות?",
      "confirmRemoveProduct": "האם את בטוחה שאת רוצה למחוק את המוצר?",
      eatAlerts: {
        ...he.shoppingList.alerts.eatAlerts,
        "safeAlert5": "נראה טוב!",
        "safeAlert6": "ראויה!",
        "dangerAlert2": "לא ראוי!",
      }
    }
  }
}
export const shoppingListLocales = {
  en,
  he,
  heF
}