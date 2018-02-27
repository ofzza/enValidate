// =====================================================================================================================
// Tests Entity Validation using 3rd party libraries
// =====================================================================================================================
let _           = require('lodash'),
    assert      = require('assert'),
    EnTT        = require('entt').default,
    EnValidate  = require('../dist').default;

// Test JOI (original)
validateWithLibrary(require('./libs/joi'));
// Test JOI (browser)
validateWithLibrary(require('./libs/joi-browser'));
// Test YUP
validateWithLibrary(require('./libs/yup'));

/**
 * Valdiates using a 3rd party library
 * @param {any} name 3rd party library name
 * @param {any} config EnValidate extension constructor configuration
 * @param {any} schema 3rd party library validation schema to use
 */
function validateWithLibrary ({ name, config, schema }) {

  // Validation using 3rd party lib library
  describe(`> Validation using original ${name} library`, () => {

    // Define EnTT extending classes using EnValidate extensions
    class MyExtendedEntity extends EnTT {
      static get includes () {
        return [ new EnValidate(config) ];
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
            validate: schema
          },
          baz: schema
        };
      }
    }

    // Should fall back to EnTT Validation extension when validation function specified
    it('> Should fall back to EnTT Validation extension when validation function specified', () => {

      // Instantiate an entity with custom modules and get property configuration
      const e = new MyExtendedEntity();

      // Should validate when validation function specified
      e.foo = 'QUX';
      assert.ok(!e.validation.foo);
      e.foo = 'qux';
      assert.ok(e.validation.foo);
      assert.equal(e.validation.foo.property, 'foo');
      assert.equal(e.validation.foo.value, 'qux');

    });

    // Should use 3rd party lib validation schema when detected
    it(`> Should use ${name} validation schema when detected`, () => {

      // Instantiate an entity with custom modules and get property configuration
      const e = new MyExtendedEntity();

      // Should use 3rd party lib for validation
      e.bar = 'QUX';
      assert.ok(!e.validation.bar);
      e.bar = 'qux';
      assert.ok(e.validation.bar);
      assert.equal(e.validation.bar.property, 'bar');
      assert.equal(e.validation.bar.value, 'qux');

    });

    // Should recognize 3rd party lib schema instance short-hand validation property configuration
    it(`> Should recognize ${name} schema instance short-hand validation property configuration`, () => {

      // Instantiate an entity with custom modules and get property configuration
      const e = new MyExtendedEntity();

      // Should transalate 3rd party lib as short-hand property configuration
      e.baz = 'QUX';
      assert.ok(!e.validation.baz);
      e.baz = 'qux';
      assert.ok(e.validation.baz);
      assert.equal(e.validation.baz.property, 'baz');
      assert.equal(e.validation.baz.value, 'qux');

    });

  });

}
