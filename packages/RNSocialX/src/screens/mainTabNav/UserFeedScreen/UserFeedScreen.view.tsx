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
import {
	INavigationProps,
	IOptionsMenuProps,
	ITranslatedProps,
	IWallPostData,
} from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, IOptionsMenuProps, ITranslatedProps {
	avatarImage: string;
	posts: IWallPostData[];
	skeletonPost: IWallPostData;
	refreshing: boolean;
	creatingPost: boolean;
	shareSectionPlaceholder: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	scrollRef: React.RefObject<FlatList<IWallPostData>>;
	scrollY: AnimatedValue;
	likeError: boolean;
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
		const { skeletonPost, navigation } = this.props;

		const post = data.item;

		return (
			<View style={styles.post}>
				<WallPost
					post={post}
					onAddComment={(cardHeight: number) => this.props.onAddComment(data.index, cardHeight)}
					commentInput={true}
					navigation={navigation}
				/>
				{skeletonPost && <View style={styles.overlay} />}
				{post.suggested && (
					<SuggestionsCarousel items={post.suggested} getText={this.props.getText} />
				)}
			</View>
		);
	};
}
