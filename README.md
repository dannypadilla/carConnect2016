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

9. After installing the node modules, navigate over the the src file and zip the files index.js and the node_modules folder.

10. Now navigate over to aws.amazon.com and create a free account.

11. Once logged in, on the top right for Regions, select US East(N. Virginia).

12. After setting the Region, Select Services and under Compute select Lambda.

13. Select Create a Lambda Function.

14. Select Blueprint and Blank Function.

15. On the blank space to the left of Lambda, select Alexa Skills Kit then click Next.

16. Provide a name for the skill you wish to name, provide a short description and make sure the runtime is Node.js 4.3

17. For Code entry type, select Upload a .ZIP file from the drop down menu.

18. Upload the .ZIP file from step 9.

19. Leave handler as index.handler and for role, select Create a custom role

20. A new window should pop up, For the IAM Role, select Create a new IAM Role and leave Role Name alone.

21. Select Allow and the window should close.

22. Select Next then Create Function.

23. Once created, you can see the ARN on the right side of the screen.

24. Navigate back to developer.amazon.com and select the skill from the list and click edit.

25. Select AWS Lambda ARN make sure AWS Lambda ARN is set to North America and past your ARN into the space provided. Select No for Account Linking. Select next.

26. Head over to the test area and under Enter Utterance, type in open and the name of your skill. Select Ask My Fact Skill.

27. Your skill should pop up and work.

28. Head Over to https://docs.moj.io/#/document/view/doc_js.

29. Scroll down to Initializing the SDK (Server Side) and copy the Javascript code and paste it inside the index.js file.

30. Under Application, put in your APP ID. Under secret, you also input the secret generated on the same page.
