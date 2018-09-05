import {ActionSheet} from 'native-base';
import * as React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {LayoutEvent, NavigationScreenProp} from 'react-navigation';
import {compose} from 'recompose';

import {updateTabBarBottomHeight} from 'backend/actions';
import {getMyNotificationsHoc} from 'backend/graphql';
import {connect} from 'react-redux';
import {Icons, Sizes} from 'theme';
import {IAppUIStateProps} from 'types';
import {
	getCameraMediaObjectMultiple,
	getGalleryMediaObjectMultiple,
	getOptimizedMediaObject,
	IWithTranslationProps,
	PickerImageMultiple,
	withTranslations,
} from 'utilities';
import style from './style';

export enum MENU_BUTTON_TYPE {
	MENU_BUTTON_SIMPLE = 'MENU_BUTTON_SIMPLE',
	MENU_BUTTON_CAMERA = 'MENU_BUTTON_CAMERA',
	MENU_BUTTON_NOTIFICATIONS = 'MENU_BUTTON_NOTIFICATIONS',
}

interface TabMenuItem {
	screenName?: string;
	image: number;
	imageSelected?: number;
	style: {
		width: number;
		height: number;
	};
	type: MENU_BUTTON_TYPE;
}

const MENU_ITEMS: TabMenuItem[] = [
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
		image: Icons.iconTabBarPhoto,
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

interface ITabBarBottomState {
	selectedTab: string;
	changeInProgress: boolean;
}

interface ITabBarBottomProps extends IAppUIStateProps, IWithTranslationProps {
	navigation: NavigationScreenProp<any>;
	TabBarBottomHeight: (height: number) => void;
	notifications: any;
}

class TabBarBottomComponent extends React.Component<ITabBarBottomProps, ITabBarBottomState> {
	public state: any = {
		selectedTab: MENU_ITEMS[0].screenName,
		changeInProgress: false,
	};

	public render() {
		return (
			<SafeAreaView style={style.container} onLayout={this.layoutHandler}>
				{MENU_ITEMS.map((menuItem, index) => this.getMenuItemComponent(menuItem, index))}
			</SafeAreaView>
		);
	}

	private layoutHandler = (event: LayoutEvent) => {
		const viewHeight = event.nativeEvent.layout.height;
		this.props.TabBarBottomHeight(viewHeight);
	};

	private getMenuItemComponent = (menuItem: TabMenuItem, index: number) => {
		if (menuItem.type === MENU_BUTTON_TYPE.MENU_BUTTON_CAMERA) {
			return (
				<View style={style.menuItemContainer} key={index}>
					<TouchableOpacity onPress={this.showPhotoOptionsMenu}>
						<View style={style.imageContainer}>
							<Image source={menuItem.image} resizeMode={'contain'} style={menuItem.style} />
						</View>
					</TouchableOpacity>
				</View>
			);
		} else if (menuItem.type === MENU_BUTTON_TYPE.MENU_BUTTON_NOTIFICATIONS) {
			return (
				<View style={style.menuItemContainer} key={index}>
					{this.renderNotificationsIconWithBadge(menuItem)}
				</View>
			);
		} else {
			return (
				<View style={style.menuItemContainer} key={index}>
					{this.renderSimpleTabButton(menuItem)}
				</View>
			);
		}
	};

	private renderSimpleTabButton = (menuItem: TabMenuItem) => {
		const tabIsSelected = this.state.selectedTab === menuItem.screenName;
		return (
			<TouchableWithoutFeedback onPress={() => this.handleTabChange(menuItem.screenName)}>
				<View style={style.imageContainer}>
					<Image
						source={menuItem.image}
						resizeMode={'contain'}
						style={[menuItem.style, {opacity: tabIsSelected ? 0 : 1}]}
					/>
					<Image
						source={menuItem.imageSelected}
						resizeMode={'contain'}
						style={[menuItem.style, style.imageSelected, {opacity: tabIsSelected ? 1 : 0}]}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	private renderNotificationsIconWithBadge = (menuItem: TabMenuItem) => {
		const {notifications} = this.props;
		const {myNotifications, loading} = notifications;

		const notificationsRender = () => {
			if (!myNotifications) {
				return <View />;
			}
			return (
				myNotifications.length > 0 && (
					<View style={style.badgeBackground}>
						<Text style={style.notificationBadge}>{myNotifications.length.toString()}</Text>
					</View>
				)
			);
		};

		return (
			<View style={style.notificationsContainer}>
				{this.renderSimpleTabButton(menuItem)}
				{!loading && notificationsRender()}
			</View>
		);
	};

	private handleTabChange = (screenName: string) => {
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
		const {getText} = this.props;
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
				let selectedMediaObjects: PickerImageMultiple = [];
				if (buttonIndex === 0) {
					selectedMediaObjects = await getGalleryMediaObjectMultiple();
				} else if (buttonIndex === 1) {
					selectedMediaObjects = await getCameraMediaObjectMultiple();
				}
				console.log('selectedMediaObjects', selectedMediaObjects);
				if (selectedMediaObjects.length > 0) {
					const optimizedMediaObjects = await Promise.all(
						selectedMediaObjects.map(async (mObject) => getOptimizedMediaObject(mObject)),
					);
					this.props.navigation.navigate('PhotoScreen', {mediaObjects: optimizedMediaObjects});
				}
			},
		);
	};
}

const MapDispatchToProps = (dispatch: any) => ({
	TabBarBottomHeight: (height: number) => dispatch(updateTabBarBottomHeight(height)),
});

const mapStateToProps: any = (state: any): IAppUIStateProps => ({
	...state.appUI,
});

const notificationsWrapper = getMyNotificationsHoc(TabBarBottomComponent);

export const TabBarBottom = compose(
	connect(
		mapStateToProps,
		MapDispatchToProps,
	),
	withTranslations,
)(notificationsWrapper);
