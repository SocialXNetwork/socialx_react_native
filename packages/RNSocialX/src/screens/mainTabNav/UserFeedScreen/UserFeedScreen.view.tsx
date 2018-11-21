import * as React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { AnimatedValue } from 'react-navigation';

import {
	FeedWithNoPosts,
	LoadingFooter,
	ShareSection,
	SuggestionsCarousel,
	WallPost,
} from '../../../components';
import { IError, INavigationProps, ITranslatedProps, IWallPostData } from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, ITranslatedProps {
	avatarImage: string;
	posts: IWallPostData[];
	namesOfFriends: string[];
	skeletonPost: IWallPostData;
	refreshing: boolean;
	creatingPost: boolean;
	shareSectionPlaceholder: string;
	isFriendsTab: boolean;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	scrollRef: React.RefObject<FlatList<IWallPostData>>;
	scrollY: AnimatedValue;
	errors: IError[];
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	onAddComment: (index: number, cardHeight: number) => void;
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
						keyExtractor={(item: IWallPostData) => item.postId}
						renderItem={(data) => this.renderWallPosts(data)}
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

	private renderWallPosts = (data: { item: IWallPostData; index: number }) => {
		const { namesOfFriends, isFriendsTab, skeletonPost, errors, navigation } = this.props;
		const post = data.item;

		if (isFriendsTab) {
			if (namesOfFriends.includes(post.owner.userId)) {
				return (
					<View style={styles.post}>
						<WallPost
							post={post}
							commentInput={true}
							errors={errors}
							onAddComment={(cardHeight: number) => this.props.onAddComment(data.index, cardHeight)}
							navigation={navigation}
						/>
						{skeletonPost && <View style={styles.overlay} />}
						{post.suggested && (
							<SuggestionsCarousel items={post.suggested} getText={this.props.getText} />
						)}
					</View>
				);
			}

			return null;
		} else {
			return (
				<View style={styles.post}>
					<WallPost
						post={post}
						commentInput={true}
						errors={errors}
						onAddComment={(cardHeight: number) => this.props.onAddComment(data.index, cardHeight)}
						navigation={navigation}
					/>
					{skeletonPost && <View style={styles.overlay} />}
					{post.suggested && (
						<SuggestionsCarousel items={post.suggested} getText={this.props.getText} />
					)}
				</View>
			);
		}
	};
}
