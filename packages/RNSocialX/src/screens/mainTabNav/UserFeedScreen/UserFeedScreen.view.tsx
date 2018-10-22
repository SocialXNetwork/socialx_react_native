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
						onEndReachedThreshold={0.5}
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
					likeError={this.props.likeError}
					canDelete={canDelete}
					likedByMe={post.likedByMe}
					listLoading={this.props.loadingMorePosts}
					currentUserAvatarURL={this.props.currentUser.avatarURL}
					onCommentPress={this.props.onCommentPress}
					onImagePress={this.props.onImagePress}
					onDeletePostPress={this.props.onDeletePostPress}
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
					showDotsMenuModal={this.props.showDotsMenuModal}
					displayDots={true}
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
