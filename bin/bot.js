#!/usr/bin/env node

'use strict';

/**
 * TimeBot launcher script.
 *
 * Adapted from the following tutorial:
 *   https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
 */

var TimeBot = require('../lib/timebot');

/**
 * Environment variables used to configure the bot:
 *
 *  BOT_API_KEY : the authentication token to allow the bot to connect to your slack organization.
 *    You can get your token at the following url:
 *      https://<yourorganization>.slack.com/services/new/bot (Mandatory)
 *  BOT_NAME: the username you want to give to the bot within your organization.
 */
var token = process.env.BOT_API_KEY || require('../token');
var name = process.env.BOT_NAME;


var timebot = new TimeBot({
    token: token,
    name: name
});

timebot.run();
