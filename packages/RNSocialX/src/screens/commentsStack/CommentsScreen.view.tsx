import React from 'react';
import { SafeAreaView } from 'react-native';

import { WallPost } from '../../components';
import { IError, INavigationProps, IWallPost } from '../../types';

import styles from './CommentsScreen.style';

interface ICommentsScreenComponentProps extends INavigationProps {
	post: IWallPost;
	keyboardRaised: boolean;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	post,
	keyboardRaised,
	navigation,
}) => (
	<SafeAreaView style={styles.container}>
		<WallPost
			post={post}
			isCommentsScreen={true}
			keyboardRaised={keyboardRaised}
			navigation={navigation}
		/>
	</SafeAreaView>
);
