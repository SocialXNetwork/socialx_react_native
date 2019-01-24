import * as React from 'react';
import { Keyboard, View } from 'react-native';

import { InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../';
import { Colors } from '../../environment/theme';

interface ISearchInputProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	reference?: React.RefObject<PrimaryTextInput>;
	onChangeText: (term: string) => void;
	onPressCancel?: () => void;
}

export const SearchInput: React.SFC<ISearchInputProps> = ({
	cancel,
	term,
	autoFocus,
	reference,
	onChangeText,
	onPressCancel,
}) => (
	<PrimaryTextInput
		ref={reference}
		value={term}
		placeholder="Search"
		icon="ios-search"
		size={InputSizes.Small}
		borderColor={Colors.transparent}
		iconColor={Colors.cadetBlue}
		returnKeyType={TRKeyboardKeys.done}
		canCancel={cancel}
		persistCancel={cancel}
		cancelButtonTextColor={Colors.paleSky}
		autoFocus={autoFocus}
		onChangeText={onChangeText}
		onSubmitPressed={Keyboard.dismiss}
		onPressCancel={onPressCancel}
	/>
);
