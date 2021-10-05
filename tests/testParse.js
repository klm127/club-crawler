let parse = require('../src/utility/parse');
let assert = require('assert');

console.log('🧪 Testing parse.TiledObjectCustomProperties');
// test parse.TiledObjectCustomProperties
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
assert.deepStrictEqual(
    parse.TiledObjectCustomProperties(sampleCylinderSpawn.properties), 
    {
        "spawns": "cylinder",
        "targettable": true
    },
    " ☹ error- the object reutrned from TiledObjectCustomProperties was not as expected"
);
console.log('👍 flatting tiled object properties works as expected');