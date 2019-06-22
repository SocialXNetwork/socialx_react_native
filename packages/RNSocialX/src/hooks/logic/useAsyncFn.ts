import { DependencyList, useCallback, useState } from 'react';
import useRefMounted from './useRefMounted';

export type AsyncState<T> =
	| {
			loading: boolean;
			error?: undefined;
			value?: undefined;
			// tslint:disable-next-line
	  }
	| {
			loading: false;
			error: Error;
			value?: undefined;
			// tslint:disable-next-line
	  }
	| {
			loading: false;
			error?: undefined;
			value: T;
			// tslint:disable-next-line
	  };

const useAsyncFn = <T>(
	fn: () => Promise<T>,
	deps: DependencyList = [],
): [AsyncState<T>, () => void] => {
	const [state, set] = useState<AsyncState<T>>({
		loading: false,
	});

	const mounted = useRefMounted();

	const callback = useCallback(() => {
		set({ loading: true });

		fn().then(
			(value) => {
				if (mounted.current) {
					set({ value, loading: false });
				}
			},
			(error) => {
				if (mounted.current) {
					set({ error, loading: false });
				}
			},
		);
	}, deps);

	return [state, callback];
};

export default useAsyncFn;
