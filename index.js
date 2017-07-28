
const isDisabled = (process.env.NODE_ENV === 'production');

const defaultLogger = console.log;
const errorLogger = console.error;
const warningLogger = console.warn;

const timestamp = function() {
  var date = new Date(),
    str = date.toUTCString();
  return str;
}

const prepMsgs = function(msgs, args, type) {
  let prefixString = '[ '+ timestamp() +' ] : ';
  let suffixString = '';
  if (type === 'error') {
    prefixString = 'ERROR: ' + prefixString
  } else if (type === 'warn') {
    prefixString = 'WARN: ' + prefixString
  } else {
    prefixString = 'DEBUG: ' + prefixString
  }
  while(args.length) {
      msgs.push(prefixString + [].shift.call(args) + suffixString);
  }
}

const c = {
  log: function() {
    let msgs = [];
    prepMsgs(msgs, arguments, 'log');
    if (!isDisabled)
      defaultLogger.apply(console, msgs);
  },
  error: function() {
    let msgs = [];
    prepMsgs(msgs, arguments, 'error');
    if (!isDisabled)
      defaultLogger.apply(console, msgs);
  },
  warn: function() {
    let msgs = [];
    prepMsgs(msgs, arguments, 'warn');
    if (!isDisabled)
      defaultLogger.apply(console, msgs);
  }
};

c.log('hello');
c.error('hello');
c.warn('hello');
