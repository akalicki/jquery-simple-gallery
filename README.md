# jQuery simple-gallery #

**simple-gallery.js** is a lightweight jQuery widget that makes it quick and 
easy to implement highly customizable photo galleries on your website.  The 
idea behind the project was to separate the work of creating a cycling 
slideshow animation from the gallery's design process, allowing for greater 
facility of code-reuse and fewer headaches.  simple-gallery.js creates a 
slideshow you can easily customize without having to worry about superfluous 
code and unneeded options.

**CURRENT VERSION: v2.0.0**

## Get Started ##

First thing's first!  To get started with simple-gallery.js, download the 
plugin and include it after you've included both jQuery and jQuery UI:

```html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/jquery-ui.min.js"></script>
<script src="/path/to/simple-gallery.min.js"></script>
```

Note that the only required element of jQuery UI is the **widget** portion 
of the UI core.  Feel free to do a custom download if you would not like to 
include the full jQuery UI package.  I have also included a 
[minified version][jqueryui-widget] of the required jQuery UI code in this 
repository so you can download that and not have to worry about going through 
the jQuery site.

[jqueryui-widget]: https://github.com/akalicki/jquery-simple-gallery/blob/master/jqueryui-widget.min.js

The most basic usage of the simple-gallery.js plugin requires using a standard 
jQuery selector to choose the target HTML tag in which to display the larger, 
selected image and supplying another selector to isolate the source images for 
the gallery.   In other words, the simple-gallery plugin expects something 
like the following:

```html
<div id="thumbnails">
    <img src="../images/img1.jpg" />
    <img src="../images/img2.jpg" />
    <img src="../images/img3.jpg" />
    <img src="../images/img4.jpg" />
    <img src="../images/img5.jpg" />
    <img src="../images/img6.jpg" />
    <img src="../images/img7.jpg" />
    <img src="../images/img8.jpg" />
    <img src="../images/img9.jpg" />
</div>
<div id="displayImage">
</div>
```

The area you decide to display your photos (the `<div>` with id `displayImage` 
in this case) should be styled with appropriate width and height so that they 
can show up.  The plugin works by changing the background-image of the target 
tag, so the tag needs to already occupy the space on the page where you expect 
the photo to load.

As soon as soon as the DOM for the page has loaded, you can initialize the 
gallery using the following JavaScript code - which should seem familiar as it 
works similarly to other jQuery functions:

```javascript
$('#displayImage').gallery({source: "#thumbnails img"});
```

The selector `$('#thumbnails img')` isolates the set of images that you would 
like to turn into a gallery.  They can be separated from the rest of the 
document in one `<div>` as shown above or scattered throughout - the only 
thing that matters is that your selector only chooses `<img>` tags with valid 
`src` attributes that point to their corresponding images.  The parameter 
passed to the `gallery` function is an options object specifying different 
ways to customize the plugin.

## Gallery Options ##

The complete set of options that can be passed upon photo gallery 
initialization is listed below:

+ `source` (mandatory, *no default*) - a string representing the selector for 
the source images used in the photo gallery.  The string supplied can be 
anything, so long as the selector `$(source)` will isolate all `<img>` tags 
to be displayed in the gallery.

+ `animate` (optional, *default = true*) - a boolean true/false value 
representing whether to animate the slideshow.  If false, the target display 
will only change images when you click on a thumbnail image.

+ `startImg` (optional, *default = 0*) - the zero-based index of the image to 
start the slideshow at.  A default value of 0 will tell the plugin to start at 
the first image in the selection.

+ `waitTime` (optional, *default = 5000*) - the time, in milliseconds, to show 
each image before beginning the transition to the next one.

+ `changeTime` (optional, *default = 700*) - the time, in milliseconds, to 
take for each slideshow animation.  A full photo-change takes `2 * changeTime` 
milliseconds (in the default behavior, `changeTime` milliseconds for fading 
out an old image and another `changeTime` for fading in the new one).

+ `easing` (optional, *default = "swing"*) - the easing function to use for 
photo transitions.

+ `restartOnEnd` (optional, *default = true*) - a boolean true/false value 
representing whether to restart the slideshow from the beginning after 
reaching the end of the collection.

+ `selectClass` (optional, *default = selected*) - the class name that gets 
added and removed from each thumbnail image in turn when it is displayed in 
the target destination.  This allows you to further customize the look of the 
thumbnail for the image that is currently being shown in the gallery.

### Using Options ###

simple-gallery options can be supplied to the plugin in one of two ways.  The easiest way to do so is to supply options to the gallery constructor in an 
object parameter when the function is run like so:

```javascript
$('#displayImage').gallery({source: "#thumbnails img", easing: "linear", restartOnEnd: false});
```

If you would like to change the options of a gallery instance after it has 
been instantiated, you can do so as well:

```javascript
// create gallery
$('#displayImage').gallery({source: "#thumbnails img"});

// get current values of options
alert($('#displayImage').gallery('option', 'easing'));     // prints "swing"
alert($('#displayImage').gallery('option', 'changeTime')); // prints "700"

// set new values of options
$('#displayImage').gallery('option', 'easing', 'linear');
$('#displayImage').gallery('option', 'changeTime', 600);
```

## Advanced Use ##

If the options provided are not enough to obtain the look you would like to 
achieve, simple-gallery comes loaded with extra functionality that may be 
able to help.

### Public Functions

There are currently two public functions which can be called once the gallery 
has been instantiated:

+ stopAnimation - stops the display image from switching to the next photo in 
the gallery.

+ resumeAnimation - resumes the gallery's animation after having been stopped.

All public functions are called on the gallery instance of the display image 
after instantiation as follows:

```javascript
// create gallery linked to '#displayImage'
$('#displayImage').gallery({source: "#thumbnails img"});

// stop and then resume gallery animation
$('#displayImage').gallery("stopAnimation");
$('#displayImage').gallery("resumeAnimation");
```

A typical usage would be to stop the gallery from animating when the user 
hovers their cursor over the targeted display image:

```javascript
$('#displayImage').on({
    mouseenter: function() {
        $('#displayImage').gallery("stopAnimation");
    },
    mouseleave: function() {
        $('#displayImage').gallery("resumeAnimation");
    }
});
```

## Examples ##

A few examples of simple ways to implement this plugin:

+ [Grid-layout example](https://github.com/akalicki/jquery-simple-gallery/blob/master/examples/grid-layout/index.html)

+ [Row-layout example](https://github.com/akalicki/jquery-simple-gallery/blob/master/examples/row-layout/index.html)

## Contribute ##

Any and all contributions to this project are welcome!  If I like what you've 
done I will definitely include your changes in the official version.  To 
submit a contribution, please follow standard git procedure:

1. [Fork](https://github.com/akalicki/jquery-simple-gallery/fork) the project
2. Make changes and push the commits to your own repository
3. Submit a pull request and I'll get back to you!