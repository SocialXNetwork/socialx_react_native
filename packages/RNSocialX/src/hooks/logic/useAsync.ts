import { DependencyList, useEffect } from 'react';
import useAsyncFn from './useAsyncFn';

export type AsyncState<T> =
	| {
			loading: true;
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

const useAsync = <T>(fn: () => Promise<T>, deps: DependencyList = []) => {
	const [state, callback] = useAsyncFn(fn, deps);

	useEffect(() => {
		callback();
	}, [callback]);

	return state;
};

export default useAsync;
