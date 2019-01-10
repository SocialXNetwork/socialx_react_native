import React from 'react';
import { ActivityIndicator } from 'react-native';

interface ILoaderProps {
	visible: boolean;
	small?: boolean;
}

export const Loader: React.SFC<ILoaderProps> = ({ visible, small }) => {
	if (visible) {
		return <ActivityIndicator size={small ? 'small' : 'large'} />;
	}

	return null;
};
