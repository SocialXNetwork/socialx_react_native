import * as React from 'react';
import { FlatList, View } from 'react-native';

import { FeedWithNoPosts, LoadingFooter, ShareSection, WallPost } from '../../../components';
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, ITranslatedProps {
	avatar: string;
	postIds: string[];
	placeholderPostId: string | null;
	refreshing: boolean;
	shareMessage: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	listRef: React.RefObject<FlatList<string>>;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	onCommentInputPress: (y: number, height: number, first: boolean) => void;
}

export class UserFeedScreenView extends React.Component<IUserFeedScreenViewProps> {
	private containerRef: React.RefObject<View> = React.createRef();

	public render() {
		const {
			postIds,
			avatar,
			refreshing,
			canLoadMorePosts,
			shareMessage,
			placeholderPostId,
			listRef,
			onRefresh,
			onLoadMorePosts,
			onCreateWallPost,
			getText,
		} = this.props;

		const data = placeholderPostId ? [placeholderPostId, ...postIds] : postIds;

		return (
			<View ref={this.containerRef} style={styles.container}>
				<FlatList
					ref={listRef}
					windowSize={10}
					data={data}
					refreshing={refreshing}
					keyExtractor={(id) => id}
					renderItem={this.renderItem}
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
					onEndReached={canLoadMorePosts && !refreshing ? onLoadMorePosts : null}
					onEndReachedThreshold={0.5}
				/>
			</View>
		);
	}

	private renderItem = (data: { item: string; index: number }) => (
		<View style={styles.post}>
			<WallPost
				postId={data.item}
				commentInput={true}
				containerRef={this.containerRef}
				onCommentInputPress={(y, h) => this.props.onCommentInputPress(y, h, data.index === 0)}
				navigation={this.props.navigation}
			/>
		</View>
	);
}
