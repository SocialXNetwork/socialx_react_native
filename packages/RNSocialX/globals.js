// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');
global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';

// Needed so that 'stream-http' and gun chooses the right default protocol.
global.location = {
  protocol: 'file:',
  host: '',
};

const { randomBytes } = require('react-native-randombytes');
// const crypto = require('react-native-crypto');
// // const crypto = require('isomorphic-webcrypto');
const { TextEncoder, TextDecoder } = require('text-encoding');

// Patch the crypto into global so gun can handle the sea cryptography
global.crypto = {
  subtle: {},
  TextEncoder,
  TextDecoder,
  getRandomValues(byteArray) {
    randomBytes(byteArray);
  },
};