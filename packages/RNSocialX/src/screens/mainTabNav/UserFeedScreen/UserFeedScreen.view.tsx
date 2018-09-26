import * as React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import {
	FeedWithNoPosts,
	Header,
	LoadingFooter,
	ShareSection,
	SuggestionsCarousel,
	WallPostCard,
} from '../../../components';
import {
	IWithLoaderProps,
	WithInlineLoader,
} from '../../../components/inlineLoader';
import {
	getTextSignature,
	ICurrentUser,
	IWallPostCardActions,
	IWallPostCardData,
} from '../../../types';
import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps
	extends IWithLoaderProps,
		IWallPostCardActions {
	avatarImage: any;
	wallPosts: IWallPostCardData[];
	refreshing: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onShowNewWallPostPress: () => void;
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
			onShowNewWallPostPress,
			shareSectionPlaceholder,
			noPosts,
			isLoading,
			shareSectionOpacityInterpolation,
			scrollRef,
			scrollY,
			getText,
		} = this.props;

		return (
			<WithInlineLoader isLoading={isLoading}>
				<View style={styles.container}>
					<Header logo={true} />
					{noPosts ? (
						<FeedWithNoPosts />
					) : (
						<FlatList
							ListHeaderComponent={
								shareSectionPlaceholder ? (
									<ShareSection
										avatarImage={avatarImage}
										onShowNewWallPostPress={onShowNewWallPostPress}
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
							alwaysBounceVertical={false}
							keyboardShouldPersistTaps={'handled'}
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
			</WithInlineLoader>
		);
	}

	private keyExtractor = (item: IWallPostCardData) => item.id;

	private renderWallPosts = (
		data: { item: IWallPostCardData; index: number },
		getText: getTextSignature,
	) => {
		const postData = data.item;
		if (postData.suggested) {
			return (
				<SuggestionsCarousel
					items={postData.suggested}
					getText={this.props.getText}
				/>
			);
		}

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
			</View>
		);
	};
}
