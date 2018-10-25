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

interface IUserFeedScreenViewProps
	extends IWallPostCardActions,
		IDotsMenuProps {
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

export class UserFeedScreenView extends React.Component<
	IUserFeedScreenViewProps
> {
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

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ShareSection
						avatarImage={avatarImage}
						onCreateWallPost={onCreateWallPost}
						sharePlaceholder={shareSectionPlaceholder}
					/>
					{skeletonPost && (
						<View style={styles.post}>
							<WallPostCard
								{...skeletonPost}
								onCommentPress={() => undefined}
								onImagePress={() => undefined}
								onDeletePostPress={() => undefined}
								onLikePress={() => undefined}
								onUserPress={() => undefined}
								onAddComment={() => undefined}
								onSubmitComment={() => undefined}
								onBlockUser={() => undefined}
								onReportProblem={() => undefined}
								showDotsMenuModal={() => undefined}
								displayDots={true}
								getText={getText}
							/>
							<View style={styles.overlay} />
						</View>
					)}
					{posts.length === 0 ? (
						<FeedWithNoPosts
							onCreateWallPost={onCreateWallPost}
							getText={getText}
						/>
					) : (
						<FlatList
							ref={scrollRef}
							windowSize={10}
							refreshing={refreshing}
							onRefresh={onRefresh}
							data={posts}
							keyExtractor={(item: IWallPostCardData) => item.postId}
							renderItem={(data) => this.renderWallPosts(data, getText)}
							onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
							onEndReachedThreshold={0.5}
							keyboardShouldPersistTaps="handled"
							ListFooterComponent={<LoadingFooter hasMore={canLoadMorePosts} />}
							onScrollToIndexFailed={() => undefined}
							onScroll={Animated.event([
								{ nativeEvent: { contentOffset: { y: scrollY } } },
							])}
							scrollEventThrottle={16}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</ScrollView>
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
					currentUserAvatarURL={currentUser.avatarURL}
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
				{post.suggested && (
					<SuggestionsCarousel
						items={post.suggested}
						getText={this.props.getText}
					/>
				)}
			</View>
		);
	};
}
