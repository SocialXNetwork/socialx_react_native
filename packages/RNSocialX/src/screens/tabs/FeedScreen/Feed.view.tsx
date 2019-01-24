import * as React from 'react';
import { FlatList, View } from 'react-native';

import {
	FeedWithNoPosts,
	LoadingFooter,
	MediaOverlay,
	ShareSection,
	WallPost,
} from '../../../components';
import { IDictionary, INavigationProps } from '../../../types';

import styles from './Feed.style';

interface IProps extends INavigationProps, IDictionary {
	avatar: string;
	postIds: string[];
	refreshing: boolean;
	shareMessage: string;
	loading: boolean;
	canLoad: boolean;
	listRef: React.RefObject<FlatList<string>>;
	postContainerRef: React.RefObject<View>;
	loaded: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	onCommentInputPress: (y: number, height: number, first: boolean) => void;
}

export const FeedView: React.SFC<IProps> = ({
	postIds,
	avatar,
	refreshing,
	loading,
	canLoad,
	shareMessage,
	listRef,
	postContainerRef,
	loaded,
	onRefresh,
	onLoadMorePosts,
	onCreateWallPost,
	onCommentInputPress,
	navigation,
	dictionary,
}) => (
	<View ref={postContainerRef} style={styles.container}>
		<MediaOverlay navigation={navigation} />
		<FlatList
			ref={listRef}
			windowSize={10}
			data={postIds}
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
				<ShareSection avatar={avatar} message={shareMessage} onCreateWallPost={onCreateWallPost} />
			}
			ListFooterComponent={<LoadingFooter visible={canLoad && loading} />}
			ListEmptyComponent={<FeedWithNoPosts loading={loading} dictionary={dictionary} />}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			onRefresh={onRefresh}
			onEndReached={canLoad && loaded ? onLoadMorePosts : null}
			onEndReachedThreshold={1}
		/>
	</View>
);
