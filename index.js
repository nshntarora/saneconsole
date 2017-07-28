var fileUtils = require('./utils');

var isDisabled = (process.env.NODE_ENV === 'production');

var defaultLogger = console.log;
var errorLogger = console.error;
var warningLogger = console.warn;

var timestamp = function() {
  var date = new Date(),
    str = date.toISOString();
  return str;
}

var createMsgArray = function(msgs, args) {
  while(args.length) {
      msgs.push([].shift.call(args));
  }
}

var prepMsgs = function(msgs, type) {
  var prefixString = '[ '+ timestamp() +' ] : ';
  var suffixString = '';
  if (type === 'error') {
    prefixString = 'ERROR: ' + prefixString
  } else if (type === 'warn') {
    prefixString = 'WARN: ' + prefixString
  } else {
    prefixString = 'DEBUG: ' + prefixString
  }
  msgs.splice(0, 0, prefixString);
  msgs.push(suffixString);
}

var writeToFile = function(msgs, metaObject) {
  var logObj = {
    timestamp: timestamp(),
    info: msgs,
    meta: metaObject
  };
  fileUtils.write(logObj);
}

var c = function(metaObject, isWeb) {
  if (typeof metaObject === 'object' || typeof metaObject === 'string') {
    return {
      log: function() {
        var msgs = [];
        createMsgArray(msgs, arguments);
        if (!isWeb) writeToFile(msgs, metaObject);
        prepMsgs(msgs, 'log');
        if (!isDisabled) {
          defaultLogger.apply(console, msgs);
        }
      },
      error: function() {
        var msgs = [];
        createMsgArray(msgs, arguments);
        if (!isWeb) writeToFile(msgs, metaObject);
        prepMsgs(msgs, 'log');
        if (!isDisabled)
          defaultLogger.apply(console, msgs);
      },
      warn: function() {
        var msgs = [];
        createMsgArray(msgs, arguments);
        if (!isWeb) writeToFile(msgs, metaObject);
        prepMsgs(msgs, 'log');
        if (!isDisabled)
          defaultLogger.apply(console, msgs);
      }
    }
  } else {
    throw new Error('NOTOBJECTSTRING: The meta info should be an object or a string');
  }
};

module.exports = c;
