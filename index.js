
const isDisabled = (process.env.NODE_ENV === 'production');

const defaultLogger = console.log;
const errorLogger = console.error;
const warningLogger = console.warn;

const timestamp = function() {
  var date = new Date(),
    str = date.toISOString();
  return str;
}

const createMsgArray = function(msgs, args) {
  while(args.length) {
      msgs.push([].shift.call(args));
  }
}

const prepMsgs = function(msgs, type) {
  let prefixString = '[ '+ timestamp() +' ] : ';
  let suffixString = '';
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

const writeToFile = function(msgs, metaObject) {
  const logObj = {
    timestamp: timestamp(),
    info: msgs,
    meta: metaObject
  };
}

const c = function(metaObject) {
  if (typeof metaObject === 'object' || typeof metaObject === 'string') {
    return {
      log: function() {
        let msgs = [];
        createMsgArray(msgs, arguments);
        writeToFile(msgs, metaObject);
        prepMsgs(msgs, 'log');
        if (!isDisabled) {
          defaultLogger.apply(console, msgs);
        }
      },
      error: function() {
        let msgs = [];
        createMsgArray(msgs, arguments);
        writeToFile(msgs, metaObject);
        prepMsgs(msgs, 'log');
        if (!isDisabled)
          defaultLogger.apply(console, msgs);
      },
      warn: function() {
        let msgs = [];
        createMsgArray(msgs, arguments);
        writeToFile(msgs, metaObject);
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
