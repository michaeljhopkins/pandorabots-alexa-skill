var alexa      = require('alexa-app'),
    ssml       = require('ssml'),
    QS         = require("querystring"),
    Pandorabot = require('pb-node'),
    config     = require('config');

var pboptions = {
  url: config.get('Pb.url'),
  app_id: config.get('Pb.app_id'),
  user_key: config.get('Pb.user_key'),
  botname: config.get('Pb.botname'),
}
var bot = new Pandorabot(pboptions);
var app = new alexa.app();

/**
 * LaunchRequest.
 */
app.launch(function(request,response) {
	response.say('Hey there fancy pants!');
	response.card("Hey there fancy pants!","This is an example card");
});


/**
 * IntentRequest.
 */
app.intent('phrase',
  {
    'slots' : {'phrase': 'LITERAL'},
    'utterances': ['{How is your day going?|Hello|Are you a chatbot?|My name is Michael}']
  },
  function(request,response) {
    var phrase = request.slot('phrase');
    var pbdata = QS.stringify({input: phrase});
    bot.talk(pbData,function(err,res){
    	if(!err){
    		console.log(res);
		    response.say(res);
		    response.shouldEndSession(true);
		    response.send();
    	}
    });
  }
);

/**
 * Error handler for any thrown errors.
 */
app.error = function(exception, request, response) {
    response.say('Sorry, something bad happened');
};

// Connect to lambda
exports.handler = app.lambda();
