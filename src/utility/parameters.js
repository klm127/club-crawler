/**
 * @memberof ClubCrawler.Utility
 * 
 * @namespace Parameters
 * 
 * 
 * @description Utilities for extracting parameters from class instances in order to re-create them as necessary
 */

/**
 * Extracts parameters from an object instance. If no second parameter is provided, extracts all primitive-valued properties
 * @memberof ClubCrawler.Utility.Parameters
 * @param {Object} targetObject - The object to extract parameters from
 * @param {Object} [model] - A model object 
 */
 function extract(targetObject, model) {
     let extracted = {};
     if(!model) {
         let keys = Object.keys(targetObject);
         for(let key of keys) {
             if(typeof targetObject[key] != 'function' && typeof targetObject[key] != 'object') {
                extracted[key] = targetObject[key];             
             }
         }
     }
     else {
        let keys = Object.keys(model);
        for(let key of keys) {
            if(targetObject[key]) {
                if(typeof targetObject[key] != 'function' && typeof targetObject[key] != 'object') {
                   extracted[key] = targetObject[key];             
                }
            }
        }
     }
     return extracted;

 }

module.exports = {
    extract: extract
}