import * as React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Icons, Sizes} from '../../../environment/theme';
import {NotificationsWithBadge, TabButton} from './';
import styles from './NavigationItems.style';

export enum MENU_BUTTON_TYPE {
	MENU_BUTTON_SIMPLE = 'MENU_BUTTON_SIMPLE',
	MENU_BUTTON_CAMERA = 'MENU_BUTTON_CAMERA',
	MENU_BUTTON_NOTIFICATIONS = 'MENU_BUTTON_NOTIFICATIONS',
}

export interface ITabMenuItem {
	screenName: undefined | string;
	image: number;
	imageSelected: undefined | number;
	style: {
		width: number;
		height: number;
	};
	type: MENU_BUTTON_TYPE;
}

const MENU_ITEMS: ITabMenuItem[] = [
	{
		screenName: 'UserFeedTab',
		image: Icons.iconTabBarHome,
		imageSelected: Icons.iconTabBarHomeSelected,
		style: {
			width: Sizes.smartHorizontalScale(28),
			height: Sizes.smartHorizontalScale(28),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
	{
		screenName: 'SearchTab',
		image: Icons.iconTabBarSearch,
		imageSelected: Icons.iconTabBarSearchSelected,
		style: {
			width: Sizes.smartHorizontalScale(24),
			height: Sizes.smartHorizontalScale(24),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
	{
		screenName: undefined,
		image: Icons.iconTabBarPhoto,
		imageSelected: undefined,
		style: {
			width: Sizes.smartHorizontalScale(28),
			height: Sizes.smartHorizontalScale(26),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_CAMERA,
	},
	{
		screenName: 'NotificationsTab',
		image: Icons.iconTabBarNotifications,
		imageSelected: Icons.iconTabBarNotificationsSelected,
		style: {
			width: Sizes.smartHorizontalScale(26),
			height: Sizes.smartHorizontalScale(22),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_NOTIFICATIONS,
	},
	{
		screenName: 'MyProfileTab',
		image: Icons.iconTabBarProfile,
		imageSelected: Icons.iconTabBarProfileSelected,
		style: {
			width: Sizes.smartHorizontalScale(22),
			height: Sizes.smartHorizontalScale(24),
		},
		type: MENU_BUTTON_TYPE.MENU_BUTTON_SIMPLE,
	},
];

interface INavigationItemsProps {
	notifications: any;
	selectedTab: string;
	showPhotoOptionsMenu: () => void;
	tabChange: (tab: string) => void;
}

export const NavigationItems: React.SFC<INavigationItemsProps> = ({
	notifications,
	selectedTab,
	showPhotoOptionsMenu,
	tabChange,
}) => (
	<React.Fragment>
		{MENU_ITEMS.map((item, index) => {
			if (item.type === MENU_BUTTON_TYPE.MENU_BUTTON_CAMERA) {
				return (
					<View style={styles.menuItemContainer} key={index}>
						<TouchableOpacity onPress={showPhotoOptionsMenu}>
							<View style={styles.imageContainer}>
								<Image source={item.image} resizeMode={'contain'} style={item.style} />
							</View>
						</TouchableOpacity>
					</View>
				);
			} else if (item.type === MENU_BUTTON_TYPE.MENU_BUTTON_NOTIFICATIONS) {
				return (
					<View style={styles.menuItemContainer} key={index}>
						<NotificationsWithBadge
							item={item}
							notifications={notifications}
							selectedTab={selectedTab}
							tabChange={tabChange}
						/>
					</View>
				);
			} else {
				return (
					<View style={styles.menuItemContainer} key={index}>
						<TabButton item={item} selectedTab={selectedTab} tabChange={tabChange} />
					</View>
				);
			}
		})}
	</React.Fragment>
);
