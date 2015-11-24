angular-lory
============


<p align="center">
  <img src="./example/lory_small.png" width="200px" />
</p>

Please visit: [http://houseofradon.github.io/angular-lory/](http://houseofradon.github.io/angular-lory/ "nglory")

Usage
-----

- Using [bower](http://bower.io/) to install it. `bower install angular-lory`
- Add `angular`, `lory` and `angular-lory` to your code.

## Prerequisited css

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

```html
    <script src="../bower_components/angular/angular.js"></script>
    <script src="../bower_components/lory/lory.js"></script>
    <script src="../bower_components/angular-lory/dist/angular-lory.min.js"></script>
```

- Add the sortable module as a dependency to your application module: `ngLory`

```js
var myAppModule = angular.module('MyApp', ['ngLory'])
```

This directive allows you to use the angular-lory plugin as
an angular directive. It can be specified in your HTML
as either a `<div>` attribute or a `<lory>` element.

```html
    <lory infinite=true>
    ...
    </lory>
```

### Attributes & Event ###
`settings`: optional `Object` containing any of the lory options. Consult [here](http://meandmax.github.io/lory/).
 - `method` optional containing lort method. discussed [below](#method) in detail
 - `event` optional containing lory event

```javascript
$scope.loryConfig = {
    rewind: true,
    infinite: false,  
    method: {},
    event: {
        beforeSlide: function (event) {
        },
        afterSlide: function (event) {
        }
    }
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


### Slide data ###
For change slide content, you have to set `ng-if` to destroy and init it

- controller:
```js
    $scope.number = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
    $scope.numberLoaded = true;
    $scope.numberUpdate = function(){
        $scope.numberLoaded = false; // disable lory
        
        //number update
        
        $scope.numberLoaded = true; // enable lory
    };
```
- html:
```html
    <script type="text/ng-template" id="tpl.html">
        <h3>{{ i.label }}</h3>
    </script>
    
    <lory ng-if="numberLoaded">
        <div ng-repeat="i in number">
            <div class="" ng-include="'tpl.html'"></div>
        </div>
    </lory>
```
