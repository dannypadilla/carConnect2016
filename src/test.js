'use strict';

// saved command for alexa to read
var alexaReadingString;
var fuelEfficiency;
var checkEngineLightStatus;
var fuelCapacity;

// for kilometers to miles; 1km = 0.621371 miles
var kilometersToMiles = 0.621371;

var MojioClientLite = require('mojio-client-lite');

var config = {
    application: "088251a7-b45c-489b-829f-b6b71eefa6ae",
    secret:"a763860a-9067-4521-8905-6250ee0d6951"
};

var mojio_client = new MojioClientLite(config);

mojio_client.authorize('disavowed10@gmail.com','fernieLand69').then(function(res, err) {

    if (typeof(err) != "undefined") {
	console.log("login error");
	return;
    }

    // alexa command
    var carCheck = "status";
    // car you are searching for
    var vehicleName = "Corolla";
    // list of cars
    var vehicles;

    // get vehicle data from moj.io api
    mojio_client.get().vehicles().then(function(res, err) {

	// store list of all vehicles
	vehicles = res.Data;

	// go through the list of vehicles
	var count = 0;
	while (vehicles[count] != undefined) {

	    // search through the list for a specific vehicle name
	    if (vehicles[count].Name == vehicleName) {

		// status retrievals
		fuelEfficiency = ( Math.floor( vehicles[count].FuelEfficiency.Value * kilometersToMiles) ).toString();
		
		
		console.log(fuelCapacity = vehicles[count]);
		checkEngineLightStatus = false;

		// Alexa will read this
		alexaReadingString = "Current fuel efficiency is " + fuelEfficiency + " miles per gallon. Fernando Land is dead! Danny is my Master";

		//console.log(alexaReadingString);

	    }
	    count++;
	}

    });

});