/**
 * @memberof ClubCrawler.Utility
 * @namespace Parse
 * 
 * @description Helper functions for map parsing
 */


/**
 * Flattens custom properties of a Tiled Object into 1 object.
 * 
 * Converts an array of Objects to one object and returns it. Returns empty object if not possible
 * @memberof ClubCrawler.Utility.Parse
 * 
 * @param {Array<Object>} PropertiesArray - The Tiled Properties Array
 * @returns {Object} - Object with top level being property name
 */
function getFlatTiledObjectProperties(PropertiesArray) {
    let newObject = {};
    if(Array.isArray(PropertiesArray)) {
        for(let propGroup of PropertiesArray) {
            newObject[propGroup.name] = propGroup.value;
        }
    }
    return newObject;
}

/**
 * Parses a layer map recursively to find the matching Object that has the "creates" property for an item, then returns that object.
 * @memberof ClubCrawler.Utility.Parse
 * 
 * @param {any} item
 * @param {any} layerMap - The layer map
 * @returns {Object | boolean} Either an object with the property 'creates' equal to the mapping and other sibling properties, or false
 */
function getConstructorConfigFromLayerMap(item, layerMap) {
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
                return getConstructorConfigFromLayerMap(item, layerMap[key][value])
            }
        }
        else {
            return isConstructorConfig(layerMap[key]);
        }
    }
}

/**
 * Determines if an object has the property 'creates' and returns it if does. Otherwise returns false.
 * @memberof ClubCrawler.Utility.Parse
 * @param {any} object
 * @returns {Object | boolean}
 */
function isConstructorConfig(object) {
    if(object.creates) {
        return object;
    }
    else {
        return false;
    }
}


/**
 * @memberof ClubCrawler.Utility.Parse
 * Sets the scene.startX and scene.startY properties to the x and y in the constructor config
 * @param {Object} constructorConfig - must have scene, x, and y
 */
function setPlayerStart(constructorConfig) {
    constructorConfig.scene.mapManager.startX = constructorConfig.x;
    constructorConfig.scene.mapManager.startY = constructorConfig.y;
    return([
        constructorConfig.scene.startX,
        constructorConfig.scene.startY
    ])
}



module.exports = {
    getFlatTiledObjectProperties: getFlatTiledObjectProperties,
    getConstructorConfigFromLayerMap: getConstructorConfigFromLayerMap,
    setPlayerStart: setPlayerStart
}
