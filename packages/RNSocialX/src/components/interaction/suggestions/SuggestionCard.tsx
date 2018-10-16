import * as React from 'react';
import { Text, View } from 'react-native';

import { AvatarImage, ButtonSizes, IconButton, PrimaryButton } from '../../';
import { ISearchResultData, ITranslatedProps } from '../../../types';
import styles, { colors } from './SuggestionCard.style';

interface ISuggestionCardProps extends ITranslatedProps {
	item: ISearchResultData;
	deleteCard: () => void;
}

export const SuggestionCard: React.SFC<ISuggestionCardProps> = ({
	item,
	deleteCard,
	getText,
}) => (
	<View style={styles.container}>
		<AvatarImage image={{ uri: item.avatarURL }} style={styles.avatar} />
		<Text style={styles.name}>{item.fullName}</Text>
		<Text style={styles.reason}>Friends with placeholder</Text>
		<PrimaryButton
			label={getText('button.add')}
			size={ButtonSizes.Small}
			borderColor={colors.pink}
			textColor={colors.white}
			containerStyle={styles.buttonContainer}
			onPress={() => {
				/**/
			}}
		/>
		<View style={styles.iconContainer}>
			<IconButton
				iconSource="ios-close"
				iconType="io"
				onPress={deleteCard}
				iconStyle={styles.icon}
			/>
		</View>
	</View>
);
