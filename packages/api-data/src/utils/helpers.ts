import {
	IContext,
	ILikesMetasCallback,
	IMetasCallback,
	IMetasTypeCallback,
} from '../types';

export const datePathFromDate = (date: Date) =>
	`${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;

export const setToArray = <T = {}>({
	_: parentSoul,
	...data
}: IMetasCallback | IMetasTypeCallback<T>) => {
	return Object.values(data).map(({ v, ...rest }: any) => {
		const { _: deepSoul, ...deepRest } = rest;
		return deepRest;
	});
};

export const setToArrayWithKey = ({ _: parentSoul, ...data }: any) => {
	return Object.entries(data).map(
		([k, v]): any => {
			const { _: deepSoul, ...deepRest }: any = v;
			return { ...deepRest, k };
		},
	) as any;
};

export const getContextMeta = (context: IContext) => ({
	owner: context.account.is.alias,
	timestamp: context.time().getTime(),
	ownerPub: context.account.is.pub,
});

export const resolveCallback = (resolve: any, reject: any) => (
	e: any,
	r: any,
) => {
	if (e) {
		reject(e);
	}
	resolve(r);
};
