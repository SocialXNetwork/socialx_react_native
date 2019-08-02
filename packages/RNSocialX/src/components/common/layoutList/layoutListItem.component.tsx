import React from 'react';
import { textStyle } from '../style';
import { LayoutListItemData } from './type';

interface ComponentProps {
	data: LayoutListItemData;
}

export type LayoutListItemProps = ThemedComponentProps & ComponentProps & ListItemProps;

class LayoutListItemComponent extends React.Component<LayoutListItemProps> {
	public render(): React.ReactNode {
		const { style, themedStyle, data, ...restProps } = this.props;

		return (
			<ListItem {...restProps} style={[themedStyle.container, style]}>
				<Text style={textStyle.subtitle} category="s1">
					{data.title}
				</Text>
				<Text style={textStyle.paragraph} appearance="hint">
					{data.description}
				</Text>
			</ListItem>
		);
	}
}

export const LayoutListItem = withStyles(LayoutListItemComponent, (theme: ThemeType) => ({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderRadius: 8,
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	description: {
		marginTop: 4,
		...textStyle.subtitle,
	},
}));
