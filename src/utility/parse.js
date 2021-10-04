/**
 * Map Parser helpers
 * 
 * Stub
 */


/**
 * Gets a properly nested object from the tiled properties array
 * @param {Array<Object>} PropertiesArray - The Tiled Properties Array
 * @returns {Object} - Object with top level being property name
 */
function parseTiledObjectProperties(PropertiesArray) {
    let newObject = {};
    for(let propGroup in PropertiesArray) {
        newObject[propGroup.name] = propGroup.value;
    }
    return newObject;
}


/**
 * I wish... todo? Templates wind up really weird in the .json output
 * @returns {any}
 */
function parseTiledTemplate() {

}

module.exports = {
    ParseTiledObjectProperties: parseTiledObjectProperties
}