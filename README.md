# enValidate

Validation extension for [__*enTT*__](https://github.com/ofzza/enTT), extending supported validation syntax to understand schema from 3rd party validation libraries [__*JOI*__](https://github.com/hapijs/joi) and [__*YUP*__](https://github.com/jquense/yup) as validation criteria.

# Get enValidate

To start using ```enValidate``` in your project, simply install it along side of ```enTT``` from NPM by running the following in your terminal:
 ```
 npm install entt envalidate --save
 ```

# How to Use

You can include ```enValidate``` into your ```EnTT``` class the same way you would any other ```enTT``` extension, using ste ```static get includes``` property and returning an instance of the extension. When instantiating the extension, make sure you pass in a reference to the 3rd party validation library you wish to use ([__*JOI*__](https://github.com/hapijs/joi) and/or [__*YUP*__](https://github.com/jquense/yup)).

Having included the extension, you can now configure proeprty validation with [__*JOI*__](https://github.com/hapijs/joi) or [__*YUP*__](https://github.com/jquense/yup) validation schema instead of just validation functions.

<sub>_**Example**_:</sub>
```js
// Import enTT and enValidate
import EnTT from 'entt';
import EnValidate from 'envalidate';
// Import JOI and/or YUP validation library
import joi from 'joi';  // Will also work with lite version: 'joi-browser'
import yup from 'yup';

// Define an EnTT class with validated properties using JOI and YAP
class MyModel extends EnTT {
  static get includes () {
    // Include EnValidate extension passing instances of Joi and Yap
    return [ new EnValidate({ joi, yup }) ];
  }
  static get props () {
    return {
      // Extends validation to accept Joi schema instead of a function
      foo: { validate: joi.string().uppercase() },
      // Extends validation to accept Yup schema instead of a function
      bar: { validate: yup.string().uppercase() },
      // Accepts Joi schema as short-hand property configuration
      baz: joi.string().uppercase(),
      // Accepts Yup schema as short-hand property configuration
      qux: yup.string().uppercase()
    };
  }
}
```
