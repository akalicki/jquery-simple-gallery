# jQuery simple-gallery #

**simple-gallery.js** is a lightweight jQuery plugin that makes it quick and 
easy to implement highly customizable photo galleries on your website.  The 
idea behind the project was to separate the work of creating a cycling 
slideshow animation from the gallery's design process, allowing for greater 
facility of code-reuse and fewer headaches.  simple-gallery.js creates a 
slideshow you can easily customize without having to worry about superfluous 
code and unneeded options.

## Get Started ##

First thing's first!  To get started with simple-gallery.js, download the 
plugin and include it after you've included jQuery:

```html
<script src="/path/to/jquery.min.js"></script>
<script src="/path/to/simple-gallery.min.js"></script>
```

The most basic usage of the simple-gallery.js plugin requires using a standard 
jQuery selector to isolate the images to add to the gallery, and supplying a 
target HTML tag in which to display the larger, selected image.  In other 
words, the simple-gallery plugin expects something like the following:

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
$('#thumbnails img').gallery({target: "#displayImage"});
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

+ `target` (mandatory, *no default*) - a string representing the selector for 
the tag to display each image as it is selected in the gallery.  The string 
does not need to be an id, as long as the selector `$(target)` will only 
select one appropriately sized DOM element from the page to cycle your images 
through.

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

### Using Options ###

Simple-Gallery options can be supplied to the plugin in one of two ways upon 
initialization.  The easiest way to do so is to supply options in an object 
parameter when the function is run like so:

```javascript
$('#thumbnails img').gallery({target: "#displayImage", easing: "linear", restartOnEnd: false});
```

If you are planning on reusing the same gallery settings multiple times, or 
would like to override the defaults instead of passing your customizations in 
when you call the function you can do so as well:

```javascript
$.fn.gallery.defaults.target = "#displayImage";
$.fn.gallery.defaults.easing = "linear";
$.fn.gallery.defaults.restartOnEnd = true;
$('#thumbnails img').gallery();
```

## Advanced Use - Further Customization ##

If the options provided are not enough to obtain the look you would like to 
achieve, three of the core functions that make up the simple-gallery plugin 
are declared public and can be completely overridden:

+ `$.fn.gallery.init` - called once to initialize plugin.  Default behavior 
sets the target image's background properties and begins the opacity at 0 so 
it can fade in.

+ `$.fn.gallery.changeToImg` - called when an image should transition out of 
being displayed.  Default behavior fades the current image out, then calls the 
`$.fn.gallery.fetchImg` to fetch the next image in the cycle.

+ `$.fn.gallery.fetchImg` - called when a new image should be loaded in the 
target destination.  Default behavior changes the target's background-image 
url, fades in the new image, and sets the timer to wait until the next image 
should be called.

Overriding any or all of these can drastically change the appearance and 
animation of the plugin.  The most common reason to override them would 
probably be if you wanted a different transition than a fade, but the 
possibilities are endless!

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