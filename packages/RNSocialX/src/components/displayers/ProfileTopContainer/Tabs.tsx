import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {PROFILE_TAB_ICON_TYPES} from '../../../environment/consts';
import styles from './Tabs.style';

interface ITabs {
	onIconPress: (tab: string) => void;
	activeTab: string;
}

export const Tabs: React.SFC<ITabs> = ({onIconPress, activeTab}) => {
	const listStyle = activeTab === PROFILE_TAB_ICON_TYPES.LIST ? [styles.icon, styles.active] : styles.icon;
	const gridStyle = activeTab === PROFILE_TAB_ICON_TYPES.GRID ? [styles.icon, styles.active] : styles.icon;

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => onIconPress(PROFILE_TAB_ICON_TYPES.LIST)}>
				<Icon name={'ios-list-box'} style={listStyle} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onIconPress(PROFILE_TAB_ICON_TYPES.GRID)}>
				<Icon name={'ios-grid'} style={gridStyle} />
			</TouchableOpacity>
		</View>
	);
};
