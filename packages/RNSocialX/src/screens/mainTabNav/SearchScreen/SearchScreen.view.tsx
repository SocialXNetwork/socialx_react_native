import * as React from 'react';
import {View} from 'react-native';

import {SearchHeader} from '../../../components';

export const SearchScreenView: React.SFC<{navigation: any}> = ({navigation}) => (
	<View>
		<SearchHeader navigation={navigation} cancel={true} />
	</View>
);
