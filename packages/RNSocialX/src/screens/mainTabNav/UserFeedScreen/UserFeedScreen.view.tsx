import * as React from 'react';
import { FlatList, View } from 'react-native';

import { FeedWithNoPosts, LoadingFooter, ShareSection, WallPost } from '../../../components';
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './UserFeedScreen.style';

interface IProps extends INavigationProps, ITranslatedProps {
	avatar: string;
	postIds: string[];
	placeholderPostId: string | null;
	refreshing: boolean;
	shareMessage: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	listRef: React.RefObject<FlatList<string>>;
	postContainerRef: React.RefObject<View>;
	loaded: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	onCommentInputPress: (y: number, height: number, first: boolean) => void;
}

export const UserFeedScreenView: React.SFC<IProps> = ({
	postIds,
	avatar,
	refreshing,
	canLoadMorePosts,
	shareMessage,
	placeholderPostId,
	listRef,
	postContainerRef,
	loaded,
	onRefresh,
	onLoadMorePosts,
	onCreateWallPost,
	onCommentInputPress,
	navigation,
	getText,
}) => {
	const data = placeholderPostId ? [placeholderPostId, ...postIds] : postIds;

	return (
		<View ref={postContainerRef} style={styles.container}>
			<FlatList
				ref={listRef}
				windowSize={10}
				data={data}
				refreshing={refreshing}
				keyExtractor={(id) => id}
				renderItem={({ item, index }) => (
					<View style={styles.post}>
						<WallPost
							postId={item}
							commentInput={true}
							postContainerRef={postContainerRef}
							onCommentInputPress={(y, h) => onCommentInputPress(y, h, index === 0)}
							navigation={navigation}
						/>
					</View>
				)}
				ListHeaderComponent={
					<ShareSection
						avatar={avatar}
						message={shareMessage}
						onCreateWallPost={onCreateWallPost}
					/>
				}
				ListFooterComponent={<LoadingFooter hasMore={canLoadMorePosts} />}
				ListEmptyComponent={
					<FeedWithNoPosts onCreateWallPost={onCreateWallPost} getText={getText} />
				}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
				onRefresh={onRefresh}
				onEndReached={canLoadMorePosts && loaded ? onLoadMorePosts : null}
				onEndReachedThreshold={1}
			/>
		</View>
	);
};
