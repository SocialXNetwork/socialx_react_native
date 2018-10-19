import * as React from 'react';
import { Animated, FlatList, View } from 'react-native';
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
	IError,
	IWallPostCardActions,
	IWallPostCardData,
} from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends IWallPostCardActions {
	avatarImage: string | undefined;
	posts: IWallPostCardData[];
	errors: IError[];
	refreshing: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	currentUser: ICurrentUser;
	shareSectionPlaceholder: string | null;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	shareSectionOpacityInterpolation: number;
	scrollRef: React.RefObject<FlatList<IWallPostCardData>>;
	scrollY: AnimatedValue;
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
			shareSectionOpacityInterpolation,
			scrollRef,
			scrollY,
			getText,
		} = this.props;

		return (
			<View style={styles.container}>
				{posts.length === 0 ? (
					<FeedWithNoPosts
						onCreateWallPost={onCreateWallPost}
						getText={getText}
					/>
				) : (
					<FlatList
						ListHeaderComponent={
							shareSectionPlaceholder ? (
								<ShareSection
									avatarImage={avatarImage}
									onCreateWallPost={onCreateWallPost}
									sharePlaceholder={shareSectionPlaceholder}
									opacity={shareSectionOpacityInterpolation}
								/>
							) : null
						}
						ref={scrollRef}
						windowSize={10}
						refreshing={refreshing}
						onRefresh={onRefresh}
						data={posts}
						keyExtractor={this.keyExtractor}
						renderItem={(data) => this.renderWallPosts(data, getText)}
						onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
						keyboardShouldPersistTaps="handled"
						ListFooterComponent={<LoadingFooter hasMore={canLoadMorePosts} />}
						onScrollToIndexFailed={() => {
							/**/
						}}
						onScroll={Animated.event([
							{ nativeEvent: { contentOffset: { y: scrollY } } },
						])}
						scrollEventThrottle={16}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
		);
	}

	private keyExtractor = (item: IWallPostCardData) => item.postId;

	private renderWallPosts = (
		data: { item: IWallPostCardData; index: number },
		getText: getTextSignature,
	) => {
		const post = data.item;
		const canDelete = this.props.currentUser.userId === post.owner.userId;

		return (
			<View style={styles.wallPostContainer}>
				<WallPostCard
					{...post}
					errors={this.props.errors}
					canDelete={canDelete}
					likedByMe={post.likedByMe}
					listLoading={this.props.loadingMorePosts}
					currentUserAvatarURL={this.props.currentUser.avatarURL}
					onCommentPress={this.props.onCommentPress}
					onImagePress={this.props.onImagePress}
					onDeletePress={this.props.onDeletePress}
					onLikePress={this.props.onLikePress}
					onUserPress={(userId: string) => this.props.onUserPress(userId)}
					/* Just for interface compatibility onAddComment dummyIndex will be 0 all the time. Read it as data.index */
					onAddComment={(dummyIndex: number, cardHeight: number) =>
						this.props.onAddComment(data.index, cardHeight)
					}
					onSubmitComment={this.props.onSubmitComment}
					getText={getText}
					onBlockUser={this.props.onBlockUser}
					onReportProblem={this.props.onReportProblem}
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
