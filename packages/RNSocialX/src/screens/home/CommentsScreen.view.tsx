import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { WallPost } from '../../components';
import { INavigationProps } from '../../types';

import styles from './CommentsScreen.style';

interface ICommentsScreenComponentProps extends INavigationProps {
	postId: string;
	keyboardRaised: boolean;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	postId,
	keyboardRaised,
	navigation,
}) => (
	<SafeAreaView style={styles.container}>
		<StatusBar barStyle="dark-content" />
		<WallPost
			postId={postId}
			isCommentsScreen={true}
			keyboardRaised={keyboardRaised}
			navigation={navigation}
		/>
	</SafeAreaView>
);
