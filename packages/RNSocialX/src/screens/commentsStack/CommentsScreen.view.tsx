import React from 'react';
import { SafeAreaView } from 'react-native';

import { WallPost } from '../../components';
import { IError, INavigationProps, IWallPostData } from '../../types';

import styles from './CommentsScreen.style';

interface ICommentsScreenComponentProps extends INavigationProps {
	post: IWallPostData;
	errors: IError[];
	keyboardRaised: boolean;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	post,
	errors,
	keyboardRaised,
	navigation,
}) => (
	<SafeAreaView style={styles.container}>
		<WallPost
			post={post}
			errors={errors}
			isCommentsScreen={true}
			keyboardRaised={keyboardRaised}
			navigation={navigation}
		/>
	</SafeAreaView>
);
