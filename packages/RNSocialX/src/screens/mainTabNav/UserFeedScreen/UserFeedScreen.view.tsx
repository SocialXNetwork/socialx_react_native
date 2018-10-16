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
	ILike,
	IWallPostCardActions,
	IWallPostCardData,
} from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends IWallPostCardActions {
	avatarImage: string | undefined;
	wallPosts: IWallPostCardData[];
	refreshing: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	currentUser: ICurrentUser;
	noPosts: boolean;
	shareSectionPlaceholder: string | null;
	loadingMorePosts: boolean;
	hasMorePosts: boolean;
	shareSectionOpacityInterpolation: number;
	scrollRef: React.RefObject<FlatList<IWallPostCardData>>;
	scrollY: AnimatedValue;
}

export class UserFeedScreenView extends React.Component<
	IUserFeedScreenViewProps
> {
	public render() {
		const {
			avatarImage,
			onLoadMorePosts,
			wallPosts,
			onRefresh,
			refreshing,
			hasMorePosts,
			onCreateWallPost,
			shareSectionPlaceholder,
			noPosts,
			shareSectionOpacityInterpolation,
			scrollRef,
			scrollY,
			getText,
		} = this.props;

		return (
			<View style={styles.container}>
				{noPosts ? (
					<FeedWithNoPosts
						// onCreateWallPost={onCreateWallPost}
						onCreateWallPost={onLoadMorePosts}
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
						data={wallPosts}
						keyExtractor={this.keyExtractor}
						renderItem={(data) => this.renderWallPosts(data, getText)}
						onEndReached={onLoadMorePosts}
						onEndReachedThreshold={0.5}
						keyboardShouldPersistTaps="handled"
						ListFooterComponent={<LoadingFooter hasMore={hasMorePosts} />}
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

	private keyExtractor = (item: IWallPostCardData) => item.id;

	private renderWallPosts = (
		data: { item: IWallPostCardData; index: number },
		getText: getTextSignature,
	) => {
		const postData = data.item;
		const canDelete = this.props.currentUser.userId === postData.owner.userId;
		const likedByMe = !!postData.likes.find(
			(like: any) => like.userId === this.props.currentUser.userId,
		);

		return (
			<View style={styles.wallPostContainer}>
				<WallPostCard
					{...postData}
					canDelete={canDelete}
					likedByMe={likedByMe}
					listLoading={this.props.loadingMorePosts}
					currentUserAvatarURL={this.props.currentUser.avatarURL}
					onCommentPress={this.props.onCommentPress}
					onImagePress={this.props.onImagePress}
					onDeletePress={this.props.onDeletePress}
					onLikeButtonPress={this.props.onLikeButtonPress}
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
				{postData.suggested && (
					<SuggestionsCarousel
						items={postData.suggested}
						getText={this.props.getText}
					/>
				)}
			</View>
		);
	};
}
