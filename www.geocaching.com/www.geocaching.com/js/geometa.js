// Copyright 2007, Google Inc. 
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function () {
    // We are already defined. Hooray!
    if (window.google && google.gears) {
        return;
    }

    var factory = null;

    // Firefox
    if (typeof GearsFactory != 'undefined') {
        factory = new GearsFactory();
    } else {
        // IE
        try {
            factory = new ActiveXObject('Gears.Factory');
            // privateSetGlobalObject is only required and supported on IE Mobile on
            // WinCE.
            if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
                factory.privateSetGlobalObject(this);
            }
        } catch (e) {
            // Safari
            if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
                factory = document.createElement("object");
                factory.style.display = "none";
                factory.width = 0;
                factory.height = 0;
                factory.type = "application/x-googlegears";
                document.documentElement.appendChild(factory);
                if (factory && (typeof factory.create == 'undefined')) {
                    // If NP_Initialize() returns an error, factory will still be created.
                    // We need to make sure this case doesn't cause Gears to appear to
                    // have been initialized.
                    factory = null;
                }
            }
        }
    }

    // *Do not* define any objects if Gears is not installed. This mimics the
    // behavior of Gears defining the objects in the future.
    if (!factory) {
        return;
    }

    // Now set up the objects, being careful not to overwrite anything.
    //
    // Note: In Internet Explorer for Windows Mobile, you can't add properties to
    // the window object. However, global objects are automatically added as
    // properties of the window object in all browsers.
    if (!window.google) {
        google = {};
    }

    if (!google.gears) {
        google.gears = { factory: factory };
    }
})();
/**
* Geolocation API crossbrowser support
*
* This library provides a consistent Geolocation interface for miscellaneous 
* web browsers. It only supports Javascript in a web browser and is not 
* tested and will probably not work for use in Titanium, PhoneGap, etc. 
* http://www.w3.org/TR/geolocation-API/
* 
* @author Manuel Bieh
* @url http://www.manuel-bieh.de/
* @version 1.0.10
* @license http://www.gnu.org/licenses/lgpl-3.0.txt LGPL
*
* Date $LastChangedDate$
*
*/


; (function () {

    var geolocation = this;

    this.init = function () {

        try {

            // Check for W3C Geolocation API standard support
            if (typeof (navigator.geolocation) != 'undefined') {

                geolocation.type = 'W3C Geolocation API';
                geolocation.api = navigator.geolocation;

                // Check for Google Gears support. gears_init.js must be included!
            } else if (typeof (window.google) != 'undefined' && typeof (window.google.gears) != 'undefined') {

                geolocation.type = 'Google Gears';
                geolocation.api = google.gears.factory.create('beta.geolocation');

                // Checks for native Blackberry support
            } else if (typeof (window.blackberry) != 'undefined' && blackberry.location.GPSSupported) {

                geolocation.type = 'Blackberry OS';
                geolocation.api = new BlackberryLocation();

            } else {

                return false;

            }

            window.navigator.geolocation = geolocation.api;
            window.navigator.geolocation['type'] = geolocation.type;

            return true;

        } catch (e) {

            if (typeof (console) != "undefined") {
                console.log(e);
            }

        }

    }

    /**
    * Gets the current position of the user and executes a callback function
    *
    * @param function Callback function which is executed on success
    * @param function Callback function which is executed on error
    * @param function Options
    * @return void
    */
    this.getCurrentPosition = function (successCallback, errorCallback, options) {

        if (geolocation.api) {
            geolocation.api.getCurrentPosition(successCallback, errorCallback, options);
        }

    }

    /**
    * Calls a callback function every time the user's position changes
    *
    * @param function Callback function which is executed on success
    * @param function Callback function which is executed on error
    * @param function Options
    * @return integer ID of the watchPosition callback
    */
    this.watchPosition = function (successCallback, errorCallback, options) {

        if (geolocation.api) {
            geolocation.watchID = geolocation.api.watchPosition(successCallback, errorCallback, options);
        }

        return geolocation.watchID;

    }

    /**
    * Clears the watchPosition callback specified as first parameter.
    *
    * @param integer ID of the watchPosition 
    * @return void
    */
    this.clearWatch = function (watchID) {

        if (watchID == NULL) {
            geolocation.api.clearWatch(geolocation.watchID);
        } else {
            geolocation.api.clearWatch(watchID);
        }

    }

    this.init();

})();




/**
* Geolocation API wrapper for Blackberry devices
*/
function BlackberryLocation() {

    bb = this;

    this.getCurrentPosition = function (successCallback, errorCallback, options) {

        // set to autonomous mode
        blackberry.location.setAidMode(2);

        if (blackberry.location.latitude == 0 && blackberry.location.longitude == 0) {

            errorCallback.call();

        } else {

            //blackberry.location.onLocationUpdate(successCallback);
            blackberry.location.refreshLocation();

            ts = (parseFloat(navigator.appVersion) >= 4.6) ? new Date(blackberry.location.timestamp) : 0;
            successCallback.call(this, { timestamp: ts, coords: { latitude: blackberry.location.latitude, longitude: blackberry.location.longitude} });

        }

    }

    /**
    * watchPosition simulation for Blackberry
    */
    this.watchPosition = function (successCallback, errorCallback, options) {

        interval = (typeof options.maximumAge != 'undefined') ? options.maximumAge : 5000;

        watchID = window.setInterval(bb.getCurrentPosition, interval, successCallback, errorCallback, options);
        return watchID;

    }

    this.clearWatch = function (watchID) {
        window.clearInterval(watchID);
    }

}