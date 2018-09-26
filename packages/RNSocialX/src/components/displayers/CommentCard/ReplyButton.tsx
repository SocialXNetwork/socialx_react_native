import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Colors, Fonts, Sizes } from '../../../environment/theme';

interface IReplyButtonProps {
	label: string;
	onCommentReply: (value: boolean) => void;
}

export const ReplyButton: React.SFC<IReplyButtonProps> = ({
	onCommentReply,
	label,
}) => (
	<TouchableOpacity onPress={() => onCommentReply(true)}>
		<Text style={style.actionButtonText}>{label}</Text>
	</TouchableOpacity>
);

const style: any = {
	actionButtonText: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(14),
		color: Colors.postText,
		lineHeight: Sizes.smartHorizontalScale(24),
		paddingHorizontal: Sizes.smartHorizontalScale(5),
	},
};

const styles = StyleSheet.create(style);
