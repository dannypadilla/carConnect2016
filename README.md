Setting Up Alexa Skill in the Developer Portal

1. Navigate over to https://developer.amazon.com/ and create an account.

2. Once you've registered, select Alexa on the overhead tab and select Alexa Skills Kit and Get Started.

3. Select "Add a New Skill"

4. Select your language, select which Skill Type you'd like to create, input the Name of the skill and the Invocation Name. After that's been set, save and click next.

5. The Interaction Model are written in JSON format so it has to follow a specific format such as:

{
  "intents": [
    {
	"intent": "GetInfo"
    },
    {
	"intent": "AMAZON.HelpIntent"
    },
    {
	"intent": "AMAZON.StopIntent"
    }
  ]
}

And so on and so forth so you are able to call it by "GetInfo give me some info"
6. Once you have finished select Save and head on over to https://github.com/alexa/skill-sample-nodejs-fact and download the repository.

7. Make sure to have npm installed, if not head over to https://docs.npmjs.com/getting-started/installing-node and follow the guide. 

8. Once you have npm installed, navigate over to the repository you just downloaded and run npm install --save alexa-sdk inside the same directory as your src/index.js file.

