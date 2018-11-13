import React from 'react';
import { SafeAreaView } from 'react-native';

import { WallPost } from '../../components';
import { IError, INavigationProps, IWallPostComment, IWallPostData } from '../../types';

import styles from './CommentsScreen.style';

interface ICommentsScreenComponentProps extends INavigationProps {
	post: IWallPostData;
	comments: IWallPostComment[];
	errors: IError[];
	keyboardRaised: boolean;
}

export const CommentsScreenView: React.SFC<ICommentsScreenComponentProps> = ({
	post,
	comments,
	errors,
	keyboardRaised,
	navigation,
}) => {
	return (
		<SafeAreaView style={styles.container}>
			<WallPost
				post={post}
				comments={comments}
				errors={errors}
				keyboardRaised={keyboardRaised}
				navigation={navigation}
			/>
		</SafeAreaView>
	);
};
