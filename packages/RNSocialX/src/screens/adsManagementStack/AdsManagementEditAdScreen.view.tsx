import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { AdPreview, Header, HeaderButton, Option } from '../../components';
import { IAd, IHeaderProps, ITranslatedProps } from '../../types';

import styles, { defaultStyles } from './AdsManagementEditAdScreen.style';

interface IAdsManagementEditAdScreenViewProps
	extends ITranslatedProps,
		IHeaderProps {
	editAd: () => void;
	duplicateAd: () => void;
	adData: IAd;
}

export const AdsManagementEditAdScreenView: React.SFC<
	IAdsManagementEditAdScreenViewProps
> = ({ onGoBack, getText, editAd, duplicateAd, adData }) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<Text style={styles.title}>
			{getText('ad.management.editad.title').toUpperCase()}
		</Text>
		<View style={styles.separator} />
		<ScrollView>
			<View style={styles.managementContainer}>
				<View style={styles.separator} />
			</View>
			<View style={styles.buttonsContainer}>
				<Option
					type="icon"
					icon="md-create"
					text={getText('button.edit')}
					onPress={editAd}
				/>
				<View style={styles.separator} />
				<Option
					type="icon"
					icon="md-copy"
					text={getText('button.duplicate')}
					onPress={duplicateAd}
				/>
			</View>
			<View style={styles.separator} />
			<View style={styles.previewContainer}>
				<View style={styles.header}>
					<Text style={styles.headerText}>
						{getText('ad.management.editad.adpreview')}
					</Text>
				</View>
				<View style={styles.separator} />
				<AdPreview {...adData} editable={false} />
			</View>
		</ScrollView>
	</SafeAreaView>
);
