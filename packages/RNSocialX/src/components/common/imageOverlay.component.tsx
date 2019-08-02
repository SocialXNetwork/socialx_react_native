import React from 'react';
import {
	ImageBackground,
	ImageBackgroundProps,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';

interface OverlayImageStyle extends ViewStyle {
	overlayColor: string;
}

interface ComponentProps {
	style?: StyleProp<OverlayImageStyle>;
	children?: React.ReactNode;
}

export type ImageOverlayProps = ThemedComponentProps & ImageBackgroundProps & ComponentProps;

class ImageOverlayComponent extends React.Component<ImageOverlayProps> {
	public render(): React.ReactNode {
		const { style, themedStyle, children, ...restProps } = this.props;
		// @ts-ignore: overlayColor (additional style property)
		const { overlayColor: derivedOverlayColor, ...containerStyle } = StyleSheet.flatten(style);

		const overlayColor: string = this.getOverlayColor(derivedOverlayColor);

		return (
			<ImageBackground style={containerStyle} {...restProps}>
				<View style={[themedStyle.overlay, { backgroundColor: overlayColor }]} />
				{children}
			</ImageBackground>
		);
	}

	private getOverlayColor = (source: string): string => {
		const { themedStyle } = this.props;

		return source || themedStyle.overlay.backgroundColor;
	};
}

export const ImageOverlay = withStyles(ImageOverlayComponent, (theme: ThemeType) => ({
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.45)',
		...StyleSheet.absoluteFillObject,
	},
}));
