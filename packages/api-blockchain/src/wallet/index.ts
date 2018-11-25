import { eos } from '../api';

export default (config: { [prop: string]: any }) => ({
	balance: (accountName: string) =>
		new Promise((reject, resolve) => {
			eos(config).getCurrencyBalance(config.contractName, accountName, (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		}),
	currencyStatus: (symbol: string, contractName: string) =>
		new Promise((reject, resolve) => {
			eos(config).getCurrencyStats(contractName, symbol, (err: any, res: any) => {
				if (err) {
					reject(err);
				}
				resolve(res);
			});
		}),
	createToken: async (amountNsymbol: string, to: string, memo: string = '') => {
		await eos(config).transaction('eosio.token', (acc: any) => {
			// Create the initial token with its max supply
			// const options = {authorization: 'acc', broadcast: true, sign: true} // default
			// OR const options = [{"actor":"eosio.token","permission":"active"}] //default (API log)
			// according to eosio_token.json no arg reserved for 'name'
			acc.create('eosio.token', amountNsymbol); // , options)

			// Issue some of the max supply for circulation into an arbitrary account
			acc.issue('eosio.token', amountNsymbol, 'issue');
			acc.transfer('eosio.token', to, amountNsymbol, memo);
		}); // }, options)
		const balance = await eos(config).getCurrencyBalance('eosio.token', to);
		console.log(`currency balance ${to}: `, balance);
		const balance2 = await eos(config).getCurrencyBalance('eosio.token', 'eosio.token');
		console.log('currency balance eosio.token: ', balance2);
	},
});
