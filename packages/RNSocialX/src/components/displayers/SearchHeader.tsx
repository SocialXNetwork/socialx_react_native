import * as React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { HeaderButton, SearchInput } from '../';
import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import styles from './SearchHeader.style';

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	back?: boolean;
	overlay?: boolean;
	onSearchTermChange?: (term: string) => void;
	onCancelSearch?: () => void;
}

interface IProps extends ISearchHeaderProps {
	onGoBack: () => void;
}

class Component extends React.Component<IProps> {
	public render() {
		const { back, term, cancel, autoFocus, overlay, onGoBack } = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.inner}>
					{back && (
						<View style={styles.backButton}>
							<HeaderButton
								iconName={Platform.select({
									android: 'md-arrow-back',
									ios: 'ios-arrow-back',
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

		if (navigation.state.routeName === SCREENS.Messages) {
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
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => <Component {...props} onGoBack={actions.onGoBack} />}
	</WithNavigationHandlers>
);
