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
import { INavigationProps, ITranslatedProps } from '../../../types';

import styles from './UserFeedScreen.style';

interface IUserFeedScreenViewProps extends INavigationProps, ITranslatedProps {
	avatar: string;
	postIds: string[];
	placeholderPostId: string | null;
	refreshing: boolean;
	shareMessage: string;
	loadingMorePosts: boolean;
	canLoadMorePosts: boolean;
	scrollRef: React.RefObject<FlatList<string>>;
	scrollY: AnimatedValue;
	onRefresh: () => void;
	onLoadMorePosts: () => void;
	onCreateWallPost: () => void;
	onAddComment: (index: number, cardHeight: number) => void;
}

export class UserFeedScreenView extends React.Component<IUserFeedScreenViewProps> {
	public render() {
		const {
			postIds,
			avatar,
			refreshing,
			canLoadMorePosts,
			shareMessage,
			scrollRef,
			scrollY,
			placeholderPostId,
			onRefresh,
			onLoadMorePosts,
			onCreateWallPost,
			getText,
		} = this.props;

		const data = placeholderPostId ? [placeholderPostId, ...postIds] : postIds;

		return (
			<View style={styles.container}>
				{postIds.length === 0 ? (
					<FeedWithNoPosts onCreateWallPost={onCreateWallPost} getText={getText} />
				) : (
					<FlatList
						ref={scrollRef}
						windowSize={10}
						refreshing={refreshing}
						onRefresh={onRefresh}
						data={data}
						keyExtractor={(id) => id}
						renderItem={this.renderItem}
						onEndReached={canLoadMorePosts ? onLoadMorePosts : null}
						onEndReachedThreshold={0.5}
						keyboardShouldPersistTaps="handled"
						ListHeaderComponent={
							<ShareSection
								avatar={avatar}
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

	private renderItem = (data: { item: string; index: number }) => (
		<View style={styles.post}>
			<WallPost
				postId={data.item}
				commentInput={true}
				onAddComment={(cardHeight: number) => this.props.onAddComment(data.index, cardHeight)}
				navigation={this.props.navigation}
			/>
		</View>
	);
}
