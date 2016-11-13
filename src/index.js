'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var MojioClientLite = require('mojio-client-lite');
var SKILL_NAME = "Car Check"

var config = {
    application: "088251a7-b45c-489b-829f-b6b71eefa6ae",
    secret:"a763860a-9067-4521-8905-6250ee0d6951"
};

var mojio_client = new MojioClientLite(config);

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('CarStatus');
    },
    'CarStatus': function () {
        var stuff= "herh";
        var parentOfThis=this;
       // this.emit(':tell',"test");
        mojio_client.authorize('disavowed10@gmail.com','fernieLand69').then(function(res,err) {

            if(typeof(err)!="undefined")
            {
                console.log("login error");
                return;
            }
            // login successful
            // write your logic 
            console.log("auth success");

            mojio_client.get().vehicles().then(function(res,err){
                if(typeof(err)!="undefined")
            {
                console.log("call error");
                return;
            }
                // if err is null then data will be inside res
                //this.emit(':tell', "stuff");
                //console.log("fuel efficiency: "+ res.Data[0].FuelEfficiency.Value.toString());
                //stuff = res.Data[0].FuelEfficiency.Value.toString();
                //console.log("status: "+status);
                console.log("in client get");
                parentOfThis.emit(':ask',res.Data[0].FuelEfficiency.Value.toString());
                console.log("after");

            }
            //, () => {
            //this.emit(':tell', stuff);
    //}
    );

});
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