import React from 'react';
import { ImageSourcePropType, View, ViewProps } from 'react-native';

interface ComponentProps {
	photo: ImageSourcePropType;
	name: string;
	date: string;
}

export type ActivitiAuthoringProps = ThemedComponentProps & ViewProps & ComponentProps;

// TODO
class ActivityAuthoringComponent extends React.Component<ActivitiAuthoringProps> {
	public render(): React.ReactNode {
		const { style, themedStyle, photo, name, date, ...restProps } = this.props;

		return (
			<View {...restProps} style={[themedStyle.container, style]}>
				<Avatar style={themedStyle.authorPhoto} source={photo} />
				<View style={themedStyle.authorInfoContainer}>
					<Text style={themedStyle.authorNameLabel}>{name}</Text>
					<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
						{date}
					</Text>
				</View>
			</View>
		);
	}
}

export const ActivityAuthoring = withStyles(ActivityAuthoringComponent, (theme: ThemeType) => ({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	authorInfoContainer: {
		marginLeft: 16,
	},
	authorPhoto: {
		margin: 0,
	},
	authorNameLabel: textStyle.subtitle,
	dateLabel: textStyle.paragraph,
}));
