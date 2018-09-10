import * as React from 'react';

import {AnimatedComponent} from './AnimatedComponent';
import {SpinKitLoader, SpinnerTypes} from './SpinKitLoader';

export interface IWithLoaderProps {
	isLoading: boolean;
	animatedStyle?: any;
	spinnerType?: SpinnerTypes;
	spinnerSize?: number;
	spinnerColor?: string;
}

export const WithInlineLoader: React.SFC<IWithLoaderProps> = ({
	spinnerSize,
	spinnerColor,
	spinnerType,
	isLoading,
	animatedStyle,
	children,
}) => (
	<React.Fragment>
		{isLoading && <SpinKitLoader spinnerSize={spinnerSize} spinnerType={spinnerType} spinnerColor={spinnerColor} />}
		{!isLoading && <AnimatedComponent animatedStyle={animatedStyle || {flex: 1}}>{children}</AnimatedComponent>}
	</React.Fragment>
);
