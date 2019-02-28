import React from 'react';
import { Animated, Platform, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { HeaderButton, SearchInput } from '../';
import { SCREENS } from '../../environment/consts';
import { Icons } from '../../environment/theme';
import { INavigationProps } from '../../types';

import styles from './SearchHeader.style';
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	back?: boolean;
	overlay?: boolean;
	opacity?: Animated.AnimatedInterpolation | number;
	translateY?: Animated.AnimatedInterpolation | number;
	onSearchTermChange?: (term: string) => void;
	onCancelSearch?: () => void;
}

interface IProps extends ISearchHeaderProps {
	onGoBack: () => void;
}

class Component extends React.PureComponent<IProps> {
	public render() {
		const { back, term, cancel, autoFocus, overlay, translateY, opacity, onGoBack } = this.props;

		if (opacity || translateY) {
			return (
				<AnimatedSafeAreaView
					style={[styles.floating, { transform: [{ translateY }] }] as ViewStyle}
				>
					<View style={styles.inner}>
						{back && (
							<Animated.View style={[styles.backButton, { opacity }] as ViewStyle}>
								<HeaderButton
									iconName={Platform.select({
										android: Icons.backArrow.android,
										ios: Icons.backArrow.ios,
									})}
									onPress={onGoBack}
								/>
							</Animated.View>
						)}
						<Animated.View style={[styles.inputContainer, { opacity }] as ViewStyle}>
							<SearchInput
								term={term}
								autoFocus={autoFocus}
								cancel={cancel}
								onChangeText={this.onChangeTextHandler}
								onPressCancel={this.onCancelHandler}
							/>
							{overlay && (
								<TouchableOpacity onPress={this.onInputPressHandler} style={styles.inputOverlay} />
							)}
						</Animated.View>
					</View>
				</AnimatedSafeAreaView>
			);
		}

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.inner}>
					{back && (
						<View style={styles.backButton}>
							<HeaderButton
								iconName={Platform.select({
									android: Icons.backArrow.android,
									ios: Icons.backArrow.ios,
								})}
								onPress={onGoBack}
							/>
						</View>
					)}
					<View style={styles.inputContainer}>
						<SearchInput
							term={term}
							autoFocus={autoFocus}
							cancel={cancel}
							onChangeText={this.onChangeTextHandler}
							onPressCancel={this.onCancelHandler}
						/>
						{overlay && (
							<TouchableOpacity onPress={this.onInputPressHandler} style={styles.inputOverlay} />
						)}
					</View>
				</View>
			</SafeAreaView>
		);
	}

	private onChangeTextHandler = (term: string) => {
		if (this.props.onSearchTermChange) {
			this.props.onSearchTermChange(term);
		}
	};

	private onInputPressHandler = () => {
		const { navigation } = this.props;

		if (navigation.state.routeName === SCREENS.Trending) {
			navigation.navigate(SCREENS.Search);
		}

		if (navigation.state.routeName === SCREENS.AllMessages) {
			navigation.navigate(SCREENS.ChatSearch);
		}
	};

	private onCancelHandler = () => {
		if (this.props.onCancelSearch) {
			this.props.onCancelSearch();
		}

		if (this.props.cancel) {
			this.props.onGoBack();
		}
	};
}

export const SearchHeader: React.SFC<ISearchHeaderProps> = (props) => (
	<WithNavigationHandlers>
		{({ actions }) => <Component {...props} onGoBack={actions.onGoBack} />}
	</WithNavigationHandlers>
);
