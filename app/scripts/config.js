// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {
    // JavaScript folders.
    libs: "../scripts/libs",

    // Libraries.
    jquery            : "../scripts/libs/jquery",
    lodash            : "../scripts/libs/lodash",
    text              : "../scripts/libs/text",
    easing            : "../scripts/libs/jquery.easing.1.3",
    transitions       : "../scripts/libs/bootstrap.transitions",
    uniform           : "../scripts/libs/jquery.uniform",
    bootstrapCarousel : "../scripts/libs/bootstrap.carousel.min",
    eventMove         : "../scripts/libs/jquery.event.move",
    eventSwipe        : "../scripts/libs/jquery.event.swipe"
  },

  shim: {
    easing: ["jquery"],
    eventMove: ["jquery"],
    eventSwipe: ["eventMove"],
    transitions: ["jquery"],
    uniform: ["jquery"],
    bxslider: ["jquery"],
    bootstrapCarousel: ["jquery"],
    picturefill: ["jquery"]
  }

});
