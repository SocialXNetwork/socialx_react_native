import * as React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { HeaderButton, PrimaryTextInput, SearchInput } from '../';
import { SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import styles from './SearchHeader.style';

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
	back?: boolean;
	onSearchTermChange?: (term: string) => void;
	onCancelSearch?: () => void;
}

interface IProps extends ISearchHeaderProps {
	onGoBack: () => void;
}

interface IState {
	navigatedFromTrending: boolean;
}

class Component extends React.Component<IProps, IState> {
	public static defaultProps = {
		cancel: false,
		autoFocus: false,
	};

	public state = {
		navigatedFromTrending: false,
	};

	private inputRef: React.RefObject<PrimaryTextInput> = React.createRef();

	// public componentDidUpdate() {
	// 	if (this.inputRef.current && this.props.cancel && !this.state.navigatedFromTrending) {
	// 		this.inputRef.current.focusInput();
	// 		this.setState({ navigatedFromTrending: true });
	// 	}

	// 	if (!this.props.cancel && this.state.navigatedFromTrending) {
	// 		this.setState({ navigatedFromTrending: false });
	// 	}
	// }

	public render() {
		let inputContainer = [styles.inputContainer];
		if (this.props.back) {
			inputContainer = [styles.inputContainer, styles.spacing];
		}

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.inner}>
						{this.props.back && (
							<View style={styles.backButton}>
								<HeaderButton
									iconName={Platform.select({
										android: 'md-arrow-back',
										ios: 'ios-arrow-back',
									})}
									onPress={this.props.onGoBack}
								/>
							</View>
						)}
						<View style={inputContainer}>
							<SearchInput
								cancel={false}
								term={this.props.term}
								autoFocus={this.props.autoFocus}
								reference={this.inputRef}
								onChangeText={this.onChangeTextHandler}
								onPressCancel={this.onCancelHandler}
							/>
						</View>
						{!this.props.cancel ? (
							<TouchableOpacity
								activeOpacity={1}
								onPress={this.onInputPressHandler}
								style={styles.inputOverlay}
							/>
						) : null}
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
	};

	private onCancelHandler = () => {
		// this.props.onGoBack();
		if (this.props.onCancelSearch) {
			this.props.onCancelSearch();
		}
	};
}

export const SearchHeader: React.SFC<ISearchHeaderProps> = (props) => (
	<WithNavigationHandlers navigation={props.navigation}>
		{({ actions }) => <Component {...props} onGoBack={actions.onGoBack} />}
	</WithNavigationHandlers>
);
