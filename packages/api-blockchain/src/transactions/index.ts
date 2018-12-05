import { eos } from '../api';
import blockchain from '../blockchain';

export const toFloat = (str: string) => parseFloat(str.replace(/[^\d.-]/g, ''));

export default (config: { [prop: string]: any }) => ({
	transfer: async (
		from: string,
		to: string,
		quantity: string,
		memo: string = '',
		sign: boolean = true,
		broadcast: boolean = true,
	) => {
		const tr = await eos(config).transfer(from, to, quantity, memo, { broadcast, sign });
		console.log('created transaction: ', tr);
		return tr.transaction;
	},
	async transferSignPushTransaction(
		from: string,
		to: string,
		quantity: string,
		memo: string = '',
		sign: boolean = true,
		broadcast: boolean = true,
	) {
		const tr = await eos(config).transfer(from, to, quantity, memo, {
			broadcast: false,
			sign: false,
		});
		console.log('created unsigned tr: ', tr);
		const signedTr = await this.signTransaction(tr, from, to, quantity, memo);
		await this.pushTransaction(signedTr.transaction);
	},
	async getSignature(from: string, to: string, quantity: string, memo: string = '') {
		const tr = await eos(config).transfer(from, to, quantity, memo, { broadcast: false });
		console.log('created signature: ', tr.transaction.signatures[0]);
		return tr.transaction.signatures[0];
	},
	async signTransaction(
		tr: any,
		from: string,
		to: string,
		quantity: string,
		memo: string = '',
	): Promise<any> {
		return new Promise(async (reject, resolve) => {
			const sig = await this.getSignature(from, to, quantity, memo);
			tr.transaction.signatures.push(sig);
			resolve(tr);
		});
	},
	async pushTransaction(tr: any) {
		const pushed = await eos(config).pushTransaction(tr);
		console.log('broadcasted transaction: ', pushed);
	},
	getOutgoingTransactions(accountName: string): Promise<any[]> {
		return new Promise(async (reject, resolve) => {
			const trx: any[] = [];
			const actions = (await eos(config).getActions(accountName)).actions;
			actions.map((a: any) => {
				const { from, memo, quantity, to, payer, quant, receiver } = a.action_trace.act.data;
				const { bytes, stake_cpu_quantity, stake_net_quantity, transfer } = a.action_trace.act.data;
				const { name, data } = a.action_trace.act;

				let obj = {};
				if (name === 'transfer') {
					obj = {
						...obj,
						to,
						from,
						quantity: toFloat(quantity),
						memo,
					};
				} else if (name === 'buyram') {
					obj = { ...obj, payer, quant: toFloat(quant), receiver };
				} else if (name === 'buyrambytes') {
					obj = { ...obj, payer, receiver, bytes };
				} else if (name === 'delegatebw') {
					obj = {
						...obj,
						stake_cpu_quantity: toFloat(stake_cpu_quantity), // unit in EOS
						stake_net_quantity: toFloat(stake_net_quantity), // unit in EOS
						transfer,
					};
				} else if (name === 'newaccount') {
					obj = { ...obj, creator: data.creator, name: data.name, key: data.active.keys[0].key };
				} else {
					// https://eosio.stackexchange.com/questions/1831/getactionsaccountname-possible-names-actions-action-trace-act-name?noredirect=1#comment1698_1831
					// if not any of the mainly used transaction types, return whole object
					return actions;
				}

				obj = {
					...obj,
					transaction_ID: a.action_trace.trx_id,
					block_time: a.block_time,
					block_num: a.block_num,
					trx_type: name,
				};
				trx.push(obj);
				return a.action_trace.act;
			});

			resolve(trx);
		});
	},
	async getOutgoingTransactionsByHeight(accountName: string, height: number) {
		const result = await this.getOutgoingTransactions(accountName);
		if (!height) {
			console.log(`outgoing transactions of ${accountName}: `, result);
			return result;
		}
		// use 'height' to get all transactions above a specific block height
		const aboveHeight = result.filter((a) => a.block_num > height);
		console.log(`outgoing transactions of ${accountName} above block ${height}: `, aboveHeight);
		return aboveHeight;
	},
	getTransaction: (id: string, blockNumHint: number) =>
		new Promise(async (reject, resolve) => {
			const blockHeight: number = await blockchain(config).getBlockHeight();
			await eos(config).getTransaction(id, blockNumHint, (err: any, info: any) => {
				const res: any = {};
				if (err) {
					reject(err);
				}

				// tslint:disable-next-line
				for (const i in info.traces) {
					// tslint:disable-next-line
					for (const x in info.traces[i].act.authorization) {
						res.sender = info.traces[i].act.authorization[x].actor;
					}
					res.receiver = info.traces[i].receipt.receiver;
					res['smart contract owner'] = info.traces[i].act.account;
					res.message = info.traces[i].act.data.message;
					// full data object:
					// console.log('Transaction data', info.traces[i]);
				}
				res.status = info.trx.receipt.status;
				res['confirmation height'] = blockHeight - info.block_num;
				res['transaction in block'] = info.block_num;
				res['transaction time in block'] = info.block_time;
				resolve(res);
			});
		}),
	isTransactionExecuted: (id: string, blockNumHint: number) =>
		new Promise(async (reject, resolve) => {
			await eos(config).getTransaction(id, blockNumHint, (err: any, info: any) => {
				if (err) {
					reject(err);
				}
				resolve(info.trx.receipt.status === 'executed');
			});
		}),
});
