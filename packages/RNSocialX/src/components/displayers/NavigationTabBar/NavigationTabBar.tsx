import * as React from 'react';
import { View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { SCREENS } from '../../../environment/consts';
import {
	IDotsMenuProps,
	INavigationParamsActions,
	ITranslatedProps,
} from '../../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
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
		INavigationParamsActions,
		IDotsMenuProps {
	navigation: NavigationScreenProp<any>;
	notifications: number;
}

export class NavigationTabBar extends React.Component<
	ITabBarBottomProps,
	ITabBarBottomState
> {
	public static defaultProps = {
		notifications: 0,
	};

	public state = {
		selectedTab: INITIAL_SCREEN,
		changeInProgress: false,
	};

	public render() {
		return (
			<View>
				<NavigationItems
					notifications={this.props.notifications}
					selectedTab={this.state.selectedTab}
					showPhotoOptionsMenu={this.showPhotoOptionsMenu}
					tabChange={this.tabChangeHandler}
				/>
			</View>
		);
	}

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
		const { showDotsMenuModal, getText } = this.props;
		const menuItems = [
			{
				label: getText('tab.bar.bottom.photo.picker.use.gallery'),
				icon: 'md-photos',
				actionHandler: () => this.continueWithSelectedPhotoOption('gallery'),
			},
			{
				label: getText('tab.bar.bottom.photo.picker.take.use.camera'),
				icon: 'md-camera',
				actionHandler: () => this.continueWithSelectedPhotoOption('photo'),
			},
		];
		showDotsMenuModal(menuItems);
	};

	private continueWithSelectedPhotoOption = async (
		source: 'gallery' | 'photo',
	) => {
		const { navigation, setNavigationParams } = this.props;
		let selectedMediaObjects: IPickerImageMultiple = [];
		if (source === 'gallery') {
			selectedMediaObjects = await getGalleryMediaObjectMultiple();
		} else if (source === 'photo') {
			selectedMediaObjects = await getCameraMediaObjectMultiple();
		}
		if (selectedMediaObjects.length > 0) {
			const optimizedMediaObjects = await Promise.all(
				selectedMediaObjects.map(async (mObject) =>
					getOptimizedMediaObject(mObject),
				),
			);
			setNavigationParams({
				screenName: SCREENS.Photo,
				params: { mediaObjects: optimizedMediaObjects },
			});
			navigation.navigate(SCREENS.Photo);
		}
	};
}
