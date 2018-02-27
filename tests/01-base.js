// =====================================================================================================================
// Tests Entity Validation
// =====================================================================================================================
let _          = require('lodash'),
    assert     = require('assert'),
    EnTT       = require('../../enTT/dist').default,  // TODO: Change to NPM instance
    EnValidate = require('../dist').default;

// Run tests
describe('> No Configuration Validation', () => {

  // Define EnTT extending classes using EnValidate extensions
  class MyExtendedEntity extends EnTT {
    static get includes () {
      return [ EnValidate ];
    }
    static get props () {
      return {
        foo: {
          validate: (value) => {
            if (!_.isString(value) || (value !== value.toUpperCase())) {
              return `Value ${ value } is not uppercased!`;
            }
          }
        },
        bar: {
          validate: true
        },
        baz: {
          validate: {}
        }
      };
    }
  }

  // Should fall back to EnTT Validation extension when validation function specified
  it('> Should fall back to EnTT Validation extension when validation function specified', () => {

    // Instantiate an entity with custom modules and get property configuration
    const e = new MyExtendedEntity();

    // Should validate when validation function specified
    e.foo = 'BAR';
    assert.ok(!e.validation.foo);
    e.foo = 'bar';
    assert.ok(e.validation.foo);
    assert.equal(e.validation.foo.property, 'foo');
    assert.equal(e.validation.foo.value, 'bar');

  });

  // Should skip validation when validation not a function
  it('> Should skip validation when validation not a function', () => {

    // Instantiate an entity with custom modules and get property configuration
    const e = new MyExtendedEntity();

    // Should skip validation when validation not a function
    e.bar = 'FOO';
    assert.ok(!e.validation.bar);
    e.baz = 'foo';
    assert.ok(!e.validation.baz);

  });

});
