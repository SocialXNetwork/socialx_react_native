import * as React from 'react';
import { Text, View } from 'react-native';

import {
	AvatarImage,
	Header,
	HeaderButton,
	Option,
	PrimaryButton,
} from '../../components';
import { Icons } from '../../environment/theme';
import { ITranslatedProps } from '../../types';

import styles from './AdsManagementScreen.style';

interface IAdsManagementScreenViewProps extends ITranslatedProps {
	onGoBack: () => void;
	avatarURL: string;
	fullName: string;
	userName: string;
}

export const AdsManagementScreenView: React.SFC<
	IAdsManagementScreenViewProps
> = ({ onGoBack, avatarURL, fullName, userName, getText }) => (
	<View style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.avatarContainer}>
			<AvatarImage image={avatarURL} style={styles.avatar} />
		</View>
		<Text style={styles.name}>{fullName}</Text>
		{userName && <Text style={styles.userName}>@{userName}</Text>}
		<View style={styles.separator} />
		<Option
			icon={Icons.shareIconGradient}
			text={getText('ad.management.option.post')}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.separator} />
		<Option
			icon={Icons.shareIconGradient}
			text={getText('ad.management.option.video')}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.separator} />
		<Option
			icon={Icons.shareIconGradient}
			text={getText('ad.management.option.traffic')}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.separator} />
		<View style={styles.button}>
			<PrimaryButton
				label={getText('ad.management.create')}
				onPress={() => {
					/**/
				}}
			/>
		</View>
	</View>
);
