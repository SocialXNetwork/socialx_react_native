import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Fonts, Sizes } from '../../../environment/theme';
import { IDictionary } from '../../../types';

interface IWarnOffensiveContentProps extends IDictionary {
	visible: boolean;
	onShowOffensiveContent: () => void;
}

export const WarnOffensiveContent: React.SFC<IWarnOffensiveContentProps> = ({
	dictionary,
	visible,
	onShowOffensiveContent,
}) => (
	<React.Fragment>
		{visible && (
			<View style={styles.container}>
				<Text style={styles.text}>{dictionary.components.displayers.wallPost.warning}</Text>
				<TouchableOpacity onPress={onShowOffensiveContent}>
					<Text style={styles.view}>{dictionary.components.buttons.view}</Text>
				</TouchableOpacity>
			</View>
		)}
	</React.Fragment>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: Sizes.smartHorizontalScale(16),
		marginVertical: Sizes.smartVerticalScale(5),
		padding: Sizes.smartHorizontalScale(10),
		borderWidth: Sizes.smartHorizontalScale(1),
		borderColor: Colors.dustyGray,
		borderRadius: Sizes.smartHorizontalScale(5),
		backgroundColor: Colors.alabaster,
	},
	text: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
		flex: 1,
	},
	view: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.paleSky,
	},
});
