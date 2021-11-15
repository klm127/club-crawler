const parameters = require('../src/utility/parameters.js')
const assert = require('assert');




try {
    console.log('Testing parameter extraction 🧪');
    let weaponStub = {
        name: "popper",
        duration: 1000
    }
    assert.deepStrictEqual(parameters.extract(weaponStub), {name:'popper', duration:1000}, 'basic parameter extraction with no model did not work as expected!')
    console.log('👍 basic parameter extraction works as expected');
    let weaponStub2 = {
        name: "popper",
        duration: 1000,
        fire: function(time) {return true},
        subObject: {a:1,b:2}     
    }
    assert.deepStrictEqual(parameters.extract(weaponStub2), {name:'popper', duration:1000}, 'parameter extraction excluding functions and objects did not work as expected!')
    console.log('👍 parameter extraction excluding functions and object properties works as expected');
    let weaponModel = {
        name: null,
        fire: null
    }
    assert.deepStrictEqual(parameters.extract(weaponStub2,weaponModel), {name:'popper'}, 'parameter extraction from model did not work as expected!');
    console.log('👍 parameter extraction with model worked as expected');
}
catch(e) {
    console.error(`An assertion test failed! ${e.code} - ${e.operator}`);
    console.log('   actual  :', e.actual);
    console.log('   expected:', e.expected);
    console.log(e.message);
}
