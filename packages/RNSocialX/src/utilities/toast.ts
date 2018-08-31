import {Toast} from 'native-base';

export const showToastMessage = (text: string, duration = 3000, position: 'top' | 'bottom' | 'center' = 'top') => {
	Toast.show({
		text,
		duration,
		position,
	});
};
