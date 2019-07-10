import { RefObject } from 'react';
import useHoverDirty from './useHoverDirty';
import useMouse, { IMouseState } from './useMouse';

export interface IUseMouseHoveredOptions {
	whenHovered?: boolean;
	bound?: boolean;
}

const nullRef = { current: null };

const useMouseHovered = (
	ref: RefObject<HTMLElement>,
	options: IUseMouseHoveredOptions = {},
): IMouseState => {
	const whenHovered = !!options.whenHovered;
	const bound = !!options.bound;

	const isHovered = useHoverDirty(ref, whenHovered);
	const state = useMouse(whenHovered && !isHovered ? nullRef : ref);

	if (bound) {
		state.elX = Math.max(0, Math.min(state.elX, state.elW));
		state.elY = Math.max(0, Math.min(state.elY, state.elH));
	}

	return state;
};

export default useMouseHovered;
