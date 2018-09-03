import {Platform} from 'react-native';
import {IosType} from '../consts';

export const Metrics = {
	navBarHeight: Platform.OS === IosType ? 54 : 47, // not very reliable should be done else!
};
