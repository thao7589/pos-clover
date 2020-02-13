/**
 ********Clover POS Auth utils***********
 **/
var HTTPScriptable = require('core/HTTPScriptable');
var baseUrl="https://sandbox-quickbooks.api.intuit.com/v3/company/";

var cloverOauthUtils = Class.create({
    getAuthorizationToken: function(url, clientId, clientSecret, scope){
       //Get Authorization Code using Client ID, Client Secret & Scope.
       //Returns Authorization Code.
       
       /****************************************/
       /**************Methodology***************/
       /* 
       1. Query Client ID (APP ID, which will eventually be hard-coded for the Orchatect APP on 
        the clover market place) & redirect_url, which will also be hard-coded into a button component.
       2. Store returned Authorization Code in Bundle properties, upon establishing a connection to the
       merchant.
       https://sandbox.dev.clover.com/oauth/authorize?client_id={APP_ID}&redirect_uri={CLIENT_REDIRECT_URL}
       */
       
       var url="https://sandbox.dev.clover.com/oauth/authorize";
       var clientId = Configuration.getParametricValue('dev.pos_clover','app_id');
       var redirectUrl = Configuration.getParametricValue('dev.pos_clover','redirect_url');
       
       var authDetails=[];
       
       var HTTPScriptable = require('core/HTTPScriptable');
       var client = new HTTPScriptable("https://appcenter.intuit.com/connect/oauth2");
       client.addRequestParameter('client_id', clientId);
       client.addRequestParameter('redirect_uri', redirectUrl);
       var insertResponse = client.get(url);
       //var userObject = JSON.parse(insertResponse.getResponseBody());
       //console.log(insertResponse); 
       var respObject=JSON.parse(insertResponse.getResponseBody);
       var authCode=respObject.code;
       var merchId=respObject.merchant_id;
       var employeeId=respObject.employee_id;
       authDetails.push(respObject);
       
       return authDetails;

    },
    
    getToken: function(auth_code){
       //Get OAuth 2.0 token using Authorization Code, Client ID(APP ID) & Client Secret.
       //https://sandbox.dev.clover.com/oauth/token?client_id={APP_ID}&client_secret={APP_SECRET}&code={AUTHORIZATION_CODE}

       /****************************************/
       /**************Methodology***************/
       /* 
       1. Exchange your authorization code for an API token
       2. Receive auth_code in function
       3. Get clientId from bundle parametrics as an interim, but will need to be refactored for scaling
       4. clientSecret will be hard-coded for security reasons, as an interim solution
       5. Receive apiToken in JSON object as an access_token
       
       */
           var token="";
           var clientSecret = "d04fe52a-c0a5-c07b-a544-c12623cb8255"; //Insert Client Secret from Clover App
           var clientId = Configuration.getParametricValue('dev.pos_clover','app_id');
       
           var HTTPScriptable = require("core/HTTPScriptable");
           var url = "https://sandbox.dev.clover.com/oauth/token";
           var client = new HTTPScriptable(url);
           
           //Request Parameter data required for tokens
           client.addRequestParameter("client_id", clientId);
           client.addRequestParameter("client_secret", clientSecret);
           client.addRequestParameter("code", auth_code);

           //Set Header details
           client.setHeader('Content-Type',"application/x-www-form-urlencoded");
           client.setHeader('Accept',"application/json");

           
           //console.log(client);
           
           var getAuthResponse = client.post();
           //console.log("Response:\n" + getAuthResponse.getResponseBody());
           var responseObject = JSON.parse(getAuthResponse.getResponseBody());

           token.push(responseObject);
      
           //console.log("API Token: " + token);
           //return tokenDetails;
           return responseObject;
      
       
    },
    
    className: "cloverOauthUtils"
});
module.exports = cloverOauthUtils;