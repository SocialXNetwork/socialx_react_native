import { NavigationActions, NavigationScreenProp, StackActions } from 'react-navigation';

export const resetNavigationToRoute = (
	routeName: string,
	navigation: NavigationScreenProp<any>,
) => {
	const navigate = NavigationActions.navigate({ routeName });
	const reset = StackActions.reset({
		index: 0,
		actions: [navigate],
		key: null,
	});

	navigation.dispatch(reset);
};
