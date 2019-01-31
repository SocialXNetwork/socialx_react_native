import * as React from 'react';
import { Animated, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { HeaderButton, SearchInput } from '../';
import { OS_TYPES, SCREENS } from '../../environment/consts';
import { Icons } from '../../environment/theme';
import { INavigationProps } from '../../types';
import styles from './SearchHeader.style';

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	back?: boolean;
	overlay?: boolean;
	scrollY?: Animated.Value;
	scrollThreshold?: number;
	minimumScrollDistance?: number;
	onSearchTermChange?: (term: string) => void;
	onCancelSearch?: () => void;
}

interface IProps extends ISearchHeaderProps {
	onGoBack: () => void;
}

class Component extends React.PureComponent<IProps> {
	public render() {
		const {
			back,
			term,
			cancel,
			autoFocus,
			overlay,
			scrollY,
			minimumScrollDistance,
			scrollThreshold,
			onGoBack,
		} = this.props;

		let opacity: number | any = 1;
		let Container = View;

		if (scrollY && minimumScrollDistance && scrollThreshold) {
			Container = Animated.View;

			if (Platform.OS === OS_TYPES.IOS) {
				const distance = scrollY.interpolate({
					inputRange: [minimumScrollDistance, minimumScrollDistance + scrollThreshold],
					outputRange: [0, scrollThreshold],
					extrapolateLeft: 'clamp',
				});

				opacity = distance.interpolate({
					inputRange: [0, scrollThreshold / 3, scrollThreshold],
					outputRange: [1, 0.3, 0],
					extrapolate: 'clamp',
				});
			} else if (Platform.OS === OS_TYPES.Android) {
				opacity = Animated.diffClamp(scrollY, 0, 1).interpolate({
					inputRange: [0, 1 / 3, 1],
					outputRange: [1, 0.3, 0],
					extrapolate: 'clamp',
				});
			}
		}

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.inner}>
					{back && (
						<Container style={[styles.backButton, { opacity }]}>
							<HeaderButton
								iconName={Platform.select({
									android: Icons.backArrow.android,
									ios: Icons.backArrow.ios,
								})}
								onPress={onGoBack}
							/>
						</Container>
					)}
					<Container style={[styles.inputContainer, { opacity }]}>
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
					</Container>
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
