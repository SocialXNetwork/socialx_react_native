import {
	NavigationActions,
	NavigationScreenProp,
	StackActions,
} from 'react-navigation';

export const resetNavigationToRoute = (
	routeName: string,
	navigation: NavigationScreenProp<any>,
) => {
	const navAction = NavigationActions.navigate({ routeName });
	const resetAction = StackActions.reset({
		index: 0,
		actions: [navAction],
		key: null,
	});
	navigation.dispatch(resetAction);
};
