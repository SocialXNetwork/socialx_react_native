import * as React from 'react';
import { Image, ImageStyle, Text, TouchableOpacity, View } from 'react-native';

import { IMAGE_PICKER_TYPES, SCREENS, TABS } from '../../environment/consts';
import { Icons } from '../../environment/theme';
import {
	IDictionary,
	INavigationParamsActions,
	INavigationProps,
	IOptionsMenuProps,
} from '../../types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IPickerImageMultiple,
} from '../../utilities';

import styles from './TabIcon.style';

interface IProps
	extends IOptionsMenuProps,
		INavigationProps,
		INavigationParamsActions,
		IDictionary {
	focused: boolean;
	notifications: number;
}

export class TabIcon extends React.Component<IProps> {
	public render() {
		const { navigation, focused, notifications } = this.props;

		return (
			<View style={styles.container}>
				{this.getIcon(navigation.state.routeName, focused, notifications)}
			</View>
		);
	}

	private getIcon = (routeName: string, focused: boolean, notifications: number) => {
		let icon;
		switch (routeName) {
			case TABS.Feed:
				icon = (
					<Image
						source={focused ? Icons.tabs.home.selected : Icons.tabs.home.normal}
						resizeMode="contain"
						style={styles.icon as ImageStyle}
					/>
				);
				break;
			case TABS.Search:
				icon = (
					<Image
						source={focused ? Icons.tabs.search.selected : Icons.tabs.search.normal}
						resizeMode="contain"
						style={styles.icon as ImageStyle}
					/>
				);
				break;
			case TABS.Notifications:
				icon = (
					<React.Fragment>
						<Image
							source={focused ? Icons.tabs.notifications.selected : Icons.tabs.notifications.normal}
							resizeMode="contain"
							style={styles.icon as ImageStyle}
						/>
						{notifications > 0 ? (
							<View style={styles.background}>
								<Text style={styles.badge}>{notifications}</Text>
							</View>
						) : (
							<View />
						)}
					</React.Fragment>
				);
				break;
			case TABS.Profile:
				icon = (
					<Image
						source={focused ? Icons.tabs.profile.selected : Icons.tabs.profile.normal}
						resizeMode="contain"
						style={styles.icon as ImageStyle}
					/>
				);
				break;
			default:
				icon = (
					<TouchableOpacity activeOpacity={1} onPress={this.showPhotoOptionsMenu}>
						<Image
							source={Icons.tabs.photo.normal}
							resizeMode="contain"
							style={styles.icon as ImageStyle}
						/>
					</TouchableOpacity>
				);
				break;
		}

		return icon;
	};

	private showPhotoOptionsMenu = () => {
		const { dictionary, showOptionsMenu } = this.props;

		const items = [
			{
				label: dictionary.components.modals.options.gallery,
				icon: Icons.gallery,
				actionHandler: () => this.onSelectOption(IMAGE_PICKER_TYPES.Gallery),
			},
			{
				label: dictionary.components.modals.options.camera,
				icon: Icons.camera,
				actionHandler: () => this.onSelectOption(IMAGE_PICKER_TYPES.Camera),
			},
		];

		showOptionsMenu(items);
	};

	private onSelectOption = async (source: IMAGE_PICKER_TYPES) => {
		const { navigation, setNavigationParams } = this.props;

		let selectedmedia: IPickerImageMultiple = [];
		if (source === IMAGE_PICKER_TYPES.Gallery) {
			selectedmedia = await getGalleryMediaObjectMultiple();
		} else if (source === IMAGE_PICKER_TYPES.Camera) {
			selectedmedia = await getCameraMediaObjectMultiple();
		}

		if (selectedmedia.length > 0) {
			const optimizedmedia = await Promise.all(
				selectedmedia.map(async (obj) => getOptimizedMediaObject(obj)),
			);
			setNavigationParams({
				screenName: SCREENS.Photo,
				params: { media: optimizedmedia },
			});
			navigation.navigate(SCREENS.Photo);
		}
	};
}
