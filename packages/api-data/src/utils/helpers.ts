import {
	IContext,
	ILikesMetasCallback,
	IMetasCallback,
	IMetasTypeCallback,
} from '../types';

export const datePathFromDate = (date: Date) =>
	`${date.getUTCFullYear()}.${date.getUTCMonth() + 1}.${date.getUTCDate()}`;

export const convertGunSetToArray = <T = {}>(
	args: IMetasCallback | IMetasTypeCallback<T> = {},
) => {
	const { _: parentSoul, ...data } = args;
	return Object.values(data || {}).map(
		({ _: deepSoul, ...deepRest }: any = {}) => deepRest,
	);
};

export const convertGunSetToArrayWithKey = (args: any = {}) => {
	const { _: parentSoul, ...data } = args;
	return Object.entries(data || {})
		.map(
			([k, v]): any => {
				if (!k || typeof v !== 'object') {
					return;
				}
				const { _: deepSoul, ...deepRest }: any = v;
				return { ...deepRest, k };
			},
		)
		.filter((v) => v !== undefined) as any;
};

export const getContextMeta = (context: IContext) => ({
	owner: context.account.is.alias,
	timestamp: context.time().getTime(),
	ownerPub: context.account.is.pub,
});

export const cleanGunMetaFromObject = (args: any = {}) => {
	const { _: parentSoul, ...data } = args;
	return data || {};
};

export const resolveCallback = (resolve: any, reject: any) => (
	e: any,
	r: any,
) => {
	if (e) {
		reject(e);
	}
	// We are doing this ugly thing here because objects in javascript are passed as
	// deep references it turns out gun internally mutates references everywhere
	// to leverage performance benefits, but this breaks redux and react in general
	// which expects state data to be immutable. Finally, we are doing it here
	// because this looks like the only place where all getters return their data
	// through. Not architecturally the best place, though.
	resolve(typeof r !== 'undefined' ? JSON.parse(JSON.stringify(r)) : undefined);
};
