import * as React from 'react';
import {Animated, FlatList, View} from 'react-native';
import {AnimatedValue} from 'react-navigation';

import {
	FeedWithNoPosts,
	IWallPostCardProps,
	LoadingFooter,
	ShareSection,
	SuggestionsCarousel,
	WallPostCard,
} from '../../../components';
import {IWithLoaderProps, WithInlineLoader} from '../../../components/inlineLoader';
import {IMediaProps, ITranslatedProps} from '../../../types';
import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends IWithLoaderProps, ITranslatedProps {
	avatarImage: any;
	wallPosts: IWallPostCardProps[];
	refreshing: boolean;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onShowNewWallPostPress: () => void;
	onMediaPress: (index: any, medias: IMediaProps[]) => void;
	onCommentPress: (postId: any, owner: any, startComment: boolean, postData: object) => void;
	currentUser: any;
	noPosts: boolean;
	shareSectionPlaceholder: string | null;
	onLikePress: (likedByMe: boolean, postId: string) => boolean;
	onPostDeletePress: (post: IWallPostCardProps) => void;
	onUserPress: (userId: string) => void;
	loadingMore: boolean;
	hasMorePosts: boolean;
	onAddCommentPress: (scrollYOffset: number, cardHeight: number) => void;
	shareSectionOpacityInterpolation: number;
	scrollRef: React.RefObject<FlatList<IWallPostCardProps>>;
	scrollY: AnimatedValue;
}

export class UserFeedScreenView extends React.Component<IUserFeedScreenViewProps> {
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
		} = this.props;

		return (
			<WithInlineLoader isLoading={isLoading}>
				<View style={styles.container}>
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
							renderItem={this.renderWallPosts}
							onEndReached={onLoadMorePosts}
							onEndReachedThreshold={0.5}
							alwaysBounceVertical={false}
							keyboardShouldPersistTaps={'handled'}
							ListFooterComponent={<LoadingFooter hasMore={hasMorePosts} />}
							onScrollToIndexFailed={() => {
								/**/
							}}
							onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])}
							scrollEventThrottle={16}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
			</WithInlineLoader>
		);
	}

	private keyExtractor = (item: IWallPostCardProps) => item.id;

	private renderWallPosts = (data: {item: IWallPostCardProps; index: number}) => {
		if (data.item.suggested) {
			return <SuggestionsCarousel items={data.item.suggested} getText={this.props.getText} />;
		}

		const canDelete = this.props.currentUser.userId === data.item.owner.userId;
		const likedByMe = !!data.item.likes.find((like: any) => like.userId === this.props.currentUser.userId);

		return (
			<View style={styles.wallPostContainer}>
				<WallPostCard
					{...data.item}
					canDelete={canDelete}
					likedByMe={likedByMe}
					listLoading={this.props.loadingMore}
					currentUser={this.props.currentUser}
					onCommentPress={(startComment: boolean) =>
						this.props.onCommentPress(data.item.id, data.item.owner.userId, startComment, data.item)
					}
					onImagePress={(index: number) => this.props.onMediaPress(index, data.item.media)}
					onDeletePress={() => this.props.onPostDeletePress(data.item)}
					onLikeButtonPress={() => this.props.onLikePress(likedByMe, data.item.id)}
					onUserPress={(userId: string) => this.props.onUserPress(userId)}
					onAddComment={(cardHeight: number) => this.props.onAddCommentPress(data.index, cardHeight)}
				/>
			</View>
		);
	};
}
