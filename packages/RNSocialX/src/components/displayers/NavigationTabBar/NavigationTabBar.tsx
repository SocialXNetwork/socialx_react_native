import { ActionSheet } from 'native-base';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { LayoutEvent, NavigationScreenProp } from 'react-navigation';

import { SCREENS } from '../../../environment/consts';
import { INavigationParamsActions, ITranslatedProps } from '../../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImage,
	IPickerImageMultiple,
} from '../../../utilities';
import { NavigationItems } from './';

const INITIAL_SCREEN = SCREENS.UserFeed;

interface ITabBarBottomState {
	selectedTab: string;
	changeInProgress: boolean;
}

interface ITabBarBottomProps
	extends ITranslatedProps,
		INavigationParamsActions {
	navigation: NavigationScreenProp<any>;
	updateTabBarHeight: (value: number) => void;
	notifications: number;
}

export class NavigationTabBar extends React.Component<
	ITabBarBottomProps,
	ITabBarBottomState
> {
	public static defaultProps = {
		updateTabBarHeight: () => {
			/**/
		},
		notifications: 0,
	};

	public state = {
		selectedTab: INITIAL_SCREEN,
		changeInProgress: false,
	};

	public render() {
		return (
			<SafeAreaView onLayout={this.layoutHandler}>
				<NavigationItems
					notifications={this.props.notifications}
					selectedTab={this.state.selectedTab}
					showPhotoOptionsMenu={this.showPhotoOptionsMenu}
					tabChange={this.tabChangeHandler}
				/>
			</SafeAreaView>
		);
	}

	private layoutHandler = (event: LayoutEvent) => {
		const viewHeight = event.nativeEvent.layout.height;
		this.props.updateTabBarHeight(viewHeight);
	};

	private tabChangeHandler = (screenName: string) => {
		if (this.state.selectedTab !== screenName && !this.state.changeInProgress) {
			const navSuccess = this.props.navigation.navigate(screenName);
			if (navSuccess) {
				this.setState({
					changeInProgress: true,
					selectedTab: screenName,
				});

				// no better solution here... just disable fast tab switching while sliding in progress
				setTimeout(() => {
					this.setState({
						changeInProgress: false,
					});
				}, 200);
			}
		}
	};

	private showPhotoOptionsMenu = () => {
		const { getText, navigation, setNavigationParams } = this.props;
		ActionSheet.show(
			{
				options: [
					getText('tab.bar.bottom.photo.picker.use.gallery'),
					getText('tab.bar.bottom.photo.picker.take.use.camera'),
					getText('button.CANCEL'),
				],
				cancelButtonIndex: 2,
				title: getText('tab.bar.bottom.photo.picker.title'),
			},
			async (buttonIndex: number) => {
				let selectedMediaObjects: IPickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}

				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mediaObject: IPickerImage) =>
							getOptimizedMediaObject(mediaObject),
						),
					);
					setNavigationParams({
						screenName: SCREENS.Photo,
						params: { mediaObjects: optimizedMediaObjects },
					});
					navigation.navigate(SCREENS.Photo);
				}
			},
		);
	};
}
