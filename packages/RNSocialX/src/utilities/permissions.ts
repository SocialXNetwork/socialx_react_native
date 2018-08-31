import {Permission, PermissionsAndroid, Platform} from 'react-native';
import {OS_TYPES} from '../environment/consts';

export async function requestResourcePermission(
	permission: Permission,
	title: string,
	message: string,
): Promise<boolean> {
	if (Platform.OS === OS_TYPES.Android) {
		try {
			const granted = await PermissionsAndroid.request(permission, {title, message});
			return granted === PermissionsAndroid.RESULTS.GRANTED;
		} catch (err) {
			return false;
		}
	} else {
		return true;
	}
}
