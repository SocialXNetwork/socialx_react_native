// oh po'r soul, wherefore art thee wand'ring this f'rbidden landeth
if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
  global.process = require('process')
} else {
  const bProcess = require('process')
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p]
    }
  }
}

process.browser = false
if (typeof Buffer === 'undefined') global.Buffer = require('buffer').Buffer

const isDev = typeof __DEV__ === 'boolean' && __DEV__
process.env['NODE_ENV'] = isDev ? 'development' : 'production'
if (typeof localStorage !== 'undefined') {
  localStorage.debug = isDev ? '*' : ''
}

// Needed so that 'stream-http' and gun chooses the right default protocol.
global.location = {
  protocol: 'file:',
  host: '',
};

// const { randomBytes } = require('react-native-randombytes');
const { TextEncoder, TextDecoder } = require('text-encoding');
const crypto = require('crypto');

global.crypto = {
  ...crypto,
  subtle: {},
  TextEncoder,
  TextDecoder,
};