import * as React from 'react';
import {
	Image,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import { Sizes } from '../../../environment/theme';
import { ITabMenuItem } from './';

interface ITabButtonProps {
	item: ITabMenuItem;
	selectedTab: string;
	tabChange: (tab: string) => void;
}

export const TabButton: React.SFC<ITabButtonProps> = ({
	item,
	selectedTab,
	tabChange,
}) => {
	const isSelected = selectedTab === item.screenName;

	return (
		<TouchableWithoutFeedback onPress={() => tabChange(item.screenName!)}>
			<View style={styles.imageContainer}>
				<Image
					source={item.image}
					resizeMode="contain"
					style={[item.style, { opacity: isSelected ? 0 : 1 }]}
				/>
				<Image
					source={item.imageSelected!}
					resizeMode="contain"
					style={[
						item.style,
						styles.imageSelected,
						{ opacity: isSelected ? 1 : 0 },
					]}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const ICON_PADDING = Sizes.smartVerticalScale(12);

const styles = StyleSheet.create({
	imageContainer: {
		padding: ICON_PADDING,
	},
	imageSelected: {
		position: 'absolute',
		top: ICON_PADDING,
		left: ICON_PADDING,
	},
});
