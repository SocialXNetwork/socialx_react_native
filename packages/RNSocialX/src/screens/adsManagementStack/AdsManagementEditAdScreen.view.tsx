import { Button, Segment, Text } from 'native-base';
import * as React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Header, HeaderButton } from '../../components';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './AdsManagementEditAdScreen.style';

interface IAdsManagementEditAdScreenViewProps
	extends ITranslatedProps,
		IHeaderProps {}

export const AdsManagementEditAdScreenView: React.SFC<
	IAdsManagementEditAdScreenViewProps
> = ({ onGoBack, getText }) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<Text style={styles.title}>
			{getText('ad.management.editad.title').toUpperCase()}
		</Text>
		<View style={styles.separator} />
		<View style={styles.transactionsContainer}>
			<View style={styles.header}>
				<Text style={styles.headerText}>
					{getText('ad.statistics.transactions.title')}
				</Text>
			</View>
			<View style={styles.separator} />
		</View>
		<View style={styles.separator} />
	</SafeAreaView>
);
