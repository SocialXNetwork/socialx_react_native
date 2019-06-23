import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
	const isInitialMount = useRef(true);

	useEffect(
		isInitialMount.current
			? () => {
					isInitialMount.current = false;
					// tslint:disable-next-line
			  }
			: effect,
		deps,
	);
};

export default useUpdateEffect;
