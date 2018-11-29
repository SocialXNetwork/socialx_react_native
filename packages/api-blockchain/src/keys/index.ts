import { ecc, eos } from '../api';

import bip39 from 'bip39';

export default (config: { [prop: string]: any }) => ({
	generateMnemonic: (strength: number = 128, rng?: any, wordlist?: any) =>
		bip39.generateMnemonic(strength, rng, wordlist),
	deriveFromMnemonic: (mnemonic: any) => {
		const master = ecc.PrivateKey.fromSeed(mnemonic);
		const owner = master.getChildKey('owner');
		const active = owner.getChildKey('active');
		const masterPK = `PW${master.toWif()}`;
		const ownerPK = owner.toWif();
		const activePK = active.toWif();
		const ownerPub = owner.toPublic().toString();
		const activePub = active.toPublic().toString();
		console.log('master private key: ', masterPK);
		console.log('owner private key: ', ownerPK);
		console.log('owner public key: ', ownerPub);
		console.log('active private key: ', activePK);
		console.log('active public key: ', activePub);
		return {
			masterPK,
			privateKeys: {
				ownerPK,
				activePK,
			},
			publicKeys: {
				ownerPub,
				activePub,
			},
		};
	},
	genRandomPrivKey: (): Promise<string> => ecc.randomKey(),
	genRandomPrivKeyFromSeed: (seed: string) => ecc.seedPrivate(seed),
	fromPrivToPub: (priv: string) => ecc.privateToPublic(priv),
	isPubKeyValid: (pub: string) => ecc.isValidPublic(pub),
	isPrivKeyValid: (priv: string) => ecc.isValidPrivate(priv),
});
