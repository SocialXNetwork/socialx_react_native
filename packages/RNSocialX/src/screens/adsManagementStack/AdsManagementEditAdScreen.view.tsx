import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

import { AdPreview, Header, HeaderButton, Option } from '../../components';
import { IAd, IHeaderProps, ITranslatedProps } from '../../types';

import styles from './AdsManagementEditAdScreen.style';

interface IAdsManagementEditAdScreenViewProps
	extends ITranslatedProps,
		IHeaderProps {
	editAd: () => void;
	duplicateAd: () => void;
	adData: IAd;
	adName: string;
	adNumber: string;
	editAdDirectory: () => void;
	editBudget: () => void;
	budgetDate: string;
	budgetAmount: string;
}

export const AdsManagementEditAdScreenView: React.SFC<
	IAdsManagementEditAdScreenViewProps
> = ({
	onGoBack,
	getText,
	editAd,
	duplicateAd,
	adData,
	adName,
	adNumber,
	editAdDirectory,
	editBudget,
	budgetDate,
	budgetAmount,
}) => (
	<SafeAreaView forceInset={{ top: 'never' }} style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<Text style={styles.title}>
			{getText('ad.management.editad.title').toUpperCase()}
		</Text>
		<View style={styles.separator} />
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.managementContainer}>
				<View style={styles.adDirectoryContainer}>
					<View style={styles.iconsAndTitleAdDirectory}>
						<Icon name="md-folder" style={styles.icon} />
						<View style={styles.adDirectoryTextContainer}>
							<Text style={styles.adText}>
								{getText('ad.management.title.one').toUpperCase()}
							</Text>
							<Text style={styles.adName}>{adName}</Text>
						</View>
						<TouchableOpacity onPress={editAdDirectory}>
							<Icon name="md-create" style={styles.editIcon} />
						</TouchableOpacity>
					</View>
					<View style={styles.adNumberTextContainer}>
						<View style={styles.linesContainer}>
							<View style={styles.verticalLine} />
							<View style={styles.horizontalLine} />
						</View>
						<Icon name="md-document" style={styles.adNumberIcon} />
						<Text style={styles.adText}>{adNumber}</Text>
					</View>
				</View>
				<View style={styles.budgetContainer}>
					<View style={styles.iconsAndTitleBudget}>
						<Icon name="md-calendar" style={styles.icon} />
						<Text style={styles.budgetText}>
							{getText('ad.management.budget.title').toUpperCase()}
						</Text>
						<TouchableOpacity onPress={editBudget}>
							<Icon name="md-create" style={styles.editIcon} />
						</TouchableOpacity>
					</View>
					<Text style={styles.dateAndAmount}>{budgetDate}</Text>
					<Text style={styles.dateAndAmount}>{budgetAmount}</Text>
				</View>
			</View>
			<View style={styles.separator} />
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
