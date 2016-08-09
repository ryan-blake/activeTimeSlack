'use strict';

var util = require('util');
var Bot = require('slackbots');

var dateActive = 0;
var activityDate = 0;

/**
 * Constructor function. It accepts a settings object which should contain the following keys:
 *    token : the API token of the bot (mandatory)
 *    name : the name of the bot (will default to "simplebot")
 *
 * @param {object} settings
 * @constructor
 */
var TimeBot = function Constructor(settings) {
  this.settings = settings;
  this.settings.name = this.settings.name || 'timebot';
};

// inherits methods and properties from the Bot constructor
util.inherits(TimeBot, Bot);

/**
 * Run the bot
 * @public
 */
TimeBot.prototype.run = function () {
  TimeBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
  this.on('presence_change', this._onPresenceChange);

};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
TimeBot.prototype._onStart = function () {
  this.postMessageToChannel('general', 'Hello channel!');

};



/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
TimeBot.prototype._onMessage = function (message) {
  console.log(message);
};

TimeBot.prototype.on('message', function(message) {
  if(message.type === "message") {
    var text = message.text;

    if (text === "activity") {
      var user = this._getUserById(message.user);
      var timestamp = parseInt(message.ts);
      var difference = Math.floor(timestamp - dateActive);

           activityDate = Math.floor(difference/1000/60/60/60);
           console.log("Got a message from " + user + ": " + text + " time is " + (Math.floor(difference / 60))+ " minutes");

    }
  }
});


TimeBot.prototype.on('message', function(message) {
  if(message.type === "presence_change") {
    var text = message.presence;

    if (text === "active") {
      var user = this._getUserById(message.user);
       dateActive = Math.floor(Date.now() / 1000);
      // var timestamp = parseInt(message.ts);
      // var pubDate = new Date(timestamp * 1000)


      console.log("Got a message from " + user + ", they have gone " + text + " at "+dateActive );

    } else if  ( text === "away" && dateActive != null ) {
      var user = this._getUserById(message.user);
       dateActive = 0;

      console.log( user + " has left from " );

      // presence_check

    } else {

      console.log("hello");
    }
  }
});




TimeBot.prototype._onPresenceChange = function (presence_change) {
if( message.type === "presence_change") {
  console.log("presence has changed.");
}
};

TimeBot.prototype.on('presence_change', function(presence_change) {
  if(presence_change.type === "presence_change") {
    var text = presence_change.presence;
    var user = this._getUserById(message.user);
    // var timestamp = parseInt(message.ts);
    // var pubDate = new Date(timestamp * 1000)

    console.log("Got a presence chg from " + user + "to " + text  );

  }

});



TimeBot.prototype._getUserById = function (userId) {
  var match = this.users.filter(function (item) {
    return item.id === userId;
  });

  return match.length > 0 ? match[0].name : "Unknown user";
};


module.exports = TimeBot;
