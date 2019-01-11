import * as React from 'react';
import { Text, View } from 'react-native';

import { AvatarImage, Header, HeaderButton, Option, PrimaryButton } from '../../components';
import { Icons } from '../../environment/theme';
import { IHeaderProps, ITranslatedProps } from '../../types';

import styles, { BUTTON_WIDTH } from './AdsManagementScreen.style';

interface IAdsManagementScreenViewProps extends ITranslatedProps, IHeaderProps {
	avatar: string;
	fullName: string;
	alias: string;
}

export const AdsManagementScreenView: React.SFC<IAdsManagementScreenViewProps> = ({
	onGoBack,
	avatar,
	fullName,
	alias,
	getText,
}) => (
	<View style={styles.container}>
		<Header
			title={getText('ad.management.screen.title')}
			left={<HeaderButton iconName="ios-arrow-back" onPress={onGoBack} />}
		/>
		<View style={styles.avatarContainer}>
			<AvatarImage image={avatar} style={styles.avatar} />
		</View>
		<Text style={styles.name}>{fullName}</Text>
		{alias && <Text style={styles.alias}>@{alias}</Text>}
		<View style={styles.separator} />
		<Option
			type="image"
			icon={Icons.shareIconGradient}
			text={getText('ad.management.option.post')}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.separator} />
		<Option
			type="image"
			icon={Icons.shareIconGradient}
			text={getText('ad.management.option.video')}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.separator} />
		<Option
			type="image"
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
				width={BUTTON_WIDTH}
				onPress={() => {
					/**/
				}}
			/>
		</View>
	</View>
);
