import React from 'react';
import { Platform, StatusBar, StatusBarStyle, View, ViewProps } from 'react-native';

interface ComponentProps {
	currentTheme: ThemeKey;
}

export type DynamicStatusBarProps = ThemedComponentProps & ViewProps & ComponentProps;

class DynamicStatusBarComponent extends React.Component<DynamicStatusBarProps> {
	public render(): React.ReactNode {
		const { themedStyle } = this.props;

		const androidStatusBarBgColor: string = themedStyle.container.backgroundColor;
		const barStyle: StatusBarStyle = this.getStatusBarContent();

		return (
			<View style={themedStyle.container}>
				<StatusBar backgroundColor={androidStatusBarBgColor} barStyle={barStyle} />
			</View>
		);
	}

	private getStatusBarContent = (): StatusBarStyle => {
		if (this.props.currentTheme === 'Eva Light') {
			return 'dark-content';
		} else {
			return 'light-content';
		}
	};
}

export const DynamicStatusBar = withStyles(DynamicStatusBarComponent, (theme: ThemeType) => ({
	container: {
		backgroundColor: theme['background-basic-color-1'],
		height: Platform.select({
			ios: Constants.statusBarHeight,
			android: 0,
		}),
	},
}));
