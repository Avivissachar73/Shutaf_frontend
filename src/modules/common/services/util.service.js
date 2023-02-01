'use strict';

export const Utils = {
    getQuerysStr,
    storeToSession,
    loadFromSession,
    storeToStorage,
    loadFromStorage,
    getRandomId,
    getRandomInt,
    copy,
    getRandomColor,
    stringToLowerKabab,
    getStyleStr,
    deepSearch,
    getElPosOnScreen
};


///////////////EXPORTED_FUNCTIONS///////////////
///////////////EXPORTED_FUNCTIONS///////////////
///////////////EXPORTED_FUNCTIONS///////////////


export function getQuerysStr(filterBy = {}) {
    var queryStr = '?';
    for (let key in filterBy) {
        let val = (typeof(filterBy[key]) === 'object')? 
                            JSON.stringify(filterBy[key]) : 
                            filterBy[key];
        queryStr += `${key}=${val}&`;
    }
    return queryStr.slice(0, queryStr.length-1);
} 

export function getQuerysStr2(criteria = {}) {
    var queryStr = '?';
    var criteriaJson = JSON.stringify(criteria);
    queryStr += criteriaJson.substring(2, criteriaJson.length-2);
    queryStr = queryStr.split('":"').join('=')
                       .split('","').join('&');
    return queryStr;
} 

export function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}-${pt1}-${pt2}`.toUpperCase();
}

export function getRandomInt(num1, num2) {
    var max = (num1 >= num2)? num1+1 : num2+1;
    var min = (num1 <= num2)? num1 : num2;
    return (Math.floor(Math.random()*(max - min)) + min);
}

export function copy(obj) {
    if (typeof(obj) !== 'object') return obj;
    var copied = (Array.isArray(obj))? [...obj] : {...obj};
    var keys = Object.keys(obj);
    for (let key of keys) {
        if (!isNaN(+key)) key = +key;
        if (copied[key] instanceof HTMLElement) continue;
        copied[key] = copy(copied[key]);
    }
    return copied;
}

export function watchOnObj(obj, cbFunc, basePath = '') {
    if (!obj || typeof(obj) !== 'object') return;
    let keys = Object.keys(obj);
    for (let key of keys) {
        let isCall = false;
        let path = basePath;
        path += path.length ? `.${key}` : key;
        let initialVal = obj[key];
        let fuildName = key;
        Object.defineProperty(obj, key, {
            set: function(val) {
                let oldVal = key;
                key = val;
                if (isCall) cbFunc(val, oldVal, path);
            },
            get: function() {
                return key;
            }
        });
        obj[fuildName] = initialVal;
        isCall = true;
        if (typeof(obj[fuildName]) === 'object' && !Array.isArray(obj[fuildName]) && obj[fuildName]) watchOnObj(obj[fuildName], cbFunc, path);
    }
}

export function range(length, startFrom = 0) {
    var arrToReturn = [];
    for (let i = startFrom; i < length; i++) {
        arrToReturn.push(i);
    }
    return arrToReturn;
}

export function getRandomColor(isOpacity) {
    const options = '0123456789ABCDEF';
    const length = isOpacity ? 8 : 6;
    var color = '#';
    for (let i = 0; i < length; i++) color += options[getRandomInt(0, options.length-1)];
    return color;
}

export function stringToLowerKabab(str) {
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let fixedStr = '';
    for (let i = 0; i < str.length; i++) {
        let curr = str[i];
        let lowerCurr = curr.toLowerCase();
        if (capitals.includes(curr)) {
            if (i === 0) fixedStr += lowerCurr;
            else if (str[i-1] && (str[i-1] !== ' ')) fixedStr += `-${lowerCurr}`;
        } else fixedStr += lowerCurr;
    }
    return fixedStr;
}

//input: 'someKababValString' || output: some-kabab-val-string;
/**@param {String} str * @param {String} separator * @param {Boolean} isLowerCase */
export function strKababToSeperator(str, separator = '-', isLowerCase = true) {
    const capitals = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    let fixedStr = '';
    for (let i = 0; i < str.length; i++) {
        let curr = str[i];
        let fixedCharr = isLowerCase ? curr.toLowerCase() : curr;
        if (capitals.includes(curr)) {
            if (i === 0) fixedStr += fixedCharr;
            else if (str[i - 1] && (str[i - 1] !== ' ')) fixedStr += `${separator}${fixedCharr}`;
        } else fixedStr += fixedCharr;
    }
    return fixedStr;
}

function strSeperatorToCamel(str = '', seperator = '-') {
    let res = '';
    for (let i = 0; i < str.length; i++) {
        if (str.slice(i, i+seperator.length) === seperator) {
            let nextChar = str.charAt(i+seperator.length);
            res += nextChar.toUpperCase();
            i += seperator.length;
        } else {
            res += str.charAt(i).toLowerCase();
        }
    }
    return res;
}

export function getStyleStr(style = {}) {
    var str = '';
    for (let key in style) {
        str += `${stringToLowerKabab(key)}:${style[key]};`;
    }
    return str;
} 


/**@param {*} val * @param {*} searchVal * @param {Boolean} isIgnoreCase * @param {Boolean} isIncluded*/
export function deepSearch(val, searchVal, isIgnoreCase = true, isIncluded = true) {
    if (val === searchVal) return true;
    if (typeof(val) === 'object') {
        for (let key in val) {
            let curr = val[key];
            if (curr === searchVal) return true;
            else if (typeof(curr) === 'string' && typeof(searchVal) === 'string') {
                if (isIgnoreCase) {
                    let lowerSearchVal = searchVal.toLowerCase();
                    if (isIncluded && curr.toLowerCase().includes(lowerSearchVal)) return true;
                    else if (!isIncluded && curr.toLowerCase() === lowerSearchVal) return true;
                }
                else if (isIncluded && curr.includes(searchVal)) return true;
            }
            else if (deepSearch(curr, searchVal, isIgnoreCase)) return true;
        }
    }
    return false;
}

export function createBoard(height = 30, width = 30, createCell = (pos) => `${pos.i}-${pos.j}`) {
    var board = [];
    for (let i = 0; i < height; i++) {
        board[i] = [];
        for (let j = 0; j < width; j++) {
            board[i][j] = createCell({i,j});
        }
    }
    return board;
}

export function padNum(num, length = 2) {
    var numStr = num.toString();
    if (numStr.length >= length) return numStr;
    return '0'.repeat(length-numStr.length) + numStr;
}

export function mapArrBy(arr, byField = 'id') {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        const curr = arr[i];
        const key = curr[byField];
        map[key] = arr[i];
    }
    return map;
}


//input: ({adress: {city: Jerusalem}}, 'adress.city') || output: 'jerusalem';
/**@param {Object} obj * @param {String} field */
export function getDeepVal(obj, field) {
    const splited = field.split('.');
    let val = obj;
    for (const curr of splited) {
      if (!val[curr]) {
        val = null;
        break;
      } else val = val[curr];
    }
    return val;
}

export function setDeepVal(obj, field, val, seperator = '.') {
    const splited = field.split(seperator);
    const firstField = splited.shift();
    if (splited.length) {
        if (!obj[firstField]) obj[firstField] = {};
        setDeepVal(obj[firstField], splited.join(seperator), val);
    }
    else obj[firstField] = val;
}


export function copyToClipBoard(val) {
    const el = document.createElement('textarea');
    el.value = val;
    document.body.appendChild(el)
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}


export function getElPosOnScreen(el) {
    const pos = {y: 0, x: 0};
    if (!el) return pos;
    let _el = el;
    while(_el.tagName !== 'BODY') {
      pos.y += _el.offsetTop;
      pos.x += _el.offsetLeft;
      _el = _el.offsetParent;
    }
    return pos;
}


export function sortEverything(sorter = '', isSortUp = true) {
    const sorDirection = isSortUp ? 1 : -1;
    return (item1, item2) => {
        let val1 = getDeepVal(item1, sorter);
        let val2 = getDeepVal(item2, sorter);
        if (!isNaN(+new Date(val1))) {
            val1 = new Date(val1);
            val2 = new Date(val2);
        } else if (!isNaN(+val1)) {
            val1 = +val1;
            val2 = +val2;
        }
        if (typeof val1 === 'number') return isSortUp? val1 - val2 : val2 - val1; 
        else return (val1 > val2) ? 1 * sorDirection : -1 * sorDirection;
    }
}


function everythingToCamelCase(str, sep = '-', isCapitalCase = false) {
    const capitalCase = str.split(sep)
            .map(curr => curr.charAt(0).toUpperCase() + curr.slice(1).toLowerCase())
            .join('');
            
    return isCapitalCase
        ? capitalCase 
        : capitalCase.charAt(0).toLowerCase() + capitalCase.slice(1);
}

export const avgFromItems = (items = [], deepField = '') => {
    if (deepField) items = items.map(c => getDeepVal(c, deepField));
    return items.reduce((acc, curr) => acc + curr, 0) / items.length;
}


export function deepIterateWithObj(obj, cb, seperator = '.', rootKey = '') {
    for (let key in obj) {
      let val = obj[key];
      const deepKey = rootKey? `${rootKey}${seperator}${key}` : key;
      if (typeof val === 'object') deepIterateWithObj(val, cb, seperator, deepKey);
      else cb(deepKey, val);
    }
}

export function delay(timeMs = 2000) {
    return new Promise((resolve => {
        setTimeout(resolve, timeMs);
    }));
}


export function getCreateErrMsg(fileName) {
  return (msg, funcName, err = '') => `${msg} | at: ${fileName} file, function: ${funcName} | err: ${err.message || err.msg || 'unknown'}`;
}

export function createFriendlyError(err = '', status = 500,  message = '') {
  const error = err.err || err.error || err.message || err.msg || err;
  return {
    err: error,
    status,
    message: message || error,
  }
}

export function getOriginsInAllProtocols(...origins) {
  const protocols = ['http', 'https', 'ws', 'wss'];
  return origins.reduce((acc, c) => {
    return [...acc, ...protocols.reduce((_acc, protocol) => {
        return [..._acc, `${protocol}://127.0.0.1:${c}`, `${protocol}://localhost:${c}`];
      }, [])
  ]}, []);
}

export function fixDeepQuery(quer) {
  const fixed = {};
  for (let key in quer) fixed[key] = JSON.parse(quer[key]);
  return fixed;
}

export function noop() {}; 
  

//////////////////STORAGE_SERVICE////////////////////
//////////////////STORAGE_SERVICE////////////////////
//////////////////STORAGE_SERVICE////////////////////

export function storeToSession(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value || null));
}
export function loadFromSession(key) {
    var data = sessionStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}


export function storeToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)|| null);
}
export function loadFromStorage(key) {
    let data = localStorage.getItem(key);
    return (data) ? JSON.parse(data) : undefined;
}

///////////////PROTOTYPES///////////////
///////////////PROTOTYPES///////////////
///////////////PROTOTYPES///////////////

export function setPrototypes() {
    Array.prototype.random = function(startIdx = 0, endIdx = this.length-1) {
        return this[getRandomInt(startIdx, endIdx)]
    }
    Array.prototype.shuffle = function() {
        var copy = this.slice();
        var shuffled = [];
        for (let i = 0; i < this.length; i++) {
            shuffled.push(copy.splice(getRandomInt(0, copy.length-1), 1)[0]);
        }
        return shuffled;
    }

    String.prototype.random = function(startIdx = 0, endIdx = this.length-1) {
        return this[getRandomInt(startIdx, endIdx)]
    }
    String.prototype.shuffle = function() {
        var copy = this.split('');
        var shuffled = [];
        for (let i = 0; i < this.length; i++) {
            shuffled.push(copy.splice(getRandomInt(0, copy.length-1), 1)[0]);
        }
        return shuffled.join('');
    }
    String.prototype.multiReplace = function(searchValue, replaceValue) {
        replaceValue += '';
        var str = this;
        var counter = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === searchValue[counter]) counter++;
            else counter = 0;
            if (counter === searchValue.length) {
                str = str.substring(0, i-counter+1)+replaceValue+str.substring(i+1);
                counter = 0;
                i -= (searchValue.length-replaceValue.length);
            }
        }
        return str;
    }
    JSON.require = require;
}

function require(path, isAsync = false) {
    var XmlReq = new XMLHttpRequest();
    XmlReq.overrideMimeType('application/json');
    XmlReq.open('GET', path, isAsync);
    const checkSuccess = () => (XmlReq.readyState === XMLHttpRequest.DONE && XmlReq.status === 200);
    const checkFailior = () => (XmlReq.readyState === XMLHttpRequest.DONE && XmlReq.status !== 200);
    const ErrorMsg = `could not load from path: ${path}`;
    if (isAsync) {
        return new Promise((resolve, reject) => {
            XmlReq.onreadystatechange = () => {
                if (checkSuccess()) resolve(JSON.parse(XmlReq.responseText));
                else if (checkFailior()) reject(ErrorMsg);
            }
            XmlReq.send(null);
        });
    } 
    XmlReq.send(null);
    if (checkSuccess()) return JSON.parse(XmlReq.responseText);
    else if (checkFailior()) throw new Error(ErrorMsg);
}