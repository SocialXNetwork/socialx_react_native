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
import { INavigationProps, ITranslatedProps, IWallPost } from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, ITranslatedProps {
	avatarImage: string;
	posts: IWallPost[];
	placeholderPost: IWallPost;
	refreshing: boolean;
	shareMessage: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	scrollRef: React.RefObject<FlatList<IWallPost>>;
	scrollY: AnimatedValue;
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
			refreshing,
			canLoadMorePosts,
			shareMessage,
			scrollRef,
			scrollY,
			placeholderPost,
			onRefresh,
			onLoadMorePosts,
			onCreateWallPost,
			getText,
		} = this.props;

		const allPosts = placeholderPost ? [placeholderPost, ...posts] : posts;

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
						keyExtractor={(item) => item.postId}
						renderItem={(data) => this.renderWallPosts(data)}
						onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
						onEndReachedThreshold={0.5}
						keyboardShouldPersistTaps="handled"
						ListHeaderComponent={
							<ShareSection
								avatar={avatarImage}
								message={shareMessage}
								onCreateWallPost={onCreateWallPost}
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

	private renderWallPosts = (data: { item: IWallPost; index: number }) => {
		const { navigation, getText, onAddComment } = this.props;
		const post = data.item;

		return (
			<View style={styles.post}>
				<WallPost
					post={post}
					commentInput={true}
					onAddComment={(cardHeight: number) => onAddComment(data.index, cardHeight)}
					navigation={navigation}
				/>
				{post.suggested && <SuggestionsCarousel items={post.suggested} getText={getText} />}
			</View>
		);
	};
}
