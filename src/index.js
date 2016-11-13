'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

// saved command for alexa to read
var alexaReadingString;
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

/*
var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
		saveCommand
            ],
            "SKILL_NAME" : "American Space Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a space fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    }
};
*/

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
    'Fuel Level': function() {
	
    },
    'WhereIsMyCar': function() {
	
    },
    'CarHealth': function() {
	
    },
    'Accident': function() {
	
    },
    'Dead': function() {
	
    },
    'Life': function() {
	
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
		while (vehicles[count] != undefined) {
		    // search through the list for a specific vehicle name
		    if (vehicles[count].Name == vehicleName) {

			// status retrievals
			fuelEfficiency = ( Math.floor( vehicles[count].FuelEfficiency.Value * kilometersToMiles) ).toString();
			
			
			fuelLevel = vehicles[count].FuelLevel.Value.toString();
			checkEngineLightStatus = false;

			// Alexa will read this
			alexaReadingString = "Current fuel efficiency is " + fuelEfficiency + " miles per gallon." + 
			    "Current fuel level is " + fuelLevel + " percent.";

			parentOfThis.emit(':tell', alexaReadingString);
		    }
		    count++;
		}

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
