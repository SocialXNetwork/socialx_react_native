import * as React from 'react';
import { Animated, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { HeaderButton, SearchInput } from '../';
import { SCREENS } from '../../environment/consts';
import { Icons, Sizes } from '../../environment/theme';
import { INavigationProps } from '../../types';

import styles from './SearchHeader.style';
const THRESHOLD = Sizes.smartVerticalScale(45);

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	back?: boolean;
	overlay?: boolean;
	scrollY?: Animated.Value;
	onSearchTermChange?: (term: string) => void;
	onCancelSearch?: () => void;
}

interface IProps extends ISearchHeaderProps {
	onGoBack: () => void;
}

class Component extends React.PureComponent<IProps> {
	public render() {
		const { back, term, cancel, autoFocus, overlay, scrollY, onGoBack } = this.props;

		let height: number | any = THRESHOLD;
		let opacity: number | any = 1;
		let translateY: number | any = 0;
		let Container = View;

		if (scrollY) {
			Container = Animated.View;
			height = scrollY.interpolate({
				inputRange: [0, THRESHOLD],
				outputRange: [THRESHOLD, 0],
				extrapolate: 'clamp',
			});
			opacity = scrollY.interpolate({
				inputRange: [0, THRESHOLD / 3, THRESHOLD],
				outputRange: [1, 0.2, 0],
				extrapolate: 'clamp',
			});
			translateY = scrollY.interpolate({
				inputRange: [0, THRESHOLD],
				outputRange: [0, -THRESHOLD / 2],
				extrapolate: 'clamp',
			});
		}

		return (
			<SafeAreaView style={styles.container}>
				<Container style={[styles.inner, { height }]}>
					{back && (
						<Container style={[styles.backButton, { opacity, transform: [{ translateY }] }]}>
							<HeaderButton
								iconName={Platform.select({
									android: Icons.backArrow.android,
									ios: Icons.backArrow.ios,
								})}
								onPress={onGoBack}
							/>
						</Container>
					)}
					<Container style={[styles.inputContainer, { opacity, transform: [{ translateY }] }]}>
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
				</Container>
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
