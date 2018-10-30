import * as React from 'react';
import { Animated, FlatList, ScrollView, View } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import {
	FeedWithNoPosts,
	LoadingFooter,
	ShareSection,
	SuggestionsCarousel,
	WallPostCard,
} from '../../../components';
import {
	getTextSignature,
	ICurrentUser,
	IDotsMenuProps,
	IWallPostCardActions,
	IWallPostCardData,
} from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends IWallPostCardActions, IDotsMenuProps {
	avatarImage: string;
	posts: IWallPostCardData[];
	skeletonPost: IWallPostCardData;
	refreshing: boolean;
	creatingPost: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	currentUser: ICurrentUser;
	shareSectionPlaceholder: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	scrollRef: React.RefObject<FlatList<IWallPostCardData>>;
	scrollY: AnimatedValue;
	likeError: boolean;
}

export class UserFeedScreenView extends React.Component<IUserFeedScreenViewProps> {
	public render() {
		const {
			posts,
			avatarImage,
			onLoadMorePosts,
			onRefresh,
			refreshing,
			canLoadMorePosts,
			onCreateWallPost,
			shareSectionPlaceholder,
			scrollRef,
			scrollY,
			skeletonPost,
			getText,
		} = this.props;

		const allPosts = skeletonPost ? [skeletonPost, ...posts] : posts;

		return (
			<View style={styles.container}>
				{posts.length === 0 ? (
					<FeedWithNoPosts onCreateWallPost={onCreateWallPost} getText={getText} />
				) : (
					<FlatList
						ref={scrollRef}
						windowSize={10}
						refreshing={refreshing}
						onRefresh={onRefresh}
						data={allPosts}
						keyExtractor={(item: IWallPostCardData) => item.postId}
						renderItem={(data) => this.renderWallPosts(data, getText)}
						onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
						onEndReachedThreshold={0.5}
						keyboardShouldPersistTaps="handled"
						ListHeaderComponent={
							<ShareSection
								avatarImage={avatarImage}
								onCreateWallPost={onCreateWallPost}
								sharePlaceholder={shareSectionPlaceholder}
							/>
						}
						ListFooterComponent={<LoadingFooter hasMore={canLoadMorePosts} />}
						onScrollToIndexFailed={() => undefined}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}
						scrollEventThrottle={16}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
		);
	}

	private renderWallPosts = (
		data: { item: IWallPostCardData; index: number },
		getText: getTextSignature,
	) => {
		const {
			currentUser,
			likeError,
			loadingMorePosts,
			onCommentPress,
			onImagePress,
			onDeletePostPress,
			onLikePress,
			onUserPress,
			onSubmitComment,
			onBlockUser,
			onReportProblem,
			showDotsMenuModal,
			skeletonPost,
		} = this.props;

		const post = data.item;
		const canDelete = currentUser.userId === post.owner.userId;

		return (
			<View style={styles.post}>
				<WallPostCard
					{...post}
					likeError={likeError}
					canDelete={canDelete}
					likedByMe={post.likedByMe}
					listLoading={loadingMorePosts}
					onCommentPress={onCommentPress}
					onImagePress={onImagePress}
					onDeletePostPress={onDeletePostPress}
					onLikePress={onLikePress}
					onUserPress={(userId: string) => onUserPress(userId)}
					/* Just for interface compatibility onAddComment dummyIndex will be 0 all the time. Read it as data.index */
					onAddComment={(dummyIndex: number, cardHeight: number) =>
						this.props.onAddComment(data.index, cardHeight)
					}
					onSubmitComment={onSubmitComment}
					onBlockUser={onBlockUser}
					onReportProblem={onReportProblem}
					showDotsMenuModal={showDotsMenuModal}
					displayDots={true}
					getText={getText}
				/>
				{skeletonPost && <View style={styles.overlay} />}
				{post.suggested && (
					<SuggestionsCarousel items={post.suggested} getText={this.props.getText} />
				)}
			</View>
		);
	};
}
