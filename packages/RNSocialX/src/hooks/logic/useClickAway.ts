import { RefObject, useEffect } from 'react';
import { off, on } from './util';

const useClickAway = (
	ref: RefObject<HTMLElement | null>,
	onClickAway: (event: KeyboardEvent) => void,
) => {
	useEffect(() => {
		const handler = (event: any) => {
			const { current: el } = ref;
			// tslint:disable-next-line
			el && !el.contains(event.target) && onClickAway(event);
		};
		on(document, 'click', handler);
		return () => {
			off(document, 'click', handler);
		};
	});
};

export default useClickAway;
