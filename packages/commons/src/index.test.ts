import {decodeBase64Text} from './index';

test('decodeBase64Text decodes string', () => {
	expect(decodeBase64Text('dGVzdA==')).toBe('test');
});
