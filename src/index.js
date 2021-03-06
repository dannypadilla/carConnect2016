'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

// saved command for alexa to read
var alexaReadingString="";
var fuelEfficiency;
var checkEngineLightStatus;
var fuelLevel;


// for kilometers to miles; 1km = 0.621371 miles
var kilometersToMiles = 0.621371;

var MojioClientLite = require('mojio-client-lite');

var config = {
    application: "088251a7-b45c-489b-829f-b6b71eefa6ae",
    secret:"a763860a-9067-4521-8905-6250ee0d6951"
};

var mojio_client = new MojioClientLite(config);

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('CarStatus');
    },
    'FuelLevel': function() {
	
	var parentOfThis = this;
	mojio_client.authorize('disavowed10@gmail.com','fernieLand69').then(function(res, err) {

	    if (typeof(err) != "undefined") {
		console.log("login error");
		return;
	    }

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
		// search through the list for a specific vehicle name

		/* status retrievals */

		// fuel level
		fuelLevel = vehicles[count].FuelLevel.Value;
		var readFuelLevel = "Current fuel level is at " + (Math.floor(fuelLevel) ).toString() + " percent. ";

		// fuel efficiency
		fuelEfficiency = Math.floor( vehicles[count].FuelEfficiency.Value * kilometersToMiles);
		var readFuelEfficiency = "Fuel efficiency is " + fuelEfficiency.toString() + " miles per gallon. ";

		// fuel left
		var fuelLeft = Math.floor( (fuelLevel/100) * 13 * fuelEfficiency);
		var readFuelLeft = "You have " + fuelLeft.toString() + " miles left till next fill. ";

		alexaReadingString = readFuelLevel + readFuelEfficiency + readFuelLeft;

		parentOfThis.emit(':tell', alexaReadingString);

	    });

	});

    },
    'WhereIsMyCar': function() {
	
    },
    'CarHealth': function() {
	
    },
    'Accident': function() {

	var parentOfThis = this;
	mojio_client.authorize('disavowed10@gmail.com','fernieLand69').then(function(res, err) {

	    if (typeof(err) != "undefined") {
		console.log("login error");
		return;
	    }

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
		// search through the list for a specific vehicle name

		/* status retrievals */

		// accident code
		var accidentCheck = vehicles[count].AccidentState.Value;
		var readAccidentCheck = "No accidents reported. Thank God. ";
		if (accidentCheck) {
		    readAccidentCheck = "Your car has been in an accident. ";
		}

		alexaReadingString = readAccidentCheck;

		parentOfThis.emit(':tell', alexaReadingString);

	    });

	});

    },
    'Dead': function() {
        this.emit(':tell', "YOU ARE DEAD!");
	
    },
    'Life': function() {
        this.emit(':tell', "The answer of life, the universe, and everything. Is 42!");
    },

    'CarStatus': function () {
	var parentOfThis = this;
	mojio_client.authorize('disavowed10@gmail.com','fernieLand69').then(function(res, err) {

	    if (typeof(err) != "undefined") {
		console.log("login error");
		return;
	    }

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

		/* status retrievals */

		// fuel level
		fuelLevel = vehicles[count].FuelLevel.Value;
		var readFuelLevel = "Current fuel level is at " + (Math.floor(fuelLevel) ).toString() + " percent. ";

		// fuel efficiency
		fuelEfficiency = Math.floor( vehicles[count].FuelEfficiency.Value * kilometersToMiles);
		var readFuelEfficiency = "Fuel efficiency is " + fuelEfficiency.toString() + " miles per gallon. ";

		// fuel remaining
		var fuelLeft = Math.floor( (fuelLevel/100) * 13 * fuelEfficiency);
		var readFuelLeft = "You have " + fuelLeft.toString() + " miles left till next fill. ";

		// diagnostics
		checkEngineLightStatus = vehicles[count].DiagnosticCodes;
		var instructions = checkEngineLightStatus[0].Instructions;
		var description = checkEngineLightStatus[0].Description;
		var code = checkEngineLightStatus[0].Code;
		var readDiagnostics = "There is a check engine light code " + code + ". " + description + ". " + instructions;

		// location

		// battery

		// accident code
		var accidentCheck = vehicles[count].AccidentState.Value;
		var readAccidentCheck = "No accidents reported. Thank God. ";
		if (accidentCheck) {
		    readAccidentCheck = "Your car has been in an accident. ";
		}
		alexaReadingString = readAccidentCheck + readFuelLevel + readFuelEfficiency + readFuelLeft + readDiagnostics;

		parentOfThis.emit(':tell', alexaReadingString);

	    });

	});

    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
