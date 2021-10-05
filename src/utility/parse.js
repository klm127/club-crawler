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
    if(Array.isArray(PropertiesArray)) {
        for(let propGroup of PropertiesArray) {
            newObject[propGroup.name] = propGroup.value;
        }
    }
    return newObject;
}

function getConstructorFromLayerMap(item, layerMap) {
    let constructorConfig = isConstructorConfig(layerMap);
    if(constructorConfig) {
        return constructorConfig;
    }
    //console.log('-not config')
    let layerKeys = Object.keys(layerMap);
    //console.log('- layerkeys:', layerKeys)
    for(let i = 0; i < layerKeys.length; i++) {
        let key = layerKeys[i];
        if(item.hasOwnProperty(key)) {
            //console.log(' item has key', key);
            let value = item[key];
            //console.log(' item has value', value);
            let subKeys = Object.keys(layerMap[key]);
            //console.log(`layerMap[${key}] = `, subKeys)
            if(subKeys.indexOf(value) >= 0) {
                //console.log(`layerMap has property: ${value}, recursing`)
                return getConstructorFromLayerMap(item, layerMap[key][value])
            }
        }
        else {
            return isConstructorConfig(layerMap[key]);
        }
    }
}

function isConstructorConfig(object) {
    if(object.creates) {
        return object;
    }
    else {
        return false;
    }
}



module.exports = {
    TiledObjectCustomProperties: parseTiledObjectProperties,
    getConstructorFromLayerMap: getConstructorFromLayerMap
}
