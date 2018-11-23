const createTransaction = (
	api: { [prop: string]: any },
	expireInSeconds: number = 60,
): Promise<any> =>
	new Promise((resolve, reject) => {
		api.getInfo(
			checkError(reject, (info: { [prop: string]: any }) => {
				const chainDate = new Date(info.head_block_time + 'Z');

				api.getBlock(
					info.last_irreversible_block_num,
					checkError(reject, (block: { [prop: string]: any }) => {
						const expiration = new Date(chainDate.getTime() + expireInSeconds * 1000);

						// bitwise
						// tslint:disable-next-line
						const refBlockNumber = info.last_irreversible_block_num & 0xffff;

						const headers = {
							expiration: expiration.toISOString().split('.')[0],
							ref_block_num: refBlockNumber,
							ref_block_prefix: block.ref_block_prefix,
							net_usage_words: 0,
							max_cpu_usage_ms: 0,
							delay_sec: 0,
							context_free_actions: [],
							actions: [],
							signatures: [],
							transaction_extensions: [],
						};
						resolve(headers);
					}),
				);
			}),
		);
	});

const checkError = (parentErr: any, parrentRes: any) => (error: any, result: any) => {
	if (error) {
		parentErr(error);
	} else {
		parrentRes(result);
	}
};

const base: { [prop: string]: any } = {
	api: {
		createTransaction,
	},
};

export default base;
