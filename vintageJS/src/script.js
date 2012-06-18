/**
 * Copyright 2011 by Robert Fleischmann
 *
 * Only teh core of vintageJS (jQuery Plugin) is Open Source.
 * All the rest like this script is NOT free.
 *
 * Please contact me (contact@vintagejs.com) for further information.
 **/
var isBig = true;

$(document).ready(function(){
    showApply("img/parrot.jpg");
});

var showApply = function (path)
{
    var image = new Image();
    image.src = path;
    $(image).addClass('theImage').data('vintageSource', path);
    $("section").prepend(image);

    $('#desaturate-slider').slider({
        animate: true,
        stop: function (event, ui) {
            updateVintageJS($(this), ui.value);
        }
    });
    $('#vignette-dark-slider').slider({
        animate: true,
        stop: function (event, ui) {
            updateVintageJS($(this), ui.value);
        }
    });
    $('#vignette-light-slider').slider({
        animate: true,
        stop: function (event, ui) {
            updateVintageJS($(this), ui.value);
        }
    });
};

var vintageDefaults = {
    vignette: {black:0,white:0},
    noise: false,
    screen: false,
    desaturate: false,
    allowMultiEffect: true,
    mime: 'image/jpeg',
    viewFinder: false,
    curves: false,
    blur: false
};

var updateVintageJS = function (el, value) {
    if (el.is('.vignette-dark')) {
           vintageDefaults.vignette.black = value/100 || 0;
    }
    else if (el.is('.vignette-light')) {
           vintageDefaults.vignette.white = value/100 || 0;
    }
    else if (el.is('.curves')) {
        vintageDefaults.curves = (vintageDefaults.curves === false) ? true : false;
    }
    else if (el.is('.ttv')) {
        vintageDefaults.viewFinder = (vintageDefaults.viewFinder === false) ? '/img/viewfinder_bw.jpg' : false;
    }
    else if (el.is('.screenlayer')) {
        vintageDefaults.screen = (vintageDefaults.screen === false) ? {red: 227,green: 12,blue: 169,strength: 0.15} : false;
    }
    else if (el.is('.desaturate')) {
        vintageDefaults.desaturate = value/100 || false;
    } else if (el.is('.blur')) {
        vintageDefaults.blur = (vintageDefaults.blur === false) ? 1 : false;
    }
    var img = $('.theImage');
    img.vintage(vintageDefaults);
};

var tmpFile;

$(function () {
    $('.switch').live('click', function (e) {
        e.preventDefault();
        if ($(this).is('.on')) {
            $(this).removeClass('on').addClass('off');
        } else {
            $(this).removeClass('off').addClass('on');
        }
        updateVintageJS($(this));
    });
});