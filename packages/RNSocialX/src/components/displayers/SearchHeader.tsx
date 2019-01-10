import * as React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { WithNavigationHandlers } from '../../enhancers/intermediary';

import { PrimaryTextInput, SearchInput } from '../';
import { OS_TYPES, SCREENS } from '../../environment/consts';
import { INavigationProps } from '../../types';
import styles from './SearchHeader.style';

interface ISearchHeaderProps extends INavigationProps {
	cancel: boolean;
	term?: string;
	autoFocus?: boolean;
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
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					{this.props.cancel && Platform.OS === OS_TYPES.Android && (
						<TouchableOpacity onPress={this.onBackHandler}>
							<Icon name="md-arrow-back" style={styles.backIcon} />
						</TouchableOpacity>
					)}
					<View style={styles.inputContainer}>
						<View style={{ flex: 1 }}>
							<SearchInput
								cancel={false}
								term={this.props.term}
								autoFocus={this.props.autoFocus}
								reference={this.inputRef}
								onChangeText={this.onChangeTextHandler}
								onPressCancel={this.onBackHandler}
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

	private onBackHandler = () => {
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
