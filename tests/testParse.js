let parse = require('../src/utility/parse');
let assert = require('assert');

/**
 * Test flattening Tiled Item custom properties to the item itself
 */
try {
    console.log('🧪 Testing parse.TiledObjectCustomProperties');
    let sampleCylinderSpawn = {
        "height":0,
        "id":110,
        "name":"cylinder-spawn",
        "point":true,
        "properties":[
            {
                "name":"spawns",
                "type":"string",
                "value":"cylinder"
            }, 
            {
                "name":"targettable",
                "type":"bool",
                "value":true
            }],
        "rotation":0,
        "type":"spawn-point",
        "visible":true,
        "width":0,
        "x":1136,
        "y":1120
    }
    let mappedCylinderProperties = parse.getFlatTiledObjectProperties(sampleCylinderSpawn.properties);
    assert.deepStrictEqual(
        mappedCylinderProperties, // actual
        {                           // expected
            "spawns": "cylinder",
            "targettable": true
        },
        " ☹ error- the object reutrned from getFlatTiledObjectProperties was not as expected" // failure message
    );
    console.log('👍 flatting tiled object properties works as expected'); // success message

/**
 * Test finding how an object maps
 */
    console.log('🧪 Testing getting a cylinder constructor from a layer map');
    let preparedCylinderSpawn = {};
    Object.assign(preparedCylinderSpawn, sampleCylinderSpawn);
    Object.assign(preparedCylinderSpawn, mappedCylinderProperties);
    const EXAMPLE_LAYER = {
        type: {
            "spawn-point": {
                "spawns": {
                    "cylinder": {
                        creates: "Cylinder",
                        group: "destructibles"
                    }
                }
            },
            "enemy-spawn": {
                name: {
                    Ogre: {
                        creates: "Ogre",
                        group: "enemies"
                    }
                }
            },
            "player-spawn": {
                creates: "PlayerSpawn",
            }
        }
    }
    let cylinderResult = parse.getConstructorConfigFromLayerMap(preparedCylinderSpawn, EXAMPLE_LAYER);
    assert.deepStrictEqual(
        cylinderResult, // actual
        {
            creates: "Cylinder",       //expected
            group: "destructibles"
        },
        "☹ error- Determining the correct constructor from the layer map and a flattened cylinder didnt work as expected"
        );
    console.log('👍 Correct constructor for a flattened cylinder could be determined from the layer map');
/**
 * Test again with Ogre schema
 */
    console.log('🧪 testing if ogre maps as well as the cylinder');
    const OGRE_TEST_MODEL = {
        "height":300,
        "id":152,
        "name":"Ogre",
        "polygon":[
               {
                "x":0,
                "y":0
               }, 
               {
                "x":300,
                "y":0
               }, 
               {
                "x":300,
                "y":300
               }, 
               {
                "x":0,
                "y":300
               }],
        "rotation":0,
        "type":"enemy-spawn",
        "visible":true,
        "width":300,
        "x":1965.81,
        "y":7211.63
       }
    let mappedOgreProperties = parse.getFlatTiledObjectProperties(OGRE_TEST_MODEL.properties); //OGRE_TEST_MODEL.properties is undefined, returns {}
    let mergedOgre = {};
    Object.assign(mergedOgre, OGRE_TEST_MODEL); 
    Object.assign(mergedOgre, mappedOgreProperties);// doesn't actually do anything here as the ogre has no custom properties
    let ogreResult = parse.getConstructorConfigFromLayerMap(mergedOgre, EXAMPLE_LAYER);
    assert.deepStrictEqual(
        ogreResult, // actual
        {
            creates: "Ogre",       //expected
            group: "enemies"
        },
        "☹ error- Determining the correct constructor from the layer map and a flattened ogre didnt work as expected"
        );
    console.log('👍 Correct constructor for Ogre could be determined from the layer map');

} catch(e) {
    console.error(`An assertion test failed! ${e.code} - ${e.operator}`);
    console.log('   actual  :', e.actual);
    console.log('   expected:', e.expected);
    console.log(e.message);
}