import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { ITranslatedProps } from '../../../types';

interface IWarnOffensiveContentProps extends ITranslatedProps {
	visible: boolean;
	onShowOffensiveContent: () => void;
}

export const WarnOffensiveContent: React.SFC<IWarnOffensiveContentProps> = ({
	getText,
	visible,
	onShowOffensiveContent,
}) => (
	<React.Fragment>
		{visible && (
			<View style={styles.offensiveContent}>
				<Text style={styles.offensiveWarningText}>
					{getText('wall.post.card.offensive.content.warning.text')}
				</Text>
				<TouchableOpacity
					onPress={onShowOffensiveContent}
					style={styles.viewOffensiveText}
				>
					<Text style={styles.viewOffensiveText}>
						{getText('wall.post.card.offensive.content.button.view')}
					</Text>
				</TouchableOpacity>
			</View>
		)}
	</React.Fragment>
);

const style: any = {
	offensiveContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(16),
		marginVertical: Sizes.smartVerticalScale(5),
		padding: Sizes.smartHorizontalScale(10),
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.grayText,
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.alabaster,
	},
	offensiveWarningText: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		flex: 1,
	},
	viewOffensiveText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
	},
};

const styles = StyleSheet.create(style);
