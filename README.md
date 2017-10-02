angular-lory
============


<p align="center">
  <img src="./docs/lory_small.png" width="200px" />
</p>

Please visit: [http://houseofradon.github.io/angular-lory/](http://houseofradon.github.io/angular-lory/ "nglory")

Installation
-----

- Using [bower](http://bower.io/) to install it.

`bower install angular-lory`

- Add `angular`, `lory`	and `angular-lory` to your code.

```html
    <script src="../bower_components/angular/angular.js"></script>
    <script src="../bower_components/lory/lory.js"></script>
    <script src="../bower_components/angular-lory/dist/angular-lory.min.js"></script>
```

- Add the sortable module as a dependency to your application module: `ngLory`

```js
angular.module('MyApp', ['ngLory'])
```

Usage
----

### Prerequisited css & HTML

```css
/**
 * (optional) define here the style definitions which should be applied on the slider container
 * e.g. width including further controls like arrows etc.
 */
.slider {}

.frame {
    /**
     * (optional) wrapper width, specifies width of the slider frame.
     */
    width: 880px;

    position: relative;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    white-space: nowrap;
}

.slides {
    display: inline-block;
}

li {
    position: relative;
    display: inline-block;

    /**
     * (optional) if the content inside the slide element has a defined size.
     */
    width: 880px;
}
```

This directive allows you to use the angular-lory plugin as
an angular directive. It can be specified in your HTML
as either a `<div>` attribute or a `<lory>` element.

```html
    <lory settings="loryConfig" infinite=true>
    ...
    </lory>
```

### Attributes & Event ###
`settings`: required `Object` containing any of the lory options. Consult [here](http://meandmax.github.io/lory/).
 - `method` optional containing lory method. discussed [below](#method) in detail
 - `event` optional containing lory event

```javascript
$scope.loryConfig = {
    rewind: true,
    infinite: false,  
    method: {},
    event: {}
};
```

### Method ###
1. All the functions in the plugin are exposed through a control
attribute.
2. To utilize this architecture, and have two-way data-binding,
define an empty control handle on scope:
```js
    $scope.loryConfig = {
        method: {}
    }
```

3. Pass it as the value to control attribute. Now, you can call any plugin methods
as shown in the example.

```html
<button ng-click="loryConfig.method.slideTo(2)">slideTo(2)</button>
<button ng-click="loryConfig.method.prev()">prev()</button>
<button ng-click="loryConfig.method.next()">next()</button>
<button ng-click='loryConfig.method.reset()'>reset()</button>
<button ng-click='loryConfig.method.destroy()'>detroy()</button>
```
Todo
----
- Tests
- More examples

Credits
-------
* PhilipKnape ([@philipknape](https://twitter.com/philipknape))

Lisence
-------
This project is under the MIT license.
