'use strict'

const ObjectToStign =  Object.prototype.toString;

/**
 * @name isIOS  Is the environment IOS 
 * @return {boolean} True if value is an IOS, otherwise false
 */
export const isIOS = () => {
    const u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * @name isAndroid  Is the environment Android 
 * @return {boolean} True if value is an Android, otherwise false
 */
export const isAndroid = ()=>{
    const u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
};

/**
 * @name isMicroMessenger  Is the environment MicroMessenger 
 * @return {boolean} True if value is an MicroMessenger, otherwise false
 */
export const isMicroMessenger = () => {
    const u = navigator.userAgent.toLowerCase();
    return u.match(/MicroMessenger/i)=="micromessenger";
} 


/**
 * @name isArray  Determine if a value is an Array
 * @param {Object} val The value to test
 * @return {boolean} True if value is an Array, otherwise false
 */

export const isArray = (value) => {
    if(typeof Array.isArray() === 'function') {
        return  Array.isArray(value);
    }
    /**兼容IE8及其以下浏览器 */
    return ObjectToStign.call(value) === '[object Array]';
}

/**
 * @name isObject  Determine if a value is an Object
 * @param {Object} value The value to test
 * @return {boolean} True if value is an Object, otherwise false
 */
export const isObject = (value) => {
    return ObjectToStign.call(value) === '[Object Object]';
}

/**
 * @name isDate  Determine if a value is an Date
 * @param {Object} value The value to test
 * @return {boolean} True if value is an Date, otherwise false
 */
export const isDate = (value) => {
    return ObjectToStign.call(value) === '[Object Date]';
}

/**
 * @name isBoolean  Determine if a value is an Boolean
 * @param {Object} value The value to test
 * @return {boolean} True if value is an Boolean, otherwise false
 */
export const isBoolean = (value) => {
    return typeof value === 'boolean';
}

/**
* @name twoNumber  Keep two decimals
* @param {Number} number The value to test
* @return {String} double digit
*/
export const twoNumber = (number) => {
    return Number(number) < 10 ? `0${number}` : `${number}`;
}


/**
* @name getCookie  get cookie value
* @param {String} names The value to test
* @return {String} cookie value
*/
export const getCookie = (names) => {
    let name = names + "=";
    let ca = document.cookie.split(';');

    for(let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return undefined;
}