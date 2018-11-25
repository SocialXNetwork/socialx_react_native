import { eos } from '../api';

export default (config: { [prop: string]: any }) => ({
	createAccountP: async (
		ownerPubKey: string,
		activePubKey: string,
		name: string,
		bytes: number = 8192,
		stakeNetQuantity: string = '10.0000 SYS',
		stakeCpuQuantity: string = '10.0000 SYS',
		transfer: number = 0,
	) => {
		const transaction = eos(config).transaction((tr: any) => {
			tr.newaccount({
				creator: config.owner,
				name,
				owner: ownerPubKey,
				active: activePubKey,
			});

			tr.buyrambytes({
				payer: config.owner,
				receiver: name,
				bytes,
			});

			tr.delegatebw({
				from: config.owner,
				receiver: name,
				stake_net_quantity: stakeNetQuantity,
				stake_cpu_quantity: stakeCpuQuantity,
				transfer,
			});
		});
		console.log('transaction', transaction);
		return transaction;
	},
	createAccountS: async (ownerPubKey: string, activePubKey: string, name: string) => {
		const transaction = eos(config).transaction((tr: any) => {
			tr.newaccount({
				creator: config.owner,
				name,
				owner: ownerPubKey,
				active: activePubKey,
			});
		});
		console.log('transaction', transaction);
		return transaction;
	},
});
