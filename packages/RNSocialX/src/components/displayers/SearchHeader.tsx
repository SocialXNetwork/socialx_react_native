import React, { Component, RefObject } from 'react';
import { Keyboard, Platform, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';

import { InputSizes, PrimaryTextInput, TRKeyboardKeys } from '../';
import { OS_TYPES, SCREENS } from '../../environment/consts';
import styles, { colors } from './SearchHeader.style';

interface ISearchHeaderProps {
	navigation: NavigationScreenProp<any>;
	cancel: boolean;
	onSearchTermChange?: (term: string) => void;
	searchTermValue?: string;
	autoFocus?: boolean;
}

interface ISearchHeaderState {
	searchTerm: string;
	navigatedFromTrending: boolean;
}

export class SearchHeader extends Component<ISearchHeaderProps, ISearchHeaderState> {
	public static defaultProps = {
		cancel: false,
		autoFocus: false,
	};

	public state = {
		searchTerm: '',
		navigatedFromTrending: false,
	};

	private inputRef: RefObject<PrimaryTextInput> = React.createRef();

	public componentDidUpdate() {
		if (this.inputRef.current && this.props.cancel && !this.state.navigatedFromTrending) {
			this.inputRef.current.focusInput();
			this.setState({ navigatedFromTrending: true });
		}

		if (!this.props.cancel && this.state.navigatedFromTrending) {
			this.setState({ navigatedFromTrending: false });
		}
	}

	public render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					{this.props.cancel &&
						Platform.OS === OS_TYPES.Android && (
							<TouchableOpacity onPress={this.onBackHandler}>
								<Icon name="md-arrow-back" style={styles.backIcon} />
							</TouchableOpacity>
						)}
					<View style={{ flex: 1 }}>
						<PrimaryTextInput
							ref={this.inputRef}
							value={
								this.props.searchTermValue ? this.props.searchTermValue : this.state.searchTerm
							}
							onChangeText={this.searchInputUpdated}
							onSubmitPressed={Keyboard.dismiss}
							placeholder="Search"
							icon="ios-search"
							size={InputSizes.Small}
							borderColor={colors.border}
							iconColor={colors.icon}
							returnKeyType={TRKeyboardKeys.done}
							canCancel={true}
							persistCancel={this.props.cancel}
							onPressCancel={this.onBackHandler}
							cancelButtonTextColor={colors.iosInputCancel}
							autoFocus={this.props.autoFocus}
						/>

						{!this.props.cancel ? (
							<TouchableOpacity
								activeOpacity={1}
								onPress={this.onPressInput}
								style={styles.inputOverlay}
							/>
						) : null}
					</View>
				</View>
			</SafeAreaView>
		);
	}

	private searchInputUpdated = (term: string) => {
		if (this.props.onSearchTermChange) {
			this.props.onSearchTermChange(term);
		} else {
			this.setState({
				searchTerm: term,
			});
		}
	};

	private onPressInput = () => {
		// TODO: check how this works!
		const { navigation } = this.props;
		if (navigation.state.routeName === SCREENS.Trending) {
			navigation.navigate(SCREENS.TabbedSearch);
		}
	};

	private onBackHandler = () => {
		const { navigation } = this.props;
		this.setState({ searchTerm: '' }, () => {
			Keyboard.dismiss();
			navigation.goBack();
		});
	};
}
